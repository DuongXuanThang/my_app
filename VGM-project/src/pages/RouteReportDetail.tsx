import { Helmet } from 'react-helmet-async';
// sections
import ReportDetail from '@/sections/RouterReportDetail/view';

// ----------------------------------------------------------------------
export default function Page() {
  return (
    <>
      <Helmet>
        <title>BÁO CÁO</title>
      </Helmet>
      <ReportDetail />
    </>
  );
}
