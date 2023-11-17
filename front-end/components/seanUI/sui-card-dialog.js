import { Dialog, DialogContent, Box, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import Zoom from '@mui/material/Zoom';
import CUITextField from '../customUI/cui-textfield';
import CUIButton from '../customUI/cui-button';
import { toast } from 'react-hot-toast';

// regular expression for positive Integer, cant be zero
const regexPInt = /^[1-9]\d*$/;
// regular expression for positive number, cant be zero
const regexP = /^(?!0\d)(?:\d*\.\d+|\d+)$/;

const pHelperText = '請輸入正數';
const pIHelperText = '請輸入正整數';

// TODO: DietCardDialog
// NOTE: try as moduler as possible
function ExeCardDialog({
  open,
  onClose,
  item,
  setSelectedItem,
  exerciseScheduleList,
  setExerciseScheduleList,
}) {
  // console.log(item);
  const customTransitionDuration = 500; // milliseconds
  // console.log(item)
  const inputDefault = {
    quantity: { error: false, text: '' },
    reps: { error: false, text: '' },
    sets: { error: false, text: '' },
  }; //=== for input validation
  const [input, setInputExam] = useState(inputDefault);

  const handleSubmit = (event) => {
    // TODO: edit if id exist
    event.preventDefault(); // Prevent default form submission behavior

    // if exerciseScheduleList has obj.id equal to item.id, then its editing
    // else its adding
    const isID = exerciseScheduleList.some(
      (obj) =>
        (!!obj.id && obj.id === item.id) || (obj.sid && obj.sid === item.sid)
    );

    // console.log(isID);
    if (isID) {
      setExerciseScheduleList(
        [...exerciseScheduleList].map((obj) => {
          // return obj;// for test
          if (
            (!!obj.id && obj.id === item.id) ||
            (obj.sid && obj.sid === item.sid)
          ) {
            // console.log(!!obj.sid, !!obj.id);
            return {
              ...obj,
              quantity: item.quantity,
              reps: item.reps,
              sets: item.sets,
            };
          } else {
            return obj;
          }
        })
      );
    } else {
      setExerciseScheduleList([
        ...exerciseScheduleList,
        {
          id: crypto.randomUUID(),
          typeID: item.sid,
          name: item.exercise_name,
          exercise_description: item.exercise_description,
          img: item.img,
          vid: item.vid,
          quantity: item.quantity,
          reps: item.reps,
          sets: item.sets,
        },
      ]);
    }

    // console.log(exerciseScheduleList[0]);
    onClose();
  };

  // === handle dialog的各種close方式
  const handleClose = () => {
    onClose();
    setInputExam({ ...inputDefault });
  };
  // useEffect(() => {
  //   console.log('123');
  // }, []);

  return (
    // FIXME: dialog width

    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Zoom}
      transitionDuration={customTransitionDuration}
      PaperProps={{ sx: { borderRadius: '30px' } }}
    >
      {/* {console.log(item)} */}
      {/* <DialogTitle>{item?.exercise_name || item?.name}</DialogTitle> */}
      <DialogContent>
        <Box sx={{ fontSize: '2.5rem' }}>
          {'運動類型: ' + item?.exercise_name}
        </Box>
        {item.vid ? (
          <iframe
            width="100%"
            // FIXME: height?
            height="400px"
            // src="https://www.youtube.com/embed/gcNh17Ckjgg"
            src={`${item.vid}&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img
            src={
              `${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/record/exercise/` +
              item.img
            }
            alt="Item"
            style={{ width: '100%' }}
          />
        )}
        {/* {console.log(item?.quantity)} */}
        <Box sx={{ fontSize: '1.5rem' }}>
          {'訓練方法: ' + item?.exercise_description}
        </Box>
        <CUITextField
          label="重量(kg)"
          type="number"
          helperText={input.quantity.text}
          error={input.quantity.error}
          value={item?.quantity || ''}
          onChange={(e) => {
            // >>> if pass exam, setSelectedItem, else setInputExam give error
            const quantity = e.target.value;
            if (regexP.test(quantity)) {
              setInputExam((prevInput) => ({
                ...prevInput,
                quantity: {
                  text: '',
                  error: false,
                },
              }));
              setSelectedItem((prevItem) => ({
                ...prevItem,
                quantity: quantity,
              }));
            } else {
              setInputExam((prevInput) => ({
                ...prevInput,
                quantity: {
                  text: pHelperText,
                  error: true,
                },
              }));
              setSelectedItem((prevItem) => ({
                ...prevItem,
                quantity: '',
              }));
            }
          }}
          // <<< if pass exam, setSelectedItem, else setInputExam give error
          sx={{ width: '25%', mx: 2 }}
          required
        />
        <CUITextField
          label="次數"
          type="number"
          helperText={input.reps.text}
          error={input.reps.error}
          value={item?.reps || ''} //NOTE:to delete last digit
          onChange={(e) => {
            // >>> if pass exam, setSelectedItem, else setInputExam give error
            const reps = e.target.value;
            if (regexPInt.test(reps)) {
              setInputExam((prevInput) => ({
                ...prevInput,
                reps: {
                  text: '',
                  error: false,
                },
              }));
              setSelectedItem((prevItem) => ({
                ...prevItem,
                reps: reps,
              }));
            } else {
              setInputExam((prevInput) => ({
                ...prevInput,
                reps: {
                  text: pIHelperText,
                  error: true,
                },
              }));
              setSelectedItem((prevItem) => ({
                ...prevItem,
                reps: '',
              }));
            }
          }}
          // <<< if pass exam, setSelectedItem, else setInputExam give error
          sx={{ width: '25%', mx: 2 }}
          required
        />
        <CUITextField
          label="組數"
          type="number"
          helperText={input.sets.text}
          error={input.sets.error}
          value={item?.sets || ''} //NOTE:to delete last digit
          onChange={(e) => {
            // >>> if pass exam, setSelectedItem, else setInputExam give error
            const sets = e.target.value;
            if (regexPInt.test(sets)) {
              setInputExam((prevInput) => ({
                ...prevInput,
                sets: {
                  text: '',
                  error: false,
                },
              }));
              setSelectedItem((prevItem) => ({
                ...prevItem,
                sets: sets,
              }));
            } else {
              setInputExam((prevInput) => ({
                ...prevInput,
                sets: {
                  text: pIHelperText,
                  error: true,
                },
              }));
              setSelectedItem((prevItem) => ({
                ...prevItem,
                sets: '',
              }));
            }
          }}
          // <<< if pass exam, setSelectedItem, else setInputExam give error
          sx={{ width: '25%', mx: 2 }}
          required
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {' '}
          <CUIButton
            onClick={() => {
              onClose();
              // toast.error('取消');
            }}
            color={'steel_grey'}
            sx={{ width: '35%', mx: 1 }}
          >
            取消
          </CUIButton>
          <CUIButton
            color={'light_grey'}
            sx={{
              width: '35%',
              mx: 1,
            }}
            onClick={handleSubmit}
            disabled={
              input.quantity.error ||
              input.reps.error ||
              input.sets.error ||
              !regexP.test(item?.quantity) ||
              !regexPInt.test(item?.reps) ||
              !regexPInt.test(item?.sets)
            }
          >
            加入
          </CUIButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export { ExeCardDialog };
