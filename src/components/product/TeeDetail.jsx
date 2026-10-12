import ProductPage from "./ProductPage";
import { TEE_SIZES, TEE_BACK_IMAGE } from "../../lib/config";

const TeeDetail = () => <ProductPage sizes={TEE_SIZES} extraImages={[TEE_BACK_IMAGE]} />;

export default TeeDetail;