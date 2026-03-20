import axios from "axios";

async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://images-api.nasa.gov/search?q=ocean&media_type=image"
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching data from NASA IVL API",
    });
  }
}

export default handler;
