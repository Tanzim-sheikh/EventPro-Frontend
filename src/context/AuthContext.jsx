import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setLoading] = useState(true);


    useEffect(() => {

        const initAuth = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUserType = localStorage.getItem('type');

            if (storedToken) {
                setToken(storedToken);
                setUser({
                    type: storedUserType || 'user',
                    name: localStorage.getItem('Name')
                });
            }
            setLoading(false);
        }
        initAuth();
    }, []);

    const login = (userData, authToken, type) => {
        console.log('Logging in with:', { userData, authToken, type });
        
        // Get the user type from the response type parameter or from userData
        const userType = type?.toLowerCase() || userData?.type?.toLowerCase() || 'user';
        
        const userInfo = {
            ...userData,
            type: userType,
            name: userData.Name || userData.name || 'User' // Handle different name properties
        };
        
        console.log('Setting user info:', userInfo);
        setUser(userInfo);
        setToken(authToken);
        
        // Store all necessary data in localStorage
        localStorage.setItem("token", authToken);
        localStorage.setItem("type", userType);
        localStorage.setItem("Name", userInfo.name);
        
        console.log('Login complete, current user:', userInfo);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('type');
        localStorage.removeItem('Name');
    }

    const value = {
        user,
        token,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user, // Convert to boolean: true if user exists
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext