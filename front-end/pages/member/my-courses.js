import MemberCenterLayout from '@/components/layout/memberCenterLayout';
import MyCoursesComponent from '@/components/member/my-courses';
export default function MyCourses() {
  return (
    <>
      <MyCoursesComponent />
    </>
  );
}
MyCourses.getLayout = (page) => <MemberCenterLayout>{page}</MemberCenterLayout>;
