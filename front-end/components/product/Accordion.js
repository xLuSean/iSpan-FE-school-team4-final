import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import styles from '@/styles/product.module.css';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from '@mui/material';
import { useRouter } from 'next/router';

export default function BasicAccordion({ page }) {
  const router = useRouter();
  return (
    <>
      <div className={`${styles['BasicAccordion']}`}>
        <Accordion
          expanded={page === '1' ? true : false}
          className={`${styles[('Accordion:root', 'Accordion:before')]}`}
          sx={{
            '&.MuiAccordion-root::before': {
              bgcolor: 'transparent',
            },
            '&.MuiAccordion-root': {
              bgcolor: 'transparent',
              color: '#ffffff',
            },
            bgColor: 'red',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            className={`${styles['Accordion:root']}`}
            // expandIcon={<ExpandMoreIcon />}
            sx={{
              bgroundColor: 'red',
              border: 'none',
              boxShadow: 'none',
            }}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Link
              href="1"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '50px',
              }}
            >
              <Typography className={`${styles['Accordion']}`}>
                運動衣物
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails
            className={`${styles['Accordion']}`}
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
          >
            <Typography>上衣類</Typography>
          </AccordionDetails>
          <AccordionDetails
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
          >
            <Typography>褲子類</Typography>
          </AccordionDetails>
          <AccordionDetails
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
          >
            <Typography>鞋子類</Typography>
          </AccordionDetails>
          <AccordionDetails
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
          >
            <Typography>襪子類</Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={page === '2' ? true : false}
          className={`${styles['Accordion']}`}
          sx={{
            '&.MuiAccordion-root::before': {
              bgcolor: 'transparent',
            },
            '&.MuiAccordion-root': {
              bgcolor: 'transparent',
              color: '#ffffff',
            },
            backgroundColor: 'none',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            className={`${styles['Accordion']}`}
            // expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Link
              href="2"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '50px',
              }}
            >
              <Typography className={`${styles['Accordion']}`}>
                健身食品
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
          >
            <Typography>蛋白粉</Typography>
          </AccordionDetails>
          <AccordionDetails
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
          >
            <Typography>能量補給</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={page === '3' ? true : false}
          className={`${styles['Accordion']}`}
          sx={{
            '&.MuiAccordion-root::before': {
              bgcolor: 'transparent',
            },
            '&.MuiAccordion-root': {
              bgcolor: 'transparent',
              color: '#ffffff',
            },
            backgroundColor: 'none',
            border: 'none',
            boxShadow: 'none',
          }}
        >
          <AccordionSummary
            className={`${styles['Accordion']}`}
            // expandIcon={<ExpandMoreIcon />}
            sx={{ backgroundColor: 'none', border: 'none', boxShadow: 'none' }}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Link
              href="3"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '50px',
              }}
            >
              <Typography className={`${styles['Accordion']}`}>
                健身器材
              </Typography>
            </Link>
          </AccordionSummary>
        </Accordion>
      </div>
      <div className={`${styles['mbfirstcategory_view']}`}>
        <ul className={`${styles['mbfirstcategory_list']}`}>
          <li className={`${styles['mbfirstcategory_item']}`}>
            <Link
              href="1"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '50px',
              }}
            >
              <Typography variant="h6">運動衣物</Typography>
            </Link>
          </li>
          <li>
            <Link
              href="2"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '50px',
              }}
            >
              <Typography variant="h6">健身食品</Typography>
            </Link>
          </li>
          <li>
            <Link
              href="3"
              style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '50px',
              }}
            >
              <Typography variant="h6">健身器材</Typography>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
