import { Container, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CUISearch from '@/components/customUI/cui-search';
import CUISelect from '@/components/customUI/cui-select';
import SUICard from '@/components/seanUI/sui-card';
import {
  SUISchedule,
  SUIScheduleTable,
} from '@/components/seanUI/sui-schedule';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import BodySvg from '@/components/bodySvg';

const bodypart = [
  '三頭',
  '上背',
  '下背',
  '二頭',
  '前臂',
  '小腿',
  '核心',
  '肩膀',
  '胸',
  '腿前側',
  '腿後側',
  '臀部',
];

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  alignItems: 'center',
}));

const ExercisePage = () => {
  return (
    <div style={{ padding: '64px' }}>
      {/* <div sx={{ padding: '64px' }}> */}
      <Grid container spacing={2} justifyContent="center">
        <Grid item lg={3} sm={2} sx={{ border: '3px solid red' }}>
          <BodySvg />
        </Grid>
        <Grid item lg={5} sm={4}>
          <Section>
            <h1>record/index is abandon</h1>
            <CUISearch
              sx={{ width: '100%' }}
              label="搜尋運動類型"
              placeholder="請輸入關鍵字"
            />
            <CUISelect key={2} label="部位分類" options={bodypart} />
          </Section>
        </Grid>
        <Grid lg={4} sm={4}>
          <SUIScheduleTable>
            <Section>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{ width: '80%' }} />
              </LocalizationProvider>
              <SUISchedule>
                <div>123</div>
                <div>123</div>
              </SUISchedule>
            </Section>
          </SUIScheduleTable>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExercisePage;
