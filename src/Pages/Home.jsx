import ParallaxBanner from '../Shared/ParallaxBanner'
import bgImg from '../../src/assets/bg-1.jpg'
import PopularDestination from '../components/PopularDestination';
import FeaturedPackages from '../components/FeaturedPackages ';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import FAQSection from '../components/FAQSection';
import ServicesSection from '../components/ServicesSection';
import CallToAction from '../components/CallToAction';

const Home = () => {
    return (
        <div>
            <ParallaxBanner backgroundImage={bgImg} title={'Discover Your Next Adventure'} subtitle={'Explore breathtaking destinations, unforgettable experiences, and curated travel packages just for you'} buttonText={'Find Your Trip'}></ParallaxBanner>
            <PopularDestination></PopularDestination>
            <FeaturedPackages></FeaturedPackages>
            <ServicesSection></ServicesSection>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            <CallToAction></CallToAction>
            <FAQSection></FAQSection>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;