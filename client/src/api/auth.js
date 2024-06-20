import axios from 'axios'

axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
    return await axios.post(
        'http://localhost:8000/api/register',
        registrationData
    )
}

export async function onLogin(loginData) {
    return await axios.post('http://localhost:8000/api/login', loginData)
}

export async function onLogout() {
    return await axios.get('http://localhost:8000/api/logout')
}

export async function fetchProtectedInfo() {
    return await axios.get('http://localhost:8000/api/protected')
}

export async function fetchUsers() {
    return await axios.get('http://localhost:8000/api/get-users')
}

//burgers
export async function fetchBurgers() {
    return await axios.get('http://localhost:8000/api/burgers')
}

export async function onBurgerRegistration(burgerRegistrationData) {
    return await axios.post(
        'http://localhost:8000/api/register_burger', burgerRegistrationData
    )
}
