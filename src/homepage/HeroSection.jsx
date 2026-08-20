import { supabase } from "../lib/supabaseClient";

const HeroSection = () => {
    return(
        <div className="hero-section-container">

        <div className="hero-image-container">
          <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/hero.jpeg" alt="PAWNEDERA" />
        </div>


       <div className="hero-text">
        <p className="hero-text-head">Not just a clothing brand.</p>
        <p className="hero-text-body">Launched in January of 2026, Pawned is not only a streetwear brand, it's a culture of perseverance.
           <br></br> Curated for those who kept going. </p>
       </div>

       <div className="hero-buttons">
        <button>SHOP NOW</button>
        <button>A CLOSER LOOK</button>
       </div>
        </div>
    )
}

export default HeroSection;