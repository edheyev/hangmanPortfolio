const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {});

const { WORDNIK_API_KEY } = process.env;
app.get("/random-words", async (req, res) => {
  try {
    const words = await axios.get(
      `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=11&api_key=${WORDNIK_API_KEY}`
    );
    res.status(200).send({ words: words.data });
  } catch (error) {
    console.log(error);
  }
});
app.get("/word-definition", async (req, res) => {
  const { word } = req.body;

  try {
    const wordDef = await axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=200&includeRelated=false&useCanonical=false&includeTags=false&api_key=${WORDNIK_API_KEY}`
    );

    // return wordDef.data[0].text;
    res.status(200).send({ definition: wordDef.data[0].text });
  } catch (error) {
    console.log(error);
  }
});

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Path not found!" });
});

module.exports = app;
