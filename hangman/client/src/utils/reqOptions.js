const axios = require("axios").default;

export const getRandomWords = async () => {
  try {
    const words = await axios.get("http://localhost:9090/random-words");
    return words.data.words;
  } catch (error) {
    console.log(error);
  }
};

export const getWordDefinition = async (word) => {
  try {
    const wordDef = await axios.get("http://localhost:9090/word-definition", {
      word,
    });
    return wordDef.data.definition;
  } catch (error) {
    console.log(error);
  }
};
