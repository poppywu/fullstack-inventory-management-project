import { createContext, useState } from 'react'
import axios from 'axios'
export const MyContext = createContext()

export const MyContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [loginErrorMsg, setLoginErrorMsg] = useState(null)
    //login the user, set localstorage, update isAuth and update role
    const loginUser = async (user) => {
        const { data } = await axios.post('http://localhost:8080/login', {
            username: user.username,
            password: user.password,
        })
//            .catch(error => {
//            if (error.status == 500) {
//                setLoginErrorMsg('Incorrect login');
//            }
//        });
        console.log('data');
        console.log(data);
        if (!data) {
            console.log('data is null')
            setLoginErrorMsg('Incorrect login');
        }
        else if (data.username && data.role) {
            localStorage.setItem('userToken', data.username)
            setIsAuth(true)
            setRole(data.role)
            setUsername(data.username)
            setLoginErrorMsg(null)
        }
    }
    //log out user
    const logoutUser = () => {
        localStorage.removeItem('userToken')
        setIsAuth(false)
        setRole('')
    }
    const contextValue = {
        loginUser,
        logoutUser,
        isAuth,
        role,
        username,
        loginErrorMsg,
    }
    return (
        <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
    )
}
