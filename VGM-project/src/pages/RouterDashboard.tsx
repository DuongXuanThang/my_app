import { Helmet } from 'react-helmet-async';
// sections
import RouterDashboard from '@/sections/RouterDashboard/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> RouterControll</title>
      </Helmet>

      <RouterDashboard />
    </>
  );
}
