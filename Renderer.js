class Renderer {
    constructor () {
        this.userInfoTemplate = Handlebars.compile($('#user-container-template').html());
        this.quoteTemplate = Handlebars.compile($('#quote-container-template').html());
        this.pokemonTemplate = Handlebars.compile($('#pokemon-container-template').html());
        this.aboutMeTemplate = Handlebars.compile($('#about-container-template').html());
        this.friendsTemplate = Handlebars.compile($('#friends-container-template').html());
        
    }
    refresh(userData) {
        this.renderUserInfo(userData.mainUser)
        this.renderQuote(userData.quote)
        this.renderPokemon(userData.pokemon)
        this.renderAboutMe(userData.aboutMe)
        this.renderFriends(userData.friends)
    }
    renderUserInfo (mainUser) {
        $('.user-container').empty()
        const newHTML = this.userInfoTemplate(mainUser)
        $('.user-container').append(newHTML)
    }
    renderQuote (quote) {
        $('.quote-container').empty()
        const newHTML = this.quoteTemplate({quote: quote})
        $('.quote-container').append(newHTML)
    }
    renderPokemon (pokemon) {
        $('.pokemon-container').empty()
        pokemon.name = pokemon.name[0].toUpperCase()+ pokemon.name.slice(1)
        const newHTML = this.pokemonTemplate(pokemon)
        $('.pokemon-container').append(newHTML)
    }
    renderAboutMe (aboutMe) {
        $('.meat-container').empty()
        const newHTML = this.aboutMeTemplate({aboutMe: aboutMe})
        $('.meat-container').append(newHTML)
    }
    renderFriends (friends) {
        $('.friends-container').empty()
        const newHTML = this.friendsTemplate({friends: friends})
        $('.friends-container').append(newHTML)
    }
}