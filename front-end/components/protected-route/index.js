'use client';
import { useAuth } from '@/context/auth/useAuth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../loader';
// export default function ProtectedRouteWrapper({ children }) {
//   const router = useRouter();
//   const { auth, authLoading } = useAuth();
//   if (typeof window !== 'undefined') {
//     if (auth.isLogin) {
//       return children;
//     }
//     if (!auth.isLogin && !authLoading) {
//       router.push('/member/login');
//       return;
//     } else {
//       return (
//         <>
//           {!authLoading && auth.isLogin ? children : <div>loading.....</div>};
//         </>
//       );
//     }
//   }
// }
export default function ProtectedRouteWrapper({ children }) {
  const router = useRouter();
  const { auth } = useAuth();
  const [firstRender, setFirstRender] = useState(false);
  /*  useEffect(() => {
    if (!auth.isLogin && firstRender) {
      router.push('/member/login');
    }
    return () => {
      setFirstRender(true);
    };
  }, [router, auth.isLogin]); */

  return <>{!auth.isLogin ? <Loader /> : children}</>;
}
