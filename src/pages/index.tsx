//CSS Module
import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode, useEffect } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = () => {
    // 서버측에서 실행되는 함수. 따라서 브라우저에서 console.log해도 찍히지 않음
    //SSR(서버사이드렌더링)
    // 페이지 컴포넌트보다 먼저 실행이되어서, 해당 페이지 컴포넌트에 필요한 데이터 불러오는 함수

    // 이 코드 실행시 에러! 자바스크립트에서 window는 브라우저를 의미함.
    // 에러의 이유는 서버에는 브라우저가 없다
    // 즉, 서버에서 실행될때, window는 undefined이므로 이 undefined에서 property인 location을 사용하겠다는것이므로 에러발생
    //window.location
    console.log('서버사이드렌더링');

    const data = 'hello';

    return {
        props: {
            data,
        },
    };
};

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    //아래와 같이 콘솔을 찍어보면 2번찍히는데, 서버에서 처음 실행될때 1번 그리고
    // 나중에 서버로부터 js번들을 받게될때 브라우저에서 한번 찍혀서 총2번찍힘
    // 하지만 서버에서 처음 실행될때는 visual코드 콘솔창에서 찍히고, 그 후 브라우저에서는 개발자도구의 console에 찍힘
    console.log(data);

    //아래 useEffect훅은 브라우저에서 컴포넌트가 마운트 될때 실행되므로, 서버에서 아래 useEffect는 실행되지 않음 -> 따라서 한번만 콘솔에 찍힘
    useEffect(() => {
        console.log(window);
    }, []);

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                {' '}
                <h3>등록된 모든 도서</h3>
                {books.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
