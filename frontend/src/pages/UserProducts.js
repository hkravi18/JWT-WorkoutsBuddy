import { useState, useEffect } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import { baseURL } from '../api/baseURL';
import { useAuthContext } from '../hooks/useAuthContext';

//components 
import ProductDetails from '../components/ProductDetails';
import ProductForm from '../components/ProductForm'; 
import Search from '../components/Search';

const UserProducts = () => {
    const {products, dispatch} = useProductsContext();
    const [searchList, setSearchList] = useState(null);
    const [search, setSearch] = useState('');
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchProducts = async() => {
            const response = await fetch(`${baseURL}/products/myproducts`, {
                headers: {
                    'Authorization': `Bearer ${user ? user.token : null}`
                }
            });
            const jsonData = await response.json();
 
            if (response.ok) {
                dispatch({type:'SET_PRODUCTS', payload: jsonData});
            }
        };

        fetchProducts();    
    }, [dispatch, user]);

    return (
        <div className="home">
            <div>
            <Search 
                search={search}
                setSearch={setSearch}
                setSearchList={setSearchList}
            />
            <div className='products'>
                {searchList && searchList.map((product) => (
                    <ProductDetails key={product._id} product={product}/>
                ))}
            </div>
            </div>
            <ProductForm />
        </div>
    )
}; 

export default UserProducts;