import { Link } from "react-router-dom";

const ShopSection = () => {
    return(
        <div className="shop-section-container">
            <div className="shop-women">
                <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/shop-women.webp" alt="pawnedora" />
                <Link to="/shop">
                <button>SHOP WOMEN</button>
                </Link>
            </div>

            <div className="shop-men">
                <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/shop-men.webp" alt="pawnedera" />
                <Link to="/shop">
                <button>SHOP MEN</button>
                </Link>
                
            </div>
        </div>
    )
}

export default ShopSection;