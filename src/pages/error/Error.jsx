import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6 text-center">
                <div className="relative">
                    <img src="/error.jpg" alt="Error" className="w-full object-cover rounded-lg shadow-xl" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-2xl md:text-4xl font-bold text-Primary mt-6">Something Went Wrong!</h1>
                    <p className="text-base md:text-lg text-Text mt-4">
                        We could not find the page you were looking for. Please try again or head back to the homepage for more options.
                    </p>
                    <div className="mt-8">
                        <Link to="/" className="btn bg-primary hover:bg-Secondary text-white py-2 px-6 rounded-md">
                            Go to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
