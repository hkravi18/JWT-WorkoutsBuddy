import { useProductsContext } from "../hooks/useProductsContext";
import { baseURL } from "../api/baseURL";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ProductDetails = ({ product }) => {
    const { dispatch } = useProductsContext();
    const { user } = useAuthContext();

    const handleClick = async() => {    
        if (!user) {
            return ;
        }

        const response = await fetch(`${baseURL}/products/${product._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}` 
            }
        });
        const jsonData = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_PRODUCT', payload: jsonData}); 
        }
    };

    return (
        <div className="product-details">
            <h4>{product.title}</h4>
            <p><strong>Price: </strong>${product.price}</p>
            <p><strong>Category: </strong>{product.category}</p>
            <p><strong>Description: </strong>{product.description}</p>
            <p><strong>Seller: </strong>{product.seller}</p>
            <p>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>Delete</span>
        </div>
    )
};

export default ProductDetails;