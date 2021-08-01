import { i18n } from "./hotbar-expansion.js";

export const registerSettings = function () {

    let modulename = "monks-hotbar-expansion";

    const debouncedReload = foundry.utils.debounce(function () { window.location.reload(); }, 100);

    game.settings.register(modulename, "number-rows", {
        name: i18n("MONKS.HOTBAREXPANSION.settings.number-rows.name"),
        hint: i18n("MONKS.HOTBAREXPANSION.settings.number-rows.hint"),
        scope: "client",
        config: true,
        default: 5,
        type: Number,
        range: {
            min: 1,
            max: 5,
            step: 1
        },
        onChange: debouncedReload
    });
};
