import { useRouter } from "next/router";
import React from "react";

const Detail = () => {
  const router = useRouter();
  console.log(router);
  return <div>{router.query.title}</div>;
};

export default Detail;
