import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


export default function LoadingScreen() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'><Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /></div>
  )
}
