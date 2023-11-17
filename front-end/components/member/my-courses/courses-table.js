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
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CoursesTable({ data, setData }) {
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
            <TableCell>課程名稱</TableCell>
            <TableCell>擔當教練</TableCell>
            <TableCell>開始時間</TableCell>
            <TableCell>課程時長</TableCell>
            <TableCell>課程價格</TableCell>
            <TableCell>取消收藏</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row) => {
            if (row?.isDelete) {
              return (
                <TableRow
                  className={`${tableStyles['table-body-row']} ${tableStyles['deleted-row']}`}
                  key={row.sid}
                >
                  <TableCell colSpan={6} align="center">
                    資料已刪除
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow
                className={`${tableStyles['table-body-row']}`}
                key={row.sid}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell data-title="課程名稱 : ">
                  <Link href="/lesson/1">{row.name}</Link>
                </TableCell>
                <TableCell data-title="擔當教練 : ">{row.nickname}</TableCell>
                <TableCell data-title="開始時間 : ">{row.time}</TableCell>
                <TableCell data-title="課程時長 : ">
                  {row.period
                    .split(':')
                    .map((el, i) => {
                      if (i === 0) {
                        if (parseInt(el) !== 0) {
                          return parseInt(el) + '小時';
                        }
                      }
                      if (i === 1) {
                        if (parseInt(el) !== 0) {
                          return parseInt(el) + '分';
                        }
                      }
                      return '';
                    })
                    .join('')}
                </TableCell>
                <TableCell data-title="課程價格 : ">${row.price}</TableCell>
                <TableCell>
                  <DeleteIcon
                    onClick={() => {
                      // console.log(row.sid);
                      const deleteFavoriteCourse = async () => {
                        const res = await axios.delete(
                          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/api/member/member-favorite-courses`,
                          { data: { sid: row.sid } }
                        );
                        toast.success('刪除課程成功');
                        setData((prev) => {
                          return {
                            ...prev,
                            rows: prev.rows.map((el2) => {
                              if (el2.sid === row.sid) {
                                return { ...el2, isDelete: true };
                              }
                              return { ...el2 };
                            }),
                          };
                        });
                      };
                      deleteFavoriteCourse();
                    }}
                    className={`${tableStyles['delete-icon']}`}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
