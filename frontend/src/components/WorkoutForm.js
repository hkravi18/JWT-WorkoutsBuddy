import { useState } from 'react';
import { baseURL } from '../api/baseURL';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext(); 
    const { user } = useAuthContext();
     
    const [title, setTitle] = useState('');
    const [loads, setLoads] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        } 

        const workout = {title, loads, reps};
        const response = await fetch(`${baseURL}/workouts`, {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const jsonData = await response.json();
        if (!response.ok) {
            setError(jsonData.error);
            setEmptyFields(jsonData.emptyFields);
        } else {
            dispatch({type:'CREATE_WORKOUT', payload: jsonData}); 
            setTitle('');
            setLoads('');
            setReps('');
            setEmptyFields([]);
            setError(null);
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <label>Exercise Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Loads (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoads(e.target.value)}
                value={loads}
                className={emptyFields.includes('loads') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
    
};

export default WorkoutForm;