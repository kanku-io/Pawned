import { Link } from "react-router-dom";
import Footer from "../components/Footer";

// EDIT: confirm every line below matches how the business really ships.
const SECTIONS = [
  {
    title: "How it works",
    body: "Once your payment is confirmed, we pack your order and hand it to our courier. You do not need to collect anything from us.",
  },
  {
    title: "Processing time",
    body: "Orders are packed within 1 to 3 business days after payment.",
  },
  {
    title: "Delivery time",
    body: "Courier delivery usually takes 2 to 7 business days, depending on where you live. Remote areas can take longer.",
  },
  {
    title: "Delivery address",
    body: "Couriers deliver to a street address and need someone to receive the parcel. Please give an address where someone can sign for it. We cannot deliver to PO boxes.",
  },
  {
    title: "Tracking",
    body: "When the courier collects your order we will email you the tracking details.",
  },
  {
    title: "Shipping cost",
    body: "The shipping cost for your order is shown at checkout before you pay.",
  },
];

export default function Shipping() {
  return (
    <div className="info-page">
      <div className="info-inner">
        <h1>Shipping</h1>
        <p className="info-lead">Every PAWNED order is delivered by courier, straight to your door.</p>

        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}

        <section>
          <h2>Late or damaged parcel</h2>
          <p>
            If your parcel is late or arrives damaged, <Link to="/contact">contact us</Link> with your
            order number and we will sort it out.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}