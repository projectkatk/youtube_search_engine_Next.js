import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import VideoList from "../components/VideoList";
import SortButtons from "../components/SortButtons";
import PageButtons from "../components/PageButtons";
import styles from "../styles/Home.module.css";

const url = `https://youtube-v31.p.rapidapi.com/search?q=music&part=snippet%2Cid&maxResults=20`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dcf4658c3emsh2d0e3db671a74adp14d5cejsnbb844ae604fd",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export default function Home({ videos }) {
  const [currentURL, setCurrentURL] = useState(url);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(videos);
  const [order, setOrder] = useState("relevance");

  //function handling search value change
  function handleChange(e) {
    let newValue = e.target.value;
    setSearchValue(newValue.split(" ").join("+"));
  }

  //function handling search value submit
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentURL(
      `https://youtube-v31.p.rapidapi.com/search?q=${searchValue}&part=snippet%2Cid&regionCode=US&maxResults=20&order=${order}`
    );
  }

  useEffect(() => {
    // don't do anything if the currentURL is the same as the default URL
    if (currentURL === url) return;

    //otherwise fetch data and reset the currentURL to the new one with the new search value
    async function request() {
      const res = await fetch(currentURL, options);
      const results = await res.json();
      setData(results);
    }
    request();
  }, [currentURL]);

  //destructuring data object
  const { prevPageToken, nextPageToken } = data;

  // on 'next' button click, go to the next page for viewing
  function handleLoadMore() {
    //only make the button work if there is a next page to view
    setCurrentURL(
      `https://youtube-v31.p.rapidapi.com/search?q=${searchValue}&part=snippet%2Cid&regionCode=US&maxResults=20&pageToken=${nextPageToken}&order=${order}`
    );
    return;
  }

  // on 'previous' button click, go to the previous page for viewing
  function handlePreviousLoad() {
    //only make the button work if there is a previous page to view
    if (prevPageToken) {
      setCurrentURL(
        `https://youtube-v31.p.rapidapi.com/search?q=${searchValue}&part=snippet%2Cid&regionCode=US&maxResults=20&pageToken=${prevPageToken}&order=${order}`
      );
    }
    return;
  }

  //functions related to buttons for sorting the videos
  function determineSort(item) {
    setOrder(item);
    setCurrentURL(
      `https://youtube-v31.p.rapidapi.com/search?q=${searchValue}&part=snippet%2Cid&regionCode=US&maxResults=20&order=${item}`
    );
    console.log(item);
  }

  //function handling video sorting
  function handleSort(e) {
    if (e.target.textContent === "Sort By Date (Most Recent)") {
      determineSort("date");
    }
    if (e.target.textContent === "Sort By View Count") {
      determineSort("viewCount");
    }
    if (e.target.textContent === "Sort By Rating") {
      determineSort("rating");
    }
    if (e.target.textContent === "Sort By Relevance") {
      determineSort("relevance");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Youtube Search Magic</title>
        <meta name="description" content="Search any video on youtube" />
      </Head>

      <main className={styles.main}>
        <header className="bg-white absolute top-0 py-16 w-full">
          <Link href="/">
            <h1
              className={`${styles.title} font-bold text-blue-700 uppercase cursor-pointer hover:scale-95 ease-in duration-100`}
            >
              Search a <br></br>YouTube Video Here!
            </h1>
          </Link>
        </header>

        {/* form to search the value. input value becomes the string that will be integrated into the currentURL */}
        <form
          className="flex items-center justify-center mt-36 md:mt-44"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            className="shadow rounded py-2 px-2 my-5 mr-3"
            onChange={handleChange}
          />
          <button className="h-10 text-white bg-blue-600 px-4 rounded hover:bg-blue-500">
            Search
          </button>
        </form>

        {/* main section for the list of videos */}
        <div className={styles.grid}>
          <SortButtons buttonClick={handleSort} />
          <ul className="flex flex-wrap justify-around">
            {/* map the data items to attach the results to the DOM */}
            {data.items.map((video) => {
              const { id, snippet } = video;
              const { thumbnails, title, publishTime } = snippet;

              return (
                <li
                  key={id.videoId + publishTime}
                  className={`${styles.card} ml-2 w-80 shadow bg-white hover:scale-105 ease-in duration-200`}
                >
                  <VideoList
                    id={id.videoId}
                    src={
                      !thumbnails.high.url
                        ? thumbnails.default.url
                        : thumbnails.high.url
                    }
                    title={title}
                    publishTime={publishTime.slice(0, 10)}
                  />
                </li>
              );
            })}
          </ul>
          {/* load previous batch or next batch of results on click */}
          <PageButtons
            prevPage={handlePreviousLoad}
            nextPage={handleLoadMore}
          />
        </div>
      </main>
    </div>
  );
}

// homepage default video list generation
export async function getStaticProps() {
  const res = await fetch(url, options);
  const videos = await res.json();

  return {
    props: {
      videos: videos,
    },
  };
}
