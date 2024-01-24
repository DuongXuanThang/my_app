import { Suspense, lazy } from "react";
import { ROOTS } from "../path";
import React from "react";
import { Outlet } from "react-router-dom";
import DashboardLayout from '@/layouts/dashboard'
import {LoadingScreen} from '@/components'


const RouterControl = lazy(()=> import('@/pages/RouterControl'))
const RouterCreate = lazy(()=> import('@/pages/RouterCreate'))
const RouterReportDetail= lazy(()=> import('@/pages/RouteReportDetail'))
const RouterProduct_SKU= lazy(()=> import('@/pages/RouterProduct_SKU'))
const RouterDetail = lazy(()=> import('@/pages/RouterDetail'))
const RouterEmployee = lazy(()=> import('@/pages/RouterEmployee'))
const SettingDMS = lazy(()=> import('@/pages/SettingDMS'))
export const dashboardRoutes = [
    {
        path: '/',
        element: (
            <DashboardLayout>            
                <Suspense fallback={<LoadingScreen/>}>
                    <Outlet/>
                </Suspense>
            </DashboardLayout>
        ),
        children: [
            {
                index: true,element: <RouterReportDetail/>
            },
            {
                path: 'router-control',element: <RouterControl/>
            },
            {
                path: 'router-product_sku',element: <RouterProduct_SKU/>
            },
            
            {
                path: 'router-employee ',element: <RouterEmployee/>
            },
            {
                path: 'router-create',element: <RouterCreate/>
            },
            {
                path: 'router-detail/:id',element: <RouterDetail/>
            },
            {
                path: 'setting-dms',element: <SettingDMS/>
            }
        ]
    }
]