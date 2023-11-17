import { useEffect, useRef, useState } from 'react';
import { pointer } from 'd3';
import { geoPath, geoMercator } from 'd3-geo';
import { select } from 'd3-selection';
import { motion } from 'framer-motion';
// import * as topojson from 'topojson-client';
import * as topojson from 'topojson';
import data from '@/assets/taiwangeo.json';
import styles from './space-find-component.module.css';
import GymTypeSelect from './gym-type-select';
import axios from 'axios';
import {
  Box,
  Dialog,
  DialogContent,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CUIButton from '../customUI/cui-button';
import { GoogleQrCode } from './GoogleQrCode';
export default function SpaceFindComponent() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [gymData, setGymData] = useState([]);
  const [gymType, setgymType] = useState('棒球場');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [qrCodeAddress, setQrCodeAddress] = useState('');
  const searchGymData = async (city) => {
    setGymData(() => {
      return [];
    });
    setLoading(true);
    try {
      city = city.replace('台', '臺');

      const res = await axios.get(
        `https://iplay.sa.gov.tw/api/GymSearchAllList?$format=application/json;odata.metadata=none&City=${city}&GymType=${gymType}`,
        { withCredentials: false }
      );

      /* res.data.map(async (el, i) => {
        try {
          await fetch(el.Photo1, { mode: 'no-cors' });
        } catch (err) {
            res.data.forEach((el, i2) => {
            if (i === i2) {
              res.data[i].Photo1 = '';
            }
        }
      }); */

      setGymData(() => res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    hide: {
      opacity: 0,
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    hide: { opacity: 0 },
  };
  const renderMap = () => {
    let countyname = '';
    const { width } = containerRef.current.getBoundingClientRect();

    const countries = topojson.feature(data, data.objects.layer1);
    // const projection = geoMercator().center([123, 24]).scale(5000);
    // const projection = geoMercator().center([121.5173399, 25.0475613]).scale(50000);

    const projection = geoMercator()
      .center([123, 24])
      .fitSize([(width * 1.6) / 2, (width * 1.5) / 2], countries);
    //原始版
    // const projection = geoMercator().center([124, 24.097239]).fitSize([width / 3, width / 3], countries);
    // const projection = geoMercator().center([121.5, 25.03]).scale(30000);
    const geoGenerator = geoPath().projection(projection);
    const svg = select(svgRef.current); //先選中svg
    svg.on('click', function (e, d) {
      setGymData([]);
      setLoading(false);
      countyname = '';
      select(this)
        .select('g')
        .selectAll('path')
        .transition()
        .attr('transform', 'translate(0 , 0)')
        .style('fill', '#0a0a0a')
        .style('stroke', 'white');
    });
    svg
      .attr('width', (width * 1.6) / 2)
      .attr('height', (width * 1.5) / 2) //強制定義寬高
      .attr('viewbox', `0 0 ${(width * 1.6) / 2} ${(width * 1.5) / 2}`)
      .append('g')
      .selectAll('path') //強制選中svg的內側()雖然還沒有元件被建立
      .data(countries.features) //綁定資料
      .join('path') //目前還在內層selectALL當中 iterate元素們並加上path
      .attr('class', 'country') //加上class country
      .attr('d', (feature) => {
        return geoGenerator(feature);
      }) //在每個個別的元素上加上自己的d和路徑數據
      .style('fill', '#0a0a0a') //填滿黑色
      .style('stroke', 'white') //填滿白色
      .style('cursor', 'pointer') //游標提示
      .on('click', function (e, d) {
        e.stopPropagation();
        if (d.properties.COUNTYNAME !== countyname) {
          searchGymData(d.properties.COUNTYNAME);
          countyname = d.properties.COUNTYNAME;
          console.log(width);
          svg
            .selectAll('path')
            .style('fill', '#0a0a0a')
            .style('stroke', 'white');
          select(this).style('fill', '#ea0000').style('stroke', '#ea0000');
          svg
            .transition()
            .selectAll('path')
            .attr(
              'transform',
              `translate(-${pointer(e)[0] * 1} , ${
                -pointer(e)[1] * 2.1 + (width * 1.5) / 2 / 1.5
              }) scale(2)`
            );
        } else {
          setGymData([]);
          setLoading(false);
          countyname = '';
          svg
            .selectAll('path')
            .style('fill', '#0a0a0a')
            .style('stroke', 'white');
          svg
            .select('g')
            .selectAll('path')
            .transition()
            .attr('transform', 'translate(0 , 0)');
        }
      });
  };

  const cleanMap = () => {
    const svg = select(svgRef.current);
    svg.selectAll('*').remove();
    setGymData([]);
    setShowDialog(false);
  };
  const handleDialogShow = () => {
    setShowDialog(true);
  };
  const handleDialogClose = () => {
    setShowDialog(false);
    setQrCodeAddress('');
  };
  useEffect(() => {
    renderMap();
    /* searchGymData('臺北市');
    const taipei = select(
      '#__next > main > div > div > div > div > div.space-find-component_map-container__JLOCn > svg > g > path:nth-child(3)'
    );
    console.log(taipei);
    taipei
      .transition()
      .selectAll('path')
      .attr(
        'transform',
        `translate(-${pointer(this)[0] * 1} , -${
          pointer(this)[1] * 0.8
        }) scale(2)`
      ); */
    window.addEventListener('resize', cleanMap);
    window.addEventListener('resize', renderMap);
    return () => {
      cleanMap();
      window.removeEventListener('resize', cleanMap);
      window.removeEventListener('resize', renderMap);
    };
  }, []);
  useEffect(() => {
    cleanMap();
    renderMap();
  }, [gymType]);

  return (
    <div className={`${styles['section-container']}`}>
      <div className={`${styles['content-container']}`}>
        <GymTypeSelect
          value={gymType}
          setgymType={setgymType}
          setGymData={setGymData}
        />
        <div className={`${styles['map-container']}`} ref={containerRef}>
          <svg className={`${styles['map-svg']}`} ref={svgRef}></svg>
        </div>
        {loading ? (
          <motion.div
            className={`${styles['info']}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hide"
          >
            {Array(8)
              .fill(1)
              .map((el, i) => (
                <Paper
                  key={i}
                  component={motion.div}
                  className={`${styles['info-card']}`}
                  variants={item}
                >
                  <Box className={`${styles['skeleton-word-wrapper']}`}>
                    <Box>
                      <Skeleton
                        variant="text"
                        className={`${styles['skeleton-title']}`}
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        className={`${styles['skeleton-content1']}`}
                      />
                      <Skeleton
                        variant="text"
                        className={`${styles['skeleton-content2']}`}
                      />
                    </Box>
                    <Box>
                      <Skeleton
                        variant="text"
                        className={`${styles['skeleton-end']}`}
                      />
                    </Box>
                  </Box>
                  <Box className={`${styles['skeleton-img-wrapper']}`}>
                    <Skeleton
                      variant="reactangular"
                      className={`${styles['skeleton-img']}`}
                    />
                  </Box>
                </Paper>
              ))}
          </motion.div>
        ) : gymData.length > 0 ? (
          <motion.div
            className={`${styles['info']}`}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hide"
          >
            {gymData.map((el) => {
              const { GymID, Name, OperationTel, Address, Photo1, LatLng } = el;
              return (
                <Paper
                  component={motion.div}
                  className={`${styles['info-card']}`}
                  key={GymID}
                  variants={item}
                >
                  <Box className={`${styles['info-content']}`}>
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: '10px', fontWeight: '900' }}
                    >
                      {Name}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <PhoneAndroidIcon />
                      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                        {OperationTel}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <LocationOnIcon />
                      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                        {Address}
                      </Typography>
                    </Box>
                    <CUIButton
                      color={'steel_grey'}
                      sx={{
                        '@media (max-width: 500px)': {
                          width: '100%',
                          padding: '5px 5px 4px 5px',
                          marginTop: '5px',
                        },
                      }}
                      onClick={() => {
                        handleDialogShow();
                        setQrCodeAddress(Address);
                      }}
                    >
                      點我導航
                    </CUIButton>
                  </Box>
                  <Box className={`${styles['img-wrapper']}`}>
                    <img
                      // crossOrigin="anonymous"
                      src={Photo1}
                      alt="場館圖片"
                    />
                  </Box>
                </Paper>
              );
            })}
            <Dialog open={showDialog} onClose={handleDialogClose}>
              <DialogContent>
                {qrCodeAddress ? (
                  <GoogleQrCode
                    value={`https://www.google.com/maps/search/${qrCodeAddress}`}
                  />
                ) : (
                  <Typography>請稍後再試</Typography>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>
        ) : undefined}
      </div>
    </div>
  );
}
