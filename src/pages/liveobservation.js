import RootLayout from "@/components/Layouts/RootLayout";
import LiveObservation from "@/components/UI/liveobservation";
import React, { useEffect, useState } from "react";

const LiveObservationPage = ({ allImages }) => {
  //   console.log("from ui server", allImages);
  const [nasaData, setNasaData] = useState(null);
  console.log(nasaData);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/nasa-ivl");
        if (response.ok) {
          const data = await response.json();
          setNasaData(data);
        } else {
          console.error("Failed to fetch data from NASA IVL API");
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <LiveObservation nasaData={nasaData}></LiveObservation>
    </div>
  );
};

export default LiveObservationPage;

LiveObservationPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
