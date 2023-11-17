import { Grid, Box } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
// =========================================================================
import CUISelect from '@/components/customUI/cui-select';
import CUIButton from '@/components/customUI/cui-button';
import CUITextField from '@/components/customUI/cui-textfield';
// =========================================================================
import { SUIDataBox } from '@/components/seanUI/sui-input';
import { nutritionRegression } from '@/pages/record/nutritionCalc';
// =========================================================================
import { useDebounceHH } from '../customHook/useDebounce';
// =========================================================================
import style from '@/pages/record/record.module.css';
//>>> style
const myBorderWidth = '2px';
const myBorderColor = 'black';
const myBorder = `${myBorderWidth} solid ${myBorderColor}`;
const myBorderRadius = '30px';
const myBackgroundColor = 'var(--light-gray)';
const myBGstyle = { borderRadius: myBorderRadius, bgcolor: myBackgroundColor };

const NuBorder = `4px solid black`;
const NuBorderRadius = '30px';

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
  width: '100%',
}));
//<<< style
// =========================================================================
const activity = [
  { value: 1.2, label: '身體活動趨於靜態(BMR x 1.2)' },
  { value: 1.375, label: '輕量活動(BMR x 1.375)' },
  { value: 1.55, label: '中度活動量(BMR x 1.55)' },
  { value: 1.72, label: '高度活動量(BMR x 1.72)' },
  { value: 1.9, label: '非常高度活動量(BMR x 1.9)' },
];
const TDEEcalculate = (gender, bodyData, multiplier) => {
  // ref: https://reference.medscape.com/calculator/846/mifflin-st-jeor-equation
  let TDEE;

  if (gender === 'female') {
    TDEE =
      10 * bodyData.weight.value +
      6.25 * bodyData.height.value -
      5 * bodyData.age.value -
      161;
  } else {
    TDEE =
      10 * bodyData.weight.value +
      6.25 * bodyData.height.value -
      5 * bodyData.age.value +
      5;
  }

  TDEE *= multiplier;
  return Math.round(TDEE);
  //   Females: (10*weight [kg]) + (6.25*height [cm]) – (5*age [years]) – 161
  // Males: (10*weight [kg]) + (6.25*height [cm]) – (5*age [years]) + 5
  // Multiply by scale factor for activity level:
  // Sedentary *1.2
  // Lightly active *1.375
  // Moderately active *1.55
  // Active *1.725
  // Very active *1.9
};

const BMIcalculate = (bodyData) => {
  return Number(
    (bodyData.weight.value / (bodyData.height.value / 100) ** 2).toFixed(1)
  );
};

