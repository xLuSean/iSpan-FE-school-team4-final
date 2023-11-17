import { Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import dayjs from 'dayjs';
// import CUISearch from '@/components/customUI/cui-search';
// import CUISelect from '@/components/customUI/cui-select';
// import CUIDatePicker from '@/components/customUI/cui-date-picker';
import CUIButton from '@/components/customUI/cui-button';
// =========================================================================
import {
  SUICardList,
  // CalendarCard,
  // CalendarCardList,
} from '@/components/seanUI/sui-card';
import {
  SUISchedule,
  SUIScheduleTable,
} from '@/components/seanUI/sui-schedule';
import SeanCalendar from '@/components/recordPage/calendar';
import { PlotPage } from '@/components/recordPage/exePlotPage';
import getCurrentMonthDates from '@/components/seanUI/sui-getCurrentMonth';
// =========================================================================

import BodySvg from '@/components/bodySvg';
import { CSVLink, CSVDownload } from 'react-csv';
import { Toaster, toast } from 'react-hot-toast';
// =========================================================================

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
// =========================================================================
import {
  useDebounceHH,
  // useDebounce,
} from '@/components/customHook/useDebounce';
// import useUpdateEffect from '@/components/customHook/useUpdateEffect';
import ProtectedRouteWrapper from '@/components/protected-route';
import Layout from '@/components/layout/layout';
import { useAuth } from '@/context/auth/useAuth';
import getBrickBackground from '@/libs/getBrickBackground';
// =========================================================================
//>>> pseudo-data

//<<< pseudo-data

// >>> style
const myBorderWidth = '2px';
const myBorderColor = 'black';
const myBorder = `${myBorderWidth} solid ${myBorderColor}`;
const scheduleItemWdith = ['48%', '18%', '12%', '22%'];
const myBorderRadius = '30px';
const myBackgroundColor = 'var(--light-gray)';
const myBGstyle = { borderRadius: myBorderRadius, bgcolor: myBackgroundColor };

const scheduleTitleStyle = {
  borderRight: myBorder,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
// <<< style

export default function ExercisePage() {
  const { auth } = useAuth();
  const pdfLabel = [
    { label: '運動項目', key: 'name' },
    { label: '重量', key: 'quantity' },
    { label: '次數', key: 'reps' },
    { label: '組數', key: 'sets' },
  ];
  // ============================================================
  const exerciseInit = { key: 0, value: '全部', label: '全部' }; //=== exercise type的初始值
  const [exeType, setExeType] = useState([]); //=== for exercise-type cards
  const [bodyPart, setBodyPart] = useState([exerciseInit]); //=== for exercise body-part filter
  const bodyParts = useRef([exerciseInit]); //=== for selection options
  const [flipFront, setFlipFront] = useState(true); //=== SVG front:true, back:false
  const frontIDs = [1, 2, 4, 9, 12]; //=== ids of front bodyparts
  const backIDs = [5, 6, 7, 8, 10, 11]; //=== ids of back bodyparts
  const [keyword, setKeyword] = useState(''); //=== for search keyword
  const [exerciseRecord, setExerciseRecord] = useState([]); //=== exercise record for calendar
  const [exerciseStartEnd, setExerciseStartEnd] = useState(
    getCurrentMonthDates()
  ); //=== the start and end date for the calendar
  const [scheduleDate, setScheduleDate] = useState(null); // useState(today);
  const [exerciseScheduleList, setExerciseScheduleList] = useState([]);
  const [editDate, setEditDate] = useState(null);
  // let editing = exerciseRecord.some((item) => item.date === editDate); //=== 判斷現在是否正在編輯月曆中某一天的運動, 當天有行程=ture
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    setEditing(exerciseRecord?.some((item) => item.date === editDate));
  }, [exerciseRecord, editDate]);

  // =============================================================
  // =============================================================

  // >>> add/editing schadule
  const handleAddSchedule = async (list, date) => {
    let dataAdded;
    if (editing) {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exercise-record/delete-record`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          body: JSON.stringify({ date }),
        }
      )
        .then((r) => r.json())
        .then((data) => {});
    }
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!date) {
      // no date means editing
      list.map(async (item) => {
        const data = { ...item, date };
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exercise-record/add-record`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth?.accessToken}`,
            },
            body: JSON.stringify(data),
          }
        )
          .then((r) => r.json())
          .then((data) => {
            dataAdded += data.result.affectedRows;
          });
      });
      //>>> reset
      setExerciseScheduleList([]);
      setScheduleDate(undefined);
      //<<< reset
    } else {
      // console.log('no date'); // maybe hot toast
    }

    setEditing(false); //=== reset editing
    setEditDate(null);
  };
  // <<< add/editing schadule

  // >>> initiallize
  useEffect(
    () => {
      // === get bodyparts list
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_PORT}/exe-type/body-part`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }) //=== for selection options
        .then((r) => r.json())
        .then((data) => {
          data.data.unshift(exerciseInit);
          bodyParts.current = data.data;
        });
    },
    [],
    2000
  );

  useDebounceHH(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exercise-record/exercise-record/${exerciseStartEnd.start}/${exerciseStartEnd.end}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    ) //=== for exercise record
      .then((r) => r.json())
      .then((data) => {
        setExerciseRecord(data.data);
      });
  }, [exerciseStartEnd, exerciseScheduleList]);

  // <<< initiallize

  // >>> filter by body part
  useDebounceHH(() => {
    // === for selection and search
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exe-type/exercise-type/body-part/${bodyPart[0].key}/${keyword}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        setExeType(data.data);
      });
    if (!flipFront && frontIDs.includes(bodyPart[0].key)) {
      setFlipFront(true);
    } else if (flipFront && backIDs.includes(bodyPart[0].key)) {
      setFlipFront(false);
    }
  }, [bodyPart, keyword]);
  // >>> filter by body part

  // >>> filter exercise by body part
  const handleBodypartSelection = (e) => {
    setBodyPart(bodyParts.current.filter((x) => x.value === e.target.value));
  };
  // <<< filter exercise by body part

  // >>> search by keyword
  // TODO: on composition end
  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };
  // <<< search by keyword

  // >>> get the exercise-schedule when selecting date
  useDebounceHH(
    () => {
      setScheduleDate(editDate);
      if (editing) {
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exercise-record/exercise-record/${editDate}/${editDate}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          }
        ) //=== for exercise record
          .then((r) => r.json())
          .then((data) => {
            setExerciseScheduleList(data.data);
          });
      } else {
        setExerciseScheduleList([]);
      }
    },
    [editing, editDate],
    100
  );
  // <<< get the exercise-schedule when selecting date

  return (
    <>
      <Box
        sx={{
          bgcolor: 'var(--deepgrey)',
          backgroundImage: getBrickBackground({
            scale: 2,
            rotate: 7,
            brickColor: 'hsl(100, 0%, 30%)',
            strokeColor: 'hsl(100, 0%, 20%)',
          }),
          backgroundAttachment: 'fixed',
        }}
      >
        {/* =================================================================== */}
        {/* === page 1 ========================================================= */}
        {/* =================================================================== */}
        <div id="page-1" style={{ paddingLeft: '64px', paddingRight: '64px' }}>
          {/* <div sx={{ padding: '64px' }}> */}
          <Grid container justifyContent="center">
            <Grid
              item
              lg={3}
              sm={3}
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'start',
              }}
            >
              <Box sx={{ ...myBGstyle, width: '75%', p: 2 }}>
                <BodySvg
                  flipFront={flipFront}
                  setFlipFront={setFlipFront}
                  setBodyPart={setBodyPart}
                  bodyPart={bodyPart}
                  exerciseInit={exerciseInit}
                />
              </Box>
            </Grid>

            {/* ============================================================================ */}

            <Grid item lg={5} sm={5} sx={{ ...myBGstyle, p: 2, my: 2 }}>
              {/* === For exercise card list === */}
              <SUICardList
                type="exercise"
                list={exeType}
                rowRWD={[6, 6, 4, 4, 3]}
                exerciseScheduleList={exerciseScheduleList}
                setExerciseScheduleList={setExerciseScheduleList}
                bodyPart={bodyPart}
                bodyParts={bodyParts}
                handleBodypartSelection={handleBodypartSelection}
                handleSearch={handleSearch}
              />
            </Grid>
            {/* ============================================================================ */}

            <Grid
              className="calendarSelect"
              item
              lg={4}
              sm={4}
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SUIScheduleTable
                sx={{ ...myBGstyle, overflow: 'hidden', width: '100%' }}
              >
                <SUISchedule
                  // >>> style
                  myBGstyle={myBGstyle}
                  scheduleTitleStyle={scheduleTitleStyle}
                  scheduleItemWdith={scheduleItemWdith}
                  // <<< style
                  type="exercise"
                  editing={editing}
                  setEditing={setEditing}
                  setEditDate={setEditDate}
                  // >>> 規劃暫存清單
                  scheduleList={exerciseScheduleList}
                  setScheduleList={setExerciseScheduleList}
                  // <<< 規劃暫存清單
                  // >>> 要加入規劃的時間
                  scheduleDate={scheduleDate}
                  setScheduleDate={setScheduleDate}
                  // <<< 要加入規劃的時間
                  handleAddSchedule={handleAddSchedule} //=== fetch DB
                />
              </SUIScheduleTable>
            </Grid>
          </Grid>
        </div>
        {/* =================================================================== */}
        {/* === page 2 ========================================================= */}
        {/* =================================================================== */}

        <div
          id="page-2"
          style={{
            paddingLeft: '200px',
            paddingRight: '200px',
            paddingTop: '50px',
          }}
        >
          <Grid container justifyContent="center" sx={{ width: '100%' }}>
            {/* ============================================================= */}

            <Grid
              item
              lg={9}
              sm={12}
              sx={{
                ...myBGstyle,
                p: 2,
              }}
            >
              <CUIButton
                color={'light_grey'}
                sx={{ mb: 2 }}
                disabled={!exerciseRecord}
              >
                {exerciseRecord?.length > 0 ? (
                  <CSVLink
                    data={exerciseRecord.map((e) => ({
                      data: e.date,
                      name: e.name,
                      weight: e.quantity,
                      rep: e.reps,
                      sets: e.sets,
                    }))}
                    filename={`${auth.user.name}_${exerciseStartEnd.start}_${exerciseStartEnd.end}.csv`}
                  >
                    下載本月運動CSV
                  </CSVLink>
                ) : (
                  '本月無數據'
                )}
              </CUIButton>
              <SeanCalendar
                list={exerciseRecord}
                updateStartEnd={setExerciseStartEnd}
                setDate={setEditDate}
              />
            </Grid>
          </Grid>
        </div>
        {/* =================================================================== */}
        {/* === page 3 ========================================================= */}
        {/* =================================================================== */}
        <PlotPage
          auth={auth}
          bodyParts={bodyParts.current}
          exerciseInit={exerciseInit}
          myBGstyle={myBGstyle}
        />
      </Box>
    </>
  );
}

// export default ExercisePage;

ExercisePage.getLayout = (page) => (
  <ProtectedRouteWrapper>
    <Layout>{page}</Layout>
  </ProtectedRouteWrapper>
);
