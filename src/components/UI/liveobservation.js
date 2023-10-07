import { Button, Modal, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LiveObservation({ nasaData }) {
  console.log("from ui", nasaData);
  const liveObservationGradientBackground = `
    linear-gradient(
      to bottom,
      rgb(1,116,152) 0%,
      rgb(2,6,65) 100%
    )
  `;

  //   const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(
    nasaData?.collection.items[0] || null
  );

  console.log(selectedCard);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div
      className="bg-cover"
      style={{
        // backgroundImage: `url('/images/learn2.png')`,
        backgroundImage: liveObservationGradientBackground,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundColor: "#023667",
        backgroundColor: "#02487F",
        minHeight: "100vh",
      }}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-14 sm:py-18 lg:py-24">
          <div className="text-center">
            <h1 className="flex flex-row justify-center items-center gap-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span
                style={{
                  color: "#CDA7FF",
                }}
              >
                Live
              </span>
              <span className="text-white">Observation</span>
            </h1>

            <p className="mt-6 text-base leading-8 text-white">
              Live observation of ocean image data providing unprecedented
              insights into the health and dynamics of the marine environment as
              well as tracking changes in ocean conditions, identify emerging
              threats, and support sustainable management practices.
            </p>
          </div>
        </div>
      </div>
      {/* live observation */}
      <div className="relative isolate px-6  lg:px-8">
        <div
          className="mx-auto max-w-2xl "
          style={{
            backgroundColor: "#02487F",
          }}
        >
          {selectedCard && (
            <img
              className="bg-cover  w-full "
              src={selectedCard?.links[0]?.href}
              alt={selectedCard.data[0].title}
            />
          )}
          {selectedCard && (
            <h2 className="card-title py-2 px-4 text-white text-left text-sm ">
              {/* {selectedCard?.data[0]?.description_508} */}
              {selectedCard?.data[0].description_508 ||
                (selectedCard?.data[0].description.includes("---")
                  ? selectedCard?.data[0].description.split("---")[1]
                  : selectedCard?.data[0].description)}
            </h2>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8 px-8 py-16">
        {nasaData &&
          nasaData.collection.items.map((item, index) => (
            <div
              key={index}
              className={`card rounded-lg w-full  relative
              `}
              style={{
                backgroundColor: " #022843",
              }}
              onClick={() => setSelectedCard(item)}
            >
              {selectedCard === item && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-white text-black bg-opacity-50 rounded-lg"
                  style={{ zIndex: 50 }}
                >
                  Selected
                </div>
              )}

              <figure>
                {item.data[0].media_type === "image" && (
                  <img
                    src={item.links[0].href}
                    alt={item.data[0].title}
                    className="bg-cover  w-full "
                  />
                )}
              </figure>
              <div className="card-body ">
                <h2 className="card-title py-2 px-4 text-gray-400 text-left text-sm">
                  {item.data[0].title}
                  {"..."}
                </h2>{" "}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
