# Blackjack Games: 
  This is my first project at General Assembly. It is still need to improving code for more features. The rules of Blackjack can be grasped within minutes. However, depending on which variant you are playing, table rules and betting options may differ. There are a variety of Blackjack game types, since I have only one 1 week to finish my first project , so I cut off several options, will try to improve next versions on both Single Player and Multi-Player tables with some add-in features in the future.

  ### General Game Rules: 
  I changed the rule of game a quitely different with the orginal rule of Balackjack. It's fun and relax game for one player under 2 roles Player & Dealer. 
  Player and Dealer are dealt a starting hand of 2 cards with the hopes of getting to the magical number of 21, or to get as close to 21 as possible. If a player gets 21 on his initial hand, it is called a “blackjack”. The winning effect immediately, and game end. The other ways to win are to hold a higher sum of cards at the end of the play than the house, or to have the house go over 21.The goal in any hand of Blackjack is to beat the dealer. To do this, you must have a hand that scores higher than the dealer’s hand, but does not exceed 21 in total value. Alternatively, you can win by having a score lower than 22 when the value of the dealer’s hand exceeds 21. When the total value of your hand is 22 or more, this is more commonly known as ‘busting’, and you will automatically lose .

  ### Game Play Options:
  Player will be presented with a number of decisions to make during each round of Blackjack. The decisions open to player will depend upon the cards player are dealt and the game variant player are playing. Here are the options traditionally in Blackjack:

    * Hit: Player can request additional cards to improve their hand(s). Cards will be drawn one at a time until the total hand value is 21 or higher.
    * Stand: When the total value of player’s hand is 21 or lower, and can choose to stand and not to risk the chance of thier hand(s exceeding 21 in total value.
    
  ### Screenshot: 
   * Begin of game: https://imgur.com/s6HHkkt
   * Click Start : https://imgur.com/qQF4JH1
   * Playing Game: https://imgur.com/I2FYcSK
   * View rule: https://imgur.com/bLOt9dh
   
  ### Technology: 
   * HTML
   * CSS
   * JS/DOM 
   
  ### Walk-through Code: 
  
    * Create card , deck , players and player form. 
    
    * Shutlling deck, dealting hand(dealt 2 cards for each of players), render card to players . 
    
    * Check score function will be revoked as if Balckjack happen at first time and check result after dealer decided stand.
    
    * Player will play first, since the player already known the score of dealer, easy to decide by click hit or stand. 
    
    * The dealer will have many chances to compete after the player done the turn and all cards on hand of both was opened. 
    
    * There are some other features such as: the number of cards remaining in the deck, the status of game, update score.
    
    * Rule button for review the rule of game. Can be close by click any location in window of close symbol ([X]) .
    
  ### Icebox Feature: 
    1. Refactoring code DRY.
    2. Adding more players, also human play with computer. 
    3. Implement rule and level.
    4. Analize the chance of win.
    5. Create the player database such as: personal info, storage score, and upload game online. 
    
 ### My code using some reference source below: 
 
 Cite:
 
  * https://www.pokerstarscasino.com/games/blackjack/
  
  * https://code-boxx.com/javascript-blackjack/
  
  * https://hackernoon.com/blackjack-application-with-javascript-2c76db51dea7
  
  * https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
  
  * https://bicyclecards.com/how-to-play/blackjack/
  
