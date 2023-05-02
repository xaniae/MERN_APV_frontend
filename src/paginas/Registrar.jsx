import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {

    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repetirPassword, setRepetirPassword ] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      //Validación para que no haya campos vacios
      if([nombre, email, password, repetirPassword].includes('')){
        setAlerta({msg:'Todos los campos son obligatorios', error: true});
        return;
      }

      // Validación para ver si las contraseñas son iguales
      if(password !== repetirPassword){
        setAlerta({msg:'Los password no son iguales', error: true});
        return;
      }

      //Validación para que la contraseña tenga 6 caracteres como minimo
      if(password.length < 6){
        setAlerta({msg:'El password es muy corto, agrega minimo 6 caracteres', error: true});
        return;
      }

      //Todo bien
      setAlerta({});

      //crear el usuario en la api
      try {
        await clienteAxios.post('/veterinarios', { nombre, email, password })
        setAlerta({
          msg: 'Creado correctamente, revisa tu email',
          error: false
        });

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }


    }

    const { msg } = alerta

    return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra tus <span className="text-black">Pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          
          {msg && <Alerta alerta = {alerta} />}

          <form action="" onSubmit={handleSubmit}>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">
                Nombre
              </label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="text" placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">
                Email
              </label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="email" placeholder="Email de Registro" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">
                Password
              </label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Tu Password" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="">
                Repetir Password
              </label>
              <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" type="password" placeholder="Repite tu Password" value={repetirPassword} onChange={e => setRepetirPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Crear Cuenta" className="bg-indigo-700 w-full py-3 p-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" name="" id="" />
          </form>
          <nav className='mt-10 lg:flex lg:justify-between'>
            <Link className='block text-center my-5 text-gray-500' to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link className='block text-center my-5 text-gray-500' to="/olvide-password">Olvide mi password</Link>
          </nav>
        </div>
      </>
    )
  }
  
  export default Registrar