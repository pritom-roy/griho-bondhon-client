const HowItWorks = () => {
    return (
        <div className="w-11/12 md:w-10/12 mx-auto p-8">
            <h2 className="text-3xl font-bold text-center mb-6 uppercase">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-semibold mb-4">1. Register and Create Biodata</h3>
                    <p className="text-gray-600">
                        Create an account and fill out your biodata with personal and partner preferences.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-semibold mb-4">2. Upgrade to Premium</h3>
                    <p className="text-gray-600">
                        Upgrade to premium membership to access exclusive biodata contact information.
                    </p>
                </div>
                <div className="p-6 border rounded-lg shadow bg-white">
                    <h3 className="text-xl font-semibold mb-4">3. Connect and Celebrate</h3>
                    <p className="text-gray-600">
                        Send contact requests, connect with your partner, and share your success story!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
