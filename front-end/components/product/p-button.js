import * as React from 'react';
import Button from '@mui/material/Button';
import styles from '@/styles/product.module.css';
import Link from 'next/link';

export default function PButton(...props) {
  return (
    <>
      <div className={styles.aaaa}>
        <div className={`${styles['Buttonscontainer']}`}>
          <div className={`${styles['IndexButtons2']}`}>
            <Link href="product/category/1">
              <Button
                className={`${styles['IndexButtons']}`}
                sx={
                  props.color
                    ? { width: '100%' }
                    : {
                        width: '100%',
                        bgcolor: 'var(--main-red)',
                        transition: '.5s',
                        ':hover': {
                          opacity: '.7',
                          bgcolor: 'var(--main-red)',
                        },
                      }
                }
                color={props.color}
                variant="contained"
                onClick={props.onClick}
              >
                運動衣物
              </Button>
            </Link>
          </div>
          <div className={`${styles['IndexButtons2']}`}>
            <Link href="product/category/2">
              <Button
                className={`${styles['IndexButtons']}`}
                sx={
                  props.color
                    ? { width: '100%' }
                    : {
                        width: '100%',
                        bgcolor: 'var(--main-red)',
                        transition: '.5s',
                        ':hover': {
                          opacity: '.7',
                          bgcolor: 'var(--main-red)',
                        },
                      }
                }
                color={props.color}
                variant="contained"
                onClick={props.onClick}
              >
                健身食品
              </Button>
            </Link>
          </div>
          <div className={`${styles['IndexButtons2']}`}>
            <Link href="product/category/3">
              <Button
                className={`${styles['IndexButtons']}`}
                sx={
                  props.color
                    ? { width: '100%' }
                    : {
                        width: '100%',
                        bgcolor: 'var(--main-red)',
                        transition: '.5s',
                        ':hover': {
                          opacity: '.7',
                          bgcolor: 'var(--main-red)',
                        },
                      }
                }
                color={props.color}
                variant="contained"
                onClick={props.onClick}
              >
                健身器材
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
