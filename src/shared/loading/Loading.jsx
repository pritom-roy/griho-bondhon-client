const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-200"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce delay-400"></div>
            </div>
        </div>
    );
};

export default Loading;
