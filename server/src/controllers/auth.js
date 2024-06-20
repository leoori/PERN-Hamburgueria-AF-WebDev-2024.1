const db = require('../db')
const {hash} = require('bcryptjs')
const {sign} = require('jsonwebtoken')
const { use } = require('passport')
const {SECRET} = require('../constants')

exports.getUsers = async(req, res) => {
    try {
        const {rows} = await db.query('SELECT user_id, email, created_at, user_name, favorite_burger_id FROM users')

        return res.status(200).json({
            success: true,
            users: rows,
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.register = async(req, res) => {
    const {email, phone, password, user_name} = req.body
    try {
        const hashedPassword = await hash(password, 10)

        await db.query('INSERT INTO users(email, phone, password, user_name) VALUES ($1 , $2, $3, $4)', [email, phone, hashedPassword, user_name])

        return res.status(201).json({
            success: true,
            message: 'Registrado com sucesso!'
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.login = async (req, res) => {
    let user = req.user
    let payload = {
        id: user.user_id,
        email: user.email
    }

    try {
        const token = await sign(payload, SECRET)
        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'Logged in successfully',
            user_id: user.user_id
        })

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}

exports.protected = async(req, res) => {
    try {
        return res.status(200).json({
            info: 'informacao protegida'
        })
    } catch (error) {
        console.log(error.message)
    }
}

exports.logout = async(req, res) => {
    try {
        return res.status(200).clearCookie('token', {httpOnly: true}).json({
            success: true,
            message: 'Logged out successfully',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message,
        })
    }
}


//BURGERS

exports.getBurgers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT burger_id, burger_name, burger_ingredients, burger_price, burger_supply, created_by, created_by_name, created_by_phone FROM burgers');
        return res.status(200).json({
            success: true,
            burgers: rows,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro ao recuperar hambúrgueres.',
        });
    }
}


exports.registerBurger = async (req, res) => {
    const { burger_name, burger_ingredients, burger_price, burger_supply, created_by } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO burgers (burger_name, burger_ingredients, burger_price, burger_supply, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [burger_name, burger_ingredients, burger_price, burger_supply, created_by],
        );

        await db.query('UPDATE burgers SET created_by_name = (SELECT user_name FROM users WHERE users.user_id = burgers.created_by)')
        await db.query('UPDATE burgers SET created_by_phone = (SELECT phone FROM users WHERE users.user_id = burgers.created_by)')

        return res.status(201).json({
            success: true,
            message: 'Hambúrguer cadastrado com sucesso',
            burger: result.rows[0],
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar o hambúrguer.',
        });
    }
}

