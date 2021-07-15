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
        const postsUrl = universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchValue;
        const pagesUrl = universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchValue;

        $.when(
            $.getJSON(postsUrl),
            $.getJSON(pagesUrl)
        )
        .then((posts, pages) => {
            const combinedResults = posts[0].concat(pages[0]);
            console.log(posts);
            console.log(pages);
            console.log(combinedResults);
            this.resultsDiv.append(`
                <h2 class="search-overlay__section-title">General information</h2>
                ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No general information matchs that search</p>'}
                    ${combinedResults.map(result => `
                        <li>
                            <a href="${result.link}">${result.title.rendered}</a> ${result.type == 'post' ? `by ${result.authorName}` : '' }
                        </li>
                    `).join('')}
                ${combinedResults.length ? '</ul>' : ''}
            `);
        })
        .fail((err) => {
            this.resultsDiv.append('<p>Something went wrong please try again.</p>');
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

