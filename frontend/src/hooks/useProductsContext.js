import { ProductContext } from "../Context/ProductContext";
import { useContext } from "react";

export const useProductsContext = () => {
    
    const context = useContext(ProductContext);

    if (!context) {
        throw Error('useProductsContext must be used inside an ProductsContext Provider');
    }
    return context;
}