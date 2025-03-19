import { BookData } from "@/types";

export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = `http://localhost:12345/book`;

  if (q) {
    url += `/search?q=${q}`;
  }

  //   Promise는 비동기 작업(DB, API 요청 등)이 끝나면 값을 가져다주는 중간 전달자(매개자) 같은 역할을 함.
  // Promise는 직접 데이터를 가지고 있지는 않지만, 비동기 작업이 완료되었을 때 그 데이터를 넘겨주는 역할을 함.

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    console.log(response);

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
