import GlobalLayout from '@/components/global-layout';
import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode; // index.tsx의 getLayout 경우, 리턴이 <SearchableLayout>{page}</SearchableLayout>; 즉 JSX요소임
    //이 JSX 요소를 화면에 렌더링해야하므로 반환타입은 ReactNode임
};

//Next.js에서 모든 페이지를 감싸는 공통 레이아웃 처리용 컴포넌트
//Component: 현재 라우트에 해당하는 페이지 컴포넌트 (ex)index.tsx)
//pageProps: getServerSideProps, getStaticProps 등에서 전달된 데이터
// 처음 AppProps는 getLayout속성없이 딱 페이지만 있음
// 따라서 Component를 NextPageWithLayout으로 재정의함으로써 NextPage타입과  getLayout속성을 얻게됨 -> 기존 AppProps의 Component타입을 새로 덮어씌움
export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout }) {
    //??는 Nullish Coalescing Operator
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
