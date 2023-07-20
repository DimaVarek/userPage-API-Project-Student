//This is the class that will manage all your APIs

class Person {
    constructor() {
        this.name = {
            first: "",
            last: ""
        }
        this.location = {
            city: "",
            state: ""
        },
        this.picture = ""
    }
}
class Pokemon {
    constructor () {
        this.name = ""
        this.picture = ""
        this.pokemonGif = ""
        this.type = ""
    }
}

class APIManager {
    constructor() {
        this.data = {
            mainUser: new Person,
            friends: [],
            quote: "",
            pokemon: new Pokemon,
            aboutMe: ""
        }        
    }
    async refresh(){
        const randomUsersPromise = this._randomUsersRequest(7)
        const randomQuotePromise = this._randomQuoteRequest()
        const randomAboutMePromise = this._randomAboutMeRequest()
        const randomPokemonPromise = await this._randomPokemonRequest()
        const pokemonGifPromise = this._gifByPokemon()
        return Promise.all([randomUsersPromise, randomQuotePromise,
            pokemonGifPromise, randomAboutMePromise])
    }
    async _randomUsersRequest(usersNumber) {
        let randomUsers = await $.get(`https://randomuser.me/api/?results=${usersNumber}`)
        let randomUsersArray = randomUsers.results.map(u => this.getUserData(u))
        this.data.mainUser = randomUsersArray[0]
        this.data.friends = randomUsersArray.slice(1)
    }
    getUserData(userJSONObject) {
        let user = new Person()
        user.name.first = userJSONObject.name.first 
        user.name.last = userJSONObject.name.last
        user.location.city = userJSONObject.location.city
        user.location.state = userJSONObject.location.state
        user.picture = userJSONObject.picture.large
        return user
    }
    async _randomQuoteRequest() {
        let randomQuote = await $.get('https://api.kanye.rest/')
        this.data.quote = randomQuote.quote
    }
    async _gifByPokemon() {
        let apiKey = 'bZvle0mAld1pODg1HUfinKCCqI5enSwy'
        let request = `http://api.giphy.com/v1/gifs/search?q=pokemon+${this.data.pokemon.name}&api_key=${apiKey}&limit=1`
        let pokemonGif = await $.get(request)
        this.data.pokemon.pokemonGif = pokemonGif.data[0].images.original.url
    }
    async _randomPokemonRequest() {
        let randomPokemonNumber = Math.floor(Math.random() * 1010) + 1
        let randomPokemon = await $.get(`https://pokeapi.co/api/v2/pokemon/${randomPokemonNumber}`)
        this.data.pokemon.name = randomPokemon.name
        let image = randomPokemon.sprites.versions['generation-v']['black-white'].animated.front_default
        this.data.pokemon.picture = image ? image : randomPokemon.sprites.front_default
        this.data.pokemon.type = randomPokemon.types[0].type.name
    }
    async _randomAboutMeRequest() {
        let randomAboutMe = await $.get('https://baconipsum.com/api/?type=all-meat&paras=1')
        this.data.aboutMe = randomAboutMe[0]
    }

}
