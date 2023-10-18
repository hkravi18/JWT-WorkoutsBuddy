import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext"; 

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext();
    const { dispatch: workoutDispatch } = useWorkoutsContext(); 
       
    const logout = () => {
        //remove user from localStorage 
        localStorage.removeItem('user');
        
        //dispatch logout action 
        authDispatch({type: "LOGOUT"});    
        
        //removing the workouts items
        workoutDispatch({type: 'SET_WORKOUTS', payload: null });          
    };

    return { logout };
};