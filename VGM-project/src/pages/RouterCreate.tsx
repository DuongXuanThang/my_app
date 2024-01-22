import { Helmet } from 'react-helmet-async';
// sections
import RouterCreate from '@/sections/RouterCreate/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> RouterControll</title>
      </Helmet>

      <RouterCreate />
    </>
  );
}
