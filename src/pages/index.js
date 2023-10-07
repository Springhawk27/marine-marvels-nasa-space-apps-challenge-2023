import RootLayout from "@/components/Layouts/RootLayout";
import Banner from "@/components/UI/carousel";
import Team from "@/components/UI/team";
import { Button, Col, Grid, Row } from "antd";

const HomePage = () => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const menuGradientBackground = `
    linear-gradient(
      to bottom,
      rgb(1,116,152) 0%,
      rgb(2,6,65) 100%
    )
  `;

  const backgroundImageStyle = {
    backgroundImage: `url('/images/home_article.png')`,
    // backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#023667",
    // height: "100vh",
    // minHeight: "60vh",
  };
  const backgroundImageForVideo = {
    backgroundImage: `url('/images/video_section.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#023667",
    height: "100vh",
    // minHeight: "60vh",
  };

  const data = {
    features: [
      {
        id: 1,
        image_url: "/images/features/card1.png",
        title: "Interactive 3D Visualizations",
      },
      {
        id: 2,
        image_url: "/images/features/card2.png",
        title: "Real-time Data",
      },
      {
        id: 3,
        image_url: "/images/features/card3.png",
        title: "User-friendly Design",
      },
      {
        id: 4,
        image_url: "/images/features/card4.png",
        title: "Game Element",
      },
      {
        id: 5,
        image_url: "/images/features/card5.png",
        title: "Education",
      },
      {
        id: 6,
        image_url: "/images/features/card6.png",
        title: "Credibility",
      },
      {
        id: 7,
        image_url: "/images/features/card7.png",
        title: "NASA Resources",
      },
      {
        id: 8,
        image_url: "/images/features/card8.png",
        title: "Ease of Use",
      },
    ],
  };

  const features = data.features;

  return (
    <main
      className={`bg-scroll  text-2xl pt-16 md:px-12 px-6 `}
      style={{
        background: menuGradientBackground,
        backgroundImage: `url('/images/home_background.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundColor: "#023058",
        // height: "100vh",
        minHeight: "100%",
        zIndex: -1,
      }}
    >
      <Banner></Banner>

      <div className="md:h-screen bg-cover" style={backgroundImageStyle}>
        <Row className="flex flex-col md:flex-row">
          <Col
            className="md:h-screen  text-white p-4 flex justify-center items-center flex-col pb-16 gap-4"
            span={8}
            xs={24}
            sm={8}
            md={8}
            lg={8}
            xl={8}
            style={{
              backgroundColor: "#014759",
              minHeight: "60vh",
              // height: "100vh",
            }}
          >
            <h1 className="text-3xl">Dive into the Ocean&apos;s Garden</h1>
            <p className="text-sm">
              Explore the Ocean&apos;s Garden, a 3D interactive platform, and
              discover how marine photosynthesis, phytoplankton, and ocean
              ecosystems sustain our planet. Our mission is to simplify complex
              science, making the ocean&apos;s significance accessible to all,
              while fostering a deeper appreciation for its profound impact on
              our world.
            </p>
          </Col>
          <Col span={16}></Col>
        </Row>
      </div>

      {/* video section */}
      <div className="pt-8 pb-12">
        <div
          className="flex flex-col gap-4 justify-center items-center p-4"
          style={backgroundImageForVideo}
        >
          <iframe
            className="h-2/4 lg:w-2/4 md:w-3/4 w-full"
            src="https://www.youtube.com/embed/cXmUvaGp4eI?si=uHoS3I0apA3NDBR8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <iframe
            className="h-2/4 lg:w-2/4 md:w-3/4 w-full"
            src="https://www.youtube.com/embed/wYLBDVyVIqI?si=9CV822uNLitYq8eF"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>{" "}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-8 py-16">
        {features?.map((feature) => (
          <div
            key={feature?.id}
            className="card rounded-lg w-full  "
            style={{ backgroundColor: " #022843" }}
          >
            <figure>
              <img
                src={`${feature.image_url}`}
                alt="image"
                className="bg-cover  w-full  max-h-44"
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title py-2 text-white text-center text-base">
                {feature?.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Team></Team>
      </div>
    </main>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
