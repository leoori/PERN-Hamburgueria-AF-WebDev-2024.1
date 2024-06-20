import { useState } from "react"
import { onRegistration } from "../api/auth"
import Layout from "../components/layout"
import './styles/register.css'

const Register = () => {
    const [values, setValues] = useState({
        user_name:'',
        phone: '',
        email: '',
        password: ''
    })

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()

        try {
            const {data} = await onRegistration(values)
            
            setError('')
            setSuccess(data.message)
            setValues({user_name: '', phone: '', email: '', password: ''})

        } catch (error) {
            console.log(error.response.data.errors[0].msg)
            setError(error.response.data.errors[0].msg)
            setSuccess('')

        }

    }

    console.log(values)

    return (
    <Layout>
        <div className="register-container">
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3' >
                <h1>Cadastre-se</h1>

                <div className='mb-3'>
                    <label htmlFor='text' className='form-label'>
                        Nome completo:
                    </label>
                    <input onChange={(e) => onChange(e)} type='text' className='form-control' id='user_name' name='user_name' value={values.user_name} placeholder='Insira seu nome completo' required />
                </div>

                <div className='mb-3'>
                    <label htmlFor='text' className='form-label'>
                        Telefone:
                    </label>
                    <input onChange={(e) => onChange(e)} type='text' className='form-control' id='phone' name='phone' value={values.phone} placeholder='Insira seu telefone' required />
                </div>

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
                <div style={{color: 'green', margin: '10px 0'}}>{success}</div>


                <button type='submit' className='btn btn-primary'>
                    Cadastrar
                </button>
            </form>
        </div>
    </Layout>
    )
}

export default Register