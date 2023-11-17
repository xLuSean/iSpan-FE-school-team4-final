import {
  Paper,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { ExeCardDialog } from './sui-card-dialog';
import CUISelect from '../customUI/cui-select';
import CUISearch from '../customUI/cui-search';

const myBorderWidth = '2px';
const myBorderColor = 'black';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  alignItems: 'center',
}));

function SUICardList({
  type,
  list,
  rowRWD = [6, 6, 4, 4, 3],
  // rowRWD: [xs,sm,md,lg,xl]
  exerciseScheduleList,
  setExerciseScheduleList,
  handleBodypartSelection,
  handleSearch,
  bodyPart,
  bodyParts,
}) {
  // >>> dialog control
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = (item) => {
    setSelectedItem({ ...item, sets: null, reps: null, quantity: null });
    setDialogOpen(true);
  };
  // <<< dialog control

  return (
    <>
      <Section>
        <h1>規劃你的訓練</h1>
        <CUISelect
          sx={{ width: '50%' }}
          label="部位分類"
          value={bodyPart[0].value}
          options={bodyParts.current}
          onChange={(e) => {
            handleBodypartSelection(e);
          }}
        />
        <CUISearch
          sx={{ width: '50%' }}
          label="搜尋運動類型"
          placeholder="請輸入關鍵字"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </Section>
      <Paper
        sx={{
          display: 'flex',
          backgroundColor: 'var(--steel-light-grey)',
          // borderRadius: '20px',
          width: '100%',
          height: '500px',
          marginTop: '1.5rem',
          overflow: 'auto',
          position: 'relative',
          // border: `${myBorderWidth} solid ${myBorderColor}`,
          padding: '0.5rem',
          // outline: `${myBorderWidth} solid blue`,
          '&::-webkit-scrollbar': {
            width: 20,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'var(--deepgrey)',
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '5px',
            backgroundColor: 'var(--steel-grey)',
            transition: '.5s',
            '&:hover': {
              filter: 'brightness(0.85)',
              backgroundColor: 'var(--light-grey)',
            },
          },
        }}
      >
        <Grid container>
          {list?.map((item, i) => (
            <Grid
              item
              xs={rowRWD[0]}
              // sm={4}
              md={rowRWD[2]}
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                p: 1,
              }}
            >
              <Box
                onClick={() => {
                  handleDialogOpen(item);
                }}
                sx={{ cursor: 'pointer', width: '100%' }}
              >
                <MyCard type={type} item={item} />
              </Box>
            </Grid>
          ))}
        </Grid>
        {list?.length > 0 && type === 'exercise' && dialogOpen && (
          <ExeCardDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            item={selectedItem}
            setSelectedItem={setSelectedItem}
            exerciseScheduleList={exerciseScheduleList}
            setExerciseScheduleList={setExerciseScheduleList}
          />
        )}
      </Paper>
    </>
  );
}

function MyCard({ type, item }) {
  let img;
  let name;
  if (type === 'exercise') {
    // img = '/react-imgs/record/exercise/' + item.img;
    img =
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/record/exercise/` +
      item.img;
    name = item.exercise_name;
  } else {
    // img = '/react-imgs/record/food/' + item.food_img;
    img =
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/record/food/` + item.img;
    name = item.food_type;
  }

  return (
    <Card sx={{ width: '100%', height: '220px', borderRadius: '20px' }}>
      <CardMedia component="img" height="150" image={`${img}`} alt="Image" />
      <CardContent>
        <Typography
          color="text.secondary"
          sx={{ textAlign: 'center', fontSize: '1.5rem' }}
        >
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

// function Calendar

function CalendarCard({ date }) {
  return (
    <Card
      sx={{
        // width: '100%',
        border: `${myBorderWidth} solid ${myBorderColor}`,
        borderRadius: '20px',
        height: '15rem',
        p: 0,
        m: 2,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            bgcolor: 'var(--fortress)',
            p: 1,
            borderBottom: `${myBorderWidth} solid ${myBorderColor}`,
            textAlign: 'center',
          }}
        >
          {date}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ p: 0, m: 0 }}>
          This is the content of
          twerfawfawfawfwqal;jijhfnalkjfhnawlkjfhbnawlkjgrbnhe card.
        </Typography>
      </CardContent>
    </Card>
  );
}

function CalendarCardList({ dates }) {
  return (
    <>
      {dates.map((date, i) => {
        return <CalendarCard key={i} date={date} />;
      })}
    </>
  );
}

export { SUICardList, CalendarCardList, CalendarCard };
