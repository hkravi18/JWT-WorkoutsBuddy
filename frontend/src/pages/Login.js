import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from '../hooks/useAuthContext';

const Login = () => {
    const { user } = useAuthContext(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await login(email, password);
    };

    return ( !user ?     
        (<form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button type="submit" disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}
        </form>) : <Navigate to="/"/>
    );
};

export default Login;