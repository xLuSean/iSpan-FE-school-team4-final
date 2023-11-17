import CUIButton from '../customUI/cui-button';
import CUIDatePicker from '../customUI/cui-date-picker';
import CUISelect from '../customUI/cui-select';
import CancelIcon from '@mui/icons-material/Cancel';
import CUISearch from '../customUI/cui-search';
import { Grid, Box, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';
import { useDebounceHH } from '../customHook/useDebounce';

// >>> radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
//<<< radio

// >>> for plot
import ScatterPlot from './scatterPlot';
import { useAuth } from '@/context/auth/useAuth';
import { toast } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// <<< for plot

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'center',
  alignItems: 'center',
}));

const myBorderWidth = '2px';
const myBorderColor = 'black';
const SUIScheduleItem = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  //   height: '1.5rem',
  // backgroundColor: 'lightgreen',
  padding: '5px',
  borderRadius: '30px',
  borderWidth: `${myBorderWidth}`,
  borderColor: `${myBorderColor}`,
  borderStyle: 'solid',
}));

const PlotPage = ({ bodyParts, exerciseInit, myBGstyle }) => {
  const { auth } = useAuth();
  const dateDefault = { start: null, end: null };
  const maxPlotNumber = 5;
  const plotCheck = useRef();
  const [plotType, setPlotType] = useState('volumn');
  const [plotDates, setPlotDates] = useState(dateDefault);
  const [plotBodyPart, setPlotBodyPart] = useState([exerciseInit]); //=== for plot exercise body-part filter
  const [plotKeyword, setPlotKeyword] = useState(''); //=== for plot search keyword
  const [plotExeSelected, setPlotExeSelected] = useState(''); //=== for selected option
  const [plotExeTypes, setPlotExeTypes] = useState([]); //=== exercise select options for plot
  const [plotExeList, setPlotExeList] = useState([]); //=== list of exercise for plot
  // const [plotting, setPlotting] = useState(false);
  const [plotData, setPlotData] = useState([]); //=== data for plot

  // >>> plot filter by body part
  useDebounceHH(() => {
    // === for selection and search
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exe-type/exercise-type/body-part/${plotBodyPart[0].key}/${plotKeyword}`,
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
        setPlotExeTypes(
          data.data?.filter(
            (dataObj) =>
              !plotExeList.some((listObj) => listObj.sid === dataObj.sid)
          )
        );
      });
  }, [plotBodyPart, plotKeyword, plotExeList]);
  // <<< plot filter by body part

  useDebounceHH(() => {
    setPlotData([]);

    // >>> fetch data for plot
    plotExeList.map(async (item) => {
      let fetchType;
      if (plotType === 'volumn') {
        fetchType = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exercise-record/exercise-record-plot-volumn/${plotDates.start}/${plotDates.end}/${item.sid}`;
      } else if (plotType === 'max') {
        fetchType = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/exercise-record/exercise-record-plot-max/${plotDates.start}/${plotDates.end}/${item.sid}`;
      }

      await fetch(fetchType, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth?.accessToken}`,
        },
      })
        .then((r) => r.json())
        .then((data) => {
          setPlotData((prev) =>
            data.data?.length > 0
              ? [...prev, data.data]
              : [
                  ...prev,
                  {
                    typeID: item.sid,
                    name: item.exercise_name,
                    error: 'error',
                  },
                ]
          );
        });
    });
    // <<< fetch data for plot
  }, [plotExeList, plotDates, plotType]);

  plotCheck.current = plotData.filter((e) => e.error);

  // ================================================================
  // >>> filter exercise by body part
  const handleBodypartSelection = (e) => {
    setPlotBodyPart(bodyParts.filter((x) => x.value === e.target.value));
    setPlotExeSelected('');
  };

  const handleExeTypeSelection = (e) => {
    const selectExeType = e.target.value;

    setPlotExeSelected(selectExeType);
  };

  const handleAdd = () => {
    const selectItem = plotExeTypes.filter(
      (e) => e.exercise_name === plotExeSelected
    );
    setPlotExeList((prev) => {
      if (prev.some((obj) => obj.exercise_name === plotExeSelected)) {
        return prev;
      } else {
        return [...prev, selectItem[0]];
      }
    });
    setPlotExeSelected('');
  };

  const handlePlotListDelete = (item) => {
    setPlotExeList((prev) => prev.filter((e) => e.sid !== item.sid));
    setPlotExeSelected('');
  };
  // <<< filter exercise by body part
  // >>> search by keyword
  // TODO: on composition end
  const handleSearch = (e) => {
    setPlotKeyword(e.target.value);
  };

  const handleClean = () => {
    setPlotDates(dateDefault);
    setPlotExeList([]);
    // setPlotData([])  //need this?
  };

  const handlePDF = () => {
    const plot = document.querySelector('.outputPDF');
    const output = new jsPDF();
    html2canvas(plot).then((canvas) => {
      const border = 5;
      const rescale = 1.0;
      const imgWidth =
        output.internal.pageSize.getHeight() * rescale - border * 2;
      const imgHeight = (canvas.height / canvas.width) * imgWidth;
      let image = canvas.toDataURL('image/png');
      output.addImage(
        image,
        'JPEG',
        (output.internal.pageSize.getWidth() - imgHeight) / 2,
        border - imgHeight,
        imgWidth,
        imgHeight,
        '',
        1,
        270
      );
      output.save(
        `${auth.user.name}_${plotType}_${plotDates.start}_${plotDates.end}.pdf`
      );
    });
  };

  // ================================================================

  // >>> for chartjs test
  //   <<< for chartjs test

  return (
    <div
      id="page-3"
      style={{
        paddingLeft: '200px',
        paddingRight: '200px',
        paddingTop: '50px',
      }}
    >
      <Grid
        container
        justifyContent="center"
        sx={{ width: '100%', height: '780px' }}
      >
        <Grid item lg={3} sm={12} sx={{ px: 2 }}>
          <Section sx={{ ...myBGstyle }}>
            <Box
              sx={{
                top: 0,
                width: '100%',
              }}
            >
              <h1>展示你的訓練記錄</h1>
              <FormControl>
                <FormLabel id="plot-type-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="plot-type-label"
                  name="plot-type-radio"
                  value={plotType}
                  onChange={(e) => setPlotType(e.target.value)}
                >
                  <FormControlLabel
                    value="volumn"
                    control={<Radio />}
                    label="volumn"
                  />
                  <FormControlLabel
                    value="max"
                    control={<Radio />}
                    label="Max"
                  />
                  {/* <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                  /> */}
                </RadioGroup>
              </FormControl>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  // height: '100px',

                  my: 2,
                }}
              >
                {/* TODO:可以用radio選擇畫不同的圖 */}
                <Box sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      // flexDirection: 'column',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <CUIDatePicker // maxDate = end-date/ end-date - 1
                      sx={{ width: '45%' }}
                      label={'開始日期'}
                      format={'YYYY-MM-DD'}
                      //   disabled={editing}
                      // defaultValue={today}
                      value={plotDates.start || undefined}
                      maxDate={plotDates.end}
                      onChange={(e) => {
                        setPlotDates((prev) => ({ ...prev, start: e }));
                      }}
                    />
                    <CUIDatePicker // minDate = start-date/ start-date + 1
                      sx={{ width: '45%' }}
                      label={'結束日期'}
                      format={'YYYY-MM-DD'}
                      //   disabled={editing}
                      // defaultValue={today}
                      value={plotDates.end || undefined}
                      minDate={plotDates.start}
                      onChange={(e) => {
                        setPlotDates((prev) => ({ ...prev, end: e }));
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '45%',
                    }}
                  ></Box>
                </Box>
              </Box>
              {/* <CUIDatePicker sx={{ width: '90%' }} label={'start date'} />
              <CUIDatePicker sx={{ width: '90%' }} label={'end date'} /> */}
              <CUISelect
                sx={{ width: '100%' }}
                label="部位分類"
                defaultValue={bodyParts[0].value}
                options={bodyParts}
                onChange={(e) => {
                  handleBodypartSelection(e);
                }}
              />
              <CUISearch
                sx={{ width: '100%' }}
                label="搜尋運動類型"
                placeholder="請輸入關鍵字"
                onChange={(e) => {
                  handleSearch(e);
                }}
              />
              <CUISelect
                sx={{ width: '100%' }}
                label={`${plotBodyPart[0].value}運動類型(${
                  plotExeTypes?.length || '0'
                }):`}
                options={
                  plotExeTypes?.length > 0
                    ? plotExeTypes.map((e) => ({
                        key: e.sid,
                        value: e.exercise_name,
                      }))
                    : [{ key: 0, value: '無' }]
                }
                value={plotExeSelected}
                onChange={(e) => {
                  handleExeTypeSelection(e);
                }}
              />
              {/* {console.log(plotExeSelected)} */}
              {plotExeList.length >= maxPlotNumber && (
                <Box
                  sx={{
                    color: 'red',
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  最大繪圖上限: {maxPlotNumber}
                </Box>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 3,
                  }}
                >
                  <CUIButton
                    color={'deepgrey'}
                    sx={{ width: '35%' }}
                    onClick={() => {
                      handleClean();
                      toast.error('清除');
                    }}
                  >
                    清除
                  </CUIButton>
                  <CUIButton
                    color={'light_grey'}
                    sx={{ width: '45%' }}
                    onClick={() => {
                      handleAdd();
                      toast.success('成功加入');
                    }}
                    disabled={
                      !plotExeSelected ||
                      plotExeList.length >= maxPlotNumber ||
                      plotExeSelected === '無' ||
                      !plotDates.start ||
                      !plotDates.end
                    }
                  >
                    加入
                  </CUIButton>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: '100%', mt: 3 }}>
              {plotExeList.map((ele, i) => {
                return (
                  <SUIScheduleItem sx={{ width: '100%', my: 1 }} key={ele.sid}>
                    <Box sx={{ width: '88%', textAlign: 'center' }}>
                      {ele.exercise_name}
                    </Box>
                    <Box sx={{ width: '12%' }}>
                      <ButtonBase
                        sx={{
                          p: 0,
                          minWidth: 'auto',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlotListDelete(ele);
                        }}
                      >
                        <CancelIcon
                          sx={{ fontSize: 30, color: 'var(--main-red)' }}
                        />
                      </ButtonBase>
                    </Box>
                  </SUIScheduleItem>
                );
              })}
              <Box
                sx={{
                  display: 'flex',
                  // flexDirection: 'c',
                  justifyContent: 'space-between',
                  // width: '40%',
                  // mt: 5,
                  // height: '100%',
                  mt: 2,
                }}
              >
                <CUIButton
                  color={'light_grey'}
                  sx={{ width: '35%' }}
                  disabled={
                    !plotDates.start ||
                    !plotDates.end ||
                    plotExeList.length === 0
                  }
                  onClick={() => {
                    handlePDF();
                  }}
                >
                  輸出PDF
                </CUIButton>
                {/* <CUIButton
                  sx={{ width: '45%' }}
                  disabled={
                    !plotDates.start ||
                    !plotDates.end ||
                    plotExeList.length === 0
                  }
                  onClick={() => handlePlot()}
                >
                  繪製
                </CUIButton> */}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'end' }}> </Box>
            </Box>
          </Section>
        </Grid>
        {/* ============================================================= */}

        <Grid item lg={9} sm={12} sx={{ height: '100%' }}>
          {/* FIXME: will glitch */}{' '}
          <Box sx={{ ...myBGstyle, p: 2 }} className={'outputPDF'}>
            {plotExeList.length > 0 ? (
              plotCheck.current.length > 0 ? (
                <Box sx={{ color: 'var(--main-red)' }}>
                  <h1>{'No data for :'}</h1>
                  {plotCheck.current.map((e) => (
                    <h1 key={e.typeID}>{e.name}</h1>
                  ))}
                </Box>
              ) : (
                plotData.length > 0 && (
                  <ScatterPlot plotData={plotData} plotType={plotType} />
                )
              )
            ) : (
              <Box sx={{ p: 2 }}>
                <h1>使用方法</h1>
                <ul>
                  <li>
                    Volumn:重量x次數x組數，類似於總作用的功，當天的相同運動將會累加。Max:當前運動類型最大的重量，同一天相同運動只會取最大值
                  </li>
                  <li>按加入就會自動畫出數據</li>
                  <li>一次最多只能畫5種運動</li>
                </ul>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export { PlotPage };
