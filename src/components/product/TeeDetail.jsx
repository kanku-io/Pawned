import { supabase } from "../../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeeDetail = () => {
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

    if (loading) return <div className="tee-detail-status">Loading...</div>;
    if (error) return <div className="tee-detail-status">{error}</div>;

    return (
        <div className="tee-detail-container">
            <div className="tee-detail-main">
                <div className="tee-detail-gallery">
                    <div className="tee-detail-img-main">
                        <img src={data?.image_url} alt={data?.name ?? "pawned tee"} />
                    </div>

                    <div className="tee-detail-img-secondary">
                        <img src="https://yaqbejublndhrojxyukv.supabase.co/storage/v1/object/public/images/WhatsApp%20Image%202026-09-15%20at%2012.44.03.jpeg" alt={`${data?.name ?? "pawned tee"} back`} />
                    </div>
                </div>

                <div className="tee-detail-info">
                    <p className="tee-detail-category">{data?.category}</p>
                    <h1 className="tee-detail-name">{data?.name}</h1>
                    <p className="tee-detail-price">
                        {data && new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(data.price_cents / 100)}
                    </p>
                    <hr />
                    <p className="tee-detail-description">{data?.description}</p>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default TeeDetail;