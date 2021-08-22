import { i18n, setting } from "./hotbar-expansion.js";

export const registerSettings = function () {

    let modulename = "monks-hotbar-expansion";

    const debouncedReload = foundry.utils.debounce(function () { window.location.reload(); }, 100);

    const updateClass = () => {
        $('.hotbar-page')
            .toggleClass('reverse', setting('reverse-row-order'))
            .toggleClass('hidefirst', setting('hide-first-row'));
    }

    game.settings.register(modulename, "number-rows", {
        name: i18n("MonksHotbarExpansion.number-rows.name"),
        hint: i18n("MonksHotbarExpansion.number-rows.hint"),
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
        name: i18n("MonksHotbarExpansion.reverse-row-order.name"),
        hint: i18n("MonksHotbarExpansion.reverse-row-order.hint"),
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: updateClass
    });

    game.settings.register(modulename, "hide-first-row", {
        name: i18n("MonksHotbarExpansion.hide-first-row.name"),
        hint: i18n("MonksHotbarExpansion.hide-first-row.hint"),
        scope: "client",
        config: true,
        default: false,
        type: Boolean,
        onChange: updateClass
    });
};
