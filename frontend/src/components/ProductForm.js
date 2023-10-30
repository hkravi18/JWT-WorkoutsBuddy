import { useState } from 'react';
import { baseURL } from '../api/baseURL';
import { useProductsContext } from '../hooks/useProductsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProductForm = () => {
    const { dispatch } = useProductsContext(); 
    const { user } = useAuthContext();
     
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        } 
        
        const product = {title, price, category, description};
        const response = await fetch(`${baseURL}/products`, {
            method: 'POST',
            body: JSON.stringify(product),
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
            dispatch({type:'CREATE_PRODUCT', payload: jsonData}); 
            setTitle('');
            setPrice('');
            setCategory('');
            setDescription('');
            setEmptyFields([]);
            setError(null);
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <label>Product Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Category:</label>
            <input 
                type="text"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className={emptyFields.includes('category') ? 'error' : ''}
            />

            <label>Price:</label>
            <input 
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className={emptyFields.includes('price') ? 'error' : ''}
            />

            <label>Description:</label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}
            />

            <button>Add Product</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
    
};

export default ProductForm;