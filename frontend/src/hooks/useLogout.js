import { useAuthContext } from "./useAuthContext";
import { useProductsContext } from "./useProductsContext"; 

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: productDispatch } = useProductsContext(); 
       
    const logout = () => {
        //remove user from localStorage 
        localStorage.removeItem('user');
        
        //dispatch logout action 
        authDispatch({type: "LOGOUT"});    
        
        //removing the products items
        productDispatch({type: 'SET_PRODUCTS', payload: null });          
    };

    return { logout };
};