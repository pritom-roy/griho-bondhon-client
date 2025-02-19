import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image01 from "/wedding2.jpg";
import image02 from "/wedding3.jpg";
import image03 from "/wedding1.jpg";
import image04 from "/wedding2.jpg";
import image05 from "/wedding3.jpg";
import image06 from "/wedding1.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    const slides = [
        {
            img: image01,
            text: "Find Your Perfect Life Partner",
            heading: "Welcome to GrihoBandhon",
            paragraph: "Our platform helps you connect with your ideal match.",
            link: "/biodatas",
            btnText: "Browse Biodatas"
        },
        {
            img: image02,
            text: "A Trusted Matrimonial Platform",
            heading: "Experience Trust and Safety",
            paragraph: "Join a community that values privacy and authenticity.",
            link: "/aboutus",
            btnText: "Learn More"
        },
        {
            img: image03,
            text: "Your Journey to Marriage Starts Here",
            heading: "Begin Your Love Story",
            paragraph: "Explore profiles that match your preferences.",
            link: "/biodatas",
            btnText: "Get Started"
        },
        {
            img: image04,
            text: "Connecting Hearts, Building Families",
            heading: "Build Lasting Relationships",
            paragraph: "Find someone who shares your dreams and aspirations.",
            link: "/contactus",
            btnText: "Contact Us"
        },
        {
            img: image05,
            text: "Your Soulmate is Just a Click Away",
            heading: "Discover Your Match",
            paragraph: "Take the first step towards a beautiful journey.",
            link: "/biodatas",
            btnText: "Find Your Match"
        },
        {
            img: image06,
            text: "Let Us Help You Write Your Love Story",
            heading: "Craft Your Unique Story",
            paragraph: "Join us to create a memorable love tale.",
            link: "/aboutus",
            btnText: "Discover More"
        },
    ];

    return (
        <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true} interval={3000}>
            {slides.map((slide, index) => (
                <div key={index} className="relative">
                    <img className="max-h-[70vh] object-cover w-full" src={slide.img} alt="Matrimonial Banner" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white p-6 text-center">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">{slide.text}</h2>
                        <h3 className="text-2xl font-semibold mb-2">{slide.heading}</h3>
                        <p className="mb-4">{slide.paragraph}</p>
                        <Link to={slide.link} className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-lg text-lg font-semibold transition">
                            {slide.btnText}
                        </Link>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
