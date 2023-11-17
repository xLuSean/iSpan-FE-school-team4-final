import React from 'react';
import MemberCenterLayout from '@/components/layout/memberCenterLayout';
import MyOrdersComponent from '@/components/member/my-orders';

export default function MyOrders() {
  return <MyOrdersComponent />;
}
MyOrders.getLayout = (page) => <MemberCenterLayout>{page}</MemberCenterLayout>;
