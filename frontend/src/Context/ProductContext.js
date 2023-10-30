import { createContext, useReducer } from "react";

export const ProductContext = createContext();


const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS': return {
            products: action.payload
        }
        case 'CREATE_PRODUCT': return {
            products: [action.payload, ...state.products] 
        }
        case 'DELETE_PRODUCT': return {
            products: state.products.filter((w) => {
                return w._id !== action.payload._id
            })
        }
        default: return state;
    }
}

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, {
        products: null
    });
    
    return (
        <ProductContext.Provider value = {{...state, dispatch}}>
           {children}
        </ProductContext.Provider>
    )
};