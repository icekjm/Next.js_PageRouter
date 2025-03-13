import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();

    //url파라미터도 router객체에 쿼리스트링처럼 저장됨
    console.log(router);

    const {id} = router.query;

    return <h1>Book{id}</h1>;
}