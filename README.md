# Pokemon TCG CLI Application

This CLI application allows the user to search for a pokemon card based on a search word they enter.

# Usage

In order to run the application, the user first needs to install all the necessary dependencies by using `npm install`
Following the installation of the dependencies, the user will need to create a `config.json` file and populate it with the following key and value `"url": "https://api.pokemontcg.io/v2/"`. The user can then omit `` .set("X-Api-Key", `${config["api-key"]}`); `` from the `index.js` file if they wish to not create and obtain an api key. (Note: not having an api key will limit response to 30 search results per hour).

On the command line, type `node cli.js --help` in order to see how to use the application.
