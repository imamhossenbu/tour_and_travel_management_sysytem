import { Helmet } from "react-helmet";
import ParallaxBanner from "../Shared/ParallaxBanner";
import bgImg from '../assets/bg-2.jpg';
import AllPackages from "../components/AllPackages";

const Packages = () => {
    return (
        <div>
            <Helmet>
                <title>Packages || TravelGo </title>
            </Helmet>
            <ParallaxBanner backgroundImage={bgImg} title={'Explore Our Exclusive Travel Packages'} subtitle={'Discover breathtaking destinations and tailor-made experiences for your perfect getaway.'} buttonText={'View Packages'} ></ParallaxBanner>
            <AllPackages></AllPackages>
        </div>
    );
};

export default Packages;