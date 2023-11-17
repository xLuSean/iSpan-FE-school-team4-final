import { useState } from 'react';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import styles from '../member-table.module.css';
import Link from 'next/link';

export default function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        className={`${styles['order-table-normal-row']}`}
        sx={{ '& > *': { borderBottom: 'unset', fontSize: '1.25rem' } }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right" data-title="購買日期  :">
          {row.buy_time}
        </TableCell>
        <TableCell align="center" data-title="付款方式  :">
          {row.method}
        </TableCell>
        <TableCell align="center" data-title="收件人  :">
          {row.recipient}
        </TableCell>
        <TableCell data-title="收件地址 :">{row.address}</TableCell>
        <TableCell sx={{ wordBreak: 'break-all' }} data-title="收件電話  :">
          {row.phone}
        </TableCell>
        <TableCell sx={{ wordBreak: 'break-all' }} data-title="收件email :">
          {row.email}
        </TableCell>
        <TableCell align="center" data-title="付款狀態 :">
          {row.pay_time}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{ '& > *': { fontSize: '1.25rem' } }}
        className={`${styles['order-table-collapse-row-container']}`}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                訂單細節
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead className={`${styles['order-table-collapse-th']}`}>
                  <TableRow sx={{ '& > *': { fontSize: '1.25rem' } }}>
                    <TableCell align="center">商品編號</TableCell>
                    <TableCell align="center">商品種類</TableCell>
                    <TableCell>商品名稱</TableCell>
                    <TableCell align="center">商品圖片</TableCell>
                    <TableCell align="right">單價</TableCell>
                    <TableCell align="right">數量</TableCell>
                    <TableCell align="right">小計</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={`${styles['order-table-collapse-body']}`}>
                  {row.rows.map((row) => (
                    <TableRow
                      key={row.detail_sid}
                      sx={{ '& > *': { fontSize: '1.25rem' } }}
                      className={`${styles['order-table-collapse-row']}`}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        data-title="商品編號 :"
                      >
                        {row.pid}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="center"
                        data-title="商品種類 :"
                      >
                        {(row.cid === 1 && '運動服裝') ||
                          (row.cid === 2 && '營養補劑') ||
                          (row.cid === 3 && '運動器材') ||
                          (row.cid === 4 && '教練課程')}
                      </TableCell>
                      <TableCell component="th" data-title="商品名稱 :">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          href={`${
                            row.cid === 4
                              ? `/lesson/${row.cllcid}`
                              : `/product/category/${row.cid}/${row.pid}`
                          }`}
                          data-title="商品圖片"
                        >
                          <img
                            className={`${styles['td-img']}`}
                            src={`${
                              process.env.NEXT_PUBLIC_BACKEND_PORT
                            }/imgs/product/${row.picture?.split(',')[0]}`}
                            alt="商品圖片"
                          />
                        </Link>
                      </TableCell>
                      <TableCell
                        component="th"
                        align="right"
                        data-title="單價 :"
                      >
                        {row.price?.toLocaleString()}
                      </TableCell>
                      <TableCell
                        component="th"
                        align="right"
                        data-title="數量 :"
                      >
                        {row.quantity?.toLocaleString()}
                      </TableCell>
                      <TableCell
                        component="th"
                        align="right"
                        data-title="小計 :$"
                      >
                        {(row.price * row.quantity)?.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={5} />
                    <TableCell align="right" sx={{ fontSize: '1.25rem' }}>
                      總共:
                    </TableCell>
                    <TableCell
                      align="right"
                      className={`${styles['order-table-total-price']}`}
                      sx={{ fontSize: '1.5rem' }}
                    >
                      {row.rows
                        .reduce((prev, curr) => {
                          return prev + curr.price * curr.quantity;
                        }, 0)
                        ?.toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

/* <TableCell align="right">
          $
          {row.rows.reduce((prev, curr) => {
            return prev + curr.price * curr.quantity;
          }, 0)}
        </TableCell> */
