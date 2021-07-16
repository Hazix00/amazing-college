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
        
        const displayResultsByType = (posts, noMatchMsg, allPostspath='') => `
            ${posts.length ? '<ul class="link-list min-list">' : `<p>No ${noMatchMsg} matchs that search${allPostspath == '' ? '' : `. <a href="${universityData.root_url}/${allPostspath}">View all ${allPostspath}</a>`}</p>`}
            ${posts.map(post => `
                <li>
                    <a href="${post.permalink}">${post.title}</a> ${post.type == 'post' ? `by ${post.authorName}` : '' }
                </li>
            `).join('')}
            ${posts.length ? '</ul>' : ''}
        `;

        const dataUrl = universityData.root_url + '/wp-json/university/v1/search?term=' + this.searchValue;
        $.getJSON(dataUrl)
        .done((results) => {
            console.log(results);
            this.resultsDiv.append(`
                <div class="row">
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">General information</h2>
                        ${displayResultsByType(results.generalInfos, 'general information')}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Programs</h2>
                        ${displayResultsByType(results.programs, 'programs', 'programs')}
                        <h2 class="search-overlay__section-title">Professors</h2>
                        ${results.professors.length ? '<ul class="professor-cards">' : `<p>No professors match that search</p>`}
                        ${results.professors.map(result => `
                            <li class="professor-card__list-item">
                                <a class="professor-card" href="${result.permalink}">
                                    <img class="professor-card__image" src="${result.image}">
                                    <span class="professor-card__name">${result.title}</span>
                                </a>
                            </li>
                        `).join('')}
                        ${results.professors.length ? '</ul>' : ''}
                    </div>
                    <div class="one-third">
                        <h2 class="search-overlay__section-title">Campuses</h2>
                        ${displayResultsByType(results.campuses, 'campuses', 'campuses')}
                        <h2 class="search-overlay__section-title">Events</h2>
                        ${results.events.length ? '<ul class="professor-cards">' : `<p>No events match that search</p>`}
                        ${results.events.map(result => `
                            <div class="event-summary">
                                <a class="event-summary__date t-center" href="${result.permalink}">
                                <span class="event-summary__month">${result.date.month}</span>
                                <span class="event-summary__day">${result.date.day}</span>  
                                </a>
                                <div class="event-summary__content">
                                <h5 class="event-summary__title headline headline--tiny"><a href="${result.permalink}">${result.title}</a></h5>
                                <p>
                                    ${result.description}
                                    <a href="${result.permalink}" class="nu gray">Read more</a>
                                </p>
                                </div>
                            </div>
                        `).join('')}
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