const DietFisrtPage = () => {
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const bodyDataDefault = {
    age: { value: null, error: false, text: '' },
    height: { value: null, error: false, text: '' },
    weight: { value: null, error: false, text: '' },
  };
  const genderDefault = null;
  const BmiTdeeDefault = { BMI: null, TDEE: null };
  const multiplierDefault = '';
  const nutritionDefault = {
    grains: {
      total: 0,
      unrefined: 0,
      else: 0,
    },
    beanFishEggMeat: 0,
    dairy: 0,
    vegetable: 0,
    fruits: 0,
    oilNuts: {
      total: 0,
      oil: 0,
      nuts: 0,
    },
  };
  // ===
  const pHelperText = '請輸入正數';
  const pIHelperText = '請輸入正整數';
  // regular expression for positive Integer, cant be zero
  const regexPInt = /^[1-9]\d*$/;
  // regular expression for positive number, cant be zero
  const regexP = /^(?!0\d)(?:\d*\.\d+|\d+)$/;
  const [bodyData, setBodyData] = useState(bodyDataDefault); //=== for input
  const [gender, setGender] = useState(genderDefault); // State to hold the selected gender
  const [BmiTdee, setBmiTdee] = useState(BmiTdeeDefault);
  const [multiplier, setMultiplier] = useState(multiplierDefault);
  const [nutrition, setNutrition] = useState({});
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  const handleGenderRadio = (event) => {
    setGender(event.target.value);
  };
  const handleCancel = () => {
    setGender(genderDefault);
    setBodyData(bodyDataDefault);
    setMultiplier(multiplierDefault);
    setBmiTdee(BmiTdeeDefault);
    setNutrition({});
  };

  const handleCalc = () => {
    setBmiTdee((prev) => {
      return {
        ...prev,
        TDEE: TDEEcalculate(gender, bodyData, multiplier),
        BMI: BMIcalculate(bodyData),
      };
    });
  };

  useDebounceHH(() => {
    if (BmiTdee.TDEE) {
      const nutritionUpdate = nutritionRegression(BmiTdee.TDEE);
      setNutrition(nutritionUpdate);
    }
  }, [BmiTdee]);

  return (
    <div
      id="page-1"
      style={{
        // marginTop: '50px',
        paddingLeft: '200px',
        paddingRight: '200px',
        height: '100%',
      }}
    >
      {/* <div sx={{ padding: '64px' }}> */}
      <Grid container justifyContent="center">
        <Grid
          item
          lg={4}
          sm={4}
          sx={{
            p: 2,
          }}
        >
          <Section sx={{ ...myBGstyle }}>
            <h1>計算你的基礎代謝率</h1>
            <FormControl component="fieldset">
              <RadioGroup
                name="gender"
                value={gender}
                onChange={handleGenderRadio}
              >
                <Grid container direction="row" alignItems="center">
                  <Grid item>
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                  </Grid>
                </Grid>
              </RadioGroup>
            </FormControl>
            <CUITextField
              id="age"
              label="年齡(yrd)"
              type="number"
              helperText={bodyData.age.text}
              error={bodyData.age.error}
              value={bodyData.age.value || ''}
              onChange={(e) => {
                // >>> if pass exam, setSelectedItem, else setInputExam give error
                const value = e.target.value;
                // console.log(bodyData);
                if (regexPInt.test(value)) {
                  setBodyData((prev) => {
                    return {
                      ...prev,
                      age: { value: value, error: false, text: '' },
                    };
                  });
                } else {
                  setBodyData((prev) => {
                    return {
                      ...prev,
                      age: { value: '', error: true, text: pIHelperText },
                    };
                  });
                }
                // <<< if pass exam, setSelectedItem, else setInputExam give error
              }}
            />

            <CUITextField
              id="weight"
              label="身高(cm)"
              type="number"
              helperText={bodyData.height.text}
              error={bodyData.height.error}
              value={bodyData.height.value || ''}
              onChange={(e) => {
                const value = e.target.value;
                if (regexP.test(value)) {
                  setBodyData((prev) => {
                    return {
                      ...prev,
                      height: { value: value, error: false, text: '' },
                    };
                  });
                } else {
                  setBodyData((prev) => {
                    return {
                      ...prev,
                      height: {
                        value: '',
                        error: true,
                        text: pHelperText,
                      },
                    };
                  });
                }
              }}
            />

            <CUITextField
              id="weight"
              label="體重(kg)"
              type="number"
              helperText={bodyData.weight.text}
              error={bodyData.weight.error}
              value={bodyData.weight.value || ''}
              onChange={(e) => {
                // >>> if pass exam, setSelectedItem, else setInputExam give error
                const value = e.target.value;
                if (regexP.test(value)) {
                  setBodyData((prev) => {
                    return {
                      ...prev,
                      weight: { value: value, error: false, text: '' },
                    };
                  });
                } else {
                  setBodyData((prev) => {
                    return {
                      ...prev,
                      weight: {
                        value: '',
                        error: true,
                        text: pHelperText,
                      },
                    };
                  });
                }
                // <<< if pass exam, setSelectedItem, else setInputExam give error
              }}
            />

            <CUISelect
              sx={{ width: '100%', m: 1 }}
              label="活動型態"
              options={activity}
              value={multiplier}
              onChange={(e) => {
                // console.log(e.target.value);
                setMultiplier(e.target.value);
                // console.log(multiplier);
              }}
            />
            {/* {console.log(multiplier)} */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                m: 2,
              }}
            >
              {/* {console.log(multiplier, !!gender)} */}
              <CUIButton
                sx={{
                  width: '25%',
                  marginLeft: '20px',
                  transform: 'scale(1.2)',
                  bgcolor: 'var(--steel-grey)',
                }}
                onClick={() => handleCancel()}
              >
                取消
              </CUIButton>
              <CUIButton
                color={'light_grey'}
                sx={{
                  width: '40%',
                  marginRight: '20px',
                  transform: 'scale(1.2)',
                }}
                onClick={() => handleCalc()}
                disabled={
                  bodyData.age.error ||
                  bodyData.weight.error ||
                  bodyData.height.error ||
                  !regexPInt.test(bodyData.age.value) ||
                  !regexP.test(bodyData.height.value) ||
                  !regexP.test(bodyData.weight.value) ||
                  !multiplier ||
                  !gender
                }
              >
                {/* {console.log(BmiTdee)} */}
                {/* {console.log(
              bodyData.age.error,
              bodyData.weight.error,
              bodyData.height.error
            )} */}
                開始計算
              </CUIButton>
            </Box>
          </Section>
          <Section>
            <SUIDataBox title={'BMI:'} result={BmiTdee.BMI} />
          </Section>
          <Section>
            <SUIDataBox title={'TDEE:'} result={BmiTdee.TDEE} />
          </Section>
        </Grid>
        <Grid
          item
          lg={8}
          sm={8}
          sx={{
            p: 2,
          }}
        >
          <Box
            sx={{
              ...myBGstyle,
              p: 1,
              // bgcolor: 'var(--steel-grey)',
              // color: 'var(--light-gray)',
            }}
          >
            <Section sx={{ fontSize: '27px' }}>
              BMR 指人體在靜止休息狀態下，維持新陳代謝所需的熱量。BMR
              會隨著年紀增加或體重減輕而降低，會隨著肌肉量增加而上升。
            </Section>
            <Section sx={{ fontSize: '27px' }}>
              TDEE
              是身體一整天下來，包括基礎代謝、活動量、吃東西所消耗的熱量。不同的生活型態需要的熱量也不一樣，當每天攝取的熱量和
              TDEE 相等，便達到「熱量平衡」。
            </Section>
          </Box>
          <Section sx={{ ...myBGstyle, marginTop: 5 }}>
            <h1>飲食建議</h1>
            <NuBox sx={{ border: NuBorder, borderRadius: NuBorderRadius }}>
              <NuBox sx={{ display: 'flex', flexDirection: 'row' }}>
                <NuBox
                  sx={{
                    width: '50%',
                    borderRight: NuBorder,
                    borderBottom: NuBorder,
                  }}
                >
                  <NuBox sx={{ fontSize: '27px', flexDirection: 'row' }}>
                    全穀雜糧類
                    <span style={{ color: 'green', fontSize: '48px' }}>
                      {nutrition?.grains?.total || 0}
                    </span>
                    份
                  </NuBox>
                  <NuBox>
                    <NuBox sx={{ fontSize: '18px', flexDirection: 'row' }}>
                      未精緻
                      <span style={{ color: 'green', fontSize: '36px' }}>
                        {nutrition?.grains?.unrefined || 0}
                      </span>
                      份
                    </NuBox>
                    <NuBox sx={{ fontSize: '18px', flexDirection: 'row' }}>
                      其他
                      <span style={{ color: 'green', fontSize: '36px' }}>
                        {nutrition?.grains?.else || 0}
                      </span>
                      份
                    </NuBox>
                  </NuBox>
                </NuBox>

                <NuBox
                  sx={{
                    width: '50%',
                    height: '100%',
                    borderBottom: NuBorder,
                  }}
                >
                  <NuBox
                    sx={{
                      borderBottom: NuBorder,
                      height: '50%',
                      fontSize: '27px',
                      flexDirection: 'row',
                    }}
                  >
                    豆魚蛋肉
                    <span style={{ color: 'green', fontSize: '48px' }}>
                      {nutrition?.beanFishEggMeat || 0}
                    </span>
                    份
                  </NuBox>
                  <NuBox
                    sx={{
                      height: '50%',
                      fontSize: '27px',
                      flexDirection: 'row',
                    }}
                  >
                    乳品類
                    <span style={{ color: 'green', fontSize: '48px' }}>
                      {nutrition?.dairy || 0}
                    </span>
                    份
                  </NuBox>
                </NuBox>
              </NuBox>
              {/* ================================================ */}
              <NuBox sx={{ display: 'flex', flexDirection: 'row' }}>
                <NuBox sx={{ width: '50%', borderRight: NuBorder }}>
                  <NuBox sx={{ fontSize: '27px', flexDirection: 'row' }}>
                    油脂與堅果種子
                    <span style={{ color: 'green', fontSize: '48px' }}>
                      {nutrition?.oilNuts?.total || 0}
                    </span>
                    份
                  </NuBox>
                  <NuBox>
                    <NuBox sx={{ fontSize: '18px', flexDirection: 'row' }}>
                      油脂
                      <span style={{ color: 'green', fontSize: '36px' }}>
                        {nutrition?.oilNuts?.oil || 0}
                      </span>
                      份
                    </NuBox>
                    <NuBox sx={{ fontSize: '18px', flexDirection: 'row' }}>
                      堅果種子
                      <span style={{ color: 'green', fontSize: '36px' }}>
                        {nutrition?.oilNuts?.nuts || 0}
                      </span>
                      份
                    </NuBox>
                  </NuBox>
                </NuBox>

                <NuBox
                  sx={{
                    width: '50%',
                    height: '100%',
                  }}
                >
                  <NuBox
                    sx={{
                      height: '50%',
                      borderBottom: NuBorder,
                      fontSize: '27px',
                      flexDirection: 'row',
                    }}
                  >
                    蔬菜類
                    <span style={{ color: 'green', fontSize: '48px' }}>
                      {nutrition?.vegetable || 0}
                    </span>
                    份
                  </NuBox>
                  <NuBox
                    sx={{
                      height: '50%',
                      fontSize: '27px',
                      flexDirection: 'row',
                    }}
                  >
                    水果類
                    <span style={{ color: 'green', fontSize: '48px' }}>
                      {nutrition?.fruits || 0}
                    </span>
                    份
                  </NuBox>
                </NuBox>
              </NuBox>
            </NuBox>
          </Section>
        </Grid>
      </Grid>
    </div>
  );
};

export default DietFisrtPage;
