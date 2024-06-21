import Layout from "../components/layout"
import React, { useState } from 'react';
import {onBurgerRegistration} from "../api/auth"
import './styles/register_burger.css';

const Register_Burger = () => {
    const [values, setValues] = useState({
        burger_name: '',
        burger_ingredients: '',
        burger_price: '',
        burger_supply: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            // Supondo que você tenha uma função para obter o ID do usuário logado
            const created_by = localStorage.getItem('user_id')

            const { data } = await onBurgerRegistration({ ...values, created_by });
            setSuccess(data.message);
            setValues({
                burger_name: '',
                burger_ingredients: '',
                burger_price: '',
                burger_supply: ''
            });
            setError('');
        } catch (error) {
            console.error(error.response.data.message);
            setError('Erro ao cadastrar hambúrguer.');
            setSuccess('');
        }
    };

    return (
        <Layout>
            <div className="register_burger-container">
                <div className='container mt-3'>
                    <form onSubmit={onSubmit}>
                        <h1>Cadastrar Hambúrguer</h1>
                        <div className='mb-3'>
                            <label htmlFor='burger_name' className='form-label'>
                                Nome do Hambúrguer:
                            </label>
                            <input
                                onChange={onChange}
                                type='text'
                                className='form-control'
                                id='burger_name'
                                name='burger_name'
                                value={values.burger_name}
                                placeholder='Insira o nome do hambúrguer'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='burger_ingredients' className='form-label'>
                                Ingredientes:
                            </label>
                            <input
                                onChange={onChange}
                                type='text'
                                className='form-control'
                                id='burger_ingredients'
                                name='burger_ingredients'
                                value={values.burger_ingredients}
                                placeholder='Insira os ingredientes'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='burger_price' className='form-label'>
                                Preço:
                            </label>
                            <input
                                onChange={onChange}
                                type='number'
                                step='0.01'
                                min='0'
                                className='form-control'
                                id='burger_price'
                                name='burger_price'
                                value={values.burger_price}
                                placeholder='Insira o preço'
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='burger_supply' className='form-label'>
                                Quantidade em Estoque:
                            </label>
                            <input
                                onChange={onChange}
                                type='number'
                                className='form-control'
                                id='burger_supply'
                                name='burger_supply'
                                value={values.burger_supply}
                                placeholder='Insira a quantidade em estoque'
                                required
                            />
                        </div>
                        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
                        <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
                        <button type='submit' className='btn btn-primary'>
                            Cadastrar Hambúrguer
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register_Burger