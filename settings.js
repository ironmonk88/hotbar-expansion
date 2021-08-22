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
            min: 2,
            max: 5,
            step: 1
        },
        onChange: debouncedReload
    });

    game.settings.register(modulename, "reverse-row-order", {
        name: i18n("MONKS.HOTBAREXPANSION.settings.reverse-row-order.name"),
        hint: i18n("MONKS.HOTBAREXPANSION.settings.reverse-row-order.hint"),
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: debouncedReload
    });
};
