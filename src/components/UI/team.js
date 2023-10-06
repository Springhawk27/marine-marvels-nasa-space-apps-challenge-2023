import React from "react";

const Team = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="text-3xl md:text-5xl font-medium title-font mb-4 text-white">
              OUR TEAM
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 justify-center ">
            <div className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-2/4 object-cover object-center mb-4"
                  src="/images/team/istiak.png"
                />
                <div className="w-full">
                  <h2 className="title-font font-medium  text-xl md:text-2xl  text-white">
                    Istiak Ahmed
                  </h2>
                  <h3 className="text-gray-300 text-base">Team Lead</h3>
                  <h3 className="text-gray-300 mb-3 text-base">
                    Full Stack Developer
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-2/4  object-cover object-center mb-4"
                  src="/images/team/mushfiq.png"
                />
                <div className="w-full">
                  <h2 className="title-font font-medium  text-xl md:text-2xl  text-white">
                    Mushfiqur Rashid{" "}
                  </h2>
                  <h3 className="text-gray-300 mb-3 text-base">
                    Full Stack Developer
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-2/4  object-cover object-center mb-4"
                  src="/images/team/sajjad.png"
                />
                <div className="w-full">
                  <h2 className="title-font font-medium  text-xl md:text-2xl  text-white">
                    Md Sajjad Mahmud Khan{" "}
                  </h2>
                  <h3 className="text-gray-300 mb-3 text-base">
                    Full Stack Developer
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-2/4  object-cover object-center mb-4"
                  src="/images/team/siwom.png"
                />
                <div className="w-full">
                  <h2 className="title-font font-medium  text-xl md:text-2xl  text-white">
                    Md Siwom Chowdhury
                  </h2>
                  <h3 className="text-gray-300 mb-3 text-base">
                    UI/UX Designer
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-4 lg:w-1/3 md:w-1/2">
              <div className="h-full flex flex-col items-center text-center">
                <img
                  alt="team"
                  className="flex-shrink-0 rounded-lg w-2/4 object-cover object-center mb-4"
                  src="/images/team/elma.png"
                />
                <div className="w-full">
                  <h2 className="title-font font-medium  text-xl md:text-2xl  text-white">
                    Fatema Tabassum Elma
                  </h2>
                  <h3 className="text-gray-300 mb-3 text-base">
                    Business Analyst
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
