import $ from 'jquery'
export default class Search {
    constructor() {
        this.addSearchHTML();
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.searchField = $('.search-term');
        this.resultsDiv = $('#search-overlay__results');
        this.spinner = $('.spinner-loader');
        this.spinner.hide();

        this.events();
        this.isOverlayOpen  = false;
        this.typingTimer;
        this.searchValue = '';
    }

    events() {
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keyup", this.keyPressDispacher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

    typingLogic() {
        if (this.searchField.val() != this.searchValue) {
            clearTimeout(this.typingTimer);
            if (this.searchField.val() != '') {
                if (!this.spinner.is(':visible')) {
                    this.emptyResultsDiv();
                    this.spinner.show();
                }
                this.typingTimer = setTimeout(this.getResults.bind(this) , 750);
            }
            else {
                this.emptyResultsDiv();
                this.spinner.hide()
            }
        }
        this.searchValue = this.searchField.val();
    }

    emptyResultsDiv() {
        this.resultsDiv.empty();
        this.resultsDiv.append(this.spinner);
    }

    getResults() {
        const dataUrl = universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchValue;

        $.getJSON(dataUrl)
        .done((results) => {
            console.log(results);
            const posts = results.generalInfos;
            this.resultsDiv.append(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General information</h2>
                        ${results.generalInfos.length ? '<ul class="link-list min-list">' : '<p>No general information matchs that search</p>'}
                        ${results.generalInfos.map(result => `
                            <li>
                                <a href="${result.permalink}">${result.title}</a> ${result.type == 'post' ? `by ${result.authorName}` : '' }
                            </li>
                        `).join('')}
                        ${results.generalInfos.length ? '</ul>' : ''}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs matchs that search. <a href="${universityData.root_url}/programs">View all programs</a></p>`}
                        ${results.programs.map(result => `
                            <li>
                                <a href="${result.permalink}">${result.title}</a> ${result.type == 'post' ? `by ${result.authorName}` : '' }
                            </li>
                        `).join('')}
                        ${results.programs.length ? '</ul>' : ''}
                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="link-list min-list">' : `<p>No professors matchs that search. <a href="${universityData.root_url}/professors">View all professors</a></p>`}
                        ${results.professors.map(result => `
                            <li>
                                <a href="${result.permalink}">${result.title}</a> ${result.type == 'post' ? `by ${result.authorName}` : '' }
                            </li>
                        `).join('')}
                        ${results.professors.length ? '</ul>' : ''}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses matchs that search. <a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
                        ${results.campuses.map(result => `
                            <li>
                                <a href="${result.permalink}">${result.title}</a> ${result.type == 'post' ? `by ${result.authorName}` : '' }
                            </li>
                        `).join('')}
                        ${results.campuses.length ? '</ul>' : ''}
                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '<ul class="link-list min-list">' : '<p>No events matchs that search</p>'}
                        ${results.events.map(result => `
                            <li>
                                <a href="${result.permalink}">${result.title}</a> ${result.type == 'post' ? `by ${result.authorName}` : '' }
                            </li>
                        `).join('')}
                        ${results.events.length ? '</ul>' : ''}
                    </div>
                </div>
            `);
        })
        .fail((err) => {
            this.resultsDiv.append('<p>Something went wrong please try again.</p>');
            // console.log(err.status + ' ' + err.responseJSON.message);
            console.log(err);
            console.log(err.responseText);
        })
        .always(() => {
            this.spinner.hide();
        });
    }

    keyPressDispacher(e) {
        switch (e.key) {
            case "s":
                this.openOverlay();
                break;
            case "Escape":
                this.closeOverlay();
                break;
            default:
                break;
        }
    }

    openOverlay(){
        if (this.isOverlayOpen == true || $('input, textarea').is(':focus')) return;
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 301);
        this.isOverlayOpen = true;
        console.log('open');
    }
    
    closeOverlay(){
        if (this.isOverlayOpen == false) return;
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOverlayOpen = false;
        console.log('close');
    }

    addSearchHTML() {
        $('body').append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
            <div class="container">
                <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                <input id="search-term" type="text" class="search-term" placeholder="What are you looking for?">
                <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
            </div>
            </div>
            <div class="container">
            <div id="search-overlay__results">
                <div class="spinner-loader"></div>
            </div>
            </div>
        </div>
        `);
    }
}

