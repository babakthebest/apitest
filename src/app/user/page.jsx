"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

export default function page() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await axios.get(" https://api.rawg.io/api/games", {
      params: {
        key: "b3674bbed04e4f8c917555c99ee98cff",
        page_size: 30,
        page: 2,
      },
    });
    console.log(res.data);
    setData((prev) => [...prev, ...res.data.results]);
  };

  return (
    <div className='h-screen w-screen'>
      <div>
        <button
          className='bg-sky-500 m-2 px-2 rounded'
          onClick={() => getData()}>
          fetch
        </button>
      </div>
      <div className='flex justify-center items-center h-3/4'>
        <div
          id='scrollableDiv'
          style={{
            height: 300,
            overflow: "auto",
            display: "flex",
            flexDirection: "column-reverse",
          }}
          className='bg-slate-50 rounded-lg h-3/4 w-3/4 text-slate-900 overflow-y-scroll'>
          <ul className='pl-2 gap-3'>
            <InfiniteScroll
              dataLength={data.length}
              next={getData}
              // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
              inverse={true} //
              hasMore={true}
              loader={<h4>Loading...</h4>}
              scrollableTarget='scrollableDiv'>
              {data.map((item) => (
                <li key={item.id} className='gap-3'>
                  <p className='bg-sky-400 rounded-lg mt-3 w-1/2'>
                    {item.name}
                  </p>

                  {/* <Image
                  src={item.background_image}
                  height={100}
                  width={100}
                  alt='img'
                  
                /> */}
                </li>
              ))}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    </div>
  );
}
