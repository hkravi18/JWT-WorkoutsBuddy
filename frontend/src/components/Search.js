import { useEffect } from "react";
import { useProductsContext } from "../hooks/useProductsContext";

const Search = ({ search, setSearch, setSearchList }) => {
    const { products } = useProductsContext();
    
    useEffect(() => {
        if (products) {
            const searchProducts = async() => {
                console.log("Products ", products);
                const filteredArray = products.filter(product => 
                    ((product.title).toLowerCase()).includes(search.toLowerCase())
                    || ((product.category).toLowerCase()).includes(search.toLowerCase())
                    || ((product.description).toLowerCase()).includes(search.toLowerCase())
                );
                setSearchList(filteredArray); 
            };
            searchProducts();
        }
    }, [products, search]);
    
    return (
        <div className='search'>
            <input 
                type='text'
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search Products'
            />
        </div>
    );
};

export default Search;