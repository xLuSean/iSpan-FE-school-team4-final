import React, { Fragment } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import styles from './section-map.module.css';
export default function Accordin({ locations, setLocation, location }) {
  const handleChange = (panel) => () => {
    setLocation(locations.find((el) => el.name === panel));
  };
  return (
    <div className={`${styles['accordin-container']}`}>
      {locations.map((el, i) => (
        <Accordion
          key={i}
          expanded={location.name === el.name}
          onChange={handleChange(el.name)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`panel${i}-header`}
          >
            <Typography className={`${styles.title}`}>
              健身堡壘{el.name}館
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={`${styles.detail}`}>
            {el?.transportation &&
              el?.transportation.split(',').map((el2, i2) => (
                <Fragment key={i2 + 'transportation'}>
                  <Typography>
                    <LocationOnIcon
                      fontSize="small"
                      style={{ marginRight: '5px' }}
                    />
                    {el2}
                  </Typography>
                </Fragment>
              ))}
            <Typography>
              <LocalPhoneIcon fontSize="small" style={{ marginRight: '5px' }} />
              {el.tel}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
