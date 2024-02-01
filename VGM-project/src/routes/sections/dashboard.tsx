import { Suspense, lazy ,useEffect} from "react";
import { ROOTS } from "../path";
import React from "react";
import { Outlet,Navigate,useNavigate } from "react-router-dom";
import DashboardLayout from '@/layouts/dashboard'
import {LoadingScreen} from '@/components'
import { Button, Result } from 'antd';
import useCookie from '../../hooks/useCookie';

const RouterControl = lazy(()=> import('@/pages/RouterControl'))
const RouterCreate = lazy(()=> import('@/pages/RouterCreate'))
const RouterReportDetail= lazy(()=> import('@/pages/RouteReportDetail'))
const RouterProduct_SKU= lazy(()=> import('@/pages/RouterProduct_SKU'))
const RouterDetail = lazy(()=> import('@/pages/RouterDetail'))
const RouterEmployee = lazy(()=> import('@/pages/RouterEmployee'))
const SettingDMS = lazy(()=> import('@/pages/SettingDMS'))
// Định nghĩa các route của dashboard
export const dashboardRoutes = [
    {
        path: '/',
        element: (
            <DashboardLayout>
                <Suspense fallback={<LoadingScreen />}>
                    <Outlet />
                </Suspense>
            </DashboardLayout>
        ),
        children: [
            {
                index: true, element: <RouterReportDetail />
            },
            {
                path: 'router-employee', element: <ProtectedRoute />
            },
            // {
            //     path: 'router-employee', element: <RouterControl />
            // },
            {
                path: 'router-product_sku', element: <RouterProduct_SKU />
            },
            {
                path: 'router-control', element: <RouterEmployee />
            },
            {
                path: 'router-create', element: <RouterCreate />
            },
            {
                path: 'router-detail/:id', element: <RouterDetail />
            },
            {
                path: 'setting-dms', element: <SettingDMS />
            }
        ]
    },
    {
        path: 'error', // Đường dẫn cho trang error
        element: <ErrorPage /> // Sử dụng component ProtectedRoute cho trang error
    }
];
function ErrorPage() {
    const navigate = useNavigate();

    // Xử lý sự kiện click trên nút "Trang chủ"
    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <Result
            status="403"
            title="Error"
            subTitle="Xin lỗi, trang này không tồn tại hoặc bạn không có quyền truy cập."
            extra={<Button type="primary" onClick={handleHomeClick}>Trang chủ</Button>}
        />
    );
}

// Component kiểm tra quyền truy cập và điều hướng đến trang Error nếu cần
function ProtectedRoute() {
   
    const navigate = useNavigate();
    const { currentUser } = useCookie();
    console.log(currentUser);
        if (currentUser !== 'Administrator') {
            navigate('/error'); // Nếu không có quyền truy cập, điều hướng đến trang error
        }
    if (currentUser !== 'Administrator') {
        return null; // Trả về null để không render gì cả nếu không có quyền truy cập
    }
    return <RouterControl />;
}
