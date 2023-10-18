import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { baseURL } from "../api/baseURL";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
    const {dispatch} = useWorkoutsContext();
    const { user } = useAuthContext();

    const handleClick = async() => {    
        if (!user) {
            return ;
        }

        const response = await fetch(`${baseURL}/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}` 
            }
        });
        const jsonData = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: jsonData}); 
        }
    };

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.loads}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
};

export default WorkoutDetails;