const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

// get all characters with pagination and search
app.get("/api/characters", async (req, res) => {
  const { search = "", page = 1 } = req.query;
  const limit = 10;

  try {
    const url = `https://www.swapi.tech/api/people/?page=${page}&limit=${limit}`;
    const response = await axios.get(url);
    const allCharacters = response.data.results || [];

    const filtered = search
      ? allCharacters.filter((char) =>
          char.name.toLowerCase().includes(search.toLowerCase())
        )
      : allCharacters;

    res.json({
      total: filtered.length,
      pages: response.data.total_pages || 1,
      currentPage: parseInt(page),
      characters: filtered,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch character list" });
  }
});

// single character details
app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://swapi.tech/api/people/${id}`);
    res.json(response.data.result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch character details" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
