import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const { createUser, updateInfo } = useContext(AuthContext);
    const [eye, setEye] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const toggleEye = () => {
        setEye(!eye);
    };

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
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photo = event.target.photo.value;
        const password = event.target.password.value;

        const profileObj = {
            displayName: name,
            photoURL: photo,
        };

        createUser(email, password)
            .then((result) => {
                console.log(result.user);
                Toast.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                });
                updateInfo(profileObj)
                    .then(() => {
                        navigate("/home");
                        event.target.reset();
                    })
                    .catch((error) => {
                        setErrorMessage(error.message);
                        Toast.fire({
                            icon: 'error',
                            title: errorMessage,
                        });
                    });
            })
            .catch((error) => {
                setErrorMessage(error.message);
                Toast.fire({
                    icon: 'error',
                    title: errorMessage,
                });
            });
    };
    return (
        <div className="min-h-screen">
            <div className="text-center flex justify-center items-center mt-5 mb-3">
                <h1 className="text-3xl font-bold text-center text-mytext">
                    Register Now
                </h1>

            </div>
            <div className="flex justify-center items-center flex-col mb-10 px-5">
                <div className="w-full max-w-sm border border-mytext rounded-lg">
                    <form onSubmit={handleSubmit} className="p-5">
                        <div className="mb-4">
                            <label className="block font-[500] mb-1">Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block  font-[500] mb-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block  font-[500] mb-1">Photo URL</label>
                            <input
                                name="photo"
                                type="text"
                                placeholder="Enter your photo URL"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label className="block  font-[500] mb-1">Password</label>
                            <input
                                name="password"
                                type={eye ? "password" : "text"}
                                placeholder="Enter your password"
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                            <div className="absolute right-3 bottom-3">
                                {eye ? (
                                    <FaEye
                                        onClick={toggleEye}
                                        className="text-lg cursor-pointer hover:text-primary"
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={toggleEye}
                                        className="text-lg cursor-pointer hover:text-green-500"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="px-3 py-2 text-white bg-gray-600 rounded-md hover:bg-primary">
                                Register
                            </button>
                        </div>
                    </form>
                    {errorMessage && (
                        <p className="text-center text-red-500 mt-4">{errorMessage}</p>
                    )}

                    <p className="text-center my-4">
                        <span className="">Already registered? </span>
                        <Link
                            to="/login"
                            className=" font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;