import MainLayout from "../layouts/MainLayout";
import Header from "../New/Sections/Header";
import Schedule from "../New/Sections/Schedule";
import Features from "../New/Sections/Features";
import Facts from "../New/Sections/Facts";
import Services from "../New/Sections/Services";
import Portfolio from "../New/Sections/Portfolio";
import Doctors from "../New/Sections/Doctors";
import CallToAction from "../New/Sections/CallToAction";
import AppLayout from "../../../core/components/AppLayout";

const LandingPage = () => {
    return (
        <AppLayout>
            <MainLayout>
                <Header/>
                <Schedule/>
                <Features/>
                <Facts/>
                <Services/>
                <Portfolio/>
                <Doctors/>
                <CallToAction/>
            </MainLayout>
        </AppLayout>
    );
};

export default LandingPage;
