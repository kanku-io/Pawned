import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Shop() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const {data, error} = await supabase
            .from('products')
            .select('*')

            if (error) {
                setError('Could not fetch data')
                console.log(error)
                setData(null)
                setLoading(false)
            }

            if (data){
                setLoading(false)
                setData(data)
                setError(null)  
            }
        }

        fetchData()
    }, [])


    const categoryToPath = {
    'Tees': 'tees',
    'Accessories': 'hats',
};

    return(
        <div className="shopping-section">


           <div className="section-header">
            <p className="concept">pawned era</p>
            <h3>just the beginning</h3>
            <p className="origins">Origins</p>
           </div>


           <div className="product-cards-001">
            {data.map((product) => (
            <div key={product.id} className="product-card">
               <Link to={`/shop/${categoryToPath[product.category] ?? 'tees'}/${product.slug}`} className="product-card">
    <div className="product-card-img">
        <img src={product.image_url} alt="pawned-product" />
    </div>
    <div className="product-info">
        <p className="product-name">{product.name}</p>
        <p className="product-category">{product.category}</p>
        <p className="product-price">{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(product.price_cents / 100)}</p>
    </div>
</Link>
            </div>
           ))}
           </div>

           <hr/>

           <div className="pawned-checkmate">
            <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/pawned-checkmate.jpeg" alt="pawned-checkmate" />
            <p className="pawned-checkmate-text">pawned: checkmate</p>
            <h3>coming soon</h3>
           </div>

           <Footer/>
           
        </div>

        
    )
}

export default Shop;