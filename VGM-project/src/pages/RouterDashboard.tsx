import { Helmet } from 'react-helmet-async';
// sections
import RouterDashboard from '@/sections/RouterDashboard/view';

// ----------------------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title>BÁO CÁO</title>
      </Helmet>
      <RouterDashboard />
    </>
  );
}
