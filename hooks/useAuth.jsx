import { useContext } from "react";
import AuthContext from "../src/context/AuthProvider";

//simepre que se vaya a extraer informacion se hace por medio de esta funcion
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth