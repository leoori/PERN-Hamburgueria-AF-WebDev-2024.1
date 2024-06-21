import { fetchBurgers } from "../api/auth";
import Layout from "../components/layout";
import React, { useState, useEffect } from 'react';
import './styles/burgers.css';

const Burgers = () => {
    const [burgers, setBurgers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getBurgers = async () => {
            try {
                const { data } = await fetchBurgers(); // Função para obter hambúrgueres do backend
                setBurgers(data.burgers);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setError('Erro ao carregar hambúrgueres.');
                setLoading(false);
            }
        };

        getBurgers();
    }, []);

    return (
        <Layout>
            <div className='burgers-container'>
                <div className='container'>
                    <h1 className='burgers-heading'>Hambúrgueres Cadastrados</h1>
                    <div className="table-container">
                        {loading ? (
                            <p className='text-center'>Carregando hambúrgueres...</p>
                        ) : error ? (
                            <p className='text-center text-danger'>{error}</p>
                        ) : (
                            <div className="table-responsive">
                                <table className='table table-hover table-bordered'>
                                    <thead className='thead-dark'>
                                        <tr>
                                            <th scope='col'>ID</th>
                                            <th scope='col'>Nome</th>
                                            <th scope='col'>Ingredientes</th>
                                            <th scope='col'>Preço</th>
                                            <th scope='col'>Quantidade em Estoque</th>
                                            <th scope='col'>Criado por</th>
                                            <th scope='col'>Telefone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {burgers.map((burger) => (
                                            <tr key={burger.burger_id}>
                                                <td>{burger.burger_id}</td>
                                                <td>{burger.burger_name}</td>
                                                <td>{burger.burger_ingredients}</td>
                                                <td>R$ {burger.burger_price}</td>
                                                <td>{burger.burger_supply}</td>
                                                <td>{burger.created_by_name}</td>
                                                <td>{burger.created_by_phone}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Burgers;
