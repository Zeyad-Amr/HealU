import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import HomeFeature from "../components/home/Feature";
import HomeDoctors from "../components/home/Doctors";
import MainLayout from "../layouts/MainLayout";

const LandingPage = () => {
    return (
        <MainLayout>
            <Hero/>
            {/*<Services/>*/}
            <HomeFeature/>
            {/*<HomeDoctors />*/}
        </MainLayout>
    );
};

export default LandingPage;
