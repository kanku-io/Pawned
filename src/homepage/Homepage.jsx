import HeroSection from "./HeroSection";
import ShopSection from "./ShopSection";
import HomeBody from "./HomeBody";
import Footer from "../components/Footer";
import DesktopHomeExtra from "./DesktopHomeExtra";

const Homepage = () => {
    return(
        <div className="homepage-container">
            <HeroSection/>
            <ShopSection/>
            <HomeBody />
            <DesktopHomeExtra/>
            <Footer/>
        </div>
    )
}

export default Homepage;