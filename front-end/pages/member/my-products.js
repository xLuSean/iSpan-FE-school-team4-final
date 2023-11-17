import MemberCenterLayout from '@/components/layout/memberCenterLayout';
import MyProductsComponent from '@/components/member/my-products';

export default function MyProducts() {
  return <MyProductsComponent />;
}
MyProducts.getLayout = (page) => (
  <MemberCenterLayout>{page}</MemberCenterLayout>
);
