import { useEffect } from "react";
import Banner from "../banner/Banner";
import Profile from "../premium-profile/Profile";
import Counter from "../counter/Counter";
import Marriages from "../success/Marriages";
import HowItWorks from "../howitwork/HowItWorks";

const Home = () => {
    useEffect(() => {
        document.title = "GrihoBondhon | Home";
    }, []);
    return (
        <div>
            <Banner />
            <HowItWorks />
            <Profile />
            <Counter />
            <Marriages />
        </div>
    );
};

export default Home;