import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const handleClick = () => {
        logout();
    }
    
    return (
        <header>
            {/* <div className="container"> */}
                <nav>
                    {user ? (
                            <ul>
                                <li className='first'><Link to="/"><h1>Buy Sell Paradise</h1></Link></li>
                                <li><Link to="/myproducts">My Products</Link></li>
                                <li><span>{user.username}</span></li>
                                <li><button onClick={handleClick}>Log out</button></li>
                            </ul>
                        ) :
                        (
                        <ul>
                            <li className='first'><Link to="/"><h1>Buy Sell Paradise</h1></Link></li>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </ul>)
                    }
                </nav>
            {/* </div> */}
        </header>
    )
};

export default Navbar;