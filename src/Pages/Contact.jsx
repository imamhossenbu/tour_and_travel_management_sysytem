import ParallaxBanner from "../Shared/ParallaxBanner";
import bgImg from '../assets/bg-4.jpg'
import ContactPage from "../components/ContactPage";

const Contact = () => {
    return (
        <div>
            <ParallaxBanner backgroundImage={bgImg} title={'Travel Assistance Anytime, Anywhere'} subtitle={'If you need urgent support during your trip, our 24/7 team is here to help.'} buttonText={'Get Immediate Help'}></ParallaxBanner>
            <ContactPage></ContactPage>
        </div>
    );
};

export default Contact;