import React from 'react';
import { icon, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './section-map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import ChangeView from './change-view';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';

const ICON = divIcon({
  html: `<svg fill="#EA0000" width="50" height="50" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
  width="800px" height="800px" viewBox="0 0 485.535 485.535"
  xml:space="preserve">
<g class="custom_map_marker">
 <g id="_x35__13_">
   <g>
     <path d="M55.465,123.228c-15.547,0-28.159,12.608-28.159,28.161v56.673C11.653,211.908,0,225.928,0,242.765
       c0,16.842,11.652,30.861,27.306,34.707v56.666c0,15.555,12.612,28.16,28.159,28.16c15.546,0,28.16-12.605,28.16-28.16V151.389
       C83.625,135.837,71.011,123.228,55.465,123.228z"/>
     <path d="M334.498,65.278c-23.092,0-41.811,18.719-41.811,41.812v93.864h-12.801h-60.585h-19.625l-6.827-0.163V107.09
       c0-23.092-18.72-41.812-41.813-41.812c-23.091,0-41.812,18.719-41.812,41.812v271.355c0,23.093,18.721,41.812,41.812,41.812
       c23.094,0,41.813-18.719,41.813-41.812v-93.653c0,0,4.501-0.211,6.827-0.211h19.625h60.585h12.801v93.864
       c0,23.093,18.719,41.812,41.811,41.812c23.094,0,41.812-18.719,41.812-41.812V107.089
       C376.311,83.998,357.592,65.278,334.498,65.278z"/>
     <path d="M458.229,208.062v-56.673c0-15.552-12.613-28.161-28.158-28.161c-15.547,0-28.16,12.608-28.16,28.161v182.749
       c0,15.555,12.613,28.16,28.16,28.16c15.545,0,28.158-12.605,28.158-28.16v-56.666c15.654-3.846,27.307-17.865,27.307-34.707
       C485.535,225.927,473.883,211.908,458.229,208.062z"/>
   </g>
 </g>
</g>
</svg>`,
  className: 'svg-icon',
  iconSize: [50, 50],
});
export default function Map({ defaultCenter, location, locations }) {
  return (
    <div className={`${styles.wrapper}`}>
      <MapContainer
        className={`${styles['map-container']}`}
        center={defaultCenter}
        zoom={18}
      >
        <ChangeView center={location.center} zoom={18} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></TileLayer>
        {locations.map((el, i) => (
          <Marker
            zIndex={999}
            key={i}
            position={el.center}
            eventHandlers={{
              click: (event) => {
                console.log(event.target._icon);
                event.target.openPopup();
              },
              mouseover: (event) => {
                console.log(event.target._icon);
                event.target.openPopup();
              },
            }}
            icon={ICON}
          >
            <Popup autoClose closeOnClick>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  position: 'relative',
                  margin: '15px 0',
                }}
              >
                <Image
                  fill
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                  src={`/main-page/${el.img}`}
                  alt={el.name}
                />
              </div>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                健身堡壘{el.name}館
              </Typography>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
