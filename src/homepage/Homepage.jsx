import HeroSection from "./HeroSection";
import ShopSection from "./ShopSection";
import HomeBody from "./HomeBody";

const Homepage = () => {
    return(
        <div className="homepage-container">
            <HeroSection/>
            <ShopSection/>
            <HomeBody />
        </div>
    )
}

export default Homepage;