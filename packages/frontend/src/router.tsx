import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Layout } from '@/components/Layout';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { EmailVerification } from '@/pages/EmailVerification';
import { InvoiceList } from '@/pages/InvoiceList';
import { InvoiceNew } from '@/pages/InvoiceNew';
import { InvoiceDetail } from '@/pages/InvoiceDetail';
import { Settings } from '@/pages/Settings';

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
    // Protected area wrapped by Layout (header/footer present)
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/invoices',
        index: true,
        element: <InvoiceList />,
      },
      {
        path: '/invoices/new',
        element: <InvoiceNew />,
      },
      {
        path: '/invoices/:id',
        element: <InvoiceDetail />,
      },
      {
        path: '/settings',
        element: <Settings />,
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
