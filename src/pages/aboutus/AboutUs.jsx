import { useEffect } from 'react';
import { FaHeart, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    useEffect(() => {
        document.title = "GrihoBondhon | AboutUs";
    }, []);
    return (
        <section className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-20 bg-aboutus bg-cover bg-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-primary text-center mb-6">
                    About Us
                </h2>
                <p className="text-mytext text-lg text-center max-w-4xl mx-auto mb-12">
                    Welcome to <span className="font-bold text-primary">GrihoBondhon</span>, a platform dedicated to helping individuals find their perfect life partners. Our mission is to build meaningful connections that lead to strong, lasting bonds. With a user-friendly interface and a deep understanding of relationships, we make the journey of finding your soulmate seamless and joyful.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                        <div className="text-primary text-5xl mx-auto mb-4 ">
                            <FaHeart />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Our Mission</h3>
                        <p className="text-mytext text-sm">
                            To create a trustworthy platform that simplifies finding the right partner, fostering meaningful relationships, and building happy homes.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                        <div className="text-primary text-5xl mx-auto mb-4">
                            <FaLightbulb />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Our Vision</h3>
                        <p className="text-mytext text-sm">
                            To become the most reliable matrimonial platform, connecting people worldwide with love, respect, and trust.
                        </p>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                        <div className="text-primary text-5xl mx-auto mb-4">
                            <FaHandshake />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Our Values</h3>
                        <p className="text-mytext text-sm">
                            Transparency, respect, and commitment are the core values that guide us in creating a safe and supportive environment for everyone.
                        </p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-primary mb-4">Why Choose GrihoBondhon?</h3>
                    <p className="text-mytext text-lg max-w-3xl mx-auto">
                        At GrihoBondhon, we blend traditional values with modern technology to bring you a secure and reliable platform for finding your life partner. Our extensive matching algorithms, personalized recommendations, and dedicated support ensure that you have the best experience possible.
                    </p>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link to="/biodatas" className="bg-primary text-white py-3 px-6 rounded-lg shadow hover:bg-red-600 transition-all">
                        Join Us Today
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
