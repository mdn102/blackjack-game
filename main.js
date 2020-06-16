//  DESCRIPTION CARD 
const faces = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];


// DESCRIPTION DECK  
let deck = new Array();
function getDeck() {
    deck = new Array();
    for (let i = 0; i < faces.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            let val = parseInt(faces[i]);
            if (faces[i] == "J" || faces[i] == "Q" || faces[i] == "K") {
                val = 10;
            }
            if (faces[i] == "A") {
                val = 11;
            }
            let card = {
                Face: faces[i],
                Suit: suits[j],
                Value: val
            };
            deck.push(card);
        }
    }
}


// DEFINITION PLAYERS 
let players = new Array();
function getPlayers(num) {
        players = new Array();
        for(let i = 1; i <= num; i++)
        {
            let hand = new Array();
            let player = { Name: `Player${i}`, ID: i, Score: 0, Hand: hand };
            players.push(player);
        }
    }

function getPlayerForm() {
    document.getElementById('players').innerHTML = '';
    for (let i = 0; i < players.length; i++) {
        let nav_player = document.createElement('nav');
        let nav_playerid = document.createElement('nav');
        let nav_hand = document.createElement('nav');
        let nav_score = document.createElement('nav');

        nav_score.className = 'score';
        nav_score.id = `score_${i}`;
        nav_player.id = `player_${i}`;
        nav_player.className = 'player';
        nav_hand.id = `hand_${i}`;
        if (`Player${players[i].ID}` == 'Player1') {
            nav_playerid.innerHTML = `Player`;
        }
        if (`Player${players[i].ID}` == 'Player2') {
            nav_playerid.innerHTML = `Dealer`;
        }

        nav_player.appendChild(nav_playerid);
        nav_player.appendChild(nav_hand);
        nav_player.appendChild(nav_score);
        document.getElementById('players').appendChild(nav_player);
    }
}


//  SHUFFLING CARD DECK  
function shuffleDeck() {
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
            updateScore();
        }
    }
    document.getElementById('deckCount').innerHTML = deck.length;
}


//  RENDER CARD : A CARD IS DEALT TO A APRTICULAR, IT WILLL BE ADDED TO THEIR HAND
function renderCard(card, player) {
    let hand = document.getElementById(`hand_${player}`);
    hand.appendChild(getCardFace(card));
}

// CREATE CARD FACE
function getCardFace(card) {
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
    e.innerHTML = card.Face + '<br/> ' + icon;
    return e;
}


//  GET POINTS
function getScore(player) {
    let score = 0;
    let aces  = 0;
    for (let i = 0; i < players[player].Hand.length; i++) {
        score += players[player].Hand[i].Value;
        if (players[player].Hand[i].Value === 11) {
            aces ++;
        }
    }
    while (aces && score > 21) {
        score -= 10;
        aces--;
    }
    players[player].Score = score;
    return score;
}

// COUNT POINT OF CURRENT PLAYER
function updateScore() {
    for (var i = 0 ; i < players.length; i++) {
        getScore(i);
        document.getElementById(`score_${i}`).innerHTML = players[i].Score;
    }
     
}


//  CHECK WIN / LOOSE / TIE
let currentPlayer = 0;
function checkScore() {
    // check Blackjack 
    if (players[currentPlayer].Score === 21) {
        // for (var i = 0 ; i < players.length; i++) { 
            if (`Player${players[currentPlayer].ID}` == 'Player1') {
                document.getElementById('status').innerHTML = `Player Blackjack.`;
            }
            if (`Player${players[currentPlayer].ID}` == 'Player2') {
                document.getElementById('status').innerHTML = `Dealer Blackjack.`;
            }
        // }
        document.getElementById('status').style.display = "flex";   
    }

    // check Loose
    if (players[currentPlayer].Score > 21) { 
        // for (var i = 0 ; i < players.length; i++) {
            if (`Player${players[currentPlayer].ID}` == 'Player1') {
                document.getElementById('status').innerHTML = `Busted, Player Lost.`;
            }
            if (`Player${players[currentPlayer].ID}` == 'Player2') {
                document.getElementById('status').innerHTML = `Busted, Dealer Lost.`;
            }
        // }
        document.getElementById('status').style.display = "flex";    
        checkResult();
    }
    
}

function checkResult() {
    let point = 0;  
    for(var i = 0; i < players.length; i++) {
        // check Win();
        if ((players[currentPlayer].Score < 21) && (players[i].Score > point)) {
            if (`Player${players[currentPlayer].ID}` == 'Player1') {
                document.getElementById('status').innerHTML = `Player Win.`;
            }
            if (`Player${players[currentPlayer].ID}` == 'Player2') {
                document.getElementById('status').innerHTML = `Dealer Win.`;
            }
            document.getElementById("status").style.display = "flex";
        } 
        // check Tie
        else if ((players[currentPlayer].Score < 21) && (players[i].Score == point)) {
            document.getElementById('status').innerHTML = `TIE. Restart Game.`;
            document.getElementById("status").style.display = "flex";
        }
        point = players[i].Score;
        
    }
}


//  HIT FEATURE
// pop a card from the deck to the current player
// check if current player new points are over 21
function hit() {
    let card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updateScore();
    document.getElementById('deckCount').innerHTML = deck.length;
    checkScore();
}


// STAND FEATURE
// move on to next player
function stand() {
    if (currentPlayer != players.length-1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer ++;
        document.getElementById('player_' + currentPlayer).classList.add('active');
        checkScore();
    } 
    else {
        checkResult();
    }
    
}


//  START GAME
function startGame() {
    document.getElementById('start').value = 'Restart';
    document.getElementById("status").style.display="none";
    currentPlayer = 0;
    getDeck();
    shuffleDeck();
    getPlayers(2);
    getPlayerForm();
    dealtHand();
    checkScore();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

//  ACTIVE EVENT 

let startBtn = document.getElementById("start");
startBtn.onclick = function(e) {
    startGame();
};

let hitBtn = document.getElementById("hit");
hitBtn.onclick = function(e) {
    hit();
};

let standBtn = document.getElementById("stand");
standBtn.onclick = function(e) {
    stand();
};

window.addEventListener('load', function(e){
    getDeck();
    shuffleDeck();
    getPlayers(2);
});

//  DISPLAY THE RULE 
let rulesBtn = document.getElementById("rulesBtn");
let rulesList = document.getElementById("rulesList");
let span = document.getElementsByClassName("close")[0];

rulesBtn.onclick = function(e) {
  rulesList.style.display = "block";
}

span.onclick = function(e) {
    rulesList.style.display = "none";
}

window.onclick = function(e) {
    if (e.target == rulesList) {
        rulesList.style.display = "none";
    }
}