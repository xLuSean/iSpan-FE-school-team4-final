import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styles from './space-find-component.module.css';
const GYMTYPE = ['棒球場', '籃球場', '田徑場', '足球場', '游泳池', '壘球場'];
export default function GymTypeSelect({
  value = '',
  setgymType = () => {},
  setGymData = () => {},
}) {
  const handleChange = (e) => {
    setgymType(e.target.value);
    setGymData([]);
  };
  return (
    <FormControl className={`${styles['gym-type-select']}`}>
      <InputLabel id="demo-simple-select-label">請選擇場地種類</InputLabel>
      <Select
        sx={{ width: '120px' }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Age"
        onChange={handleChange}
      >
        {GYMTYPE.map((v) => (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
