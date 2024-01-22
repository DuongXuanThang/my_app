import { Helmet } from 'react-helmet-async';
// sections
import RouterDetail from '@/sections/RouterDetail/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> RouterControll</title>
      </Helmet>

      <RouterDetail />
    </>
  );
}
