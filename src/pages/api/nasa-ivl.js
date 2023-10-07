// pages/api/nasa-ivl.js

import axios from "axios";

export default async (req, res) => {
  try {
    const response = await axios.get(
      "https://images-api.nasa.gov/search?q=ocean&media_type=image"
    );

    const data = response.data;

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching data from NASA IVL API",
    });
  }
};
