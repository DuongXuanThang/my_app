import { Helmet } from 'react-helmet-async';
// sections
import SettingDMS from '@/sections/SettingDMS/view';
import React from 'react';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> SettingDMS</title>
      </Helmet>

      <SettingDMS />
    </>
  );
}
