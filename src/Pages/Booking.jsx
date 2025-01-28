import ParallaxBanner from "../Shared/ParallaxBanner";
import bgImg from '../assets/bg-3.jpg'

const Booking = () => {
    return (
        <div>
            <ParallaxBanner backgroundImage={bgImg} title={'Plan Your Perfect Trip'} subtitle={'Secure your dream vacation with just a few clicks. Hassle-free booking, unforgettable memories!'} buttonText={'Book Now!'}></ParallaxBanner>
        </div>
    );
};

export default Booking;