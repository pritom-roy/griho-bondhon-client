import { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ContactUs = () => {
    useEffect(() => {
        document.title = "GrihoBondhon | ContactUs";
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Sent',
            text: 'We will get back to you soon!',
            confirmButtonColor: '#FF5A58',
        });
    };

    return (
        <section className="bg-gray-50 py-12 px-6 sm:px-12 lg:px-20 bg-contactus bg-cover bg-center">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-primary text-center mb-6">
                    Contact Us
                </h2>
                <p className="text-mytext text-lg text-center max-w-4xl mx-auto mb-12">
                    We would love to hear from you! Whether you have a question about our services, need assistance, or just want to share your thoughts, feel free to reach out to us.
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                        <div className="text-primary text-5xl mx-auto mb-4">
                            <FaPhoneAlt />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Phone</h3>
                        <a href="tel:+1234567890" className="text-blue-600">
                            +1 234 567 890
                        </a>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                        <div className="text-primary text-5xl mx-auto mb-4">
                            <FaEnvelope />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Email</h3>
                        <a href="mailto:support@grihobondhon.com" className="text-blue-600">
                            support@grihobondhon.com
                        </a>
                    </div>

                    <div className="bg-white shadow-lg rounded-lg p-6 text-center flex flex-col items-center">
                        <div className="text-primary text-5xl mx-auto mb-4">
                            <FaMapMarkerAlt />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Address</h3>
                        <p className="text-mytext text-sm">
                            123 Matrimonial Street, Dhaka, Bangladesh
                        </p>
                    </div>
                </div>

                <div className="mt-16">
                    <h3 className="text-2xl font-bold text-primary text-center mb-6">
                        Send Us a Message
                    </h3>
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
                    >
                        <div className="grid gap-6 sm:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>
                        <textarea
                            placeholder="Your Message"
                            className="w-full mt-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                            rows="6"
                            required
                        ></textarea>
                        <div className="mt-6 text-center">
                            <button
                                type="submit"
                                className="bg-primary text-white py-3 px-6 rounded-lg shadow hover:bg-gray-600 transition-all"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
