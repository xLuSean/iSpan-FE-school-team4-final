import { Fragment, useEffect, useState, useRef } from 'react';
import { Box, Chip, Container, Grid, Typography } from '@mui/material';
import CUICard from '@/components/customUI/cui-card';

import Image from 'next/image';
import LessonCard from '@/components/lesson/lesson-card';
import BrickWallPaper from '@/components/brick-wallpaper';

import { useAuth } from '@/context/auth/useAuth';
import { getAuthHeaders, setAuthCache } from '@/hh_global/authCache';

import {
  containerStyle,
  cardBoxStyle,
  imgBoxStyle,
  cardBodyStyle,
  cardBodyTitle,
  cardBodyInfo,
  tagStyle,
  coachNameBoxStyle,
  lessonsBoxStyle,
  lessonsCardGridStyle,
  locationTitleStyle,
} from '@/styles/lesson-style/lesson-id-style';

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_PORT}/lesson/categories`
  );
  const data = await res.json();

  const paths = data.map((ct) => ({ params: { id: ct.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

const fetchData = async (id) => {
  const getCategoryUrl = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/lesson/categories?id=${id}`;
  const getLessonsUrl = `${process.env.NEXT_PUBLIC_BACKEND_PORT}/lesson?category=${id}`;

  const [category, rawLessons] = await Promise.all(
    [getCategoryUrl, getLessonsUrl].map(async (url) => {
      const res = await fetch(url, {
        headers: getAuthHeaders(),
      });
      return await res.json();
    })
  );

  const lessons = rawLessons.map((lesson) => {
    const [coach] = category.coachs.filter(
      (coach) => coach.sid === lesson.coach_sid
    );
    return {
      ...lesson,
      coach_img: coach.img,
      coach_img_base64: coach.img_base64,
    };
  });

  return { category, lessons };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const { category, lessons } = await fetchData(id);

  return {
    props: {
      categoryId: id,
      category,
      initLessons: lessons,
    },
  };
};

const CertainLessonPage = ({ categoryId, category, initLessons }) => {
  const { auth } = useAuth();
  setAuthCache(auth);

  const [lessons, setLessons] = useState(initLessons);
  const topRef = useRef();

  const lessonsGate = [
    {
      location: 'taipei',
      title: '台北館',
      lessons: [],
    },
    {
      location: 'taichung',
      title: '台中館',
      lessons: [],
    },
    {
      location: 'kaohsiung',
      title: '高雄館',
      lessons: [],
    },
  ];

  lessons?.forEach((lesson) => {
    lessonsGate.forEach(
      (item) => item.location === lesson.location && item.lessons.push(lesson)
    );
  });

  useEffect(() => {
    if (!auth.user?.id) return;
    (async () => {
      const { lessons } = await fetchData(categoryId);
      setLessons(lessons);
    })();
  }, [auth]);

  useEffect(() => {
    topRef.current.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }, []);

  return (
    <Box ref={topRef}>
      <BrickWallPaper />
      <Container sx={containerStyle}>
        <Box sx={cardBoxStyle}>
          <CUICard sx={imgBoxStyle}>
            <Image
              alt="lesson-img"
              src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}/imgs/lesson/lessons-img/${category.img}`}
              blurDataURL={`/lesson-img/${category.img_base64}`}
              sizes="80vw"
              fill
              style={{ objectFit: 'cover' }}
            />
          </CUICard>
          <CUICard sx={cardBodyStyle}>
            <Typography variant="h4" sx={cardBodyTitle}>
              {category.name}
            </Typography>
            <Typography variant="subtitle1" sx={cardBodyInfo}>
              {category.description}
            </Typography>
            {lessons[0].tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                color={'steel_grey'}
                sx={tagStyle}
              />
            ))}
            <Box sx={coachNameBoxStyle}>
              <Typography variant="h6">指導教練</Typography>
              {category.coachs.map((coach) => (
                <Typography key={coach.sid} variant="h5">
                  {coach.nickname}
                </Typography>
              ))}
            </Box>
          </CUICard>
        </Box>
        <Box sx={lessonsBoxStyle}>
          {lessonsGate.map((item, index) =>
            item.lessons.length === 0 ? null : (
              <Fragment key={index}>
                <Typography variant="h5" sx={locationTitleStyle}>
                  {item.title}
                </Typography>
                <Grid container sx={lessonsCardGridStyle}>
                  {item.lessons.map((lesson, lIndex) => (
                    <Grid
                      key={lIndex}
                      item
                      xs={12}
                      sm={11}
                      md={9}
                      lg={5.75}
                      xl={5.75}
                    >
                      <LessonCard
                        lesson={lesson}
                        setLessons={setLessons}
                        coachcard
                      />
                    </Grid>
                  ))}
                </Grid>
              </Fragment>
            )
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default CertainLessonPage;
