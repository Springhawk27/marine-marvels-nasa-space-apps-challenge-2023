import RootLayout from "@/components/Layouts/RootLayout";
import LiveObservation from "@/components/UI/liveobservation";
import { useEffect, useState } from "react";

const LiveObservationPage = () => {
  const [nasaData, setNasaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/nasa-ivl");
        if (response.ok) {
          const data = await response.json();
          setNasaData(data);
        }
      } catch (error) {
        console.error("Failed to fetch NASA data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return <LiveObservation nasaData={nasaData} isLoading={isLoading} />;
};

export default LiveObservationPage;

LiveObservationPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
