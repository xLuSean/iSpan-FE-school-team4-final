import { Grid, Paper, Box, Button, ButtonBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';
import { ExeCardDialog } from './sui-card-dialog';
import CUIDatePicker from '../customUI/cui-date-picker';
import CUIButton from '../customUI/cui-button';
import { toast } from 'react-hot-toast';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// >>> style
import { SUIScheduleItemNum2 } from '@/styles/record-style/exerciseFirstPage-style';
//<<< style

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const myBorderWidth = '2px';
const myBorderColor = 'black';
const myBorder = `${myBorderWidth} solid ${myBorderColor}`;

const SUIScheduleItem = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2.5rem',
  padding: '10px',
  borderRadius: '0px',
  borderWidth: `${myBorderWidth} 0 ${myBorderWidth} ${myBorderWidth}`,
  borderColor: `${myBorderColor}`,
  borderStyle: 'solid',
}));

function SUISchedule({
  // >>> style
  scheduleTitleStyle,
  scheduleItemWdith = ['58%', '18%', '12%', '12%'],
  // <<< style
  type, // exercise/diet
  editing,
  setEditing,
  // >>> 規劃暫存清單
  scheduleList,
  setScheduleList,
  setEditDate,
  // <<< 規劃暫存清單
  // >>> 要加入規劃的時間
  scheduleDate,
  setScheduleDate,
  // <<< 要加入規劃的時間
  handleAddSchedule, //=== fetch DB
}) {
  // >>> dialog control
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const handleDialogOpen = (item) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  // <<< dialog control

  // >>> for DND
  // const [list, setList] = useState(items);
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedList = Array.from(scheduleList);
    const [removed] = reorderedList.splice(result.source.index, 1);
    reorderedList.splice(result.destination.index, 0, removed);

    setScheduleList(reorderedList);
  };
  //<<< for DND

  const handleDelete = (item) => {
    const updateList = [...scheduleList];
    setScheduleList(
      updateList.filter((ele) => {
        return ele.id !== item.id || ele.sid !== item.sid;
      })
    );
  };

  return (
    <>
      <Section sx={{ height: '100%' }}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CUIDatePicker
              sx={{ width: '80%' }}
              label={'pick a date'}
              format={'YYYY-MM-DD'}
              disabled={editing}
              // defaultValue={today}
              value={scheduleDate || undefined}
              onChange={(e) => {
                setScheduleDate(e);
              }}
            />
            {!scheduleDate && scheduleList.length != 0 && (
              <Box sx={{ color: 'red' }}>請選擇日期</Box>
            )}
          </Box>
          <CUIButton
            color={'light_grey'}
            sx={{
              width: '35%',
              marginLeft: '20px',
              transform: 'scale(1.2)',
            }}
            onClick={(e) => {
              handleAddSchedule(scheduleList, scheduleDate);
              toast.success(editing ? '修改完成' : '加入規劃');
            }}
            disabled={!scheduleDate || (scheduleList.length === 0 && !editing)}
          >
            {editing ? '修改計畫' : '加入規劃'}
          </CUIButton>
          <CUIButton
            sx={{
              width: '15%',
              marginLeft: '50px',
              transform: 'scale(1.2)',
              bgcolor: 'var(--steel-grey)',
            }}
            onClick={(e) => {
              setEditing(false);
              setScheduleList([]);
              setScheduleDate(null);
              setEditDate(null);
              toast.error('取消');
            }}
          >
            取消
          </CUIButton>
        </Box>
      </Section>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '50px',
          borderTop: myBorder,
          bgcolor: 'var(  --steel-light-grey)',
          boxShadow: 'rgba(0, 0, 0, 0.3) 0 15px 15px',
          paddingLeft: 1.5,
          paddingRight: 4,
        }}
      >
        <Box sx={{ ...scheduleTitleStyle, width: scheduleItemWdith[0] }}>
          {type == 'exercise' ? '運動種類' : '食物種類'}
        </Box>
        <Box sx={{ ...scheduleTitleStyle, width: scheduleItemWdith[1] }}>
          {type == 'exercise' ? '重量' : '卡路里 (kcal)'}
        </Box>
        <Box sx={{ ...scheduleTitleStyle, width: scheduleItemWdith[2] }}>
          {type == 'exercise' ? '次數' : '蛋白質 (g)'}
        </Box>
        <Box
          sx={{
            ...scheduleTitleStyle,
            width: scheduleItemWdith[3],
            borderRight: 'none',
          }}
        >
          組數
        </Box>
      </Box>
      <Section
        sx={{
          height: '600px',
          // height: '100%',
          overflow: 'auto',
          position: 'relative',
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
        <div
          style={{
            width: '100%',
          }}
        >
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="items">
              {(provided) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 3,
                    width: '100%',
                  }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {scheduleList.map((scheduleItem, i) => {
                    let Num1;
                    let Num2;
                    if (type === 'exercise') {
                      Num1 = scheduleItem.reps;
                      Num2 = scheduleItem.sets;
                    } else {
                      Num1 = scheduleItem.calories;
                      Num2 = scheduleItem.protein;
                    }
                    const dragID = scheduleItem.id || scheduleItem.sid;

                    return (
                      <Draggable
                        key={dragID.toString()}
                        draggableId={dragID.toString()}
                        index={i}
                      >
                        {(provided) => (
                          <Box
                            // key={scheduleItem.id || scheduleItem.sid}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            component={Box}
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              my: 0.5,
                              width: '100%',
                              minWidth: 'auto', // Set min-width to auto
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.1)', // Add your desired hover effect
                                cursor: 'pointer', // Change cursor to pointer on hover
                                borderRadius: '30px',
                              },
                            }}
                            onClick={(e) => {
                              handleDialogOpen(scheduleItem);
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                my: 0.5,
                                width: '100%',
                              }}
                            >
                              <SUIScheduleItem
                                sx={{
                                  borderTopLeftRadius: '30px',
                                  borderBottomLeftRadius: '30px',
                                  width: scheduleItemWdith[0],
                                }}
                              >
                                {scheduleItem.name}
                              </SUIScheduleItem>
                              <SUIScheduleItem
                                sx={{ width: scheduleItemWdith[1] }}
                              >
                                {scheduleItem.quantity}
                              </SUIScheduleItem>
                              <SUIScheduleItem
                                sx={{ width: scheduleItemWdith[2] }}
                              >
                                {Num1}
                              </SUIScheduleItem>
                              <SUIScheduleItem
                                sx={{
                                  width: scheduleItemWdith[3],
                                  borderTopRightRadius: '30px',
                                  borderBottomRightRadius: '30px',
                                  borderRight: myBorder,
                                  display: 'flex',
                                  justifyContent: 'end',
                                }}
                              >
                                <Box sx={{ ...SUIScheduleItemNum2 }}>
                                  {Num2}
                                </Box>

                                {/* >>> Delete Button >>> */}
                                <ButtonBase
                                  sx={{
                                    p: 0, // Set padding to 0
                                    minWidth: 'auto', // Set min-width to auto
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(scheduleItem);
                                  }}
                                >
                                  <CancelIcon
                                    sx={{
                                      fontSize: 30,
                                      color: 'var(--main-red)',
                                    }}
                                  />
                                </ButtonBase>
                                {/* <<< Delete Button <<< */}
                              </SUIScheduleItem>
                            </Box>
                          </Box>
                        )}
                      </Draggable>
                    );
                  })}
                  {/* >>> dialog */}
                  {type === 'exercise' && dialogOpen && (
                    <ExeCardDialog
                      open={dialogOpen}
                      onClose={handleDialogClose}
                      item={selectedItem}
                      setSelectedItem={setSelectedItem}
                      exerciseScheduleList={scheduleList}
                      setExerciseScheduleList={setScheduleList}
                    />
                  )}
                  {/* <<< dialog */}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Section>
    </>
  );
}

const MyScheduleTable = styled(Grid)(() => ({
  border: myBorder,
  borderRadius: '5px',
  //   height: '1000px',
}));

function SUIScheduleTable(props) {
  return (
    <MyScheduleTable elevation={4} sx={props.sx} onClick={props.onClick}>
      {props.children}
    </MyScheduleTable>
  );
}

export { SUISchedule, SUIScheduleTable };
