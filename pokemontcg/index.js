const superagent = require("superagent");

const config = require("./config.json");

const getResults = async (keyword) => {
    try {
        const tcgUrlPokemon = `${config.url}cards?q=name:*${keyword}* OR types:*${keyword}* OR subtypes:*${keyword}* OR rarity:*${keyword}*`;
        const response = await superagent
            .get(tcgUrlPokemon)
            .set("X-Api-Key", `${config["api-key"]}`);
        return response.body;
    } catch (error) {
        return error;
    }
};

const fetchCard = async (card_id) => {
    try {
        const getUrl = `${config.url}cards/${card_id}`;
        const response = await superagent
            .get(getUrl)
            .set("X-Api-Key", `${config["api-key"]}`);
        return response.body;
    } catch (error) {
        return error;
    }
};

module.exports = {
    getResults,
    fetchCard,
};
