import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { EmailVerification } from '@/pages/EmailVerification';
import { InvoiceList } from '@/pages/InvoiceList';
import { InvoiceNew } from '@/pages/InvoiceNew';
import { InvoiceDetail } from '@/pages/InvoiceDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/invoices" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/verify-email',
    element: <EmailVerification />,
  },
  {
    path: '/invoices',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <InvoiceList />,
      },
      {
        path: 'new',
        element: <InvoiceNew />,
      },
      {
        path: ':id',
        element: <InvoiceDetail />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/invoices" replace />,
  },
],
{
  future: {
    v7_startTransition: true,
  },
});
