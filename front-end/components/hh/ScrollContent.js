import dynamic from 'next/dynamic'; //因為server端不會有window物件，有必要在client端的時候才進行渲染。

import LogoIcon from '@/assets/logo';
import styles from '@/styles/homepage.module.css';
import drawBorder from '@/styles/drawBorder.module.css';
import Image from 'next/image';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

import { scrollData } from '@/pages/index';

const SectionMap = dynamic(
  () => import('@/components/index-page/section-map'),
  {
    ssr: false,
  }
);

const locations = [
  {
    name: '台北',
    center: [25.033913, 121.5412242],
    address: '台北市大安區復興南路一段390號2樓',
    tel: 'Tel : (02) 6631-6588',
    transportation:
      '淡水線搭乘到大安捷運站4號或6號出口,淡水線搭乘到大安捷運站1號出口',
    img: 'taipei.jpg',
  },
  {
    name: '台中',
    center: [24.1505394, 120.6325709],
    address: '台中市南屯區公益路二段51號18樓',
    tel: 'Tel : (04) 2326-5860',
    transportation:
      '中壢火車站 → 中壢客運17路 (中壢 – 高鐵 青埔站)即可到達聖德基督學院',
    img: 'taichung.jpg',
  },
  {
    name: '高雄',
    center: [22.6282249, 120.2908495],
    address: '高雄市前金區中正四路211號8號樓之1',
    tel: 'Tel : (07) 969-9885',
    img: 'kaohsiung.jpg',
  },
];

const productData = {
  6: {
    x: 125,
    y: 1,
    s: 1.1,
  },
  5: {
    x: 100,
    y: 1,
    s: 1.1,
  },
  4: {
    x: 95,
    y: 1,
    s: 1,
  },
  3: {
    x: 105,
    y: 1,
    s: 1.2,
  },
  2: {
    x: 60,
    y: 1,
    s: 1.1,
  },
  1: {
    x: 100,
    y: 1,
    s: 0.9,
  },
  0: {
    x: 50,
    y: 1,
    s: 1.3,
  },
};

