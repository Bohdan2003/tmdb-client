import { BrowserRouter } from 'react-router-dom';
import MUIProvider from './providers/MUIProvider';
import Layout from './components/shared/Layout';
import ToasterProvider from './providers/ToasterProvider';
import AppRoutes from './router/AppRoutes';

export default function App() {

  return (
    <MUIProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
        <ToasterProvider />
      </BrowserRouter>
    </MUIProvider>
  );
}
