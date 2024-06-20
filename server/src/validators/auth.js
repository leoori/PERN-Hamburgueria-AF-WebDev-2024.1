const {check} = require('express-validator')
const db = require('../db')
const {compare} = require('bcryptjs')

//password
const password = check('password').isLength({min: 6, max: 15}).withMessage('Senha precisa ter entre 6 e 15 caracteres.')

//email
const email = check('email').isEmail().withMessage('Por favor insira um e-mail válido.')

//check if email exists
const emailExists = check('email').custom(async(value) => {
    const {rows} = await db.query('SELECT * FROM users WHERE email = $1', [value,])

    if (rows.length) {
        throw new Error('E-mail já cadastrado.')
    }
})

//login validation
const loginFieldsCheck = check('email').custom(async(value, {req}) => {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [value])
    if(!user.rows.length) {
        throw new Error('E-mail não cadastrado.')
    }

    const validPassword = await compare(req.body.password, user.rows[0].password)

    if(!validPassword) {
        throw new Error('Senha incorreta.')
    }

    req.user = user.rows[0]
})


module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginFieldsCheck],
}