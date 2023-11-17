import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import tableStyles from '../member-table.module.css';
import Link from 'next/link';

export default function ProductsTable({ data }) {
  return (
    <TableContainer
      className={`${tableStyles['paper-container']}`}
      component={Paper}
    >
      <Table
        className={`${tableStyles['table']}`}
        //   sx={{ minWidth: 650 }}
      >
        <TableHead className={`${tableStyles['table-head']}`}>
          <TableRow>
            <TableCell>商品名稱</TableCell>
            <TableCell>商品圖片</TableCell>
            <TableCell>商品價格</TableCell>
            <TableCell>取消收藏</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.rows.map((row) => (
            <TableRow
              className={`${tableStyles['table-body-row']}`}
              key={row.sid}
              //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell data-title="商品名稱 : ">{row.name}</TableCell>
              <TableCell>
                <Link href={`/product`}>
                  <img
                    className={`${tableStyles['table-td-img']}`}
                    src={`/static/member/SE_00501.webp`}
                    alt=""
                  />
                </Link>
              </TableCell>
              <TableCell data-title="商品價格 : ">{row.price}$</TableCell>
              <TableCell
                onClick={(e) => {
                  e.preventDefault();
                  console.log(row.sid);
                }}
              >
                <DeleteIcon className={`${tableStyles['delete-icon']}`} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
