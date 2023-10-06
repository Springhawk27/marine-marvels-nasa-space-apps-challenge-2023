import React from "react";
import { Carousel } from "antd";
import Link from "next/link";
const contentStyle1 = {
  height: "360px",
  color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  background: "#364d79",
  borderRadius: "10px",
  backgroundImage: `url('/images/carousel/image1.png')`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
const contentStyle2 = {
  height: "360px",
  color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  background: "#364d79",
  borderRadius: "10px",
  backgroundImage: `url('/images/carousel/image2.png')`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
const contentStyle3 = {
  height: "360px",
  color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  background: "#364d79",
  borderRadius: "10px",
  backgroundImage: `url('/images/carousel/image3.png')`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
const contentStyle4 = {
  height: "360px",
  color: "#fff",
  // lineHeight: "160px",
  // textAlign: "center",
  background: "#364d79",
  borderRadius: "10px",
  backgroundImage: `url('/images/carousel/image4.png')`,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};
const Banner = () => (
  <Carousel className=" my-8" autoplay autoplaySpeed={5000}>
    <div>
      <h3
        className="flex justify-center items-start flex-col p-8"
        style={contentStyle1}
      >
        <span className="text-3xl">View Ocean as Garden</span>
        <span className="text-xs w-2/4">
          Discover the oceans hidden beauty and vital services on our website,
          where we unveil it as a life-sustaining garden, providing oxygen,
          combating CO2, and fueling our world.
        </span>
      </h3>
    </div>
    <div>
      <h3
        style={contentStyle2}
        className="flex justify-center items-start flex-col p-8"
      >
        <span className="text-3xl">Explore the Ocean</span>
        <span className="text-xs w-2/4 pb-4">
          An interactive 3D Visual where you can explore various ocean
          ecosystems, and marine life
        </span>
        <Link
          href="/exploreshowcase"
          className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{
            backgroundColor: "#F5FCCD",
          }}
        >
          Explore
        </Link>
      </h3>
    </div>
    <div>
      <h3
        style={contentStyle3}
        className="flex justify-center items-start flex-col p-8"
      >
        <span className="text-3xl"> Contribution of Ocean</span>
        <span className="text-xs w-2/4 pb-4">
          Learn how this magnificent body of water sustains us in ways you might
          not have imagined.
        </span>
        <Link
          href="/learnlist"
          className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{
            backgroundColor: "#F5FCCD",
          }}
        >
          Learn
        </Link>
      </h3>
    </div>
    <div>
      <h3
        style={contentStyle4}
        className="flex justify-center items-start flex-col p-8"
      >
        <span className="text-3xl pb-4">Learn by Playing Game</span>
        <Link
          href="/game"
          className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{
            backgroundColor: "#F5FCCD",
          }}
        >
          Play
        </Link>
      </h3>
    </div>
  </Carousel>
);
export default Banner;
