import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import image01 from "/wedding2.jpg"
import image02 from "/wedding3.jpg"
import image03 from "/wedding1.jpg"
import image04 from "/wedding2.jpg"
import image05 from "/wedding3.jpg"
import image06 from "/wedding1.jpg"

const Banner = () => {
    return (
        <Carousel showThumbs={false} showStatus={false} autoPlay={true} infiniteLoop={true} interval={3000} >
            <div>
                <img className="max-h-[70vh] object-cover" src={image01} />
            </div>
            <div>
                <img className="max-h-[70vh] object-cover" src={image02} />
            </div>
            <div>
                <img className="max-h-[70vh] object-cover" src={image03} />
            </div>
            <div>
                <img className="max-h-[70vh] object-cover" src={image04} />
            </div>
            <div>
                <img className="max-h-[70vh] object-cover" src={image05} />
            </div>
            <div>
                <img className="max-h-[70vh] object-cover" src={image06} />
            </div>
        </Carousel>
    );
};

export default Banner;