import { Helmet } from 'react-helmet-async';
// sections
import Product_SKU from '@/sections/RouterProduct_SKU/view';

// ----------------------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title>Sản phẩm</title>
      </Helmet>
      <Product_SKU />
    </>
  );
}
