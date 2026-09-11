import { supabase } from "../lib/supabaseClient";
import { useState } from "react";
import { useEffect } from "react";

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

    return(
        <div className="shopping-section">


           <div className="section-header">
            <p className="concept">concept 001 - pawned era</p>
            <h3>just the beginning</h3>
            <p className="origins">Origins</p>
           </div>


           <div className="product-cards-001">
            {data.map((product) => (
            <div key={product.id} className="product-card">
                <div className="product-card-img">
                    <img src={product.image_url} alt="pawned-product" />
                </div>
                <div className="product-info">
                    <p>{product.name}</p>
                    <p>{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(product.price_cents / 100)}</p>
                </div>
            </div>
           ))}
           </div>
           
        </div>
    )
}

export default Shop;