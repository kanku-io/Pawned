const Footer = () => {
    return (
        <div className="footer-container">
        <div className="parent">
            <div className="div1">
             <h1>pawned</h1>
             <p>Streetwear built for those who move different. Based in Johannesburg.</p>

              <div className="social-media-btns">
                <p></p>
                <p></p>
              </div>

            </div>

            <div className="div2">
              <p>Shop</p>

              <div className="shop-sub">
                <ul>
                    <li>New Arrivals</li>
                    <li>Best Sellers</li>
                    <li>Sale</li>
                </ul>
              </div>
            </div>

            <div className="div3">
              <p>Help</p>

              <div className="help-sub">
                <ul>
                    <li>Contact</li>
                    <li>Shipping</li>
                </ul>
              </div>
            </div>

            <div className="div4">
                <p>Stay Updated</p>

                <input type="text" placeholder="Your Email"/>
                <button>Subscribe</button>
            </div>

        </div>

        <hr />
         
         <div className="lower-footer">
            <p>© 2026 PAWNED. All rights Reserved.</p>
            <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Refund Policy</li>
            </ul>
         </div>
        
        </div>
    )
}

export default Footer;