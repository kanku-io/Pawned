import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";

const HatDetail = () => {
    const { slug } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                setError('Could not fetch data');
                console.log(error);
                setData(null);
                setLoading(false);
            }

            if (data) {
                setLoading(false);
                setError(null);
                setData(data);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) return <div className="hat-detail-status">Loading...</div>;
    if (error) return <div className="hat-detail-status">{error}</div>;

    return (
        <div className="hat-detail-container">
            <div className="hat-detail-main">
                <div className="hat-detail-img">
                    <img src={data?.image_url} alt={data?.name ?? "pawned hat"} />
                </div>

                <div className="hat-detail-info">
                    <p className="hat-detail-category">{data?.category}</p>
                    <h1 className="hat-detail-name">{data?.name}</h1>
                    <p className="hat-detail-price">
                        {data && new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(data.price_cents / 100)}
                    </p>
                    <hr />
                    <p className="hat-detail-description">{data?.description}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default HatDetail;