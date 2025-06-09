import React, { createContext, useState, useEffect } from 'react';
const AppContext = createContext();
export default AppContext;

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [searchProduct, setSearchProduct] = useState("")
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const login = (name) => setUser({ name });
    const logout = () => setUser(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <AppContext.Provider value={{
            user,
            login,
            logout,
            searchProduct,
            setSearchProduct,
            isMobile,
            setIsMobile
        }}>
            {children}
        </AppContext.Provider>
    );
};


