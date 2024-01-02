import Hero from "../components/home/Hero";
// import Services from "../components/home/Services";
import HomeFeature from "../components/home/Feature";
import HomeDoctors from "../components/home/Doctors";
import MainLayout from "../layouts/MainLayout";
import Header from "../New/Sections/Header";
import Schedule from "../New/Sections/Schedule";
import Features from "../New/Sections/Features";
import Facts from "../New/Sections/Facts";
import Services from "../New/Sections/Services";
import Portfolio from "../New/Sections/Portfolio";
import Doctors from "../New/Sections/Doctors";
import Footer from "../New/Footer/Footer";
import CallToAction from "../New/Sections/CallToAction";

const LandingPage = () => {
    return (
        <>
            <Header/>
            <Schedule/>
            <Features/>
            <Facts  />
            <Services/>
            <CallToAction/>
            <Portfolio/>
            <Doctors/>
            <Footer/>
        </>
    );
};

export default LandingPage;
