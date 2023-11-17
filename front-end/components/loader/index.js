import { useEffect } from 'react';
import styles from './loader.module.css';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth/useAuth';

function Loader() {
  const router = useRouter();
  const { checkAuth, auth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    let toastId;
    if (!auth.isLosgin) {
      toastId = toast('跳轉中,請稍等');
    }
    const timeID = setTimeout(() => {
      router.push('/');
    }, 1500);
    return () => {
      clearTimeout(timeID);
      toast.dismiss(toastId);
    };
  }, [router]);
  return (
    <>
      <div className={`${styles['loader-p']}`}>
        {/* <div className="loader loader--spinningDisc"></div> */}
        {/* <div className="loader loader--audioWave"></div> */}
        {/* <div className="loader loader--snake"></div> */}
        <div
          className={`${styles['loader']} ${styles['loader--glisteningWindow']}`}
        ></div>
        {/* <div className="loader loader--circularSquare"></div> */}
      </div>
    </>
  );
}

export default Loader;
