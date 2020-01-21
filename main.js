const redux = require('redux')

// store, actions, reducer are always needed. 

//Blackjack card game
//deckOfCards [c1,c2, c3, c4, c5]

//store:
//deck of cards
// const storeStructure = {
//     deck: [],
//     dealer: [],
//     player: [],
// }
//actions:
//initialize - start with a fresh deck
//shuffle - shuffle the deck
//deal - give two cards to the dealer and player
//hit - give one card just to the player
//stay - end current hand
//fold - quit hand

//returns an unshuffled deck of cards
function createDeck () {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    const faces = [2,3,4,5,6,7,8,9,10,'J', 'Q', 'K', 'A'];

    const deck = [];
    for (suit of suits) {
        for (face of faces){
            deck.push({ suit, face });
        }
    }
    return deck;
}

//create a reducer that accepts actions and returns a new state
//depending on the action
const reducer = (state, action) => {
    if (state === undefined){
        return {
            deck: createDeck(),
            dealer: [],
            player: [],
        }
    } 


    const copy = [...state.deck];
    switch (action.type) {
        case 'SHUFFLE':
            //shuffle the deck
            for (let index in copy) {
                let swapIndex = Math.floor(Math.random() * copy.length);
                let tempCard = copy[swapIndex];
                copy[swapIndex] = copy[index];
                copy[index] = tempCard;
            }
            return {
                deck: copy,
                dealer: state.dealer,
                player: state.player,
            }

        case 'DEAL':
            console.log('DEAL');
            return {
                deck: copy,
                dealer: [copy.pop(), copy.pop()],
                player: [copy.pop(), copy.pop()],
            }
        case 'HIT': 
        console.log('HIT');
            return {
                deck: copy,
                dealer: state.dealer,
                player: [...state.player, copy.pop()],
            }
        case 'FINISH_HAND':
            return {
                deck:[...state.deck, ...state.dealer, ...state.player],
                dealer: [],
                player: [],
            }
        default: {
            return state;
        }
    }
}

const store = redux.createStore(reducer);

store.subscribe(() => {
    const state = store.getState();
    console.log('deck.length: ', state.deck.length);
    console.log('dealer: ', state.dealer);
    console.log('player: ', state.player);
})

store.dispatch({ type: 'SHUFFLE'});
store.dispatch({ type: 'DEAL'});
store.dispatch({ type: 'HIT'});
store.dispatch({ type: 'HIT'});
store.dispatch({ type: 'FINISH_HAND'});