import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import './navbar.css'; // Importando o CSS personalizado


const Navbar = () => {
    const { isAuth } = useSelector((state) => state.auth);

    const dispatch = useDispatch()

    const logout = async () => {
      try {
          await onLogout()

          dispatch(unauthenticateUser())
          localStorage.removeItem('isAuth')
          localStorage.removeItem('user_id')

      } catch (error) {
          console.log(error.response)
      }
  }

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <NavLink to='/' className='navbar-brand'>
                    Hamburgueria
                </NavLink>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    {isAuth ? (
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <NavLink to='/dashboard' className='nav-link'>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/burgers' className='nav-link'>
                                    Hambúrgueres
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/users' className='nav-link'>
                                    Usuários
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink
                                    to='/register_burger'
                                    className='nav-link'
                                >
                                    Cadastrar Hambúrguer
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink onClick={() => logout()} className='nav-link'>
                                    Sair
                                </NavLink>
                            </li>
                        </ul>
                    ) : (
                        <ul className='navbar-nav ml-auto'>
                            <li className='nav-item'>
                                <NavLink to='/login' className='nav-link'>
                                    Entrar
                                </NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to='/register' className='nav-link'>
                                    Cadastrar-se
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
