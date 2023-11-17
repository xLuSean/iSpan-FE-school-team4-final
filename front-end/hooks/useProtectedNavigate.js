import { useAuth } from '@/context/auth/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useProtectedNavigate() {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.isLogin) {
      router.push('/member/login');
    }
  }, [auth.isLogin]);
  return;
}
