const inquirer = require("inquirer");

const pokemontcg = require("pokemontcg");

const _print = (data) => {
    const atks = [];
    const wkns = [];
    const res = [];
    const abils = [];
    if (data.attacks) {
        data.attacks.forEach((element) => {
            atks.push(
                `${element.name} (Dmg: ${element.damage}) - ${element.text}`
            );
        });
    }
    if (data.weaknesses) {
        data.weaknesses.forEach((element) => {
            wkns.push(`${element.type} ${element.value}`);
        });
    }
    if (data.resistances) {
        data.resistances.forEach((element) => {
            res.push(`${element.type} ${element.value}`);
        });
    }
    if (data.abilities) {
        data.abilities.forEach((element) => {
            abils.push(`${element.name} - ${element.text}`);
        });
    }
    console.log(
        `\nName: ${data.name}       HP:${!data.hp ? "" : data.hp}` +
            `\n${data.supertype} - ${data.subtypes}` +
            `\nRarity: ${data.rarity}` +
            `\nSet: ${data.set.name}` +
            `\nDescription: ${
                !data.flavorText ? "" : '"' + data.flavorText + '"'
            }` +
            `\n\nType: ${
                !data.types ? "" : data.types.toString().replace(",", ", ")
            }` +
            `\nWeakness(es): ${wkns.join("^").replace("^", ", ")}` +
            `\nResistance(s): ${res.join("^").replace("^", ", ")}` +
            `\n\nAbility: ${abils.join(",")}` +
            `\n\nAttack(s):\n${atks.join("^").replace("^", "\n")}` +
            `\n\nRule(s): ${
                !data.rules
                    ? ""
                    : "\n" + data.rules.join("^").replace("^", "\n")
            }` +
            `\n\nNo: ${data.number}/${data.set.total}` +
            `\n\nImage: ${data.images.large}`
    );
};

const _choosePrompt = async (cards) => {
    const displayCards = cards.map((card) => {
        return {
            name: `${card.rarity || "Uknown"} ${card.name} NO: ${
                card.number || "Unknown"
            } from the ${card.set.name || "Uknown"} set`,
            value: card.id,
        };
    });

    return inquirer.prompt([
        {
            type: "list",
            name: "pokemon",
            message: "Select a Pokemon card you wish to learn more about.",
            choices: displayCards,
        },
    ]);
};

async function search(keyword) {
    try {
        const results = await pokemontcg.getResults(keyword);

        if (results.count === 0) {
            console.log(`No cards available for search term \"${keyword}\"`);
            return;
        }

        const selected = await _choosePrompt(results.data);

        const card = await pokemontcg.fetchCard(selected.pokemon);

        _print(card.data);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    search,
};
