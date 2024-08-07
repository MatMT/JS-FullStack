import { useState, useEffect, createContext } from 'react';

import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [cargando, setCargando] = useState(true);
    // State Global
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            // Extraer el Token de localStorage
            const token = localStorage.getItem('token');

            // Si no hay token
            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Petición GET con Config
                const { data } = await clienteAxios('veterinarios/profile', config);

                setAuth(data.veterinario);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }

            setCargando(false);
        }

        autenticarUsuario();
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async datos => {
        // Extraer el Token de localStorage
        const token = localStorage.getItem('token');

        // Si no hay token
        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/profile/${datos._id}`;
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                msg: "Cambios Guardados Correctamente",
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
        // Extraer el Token de localStorage
        const token = localStorage.getItem('token');

        // Si no hay token
        if (!token) {
            setCargando(false);
            return;
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/update-password`;
            const { data } = await clienteAxios.put(url, datos, config);

            return {
                msg: data.msg,
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

    }

    return (
        <AuthContext.Provider
            // Disponer de manera Global
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;