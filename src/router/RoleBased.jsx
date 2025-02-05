import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "../shared/loading/Loading";

const RoleBased = () => {
    const { user, role, setRole } = useContext(AuthContext);
    // const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserRole = async () => {
            if (user?.email) {
                try {
                    const response = await axios.get(`https://griho-bandhan-server.vercel.app/users/${user.email}`);
                    if (response?.data?.role) {
                        setRole(response.data.role);
                    } else {
                        console.error("Role not found in response data");
                        setRole(null);
                    }
                } catch (error) {
                    if (error.response) {
                        console.error("Server Error:", error.response.status, error.response.data);
                    } else if (error.request) {
                        console.error("No response received:", error.request);
                    } else {
                        console.error("Error:", error.message);
                    }
                    setRole(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setRole(null);
                setLoading(false);
            }
        };

        fetchUserRole();
    }, [user, setRole]);

    if (loading) {
        return <Loading />;
    }

    if (role === "admin") {
        return <Navigate to="/dashboard/admin-dashboard" replace />;
    } else if (role === "general") {
        return <Navigate to="/dashboard/edit-data" replace />;
    }

    return <div>Access Denied</div>;
};

export default RoleBased;
