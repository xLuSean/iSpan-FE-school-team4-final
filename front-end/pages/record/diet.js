import { Container, Grid, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { TextField } from '@mui/material';
// import {
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from '@mui/material';
// import { Input } from '@mui/material';
// import { InputLabel } from '@mui/material';

// =========================================================================
// import CUISearch from '@/components/customUI/cui-search';
// import CUISelect from '@/components/customUI/cui-select';
// import CUIDatePicker from '@/components/customUI/cui-date-picker';
// import CUIButton from '@/components/customUI/cui-button';
// import CUITextField from '@/components/customUI/cui-textfield';
// =========================================================================
// import { SUICardList } from '@/components/seanUI/sui-card';
// import {
//   SUISchedule,
//   SUIScheduleTable,
// } from '@/components/seanUI/sui-schedule';
// import { SUIInputNumber, SUIDataBox } from '@/components/seanUI/sui-input';
// =========================================================================
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// =========================================================================
// import FullCalendarLayout from '@/components/fullcalendar/layout';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
// import timeGridPlugin from '@fullcalendar/timegrid';
// =========================================================================
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// =========================================================================
import style from './record.module.css';
// =========================================================================
import { useState, useRef } from 'react';
// =========================================================================
import DietFisrtPage from '@/components/recordPage/dietFirstPage';
import getBrickBackground from '@/libs/getBrickBackground';

//>>> style
const myBorderWidth = '2px';
const myBorderColor = 'black';
const myBorder = `${myBorderWidth} solid ${myBorderColor}`;
const NuBorder = `4px solid black`;
const NuBorderRadius = '30px';
const scheduleItemWdith = ['58%', '18%', '12%', '12%'];

const scheduleTitle = {
  borderRight: myBorder,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  alignItems: 'center',
}));

const NuBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // outline: '3px solid blue',
  width: '100%',
}));

//<<< style

const DietPage = () => {
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const foodInit = { key: 0, value: '全部', label: '全部' };
  // const router = useRouter();
  // const [foodType, setFoodType] = useState([]);
  // const [foodCategory, setFoodCategory] = useState([foodInit]);
  // const foodCategorys = useRef([foodInit]); //=== for selection options

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // >>> initiallize
  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/food-type/food-category`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       data.data.unshift(foodInit);
  //       foodCategorys.current = data.data;
  //     });

  //   fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/food-type/food-type`)
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setFoodType(data.rows);
  //     });
  // }, []);
  // <<< initiallize

  //>>> filter by food category
  // useEffect(() => {
  //   fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_PORT}/food-type/food-type/food-category/${foodCategory[0].key}`
  //   )
  //     .then((r) => r.json())
  //     .then((data) => {
  //       setFoodType(data.data);
  //     });
  // }, [foodCategory]);
  //<<< filter by food category

  return (
    <>
      <Box
        // className="dietBox"
        sx={{
          bgcolor: 'var(--deepgrey)',
          backgroundImage: getBrickBackground({
            scale: 2,
            rotate: 7,
            brickColor: 'hsl(100, 0%, 30%)',
            strokeColor: 'hsl(100, 0%, 20%)',
          }),
          height: '100vh',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* =================================================================== */}
        {/* === page 1 ========================================================= */}
        {/* =================================================================== */}
        <DietFisrtPage />
        {/* =================================================================== */}
        {/* === page 2 ========================================================= */}
        {/* =================================================================== */}
      </Box>
    </>
  );
};

export default DietPage;
