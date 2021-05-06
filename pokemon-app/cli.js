const yargs = require("yargs");
const app = require("./app.js");

yargs
    .usage("$0: Usage <cmd> [options] <keyword>")
    .command({
        command: "search",
        desc: "search for a pokemon card",
        handler: (argv) => {
            app.search(argv.card);
        },
    })
    .help("help")
    .option("c", {
        alias: "card",
        describe:
            'Looks for a pokemon card based on the keyword(s) submitted. If multiple words are submitted, they should be surrounded by ""',
    })
    .example("node $0 search --card pikachu")
    .example("node $0 search -c rare").argv;
