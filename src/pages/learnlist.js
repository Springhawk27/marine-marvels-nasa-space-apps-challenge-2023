import RootLayout from "@/components/Layouts/RootLayout";
import LearnList from "@/components/UI/learnlist";
import React, { useEffect, useState } from "react";

const LearnListPage = () => {
  const data = {
    articles: [
      {
        id: 1,
        image_url: "/images/articles/image1.png",
        title: "Ocean Ecosystem",
        description:
          "Ocean ecosystems are vibrant, interconnected communities of marine life, from the tiniest phytoplankton to majestic whales. These ecosystems provide essential services, generating oxygen, regulating climate by absorbing carbon dioxide, and supplying food for billions. Delicate balances within them are under threat from pollution, overfishing, and climate change, demanding urgent conservation efforts. Understanding these ecosystems is vital, as they impact not only marine life but also the well-being of Earth and humanity.",
      },
      {
        id: 2,
        image_url: "/images/articles/image2.png",
        title: "Marine Life",
        description:
          "Marine life encompasses a breathtaking array of species, adapted to thrive in Earth's oceans. From colorful coral reefs to mysterious deep-sea creatures, this diverse realm plays a vital role in our planet's health. Marine life produces oxygen, influences climate patterns, and supports global food systems. Yet, it faces mounting threats, including habitat destruction, overfishing, and pollution. Understanding and preserving marine life is crucial, as it not only sustains the ocean but also influences the well-being of our entire planet and future generations.",
      },
      {
        id: 3,
        image_url: "/images/articles/image3.png",
        title: "Climate change & Ocean Health",
        description:
          "Climate change profoundly impacts ocean health. Rising temperatures and carbon emissions lead to ocean acidification, sea level rise, and more frequent extreme weather events. These changes disrupt marine ecosystems, affecting species' distribution and survival. Coral reefs, vital for biodiversity, are particularly vulnerable. Ocean health directly affects human communities through disrupted fisheries and increased coastal vulnerability. To combat these challenges, we must reduce greenhouse gas emissions, protect marine habitats, and promote sustainable practices. Preserving the ocean's health is not just an environmental imperative; it's essential for our planet's well-being and the survival of countless species, including our own.",
      },
      {
        id: 4,
        image_url: "/images/articles/image4.png",
        title: "The Carbon Cycle in the ocean",
        description:
          "The carbon cycle in the ocean is a crucial part of Earth's carbon balance. Oceans absorb vast amounts of carbon dioxide (CO2) from the atmosphere, acting as a vital carbon sink. This process, called carbon sequestration, helps regulate climate by reducing greenhouse gases. Phytoplankton and marine organisms play a significant role by converting CO2 into organic matter through photosynthesis. However, increased CO2 levels lead to ocean acidification, posing risks to marine life. Understanding this complex cycle is vital for managing CO2 levels, mitigating climate change, and safeguarding the health of ocean ecosystems.",
      },
      {
        id: 5,
        image_url: "/images/articles/image5.png",
        title: "Phytoplankton & Global Oxygen Production",
        description:
          "Phytoplankton, tiny plant-like organisms found in oceans, are essential contributors to global oxygen production. Through photosynthesis, they generate about 50% of Earth's oxygen, a crucial element for life. These microscopic organisms also play a significant role in carbon dioxide (CO2) absorption, helping mitigate climate change by drawing down CO2 from the atmosphere. However, environmental changes, including warming seas and nutrient imbalances, can disrupt phytoplankton populations, affecting both oxygen production and the planet's carbon balance. Recognizing the vital role of phytoplankton in our oxygen supply underscores the importance of ocean health in maintaining a habitable Earth.",
      },
      {
        id: 6,
        image_url: "/images/articles/image6.png",
        title: "Ocean Energy & Resources",
        description:
          "Ocean energy and resources refer to the vast potential of the ocean for sustainable power generation and economic development. Renewable energy sources like offshore wind, tidal, and wave energy harness the power of the ocean to produce clean electricity. Additionally, the ocean hosts valuable resources such as seafood, minerals, and pharmaceutical compounds. Exploiting these resources responsibly can contribute to energy security and economic growth while minimizing environmental impact. The development of ocean energy and sustainable resource management is crucial for a more sustainable future, addressing both energy needs and resource scarcity while preserving the health of marine ecosystems.",
      },
      {
        id: 7,
        image_url: "/images/articles/image7.png",
        title: "Ocean as Food Source",
        description:
          "The ocean serves as a vital food source, sustaining billions of people worldwide. It provides a diverse array of seafood, from fish and shrimp to mollusks and seaweed, supporting both coastal communities and global food security. However, overfishing and unsustainable practices threaten the ocean's ability to continue providing sustenance. Sustainable fisheries management and responsible consumption are essential to safeguard this valuable resource. Recognizing the ocean as a primary source of nutrition underscores the importance of preserving its health and biodiversity for current and future generations.",
      },
      {
        id: 8,
        image_url: "/images/articles/image8.png",
        title: "Deep Sea Bed Mining",
        description:
          "Deep sea bed mining involves extracting valuable minerals and metals from the ocean floor, often in deep and remote areas. While it offers access to untapped resources like rare metals, it poses significant environmental risks. Mining operations can disrupt fragile ecosystems, release harmful pollutants, and harm deep-sea life that has adapted to extreme conditions. Striking a balance between resource exploitation and environmental preservation is essential. Effective regulations and responsible mining practices are crucial to minimize the potential ecological damage and protect the delicate ecosystems in the deep sea, which remain largely unexplored and poorly understood.",
      },
      {
        id: 9,
        image_url: "/images/articles/image9.png",
        title: "Ocean Provided Services",
        description:
          "Ocean Provided Services encompass a wide range of essential contributions to our planet and daily lives. Oceans produce oxygen, regulate climate by absorbing carbon dioxide, and support diverse ecosystems, which in turn sustain fisheries and provide food for billions of people. They also facilitate global trade and transportation routes. However, these services are increasingly threatened by pollution, overfishing, climate change, and habitat destruction. Recognizing and preserving these vital ocean services are crucial for maintaining a healthy environment, ensuring food security, and mitigating the effects of climate change for current and future generations.",
      },
      {
        id: 10,
        image_url: "/images/articles/image10.png",
        title: "Maritime Transportation",
        description:
          "Maritime transportation is a cornerstone of global trade and connectivity, with ships carrying over 80% of the world's goods. It provides efficient and cost-effective cargo transportation across the world's oceans, enabling the global economy to function smoothly. However, this industry also faces challenges related to safety, environmental impact, and security. Striking a balance between economic benefits and environmental sustainability through improved navigation technology, cleaner fuels, and international regulations is essential for the future of maritime transportation. Ensuring the reliability and environmental responsibility of this vital industry is crucial for global commerce and sustainable development.",
      },
      {
        id: 11,
        image_url: "/images/articles/image11.png",
        title: "Ocean policy",
        description:
          "Ocean policy encompasses government regulations and strategies that govern the use, conservation, and management of ocean resources and activities. It addresses various aspects, including marine conservation, sustainable fisheries, shipping and navigation, environmental protection, and international agreements. Effective ocean policies aim to balance economic development with environmental preservation, ensuring the responsible and equitable use of ocean resources. They play a crucial role in addressing global challenges such as climate change, overfishing, and marine pollution. Implementing comprehensive and forward-thinking ocean policies is essential for safeguarding the health of our oceans, the well-being of coastal communities, and the sustainability of marine ecosystems.",
      },
      {
        id: 12,
        image_url: "/images/articles/image12.png",
        title: "Ocean exploration & Scientific research",
        description:
          "Ocean exploration and scientific research involve the systematic study and investigation of Earth's vast oceans to expand our understanding of marine ecosystems, climate dynamics, and geological processes. This pursuit advances knowledge in fields such as marine biology, oceanography, and geology. Cutting-edge technology, including remotely operated vehicles and underwater drones, enables us to delve deeper into uncharted depths, revealing new species and geological wonders. This research is vital for addressing global challenges, such as climate change and biodiversity loss, and provides insights into the health and sustainability of our oceans, which play a pivotal role in the overall well-being of our planet.",
      },
    ],
  };
  //   console.log(data.articles);
  const allArticles = data.articles;
  return (
    <div>
      <LearnList allArticles={allArticles}></LearnList>
    </div>
  );
};

export default LearnListPage;

LearnListPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
