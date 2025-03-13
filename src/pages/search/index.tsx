import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function Page() {
  //useRouter를 이용하여 쿼리스트링을 불러옴
  const router = useRouter();

  //구조분해할당문이용?
  const { q } = router.query;

  return <h1>Search {q}</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
