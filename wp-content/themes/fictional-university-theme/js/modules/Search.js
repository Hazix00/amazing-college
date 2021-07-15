import $ from 'jquery'
export default class Search {
    constructor() {
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
                this.typingTimer = setTimeout(this.getResults.bind(this) , 2000);
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
        this.spinner.hide();
        this.resultsDiv.append("The search functionality is not completed yet!")
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
}

