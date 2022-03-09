import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Seo from "../components/Seo";

interface MovieType {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Props {
  movies: Array<MovieType>;
}

const Home: NextPage<Props> = ({ movies }) => {
  const router = useRouter();
  const onClick = useCallback(
    (id: number, title: string) => {
      router.push(
        {
          pathname: `/movies/${id}`,
          query: {
            id,
            title,
          },
        },
        `/movies/${id}`
      );
    },
    [router]
  );

  return (
    <>
      <div className="container">
        <Seo title="Home" />
        {!movies && <h4>Loading...</h4>}
        {movies?.map((movie) => (
          <div onClick={() => onClick(movie.id, movie.original_title)} className="movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h4>
              <Link
                href={{
                  pathname: `/movies/${movie.id}`,
                  query: {
                    title: movie.original_title,
                  },
                }}
                as={`/movies/${movie.id}`}
              >
                <a>{movie.original_title}</a>
              </Link>
            </h4>
          </div>
        ))}
        <style jsx>{`
          .container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 20px;
            gap: 20px;
          }
          .movie img {
            max-width: 100%;
            border-radius: 12px;
            transition: transform 0.2s ease-in-out;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
          }
          .movie:hover img {
            transform: scale(1.05) translateY(-10px);
          }
          .movie h4 {
            font-size: 18px;
            text-align: center;
          }
        `}</style>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { results: movies } = await (await fetch("http://localhost:3000/api/movies")).json();
  return {
    props: {
      movies,
    },
  };
}

export default Home;
