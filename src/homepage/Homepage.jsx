import HeroSection from "./HeroSection";
import ShopSection from "./ShopSection";
import HomeBody from "./HomeBody";
import Footer from "../components/Footer";

const Homepage = () => {
    return(
        <div className="homepage-container">
            <HeroSection/>
            <ShopSection/>
            <HomeBody />
            <Footer/>
        </div>
    )
}

export default Homepage;