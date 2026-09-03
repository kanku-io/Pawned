import { supabase } from "../lib/supabaseClient";

const HeroSection = () => {
    return(
        <div className="hero-section-container">

        <div className="hero-image-container">
          <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/hero.jpeg" alt="PAWNEDERA" />
        </div>

        <div className="hero-image-desktop">
            <div className="desktop-hero">

                <div className="hero-half">
                    <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/back1.jpeg" alt="PAWNEDORA — Women's Collection" />
                    <div className="hero-half-content">
                        <p className="hero-half-label">From Pawn To King</p>
                        <h1 className="hero-half-title">PAWNED</h1>
                        <p className="hero-half-sub">Men's Collection</p>
                        <button className="hero-half-btn">Shop Men</button>
                    </div>
                </div>

                <div className="hero-half">
                    <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/back2.jpeg" alt="PAWNED — Men's Collection" />
                    <div className="hero-half-content">
                        <p className="hero-half-label">From Pawn To Queen</p>
                        <h1 className="hero-half-title hero-half-title--italic">Pawnedora</h1>
                        <p className="hero-half-sub">Women's Collection</p>
                        <button className="hero-half-btn">Shop Women</button>
                    </div>
                </div>

            </div>
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