import { Bar, PlateXL, PlateLG, PlateMD } from './models';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

const BarBell = (props) => {
  const barbellRef = useRef();
  const plateL1Ref = useRef();
  const plateL2Ref = useRef();
  const plateL3Ref = useRef();
  const plateL4Ref = useRef();
  const plateL5Ref = useRef();
  const plateL6Ref = useRef();
  const plateR1Ref = useRef();
  const plateR2Ref = useRef();
  const plateR3Ref = useRef();
  const plateR4Ref = useRef();
  const plateR5Ref = useRef();
  const plateR6Ref = useRef();
  const timeLineRef = useRef();

  const scroll = useScroll();

  useFrame(() => {
    timeLineRef.current.seek(scroll.offset * timeLineRef.current.duration());
  });

  useLayoutEffect(() => {
    timeLineRef.current = gsap.timeline();

    timeLineRef.current.to(
      barbellRef.current.position,
      {
        duration: 2,
        ease: 'power1.out',
        x: 0,
        z: -1,
      },
      '+=3.5'
    );

    timeLineRef.current.to(
      barbellRef.current.rotation,
      {
        duration: 10,
        ease: 'power1.inOut',
        y: Math.PI * 4,
        z: 0,
      },
      '>'
    );

    timeLineRef.current.to(
      barbellRef.current.position,
      {
        duration: 6,
        ease: 'power1.out',
        y: 0.1,
        z: 5,
      },
      '>'
    );

    timeLineRef.current.from(
      null,
      {
        duration: 4,
      },
      '+=1.5'
    );

    timeLineRef.current.from(
      plateL6Ref.current.position,
      {
        duration: 3.5,
        x: -1,
      },
      0
    );

    timeLineRef.current.from(
      plateL5Ref.current.position,
      {
        duration: 2.5,
        x: -1,
      },
      0
    );

    timeLineRef.current.from(
      plateL4Ref.current.position,
      {
        duration: 2,
        x: -1,
      },
      0
    );

    timeLineRef.current.from(
      plateL3Ref.current.position,
      {
        duration: 1.5,
        x: -1,
      },
      0
    );

    timeLineRef.current.from(
      plateL2Ref.current.position,
      {
        duration: 1,
        x: -1,
      },
      0
    );
  }, []);

  return (
    <group {...props} ref={barbellRef}>
      <Bar />
      <group ref={plateL1Ref}>
        <PlateXL position={[-0.68, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateL2Ref}>
        <PlateXL position={[-0.72, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateL3Ref}>
        <PlateXL position={[-0.76, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateL4Ref}>
        <PlateXL position={[-0.8, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateL5Ref}>
        <PlateLG position={[-0.865, 0, 0]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateL6Ref}>
        <PlateMD position={[-0.915, 0, 0.28]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateR1Ref}>
        <PlateXL position={[0.72, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateR2Ref}>
        <PlateXL position={[0.76, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateR3Ref}>
        <PlateXL position={[0.8, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateR4Ref}>
        <PlateXL position={[0.84, 0, -0.4]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateR5Ref}>
        <PlateLG position={[0.85, 0, 0]} rotation={[0, 1.5, 0]} />
      </group>
      <group ref={plateR6Ref}>
        <PlateMD position={[0.865, 0, 0.28]} rotation={[0, 1.5, 0]} />
      </group>
    </group>
  );
};

export default BarBell;
