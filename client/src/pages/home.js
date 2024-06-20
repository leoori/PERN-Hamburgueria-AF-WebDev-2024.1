import Hamburguer from '../assets/freepik-export-20240613214404wWTP.jpeg'; // Importe sua imagem aqui
import Layout from "../components/layout";
import './styles/home.css'; // Importe o arquivo CSS adicionado

const Home = () => {
    return (
        <Layout>
            <div className="home-container" style={{ backgroundImage: `url(${Hamburguer})` }}>
                <h1 className="home-title">Bem-vindo à Hamburgueria</h1>
                <div>
                    <a href="/burgers" className="btn btn-primary btn-lg home-button">
                        Ver Hambúrgueres
                    </a>
                    <a href="/users" className="btn btn-success btn-lg">
                        Ver Clientes
                    </a>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
