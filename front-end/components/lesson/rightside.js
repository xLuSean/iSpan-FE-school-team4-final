import { Box, IconButton, ToggleButtonGroup } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';

import LessonCard from './lesson-card';
import UiButton from '../hh/UiButton';
import CUICard from '../customUI/cui-card';
import CUISelect from '../customUI/cui-select';
import LessonCardSkeleton from './lesson-card-skeleton';

const rightSideStyle = {
  width: '65%',
  '@media (max-width: 1000px)': {
    width: '100%',
  },
  borderRadius: '3px',
};

const headerStyle = {
  position: 'sticky',
  top: '1rem',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '1rem',
  marginBottom: '1rem',
  boxShadow: '0 3px 5px #555',
  backdropFilter: 'blur(5px)',
  bgcolor: 'rgba(180, 180, 180, .95)',
  borderRadius: '3px',
  zIndex: 2,
};

const filterIconStyle = {
  visibility: 'hidden',
  position: 'absolute',
  top: '120%',
  left: '.5rem',
  bgcolor: 'var(--steel-grey)',
  color: 'white',
  borderRadius: '50%',
  transition: 'transform .2s',
  ':hover': {
    transform: 'scale(1.2)',
    bgcolor: 'var(--steel-grey)',
  },
  '@media (max-width: 1000px)': {
    visibility: 'visible',
  },
};

const sortIconStyle = {
  position: 'relative',
  marginLeft: 'auto',
  bgcolor: 'var(--steel-grey)',
  color: 'white',
  borderRadius: '3px',
  transition: '.2s',
  ':hover': {
    bgcolor: 'var(--steel-grey)',
    color: 'inherit',
    filter: 'brightness(90%)',
  },
};

const sortSelectStyle = {
  position: 'absolute',
  inset: 0,
  flexGrow: 1,
  opacity: 0,
};

const RightSide = ({
  lessons,
  setLessons,
  showFilter,
  location,
  setLocation,
  displayMode,
  sortLessons,
}) => {
  if (!Array.isArray(lessons)) throw new Error('lessons should be Array type');
  return (
    <Box sx={rightSideStyle}>
      <Box sx={headerStyle}>
        <Box>
          <ToggleButtonGroup
            value={location}
            exclusive
            aria-label="lessonlocation"
            onChange={(event, value) => value !== null && setLocation(value)}
          >
            <UiButton value="taipei" aria-label="taipei">
              台北
            </UiButton>
            <UiButton value="taichung" aria-label="taichung">
              台中
            </UiButton>
            <UiButton value="kaohsiung" aria-label="kaohsiung">
              高雄
            </UiButton>
          </ToggleButtonGroup>
        </Box>
        <IconButton sx={sortIconStyle}>
          <CUISelect
            sx={sortSelectStyle}
            color={'steel_grey'}
            onChange={(event) => {
              sortLessons(event.target.value);
            }}
            options={[
              { label: '時間最近', value: 'timeASC' },
              { label: '時間最遠', value: 'timeDESC' },
              { label: '價格最高', value: 'priceASC' },
              { label: '價格最低', value: 'priceDESC' },
            ]}
          />
          <SortIcon />
        </IconButton>
        <IconButton size="large" sx={filterIconStyle} onClick={showFilter}>
          <FilterAltIcon />
        </IconButton>
      </Box>
      {displayMode === 'list' &&
        (lessons.length === 0 ? (
          <CUICard
            sx={{
              mt: 5,
              p: 2,
              bgcolor: 'var(--steel-grey)',
              color: 'white',
              width: '100%',
              textAlign: 'center',
            }}
          >
            目前沒有符合條件的課程
          </CUICard>
        ) : (
          lessons.map((lesson, index) => (
            <LessonCard key={index} lesson={lesson} setLessons={setLessons} />
          ))
        ))}
      {displayMode === 'skeleton' &&
        [...Array(3)].map((value, index) => <LessonCardSkeleton key={index} />)}
    </Box>
  );
};

export default RightSide;
