import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import {
  mainContentStyle,
  flexRowSpaceBetween,
  containerStyle,
  filterStyle,
  showFilterStyle,
  filterIconStyle,
} from '@/styles/lesson-style/lesson-index-style';

import { Box, Chip, Container, Typography, IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

import Banner from '@/components/lesson/banner';
import RightSide from '@/components/lesson/rightside';

import CUISearch from '@/components/customUI/cui-search';
import CUISelect from '@/components/customUI/cui-select';
import CUISlider from '@/components/customUI/cui-slider';
import CUIDatePicker from '@/components/customUI/cui-date-picker';
import CUIFilter from '@/components/customUI/cui-filter';

import { useAuth } from '@/context/auth/useAuth';
import { getAuthHeaders, setAuthCache } from '@/hh_global/authCache';
import { handleScroll } from '@/hh_global/handleSaveLessons';

export const getStaticProps = async () => {
  const data = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_PORT}/lesson/tags`
    );
    data.tags = await res.json();
  } catch (ex) {
    data.tags = ['目前沒有標籤可選取'];
  }

  return { props: data };
};

const LISTMODE = 'list';
const SKELETONMODE = 'skeleton';
const LESSON_BASEURL = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/lesson`;

const initPrice = [200, 1500];
const initStep = 50;

const queryDatasCache = new Map();

const getFetchUrl = (baseUrl, queryObject) =>
  Object.entries(queryObject).reduce(
    (url, [key, value]) =>
      Array.isArray(value)
        ? value.reduce((item, nextItem) => `${item}${key}[]=${nextItem}&`, url)
        : `${url}${key}=${value}&`,
    `${baseUrl}?`
  );

const fetchLessons = async (baseUrl, queryObj) => {
  const response = {};
  Object.keys(queryObj).forEach(
    (key) =>
      (queryObj[key] === undefined || queryObj[key] === '') &&
      delete queryObj[key]
  );
  const fetchUrl = getFetchUrl(baseUrl, queryObj);

  try {
    const res = await fetch(fetchUrl, {
      headers: getAuthHeaders(),
    });
    const datas = await res.json();

    response.success = true;
    response.datas = datas;
  } catch (error) {
    response.success = false;
    response.error = error;
  }

  return response;
};

const shrinkString = (str) => {
  const newStr = str;
  return newStr
    .replaceAll('?', '')
    .replaceAll('=', '')
    .replaceAll('[]', '')
    .replaceAll('&', '');
};

const LessionPage = (props) => {
  const router = useRouter();
  const renderTimeRef = useRef(0);

  const { auth } = useAuth();
  setAuthCache(auth);

  const [lessons, setLessons] = useState([]);
  const [queryObject, setQueryObject] = useState({});
  const keywordRef = useRef();
  const dateAfterRef = useRef();
  const dateBeforeRef = useRef();
  const priceRef = useRef();
  const location = queryObject.location;
  const [displayMode, setDisplayMode] = useState(LISTMODE);

  const [tags, setTags] = useState(props.tags);
  const [selectTags, setSelectTags] = useState([]);

  const [filterShow, setFilterShow] = useState(false);

  const anchorRef = useRef();
  const topRef = useRef();

  const getFilterValues = () => ({
    keyword: keywordRef.current.value,
    dateAfter: dateAfterRef.current.value,
    dateBefore: dateBeforeRef.current.value,
    price: priceRef.current,
    tags: selectTags,
  });

  useEffect(() => {
    if (renderTimeRef.current < 2) {
      renderTimeRef.current += 1;
      topRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
      return;
    }
    if (!handleScroll.canScroll) {
      handleScroll.allowScroll();
      return;
    }
    anchorRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, [lessons]);

  const setLocation = (newLocation) => {
    setQueryObject((prev) => ({
      ...prev,
      ...getFilterValues(),
      location: newLocation,
    }));
  };

  const showFilter = () => setFilterShow(true);
  const closeFilter = () => setFilterShow(false);

  const sortLessons = (sortWay) => {
    const sortGate = {
      timeASC: (lessons) =>
        lessons.sort((prev, next) => (prev.time < next.time ? -1 : 1)),
      timeDESC: (lessons) =>
        lessons.sort((prev, next) => (prev.time < next.time ? 1 : -1)),
      priceASC: (lessons) =>
        lessons.sort((prev, next) => (next.price < prev.price ? -1 : 1)),
      priceDESC: (lessons) =>
        lessons.sort((prev, next) => (next.price < prev.price ? 1 : -1)),
    };
    sortGate[sortWay] &&
      setLessons((lessons) => sortGate[sortWay]([...lessons]));
  };

  const pushRouter = (queryObj) => {
    Object.keys(queryObj).forEach(
      (key) =>
        (queryObj[key] === undefined || queryObj[key] === '') &&
        delete queryObj[key]
    );
    router.push(
      {
        pathname: '',
        query: queryObj,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (Object.keys(queryObject).length === 0) return;
    if (Object.keys(queryObject).length !== 1) {
      renderTimeRef.current = 2;
    }
    setDisplayMode(SKELETONMODE);

    // check if lessons data already cache
    // const cacheLessonDatas = queryDatasCache.get(
    //   shrinkString(getFetchUrl('', queryObject))
    // );
    // if (cacheLessonDatas) {
    //   setDisplayMode(LISTMODE);
    //   setLessons(cacheLessonDatas);
    //   pushRouter(queryObject);
    //   return;
    // }

    // fetch lessons data
    (async () => {
      const res = await fetchLessons(LESSON_BASEURL, queryObject);
      if (!res.success) throw new Error(res.error);
      setDisplayMode(LISTMODE);
      setLessons(res.datas);
      pushRouter(queryObject);
      queryDatasCache.set(
        shrinkString(getFetchUrl('', queryObject)),
        res.datas
      );
    })();
  }, [queryObject]);

  // get query string from search bar and init location with taipei
  useEffect(() => {
    if (!router.isReady) return;
    setQueryObject({
      ...router.query,
      location:
        ['taipei', 'taichung', 'kaohsiung'].indexOf(router.query.location) ===
        -1
          ? 'taipei'
          : router.query.location,
    });
    const queryTags = router.query.tags;
    if (queryTags) {
      const tagsArray = Array.isArray(queryTags)
        ? Array.from(new Set(queryTags))
        : [queryTags];
      const initSelectTags = tagsArray.filter(
        (tag) => props.tags.indexOf(tag) !== -1
      );
      setSelectTags(initSelectTags);
      setTags(props.tags.filter((tag) => initSelectTags.indexOf(tag) === -1));
    }
    keywordRef.current.value = router.query.keyword || '';
    dateAfterRef.current.value = router.query.dateAfter;
    dateBeforeRef.current.value = router.query.dateBefore;
    priceRef.current = (() => {
      if (!router.query.price) return initPrice;
      const thumbs = [
        parseInt(router.query.price[0]),
        parseInt(router.query.price[1]),
      ];
      if (
        isNaN(thumbs[0]) ||
        isNaN(thumbs[1]) ||
        thumbs[0] % initStep !== 0 ||
        thumbs[1] % initStep !== 0 ||
        thumbs[0] >= thumbs[1] ||
        thumbs[0] < initPrice[0] ||
        thumbs[1] > initPrice[1] ||
        thumbs[1] - thumbs[0] < initStep
      )
        return initPrice;
      return thumbs;
    })();
  }, [router.isReady]);

  return (
    <Box ref={topRef}>
      <Banner />
      <Box sx={mainContentStyle}>
        <Container sx={containerStyle}>
          <Typography
            id="findYourLesson"
            variant="h4"
            sx={{ textAlign: 'center', py: 8, mb: '2rem' }}
          >
            尋找您喜愛的課程
          </Typography>
          <Box ref={anchorRef} sx={flexRowSpaceBetween}>
            <CUIFilter
              sx={
                filterShow
                  ? { ...filterStyle, ...showFilterStyle }
                  : filterStyle
              }
              filterIcon={
                <IconButton sx={filterIconStyle} onClick={closeFilter}>
                  <CancelIcon />
                </IconButton>
              }
              color={'steel_grey'}
              label="篩選器"
              onClick={() => {
                setQueryObject((prev) => ({ ...prev, ...getFilterValues() }));
                closeFilter();
              }}
              items={[
                <CUISearch
                  key={keywordRef.current ? 'search' : 'search-pending'}
                  color={'steel_grey'}
                  label="課程關鍵字"
                  inputRef={keywordRef}
                  placeholder="教練名稱、課程名稱..."
                />,
                <>
                  <CUISelect
                    key={'select'}
                    color={'steel_grey'}
                    label="課程標籤"
                    value=""
                    options={tags}
                    SelectProps={{
                      onOpen: (e) => e.target.blur(),
                    }}
                    onChange={(event) => {
                      const newSelect = [...selectTags, event.target.value];
                      const newTags = tags.filter(
                        (tag) => tag !== event.target.value
                      );
                      setTags(newTags);
                      setSelectTags(newSelect);
                    }}
                  />
                  <Box key={'tag-box'}>
                    {selectTags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        sx={{ margin: '1rem .2rem -0.5rem 0' }}
                        onDelete={() => {
                          const newState = selectTags.filter(
                            (item) => item !== tag
                          );
                          const newTags = [...tags, tag];
                          newTags.sort(
                            (t1, t2) =>
                              props.tags.indexOf(t1) - props.tags.indexOf(t2)
                          );
                          setTags(newTags);
                          setSelectTags(newState);
                        }}
                      />
                    ))}
                  </Box>
                </>,
                <CUIDatePicker
                  key={'date-after'}
                  label="此日期後的課程"
                  color={'steel_grey'}
                  value={(() => {
                    if (!dateAfterRef.current) return undefined;
                    return dateAfterRef.current.value === '' ||
                      dateAfterRef.current.value === 'YYYY/MM/DD'
                      ? undefined
                      : dateAfterRef.current.value;
                  })()}
                  inputRef={dateAfterRef}
                />,
                <CUIDatePicker
                  key={'date-before'}
                  label="此日期前的課程"
                  color={'steel_grey'}
                  value={(() => {
                    if (!dateBeforeRef.current) return undefined;
                    return dateBeforeRef.current.value === '' ||
                      dateBeforeRef.current.value === 'YYYY/MM/DD'
                      ? undefined
                      : dateBeforeRef.current.value;
                  })()}
                  inputRef={dateBeforeRef}
                />,
                <CUISlider
                  key={priceRef.current ? 'price-slider' : 'p-s-pending'}
                  label="價格範圍"
                  value={(() => {
                    if (!priceRef.current) return undefined;
                    return [priceRef.current[0], priceRef.current[1]];
                  })()}
                  min={initPrice[0]}
                  max={initPrice[1]}
                  onChange={(price) => (priceRef.current = price)}
                />,
              ]}
            />
            <RightSide
              showFilter={showFilter}
              location={location}
              setLocation={setLocation}
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
              lessons={lessons}
              setLessons={setLessons}
              sortLessons={sortLessons}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LessionPage;