const ShopTemplate = ({ className, shopSectionDelta }) => {
  return (
    <div className={className}>
      <h2
        className={styles['go-transform']}
        style={{
          '--x': `${shopSectionDelta * 200}rem`,
        }}
      >
        線上商城
      </h2>
      <div className={styles['card-box']}>
        {[
          'fd03901-removebg-preview.png',
          'SE_00402-removebg-preview.png',
          'SE_00203-removebg-preview.png',
          'fd04101-removebg-preview.png',
          'fd00801-removebg-preview.png',
          'st0120103-removebg-preview.png',
          'eq_kettlebell_type01_080_03-removebg-preview.png',
        ].map((img, index) => (
          <div
            key={index}
            className={`${styles['img-box']} ${styles['go-transform']}`}
            style={{
              '--x': `${shopSectionDelta * productData[index]['x']}rem`,
              '--y': `${shopSectionDelta * productData[index]['y']}rem`,
              '--s': `${productData[index]['s']}`,
            }}
          >
            <Image
              priority
              sizes="30vw"
              fill
              alt="product-img"
              src={`/homepage-img/${img}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ScrollContent = ({ reachSix, setSixDelta }) => {
  const scroll = useScroll();
  const [draw, setDraw] = useState(false);
  const [sectionTwoDelta, setSectionTwoDelta] = useState(0);
  const [imgSectionDelta, setImgSectionDelta] = useState(0);
  const [shopSectionDelta, setShopSectionDelta] = useState(0);
  const [location, setLocation] = useState(locations[0]);

  useFrame(() => {
    setSectionTwoDelta(scroll.range(0.5 / 12, 1 / 12));
    const inSectionTwo = scroll.range(2 / 12, 1 / 12);
    setDraw(inSectionTwo < 1 && inSectionTwo > 0);

    const inSectionThree =
      scroll.range(2 / 12, 1 / 12) < 1 && scroll.range(2 / 12, 1 / 12) > 0;
    const inSectionFour =
      scroll.range(5 / 12, 2 / 12) < 1 && scroll.range(5 / 12, 2 / 12) > 0;
    scrollData.setSection(inSectionThree || inSectionFour ? '3&4' : null);

    const inImgSection = scroll.range(1.5 / 12, 1.3 / 12);
    setImgSectionDelta(inImgSection);

    const inSectionFive = scroll.range(3.875 / 12, 2.5 / 12);
    setShopSectionDelta(inSectionFive);
    scroll.horizontal = inSectionFive < 1 && inSectionFive > 0;

    setSixDelta(Math.floor(scroll.range(9.5 / 12, 2 / 12) * 100) * 0.01);
  });

  return (
    <>
      <section className={styles['section-one']}>
        {!reachSix && (
          <div className={styles['logoBox']}>
            <LogoIcon width={240} height={80} />
          </div>
        )}
        <h1>為你的身體築一座堡壘</h1>
        <ShopTemplate
          className={styles['section-shop']}
          shopSectionDelta={shopSectionDelta}
        />
        <div
          className={`${styles['section-one-map']} ${styles['go-transform']}`}
          style={{
            '--x': `${shopSectionDelta * 134.5}vw`,
          }}
        >
          <h2>全台據點</h2>
          <SectionMap location={location} setLocation={setLocation} />
        </div>
      </section>
      <section className={styles['section-two']}>
        <h1
          className={`${styles['fade-in']}`}
          style={{
            '--o': `${sectionTwoDelta}`,
          }}
        >
          全台灣最大的複合式健身房
        </h1>
      </section>
      <section
        className={`${styles['section-three']} ${styles['fade-in']}`}
        style={{
          '--o': `${imgSectionDelta + 0.15}`,
        }}
      >
        <div
          className={`${styles['block']} ${drawBorder[draw ? 'draw-ccw' : '']}`}
        >
          <div
            className={`${styles['img-box']} ${styles['go-transform']}`}
            style={{
              '--x': `${imgSectionDelta * -2.5}rem`,
              '--y': `${imgSectionDelta * 2}rem`,
            }}
          >
            <Image
              priority
              fill
              sizes="45vw"
              className={`${styles['go-transform']}`}
              style={{
                '--s': `${imgSectionDelta / 2 + 1}`,
                '--o': `${imgSectionDelta}`,
              }}
              alt="coaches-img"
              src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/coach/coachs-img/nick.jpg`}
            />
          </div>
          <div
            className={`${styles['img-box']} ${styles['go-transform']}`}
            style={{
              '--x': `${imgSectionDelta * 10}rem`,
              '--y': `${imgSectionDelta * 10}rem`,
            }}
          >
            <Image
              priority
              fill
              sizes="45vw"
              className={`${styles['go-transform']}`}
              style={{
                '--s': `${imgSectionDelta / 2 + 1}`,
              }}
              alt="coaches-img"
              src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/coach/coachs-img/emily.jpg`}
            />
          </div>
          <h2 style={{ '--r': `${imgSectionDelta * 10}rem` }}>專業師資</h2>
        </div>
        <div
          className={`${styles['block']} ${drawBorder[draw ? 'draw-cw' : '']}`}
        >
          <div
            className={`${styles['img-box']} ${styles['go-transform']}`}
            style={{
              '--x': `${imgSectionDelta * 9}rem`,
              '--y': `${imgSectionDelta * 2}rem`,
            }}
          >
            <Image
              priority
              fill
              sizes="45vw"
              className={`${styles['go-transform']}`}
              style={{
                '--s': `${imgSectionDelta / 2 + 1}`,
                '--o': `${imgSectionDelta}`,
              }}
              alt="coaches-img"
              src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/female-body-sculpting.jpg`}
            />
          </div>
          <div
            className={`${styles['img-box']} ${styles['go-transform']}`}
            style={{
              '--x': `${imgSectionDelta * -3.5}rem`,
              '--y': `${imgSectionDelta * 10}rem`,
            }}
          >
            <Image
              priority
              fill
              sizes="45vw"
              className={`${styles['go-transform']}`}
              style={{
                '--s': `${imgSectionDelta / 2 + 1}`,
              }}
              alt="coaches-img"
              src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/dead-lift.jpg`}
            />
          </div>
          <h2 style={{ '--l': `${imgSectionDelta * 10}rem` }}>多元課程</h2>
        </div>
      </section>
      <ShopTemplate
        className={styles['section-four']}
        shopSectionDelta={shopSectionDelta}
      />
      <section className={styles['section-empty']}></section>
      <section className={styles['section-five']}>
        <h2>全台據點</h2>
        <SectionMap location={location} setLocation={setLocation} />
      </section>
    </>
  );
};

export default ScrollContent;
