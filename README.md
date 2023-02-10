# Notwordle

Guess the word in 10 tries. After each guess, the color of the tiles will
change to show how close your guess was to the word.

Unfortunately, the typical Wordle letter tiles are broken, 
and you will need to rely on other clues on how your guess relates to the solution.
Playing on PC is strongly recommended. (You might also want paper to write on!)

Meaning of clues to the right of each word, from left to right:
<ol>
  <li>
    <a href="https://www.thewordfinder.com/scrabble-point-values.php" target="_blank" className={a_classes}>Scrabble score</a> 
    of your guess
  </li>
  <li>
    Guess Scrabble score compared to solution Scrabble score
  </li>
  <li>
    Alphabetical comparison of guess to solution (which comes first in dictionary)
  </li>
  <li>
    Word frequency comparison of guess to solution (based on Google Books n-grams dataset)
  </li>
  <li>
    Shortest word ladder length from guess to solution, altering one letter at a time 
    (displays "-" if word ladder doesn't exist) 
    For example, the length between SHINY and STING is 4 (number of letter changes): SHINY → SHINE → SWINE → SWING → STING.
  </li>
  <li>
    Clue based original Wordle letter colors: 
    displays green if there is at least one green in the guess, else yellow if there is at least one yellow in the guess, 
    and gray otherwise. The number on the tile is how many letters of that color are present in the guess.
  </li>
</ol>

[**Play the daily game here!**](https://notwordle0.netlify.app/)

This is one of the Wordle variants I have made. The other games and instructions for creating your own Wordle variant can be found [here](https://github.com/Compsciler/Wordle-With-Score-Database/).
