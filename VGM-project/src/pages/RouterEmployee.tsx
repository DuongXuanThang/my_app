import { Helmet } from 'react-helmet-async';
// sections
import RouterEmployee from '@/sections/RouterEmployee/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> RouterControll</title>
      </Helmet>

      <RouterEmployee />
    </>
  );
}
