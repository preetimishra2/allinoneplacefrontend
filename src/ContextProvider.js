import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "./config";

const AppContext = createContext();
export default AppContext;

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [CurrentlyShowingProducts, setCurrentlyShowingProducts] = useState([])
    const [listOfAllProducts, setListOfAllProducts] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const login = (name) => setUser({ name });
    const logout = () => setUser(null);

    useEffect(() => {

        axios.get(`${API_BASE_URL}/api/products`)
      .then(response => {
        // console.log("response has been recieved: ", response.data)
        setListOfAllProducts(response.data);
        setCurrentlyShowingProducts(response.data);
        // setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error(error);
        // setLoading(false);
      });

      const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=> {
        console.log("Updated: ", CurrentlyShowingProducts)
    },[CurrentlyShowingProducts])

    return (
        <AppContext.Provider value={{
            user,
            login,
            logout,
            listOfAllProducts,
            setListOfAllProducts,
            CurrentlyShowingProducts, 
            setCurrentlyShowingProducts,
            // searchProduct,
            // setSearchProduct,
            isMobile,
            setIsMobile
        }}>
            {children}
        </AppContext.Provider>
    );
};


