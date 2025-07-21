const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/characters", async (req, res) => {
  const { search = "", page = 1 } = req.query;
  try {
    const url = search
      ? `https://swapi.tech/api/people/?name=${search}&page=${page}`
      : `https://swapi.tech/api/people/?page=${page}`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Character details route (optional)
app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://swapi.tech/api/people/${id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
