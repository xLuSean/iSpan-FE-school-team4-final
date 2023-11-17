import React, { useState } from 'react';
import Map from './map';
import Accrodin from './accordin';
import styles from './section-map.module.css';
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
export default function Index({ location, setLocation }) {
  return (
    <div className={`${styles.container}`}>
      <Map
        locations={locations}
        location={location}
        defaultCenter={locations[0].center}
      />
      <Accrodin
        locations={locations}
        location={location}
        setLocation={setLocation}
      />
    </div>
  );
}
