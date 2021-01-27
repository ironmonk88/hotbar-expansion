export let debug = (...args) => {
    if (debugEnabled > 1) console.log("DEBUG: combatdetails | ", ...args);
};
export let log = (...args) => console.log("monks-hotbar-expansion | ", ...args);
export let warn = (...args) => {
    if (debugEnabled > 0) console.warn("monks-hotbar-expansion | ", ...args);
};
export let error = (...args) => console.error("monks-hotbar-expansion | ", ...args);
export let i18n = key => {
    return game.i18n.localize(key);
};

export class MonksHotbarExpansion {
    static tracker = false;
    static tokenbar = null;

    static init() {
	    log("initializing");
    }

    static ready() {
    }

    static async expandHotbar(e) {
        ui.hotbar._pagecollapsed = !ui.hotbar._pagecollapsed;
        $('#hotbar .hotbar-page')
            .toggleClass('collapsed', ui.hotbar._pagecollapsed)
            .toggleClass('opening', !ui.hotbar._pagecollapsed)
            .one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () { $(this).removeClass('opening') });
    }

    static changePage(page, e) {
        this.page = page;
        this.render(true);
        ui.hotbar._pagecollapsed = true;
        $('#hotbar .hotbar-page').addClass('collapsed');
    }

    static async clearMacroRow(page, e) {
        for (let i = 1; i <= 10; i++) {
            await game.user.assignHotbarMacro(null, ((page - 1) * 10) + i);
        }
    }

    static async renderHotbar(app, html, options) {
        if (app._pagecollapsed == undefined)
            app._pagecollapsed = true;
        let hotbarpage = $('<div>').addClass('hotbar-page flexcol').toggleClass('collapsed', app._pagecollapsed);
        for (let i = 1; i <= 5; i++) {
            let macros = app._getMacrosByPage(i);

            let macroRow = await renderTemplate(app.options.template, {
                page: i,
                macros: macros,
                barClass: "",
                dragDrop: [{ dragSelector: ".macro-icon", dropSelector: ".macro-list" }]
            });
            let actionBar = $('#action-bar', macroRow);
            actionBar.removeAttr('id').addClass('action-bar');
            $('<div>').attr('title', i18n("MONKS.HOTBAREXPANSION.clear-row")).addClass('bar-controls clear-row flexcol').append($('<i>').addClass('fas fa-trash')).on('click', $.proxy(MonksHotbarExpansion.clearMacroRow, app, i)).prependTo(actionBar);
            actionBar.find('#macro-list').addClass('macro-list').removeAttr('id').toggleClass('selected', app.page == i);
            actionBar.find('#hotbar-page-controls').removeAttr('id').find('.page-control').remove();
            $('.bar-controls:not(.clear-row)', actionBar).toggleClass('selected', app.page == i).on('click', $.proxy(MonksHotbarExpansion.changePage, app, i));
            $(".macro", actionBar).click(app._onClickMacro.bind(app)).hover(app._onHoverMacro.bind(app));
            hotbarpage.append(actionBar);

            Hooks.callAll('renderMonksHotbarExpansionActionBar', app, actionBar, {
              page: i,
              macros,
            });
        }
        $('#macro-list', html).append(hotbarpage);

        $('#hotbar-page-controls', html).on('click', $.proxy(MonksHotbarExpansion.expandHotbar));
        log('Rendering hotbar');
    }
}

Hooks.on('renderHotbar', MonksHotbarExpansion.renderHotbar);
