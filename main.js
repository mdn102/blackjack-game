//  DESCRIPTION CARD FORM
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];


// DESCRIPTION DECK  
let deck = new Array();
function getDeck() {
    deck = new Array();
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K") {
                weight = 10;
            }
            if (values[i] == "A") {
                weight = 11;
            }
            let card = {
                Value: values[i],
                Suit: suits[j],
                Weight: weight
            };
            deck.push(card);
        }
    }
}


// DEFINITION PLAYERS 
let players = new Array();
function getPlayers(num) {
    
        players = new Array();
        for(var i = 1; i <= num; i++)
        {
            var hand = new Array();
            var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
            players.push(player);
        }
    }

function getPlayerForm() {
    document.getElementById('players').innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        let nav_player = document.createElement('nav');
        let nav_playerid = document.createElement('nav');
        let nav_hand = document.createElement('nav');
        let nav_points = document.createElement('nav');

        nav_points.className = 'points';
        nav_points.id = 'points_' + i;
        nav_player.id = 'player_' + i;;
        nav_player.className = 'player';
        nav_hand.id = 'hand_' + i;

        nav_playerid.innerHTML = 'Player ' + players[i].ID;
        nav_player.appendChild(nav_playerid);
        nav_player.appendChild(nav_hand);
        nav_player.appendChild(nav_points);
        document.getElementById('players').appendChild(nav_player);
    }
}


//  SHUFFLING CARD DECK  
function shuffle() {
    for (let i = 0; i < 1000; i++) {
        let x = Math.floor(Math.random() * (deck.length));
        let y = Math.floor(Math.random() * (deck.length));
        let temp = deck[x];

        deck[x] = deck[y];
        deck[y] = temp
    }
}


// DEAL THE CARD TO EACH OF PLAYERS (2 CARDS EACH)
function dealtHand() {
    for (let i = 0; i < 2; i++) {
        for (var j = 0; j < players.length; j++){
            let card = deck.pop();
            players[j].Hand.push(card);
            renderCard(card, j);
            updatePoints();
        }
    }
    updateDeck();
    
}

// COUNT CURRENT CARD OF DECK
function updateDeck() {
    document.getElementById('deckcount').innerHTML = deck.length;
}


//  RENDER CARD : A CARD IS DEALT TO A APRTICULAR, IT WILLL BE ADDED TO THEIR HAND
function renderCard(card, player) {
    let hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardForm(card));
}

// CREATE CARD FACE
function getCardForm(card) {
    let e = document.createElement('div');
    let icon = '';
    if (card.Suit == "Hearts") { 
        icon = '&hearts;'; 
    }
    else if (card.Suit == "Diamonds") { 
        icon = '&diams;'; 
    }
    else if (card.Suit == "Clubs") { 
        icon = '&clubs;'; 
    }
    else { 
        icon = '&spades;'; 
    };

    e.className = 'card';
    e.innerHTML = card.Value + '<br/> ' + icon;
    return e;
}


//  GET POINTS
function getPoints(player) {
    let points = 0;
    for (let i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

// COUNT POINT OF CURRENT PLAYER
function updatePoints() {
    for (var i = 0 ; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}


//  CHECK WIN / LOOSE / TIE
let currentPlayer = 0;
function checkLoose() {
    if (players[currentPlayer].Points > 21) {
        document.getElementById('status').innerHTML = `Wanna try again, Player${players[currentPlayer].ID}?`;
        document.getElementById('status').style.display = "flex";
        checkWin();
    }
}

function checkWin() {
    let winner = -1;
    let score = 0
    for(var i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
            document.getElementById('status').innerHTML = `Double Down, Player${players[winner].ID}?`;
        } 
        // check Tie
        else if (players[i].Points == score && players[i].Points < 22) {
            document.getElementById('status').innerHTML = `TIE. Restart Game.`;
        }
        score = players[i].Points;
    }
    document.getElementById("status").style.display = "flex";
}


//  HIT FEATURE
// pop a card from the deck to the current player
// check if current player new points are over 21
function hit() {
    let card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    checkLoose();
}


// STAND FEATURE
// move on to next player
function stand() {
    if (currentPlayer != players.length-1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    }
    else {
        checkWin();
    }
}

//  START GAME
function startGame() {
    document.getElementById('start').value = 'Restart';
    document.getElementById("status").style.display="none";
    currentPlayer = 0;
    getDeck();
    shuffle();
    getPlayers(2);
    getPlayerForm();
    dealtHand();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

//  ACTIVE EVENT 

let startBtn = document.getElementById("start");
startBtn.onclick = function() {
    startGame();
};

let hitBtn = document.getElementById("hit");
hitBtn.onclick = function() {
    hit();
};

let standBtn = document.getElementById("stand");
standBtn.onclick = function() {
    stand();
};

window.addEventListener('load', function(){
    getDeck();
    shuffle();
    getPlayers(1);
});

//  DISPLAY THE RULE 
let rulesBtn = document.getElementById("rulesBtn");
let rulesList = document.getElementById("rulesList");
let span = document.getElementsByClassName("close")[0];

rulesBtn.onclick = function() {
  rulesList.style.display = "block";
}

span.onclick = function() {
    rulesList.style.display = "none";
}

window.onclick = function(e) {
    if (e.target == rulesList) {
        rulesList.style.display = "none";
    }
}