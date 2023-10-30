import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from '../hooks/useAuthContext';

const Signup = () => {
    const { user } = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(email, password, username);
    };

    return (!user ?    
        (<form className="signup" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
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
            <button type="submit" disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>) : <Navigate to="/" /> 
    );
};

export default Signup;