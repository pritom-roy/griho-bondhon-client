import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
// import Lottie from "lottie-react";
// import loginAnimation from "/login.json"

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
            .then((result) => {
                console.log(result.user);
                event.target.reset();
                Toast.fire({
                    icon: "success",
                    title: "Login Successful",
                });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                setErrorMessage(error.message);
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    };


    const handleGoogleLogin = () => {
        googleSignin()
            .then((result) => {
                console.log(result.user);
                Toast.fire({
                    icon: "success",
                    title: "Login Successful",
                });
                navigate(location?.state || "/");
            })
            .catch((error) => {
                setErrorMessage(error.message);
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    };

    return (
        <div className="min-h-screen">
            <div className="text-center flex justify-center items-center mt-5 mb-3">
                <h1 className="text-3xl font-bold text-center text-mytext">
                    Login
                </h1>
                {/* <Lottie className="h-20" animationData={loginAnimation} /> */}
            </div>
            <div className="flex justify-center items-center flex-col mb-10 px-5">
                <div className="w-full max-w-sm border border-mytext rounded-lg">
                    <form onSubmit={handleSubmit} className="p-5">
                        <div className="mb-4">
                            <label className="block font-[500] mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-[500] mb-1">Password</label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="flex justify-center">
                            <button className="px-3 py-2 text-white bg-gray-600 rounded-md hover:bg-primary">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="px-3 py-2 mt-2 text-white bg-gray-600 rounded-md hover:bg-primary flex items-center"
                        >
                            <FaGoogle className="mr-2" /> Login with Google
                        </button>
                    </div>
                    {errorMessage && (
                        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
                    )}
                    <p className="text-center my-4">
                        <span>New to this site? </span>
                        <Link
                            to="/register"
                            className="font-semibold hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
