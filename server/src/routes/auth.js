const {Router} = require('express')
const { getUsers, register, login, protected, logout, getBurgers, registerBurger } = require('../controllers/auth')
const { registerValidation, loginValidation } = require('../validators/auth')
const { validationMiddleware, userAuth } = require('../middlewares/auth-middleware')
const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)
router.get('/logout', logout)

router.get('/burgers', userAuth, getBurgers)
router.post('/register_burger', registerBurger)


module.exports = router