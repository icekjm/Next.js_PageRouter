// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// api 폴더안에 파일들은 api응답을 반환하는 파일들임
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json({ name: "John Doe" });
}
