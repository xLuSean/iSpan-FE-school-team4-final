import '@/styles/globals.css';

import Layout from '@/components/layout/layout';
import { Toaster } from 'react-hot-toast';

import MainTheme from '@/context/Theme/main-theme';
import { AuthProvider } from '@/context/auth/useAuth';

const defaultLayout = (page) => <Layout>{page}</Layout>;

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || defaultLayout;
  return (
    <AuthProvider>
      {getLayout(
        <MainTheme>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                backgroundColor: 'var(--deepgrey)',
                color: 'white',
                boxShadow: '0 0 20px #333',
              },
            }}
          />
          <Component {...pageProps} />
        </MainTheme>
      )}
    </AuthProvider>
  );
}
