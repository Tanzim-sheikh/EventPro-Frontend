import { useAuth } from './AuthContext';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredUserType }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8C9F6E]"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login with the return URL
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check if user type is allowed
  const isAuthorized = !requiredUserType || 
    (Array.isArray(requiredUserType) 
      ? requiredUserType.includes(user?.type)
      : user?.type === requiredUserType);

  // If user type is not authorized, redirect to home or show unauthorized page
  if (!isAuthorized) {
    // You can create a dedicated unauthorized page if needed
    return <Navigate to="/" replace />;
  }

  // If everything is fine, render the children or Outlet for nested routes
  return children || <Outlet />;
};

export default ProtectedRoute;