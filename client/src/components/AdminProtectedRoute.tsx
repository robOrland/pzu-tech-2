import { Navigate } from "react-router-dom";
import { authService } from "@/services/auth.service";

interface AdminProtectedRouteProps {
    children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
    const user = authService.getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default AdminProtectedRoute;
