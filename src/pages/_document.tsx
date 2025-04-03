import { Html, Head, Main, NextScript } from 'next/document';
//서버에서 최상위 HTML 구조를 정의하는 파일
export default function Document() {
    return (
        <Html lang="kr">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
