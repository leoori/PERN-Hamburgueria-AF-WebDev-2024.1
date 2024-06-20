import { useState } from "react"
import { useDispatch } from "react-redux"
import { onLogin } from "../api/auth"
import Layout from "../components/layout"
import { authenticateUser } from "../redux/slices/authSlice"
import './styles/login.css'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(false)

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const dispatch = useDispatch()

    const onSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await onLogin(values)
            console.log('response:', response.data.user_id)
            let user_id = response.data.user_id
            dispatch(authenticateUser())

            localStorage.setItem('user_id', user_id)
            localStorage.setItem('isAuth', 'true')

        } catch (error) {
            console.log(error.response.data.errors[0].msg)
            setError(error.response.data.errors[0].msg)
        }
    }

    return (
    <Layout>
        <div className="login-container">
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3' >
                <h1>Entrar</h1>

                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Endereço de e-mail:
                    </label>
                    <input onChange={(e) => onChange(e)} type='email' className='form-control' id='email' name='email' value={values.email} placeholder='Insira seu e-mail' required />
                </div>

                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Senha:
                    </label>
                    <input onChange={(e) => onChange(e)} type='password' value={values.password} className='form-control' id='password' name='password' placeholder='Insira sua senha' required />
                </div>

                <div style={{color: 'red', margin: '10px 0'}}>{error}</div>

                <button type='submit' className='btn btn-primary'>
                    Entrar
                </button>
            </form>
        </div>
    </Layout>
    )
}

export default Login