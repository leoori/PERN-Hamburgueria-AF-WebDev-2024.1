import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { fetchUsers } from '../api/auth';
import './styles/users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await fetchUsers(); // Função para obter usuários do backend
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setError('Erro ao carregar usuários.');
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    return (
        <Layout>
            <div className='users-container'>
                <div className='container mt-3'>
                    <h1>Lista de Usuários Cadastrados</h1>
                    {loading ? (
                        <p>Carregando usuários...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <div className='table-container'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Nome</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>Data de Cadastro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.user_id}>
                                            <td>{user.user_id}</td>
                                            <td>{user.user_name}</td>
                                            <td>{user.email}</td>
                                            <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Users;
