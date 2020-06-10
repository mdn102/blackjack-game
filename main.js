// DESCRIPTION CARD 
const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

// DESCRIPTION CARD DECK  
function createDeck()
{
    deck = new Array();
    for (let i = 0 ; i < values.length; i++)
    {
        for(let j = 0; j < suits.length; j++)
        {
            let cardVals = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                cardVals = 10;
            if (values[i] == "A")
                cardVals = 11;
            const card = { Value: values[i], Suit: suits[j], CardVal: cardVals };
            deck.push(card);
        }
    }
}