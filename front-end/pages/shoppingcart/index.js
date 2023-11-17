import Layout from '@/components/layout/layout';
import ProtectedRouteWrapper from '@/components/protected-route';
import FirstStageComponent from '@/components/shoppingcart/firststage';
import * as React from 'react';
export default function Firststage() {
  return (
    <>
      <FirstStageComponent></FirstStageComponent>
    </>
  );
}

Firststage.getLayout = (page) => (
  <ProtectedRouteWrapper>
    <Layout>{page}</Layout>
  </ProtectedRouteWrapper>
);
