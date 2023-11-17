import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Row from './row';
import styles from '@/components/member/member-table.module.css';

export default function OrdersTable({ data }) {
  return (
    <TableContainer
      component={Paper}
      className={`${styles['order-table-container']}`}
    >
      <Table aria-label="collapsible table">
        <TableHead className={`${styles['order-table-thead']}`}>
          <TableRow sx={{ '& > *': { fontSize: '1.25rem' } }}>
            <TableCell />
            <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
              購買日期
            </TableCell>
            <TableCell align="center">付款方式</TableCell>
            <TableCell align="center">收件人</TableCell>
            <TableCell sx={{ minWidth: '100px' }}>收件地址</TableCell>
            <TableCell sx={{ minWidth: '100px' }}>收件電話</TableCell>
            <TableCell sx={{ minWidth: '100px' }}>收件email</TableCell>
            <TableCell align="center">付款狀態</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.rows.map((row) => (
            <Row key={row.main_sid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
