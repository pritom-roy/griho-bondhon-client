import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import ani from "../../../assets/marriage.json";
import Lottie from "lottie-react";

const Login = () => {
    const { loginUser, googleSignin } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        loginUser(email, password)
            .then(() => {
                event.target.reset();
                Toast.fire({ icon: "success", title: "Login Successful" });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                setErrorMessage(error.message);
                Toast.fire({ icon: "error", title: error.message });
            });
    };

    const handleGoogleLogin = () => {
        googleSignin()
            .then(() => {
                Toast.fire({ icon: "success", title: "Login Successful" });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                setErrorMessage(error.message);
                Toast.fire({ icon: "error", title: error.message });
            });
    };

    const fillUserCredentials = () => {
        document.getElementsByName("email")[0].value = "zahid.khan@example.com";
        document.getElementsByName("password")[0].value = "123456";
    };

    const fillAdminCredentials = () => {
        document.getElementsByName("email")[0].value = "admin@admin.com";
        document.getElementsByName("password")[0].value = "123456";
    };

    return (
        <div className="flex flex-col items-center justify-center md:pt-20 md:pb-28 bg-gray-100">
            <div className="w-full p-6 max-w-4xl flex border rounded-lg shadow-lg overflow-hidden bg-white">
                <div className="w-1/2 flex items-center justify-center bg-white p-5">
                    <Lottie animationData={ani} loop autoplay style={{ width: 350, height: 350 }} />
                </div>
                <div className="w-1/2 p-6">
                    <h1 className="text-2xl font-bold text-center mb-3">Login</h1>
                    <p className="text-center text-gray-600 mb-3">Connecting Hearts and Families</p>
                    <div className="flex justify-center gap-4 mb-4">
                        <button onClick={fillUserCredentials} className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">User</button>
                        <button onClick={fillAdminCredentials} className="px-3 py-2 bg-primary text-white rounded-md hover:bg-red-500">Admin</button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="email" type="email" placeholder="Email" className="w-full border p-2 rounded" required />
                        <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded" required />
                        <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">Login</button>
                    </form>
                    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center bg-primary text-white py-2 mt-3 rounded hover:bg-red-600">
                        <FaGoogle className="mr-2" /> Login with Google
                    </button>
                    {errorMessage && <p className="text-center text-primary mt-3">{errorMessage}</p>}
                    <p className="text-center mt-4">
                        New here? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
