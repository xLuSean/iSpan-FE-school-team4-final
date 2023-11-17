import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Scroll, ScrollControls } from '@react-three/drei';

import styles from '@/styles/homepage.module.css';
import BarBell from '@/components/hh/BarBell';
import Navbar from '@/components/layout/navbar';
import LogoIcon from '@/assets/logo';
import ScrollContent from '@/components/hh/ScrollContent';

export const scrollData = {
  section: null,
  setSection(n) {
    this.section = n;
  },
};

const clamp = (x, min, max) => Math.min(Math.max(x, min), max);

const HomePage = () => {
  const lenRef = useRef();
  const [sixDelta, setSixDelta] = useState(0);
  const [reachSix, setReachSix] = useState(false);

  useEffect(() => {
    lenRef.current.style.setProperty('--s', 0);
    let isFire = false;
    const trackPointer = (event) => {
      if (!lenRef.current) return;
      lenRef.current.style.setProperty(
        '--x',
        `${clamp(event.clientX - 50, 25, window.innerWidth - 200)}px`
      );
      lenRef.current.style.setProperty(
        '--y',
        `${clamp(event.clientY - 50, 60, window.innerHeight - 150)}px`
      );
    };

    window.addEventListener('mousemove', () => (isFire = true), { once: true });
    window.addEventListener('mousemove', trackPointer);

    const intervalId = window.setInterval(() => {
      if (!isFire) return;
      const lenScale = lenRef.current.style.getPropertyValue('--s');
      lenRef.current.style.setProperty(
        '--s',
        scrollData.section === '3&4' ? 0 : lenScale === '0.9' ? 1.1 : 0.9
      );
    }, 1000);

    setReachSix(localStorage.getItem('reach-six') || false);

    return () => {
      window.removeEventListener('mousemove', trackPointer);
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (sixDelta === 0) return;
    if (reachSix) return;
    setReachSix(true);
    localStorage.setItem('reach-six', true);
  }, [sixDelta]);

  return (
    <>
      <Navbar
        boxStyle={{
          top: sixDelta > 0 || reachSix ? 0 : '-60px',
          transition: '.5s',
        }}
      />
      <div ref={lenRef} className={styles['len']}></div>
      <div className={styles['main-box']}>
        <Canvas>
          <Environment preset="studio" />
          <ambientLight preset="rembrandt" intensity={2} />
          <directionalLight intensity={2} position={[50, 50, 50]} />
          <ScrollControls pages={12} damping={0.35}>
            {/* <Suspense> */}
            <BarBell
              scale={4}
              position={[-1, -0.75, 0.5]}
              rotation={[0, 1.55, -0.2]}
            />
            {/* </Suspense> */}
            <Scroll html>
              <ScrollContent reachSix={reachSix} setSixDelta={setSixDelta} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
      <div
        className={`${styles['logo-box']} ${styles['fade-in']} ${styles['go-transform']}`}
        style={{
          '--o': sixDelta,
        }}
      >
        <LogoIcon width={480} height={160} />
      </div>
    </>
  );
};

HomePage.getLayout = (page) => <>{page}</>;

export default HomePage;
