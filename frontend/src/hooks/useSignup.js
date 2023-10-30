import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { baseURL } from '../api/baseURL';

export const useSignup = () => {
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async(email, password, username) => {
        setError(null);
        setIsLoading(true);
        
        const response = await fetch(`${baseURL}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password, username})
        })

        const jsonData = await response.json(); 

        if (!response.ok) {
            setIsLoading(false);
            setError(jsonData.error); 
        } else {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(jsonData));

            //update the auth context
            dispatch({ type: "LOGIN", payload: jsonData });
        
            setIsLoading(false);
        }
    }; 

    return { signup, error, isLoading };
}