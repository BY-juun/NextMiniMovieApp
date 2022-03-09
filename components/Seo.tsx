import Head from "next/head";
import React, { FC, VFC } from "react";

interface Props {
  title: string;
}

const Seo = ({ title }: Props) => {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
};

export default Seo;
