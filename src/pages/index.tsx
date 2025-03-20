//CSS Module
import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode, useEffect } from 'react';
import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import fetchBooks from '@/lib/fetch-books';
import fetchRandomBooks from '@/lib/fetch-random-books';

// async는 getServerSideProps가 Promise를 반환하도록 만들기 위해 필요함.
// async가 있어야 await을 사용할 수 있음.
export const getServerSideProps = async () => {
    // getServerSideProps라는 특수한 이름을 추가하면, Next.js가 자동으로 서버에서 실행함
    // 서버측에서 실행되는 함수. 따라서 브라우저에서 console.log해도 찍히지 않음
    //SSR(서버사이드렌더링)
    // 페이지 컴포넌트보다 먼저 실행이되어서, 해당 페이지 컴포넌트에 필요한 데이터 불러오는 함수

    // 이 코드 실행시 에러! 자바스크립트에서 window는 브라우저를 의미함.
    // 에러의 이유는 서버에는 브라우저가 없다
    // 즉, 서버에서 실행될때, window는 undefined이므로 이 undefined에서 property인 location을 사용하겠다는것이므로 에러발생
    //window.location

    // Promise.all([...])는 여러 개의 비동기 작업을 병렬로 실행하고,
    //  await는 모든 작업이 완료될 때까지 기다린 후 결과를 반환하는 역할
    const [allBooks, recoBooks] = await Promise.all([
        //Promise.all은 Promise 클래스의 정적메서드
        // 처음 Promise.all([...])의 파라미터는 배열로 구성된 Promise<BookData[]> 객체 2개이지만
        // 모든 Promise가 해결될 때까지 기다린 후 최종 결과 값들을 배열로 반환함

        fetchBooks(),
        fetchRandomBooks(),
    ]);

    return {
        props: { allBooks, recoBooks }, //getServerSideProps 함수가 항상 { props: ... } 형태의 객체를 반환해야함
    };
};

//getServerSideProps에서 반환한 props는 해당 파일의 페이지 컴포넌트에만 전달됨
export default function Home({ allBooks, recoBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    //아래와 같이 콘솔을 찍어보면 2번찍히는데, 서버에서 처음 실행될때 1번 그리고
    // 나중에 서버로부터 js번들을 받게될때 브라우저에서 한번 찍혀서 총2번찍힘
    // 하지만 서버에서 처음 실행될때는 visual코드 콘솔창에서 찍히고, 그 후 브라우저에서는 개발자도구의 console에 찍힘
    //console.log(data);

    //아래 useEffect훅은 브라우저에서 컴포넌트가 마운트 될때 실행되므로, 서버에서 아래 useEffect는 실행되지 않음 -> 따라서 한번만 콘솔에 찍힘
    //   useEffect(() => {
    //     console.log(window);
    //   }, []);

    console.log(allBooks);

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {recoBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                {' '}
                <h3>등록된 모든 도서</h3>
                {allBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
