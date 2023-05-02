import { createContext, useState, useEffect } from "react";
import clienteAxios from '../config/axios'
import useAuth from "../../hooks/useAuth";
const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const { auth } = useAuth() //consumimos lo que tenemos en el otro context

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if(!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data);

            } catch (error) {
                console.log(error)
            }

        }

        obtenerPacientes();

    }, [auth])

    const guardarPaciente = async (paciente) => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const PacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(PacientesActualizado)
            } catch (error) {
                console.log(error)
            }

        } else{
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado  } = data //crea un nuevo objeto "pacienteAlmacenado", con lo que no tiene antes de los 3 puntos
                setPacientes([pacienteAlmacenado, ...pacientes])
            
            } catch (error) {
                console.log(error.responde.data.msg)
            }
        }
    }

    const setEdicion = (paciente) => {
        setPaciente(paciente)
    }

    const eliminarPaciente = async id => {
        const confirmar = confirm('¿Deseas eliminar este Paciente?')

        if(confirmar){
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id)
                setPacientes(pacientesActualizado)

            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion, 
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )

}


export {
    PacientesProvider
}

export default PacientesContext;