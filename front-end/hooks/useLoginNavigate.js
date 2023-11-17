import { useAuth } from '@/context/auth/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function useLoginNavigate() {
  const { auth } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (auth.isLogin) {
      router.push('/');
    }
  }, [auth.isLogin]);
  return;
}
