// @mui

import React from "react";
import {Link} from 'react-router-dom'
import { Button, DatePicker } from 'antd';
// ----------------------------------------------------------------------

export default function RouterControl() {

  return (
    <>
        RouterControl
        <Link to='/router-control' >Click</Link>
        <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
    </>
  );
}
