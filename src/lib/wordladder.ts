export function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  if (beginWord === endWord) return 0;

  const words = new Set(wordList);
  if (!words.has(beginWord) || !words.has(endWord)) return -1;
  
  
  let words1 = [beginWord], words2 = [endWord];
  let step = 0;
  
  // Break if there is no word left on either side to analyse
  while (words1.length && words2.length) {
      step++;
      
      // Swap for reducing the time spent (since we are iterating over words1)
      if (words1.length > words2.length) [words1, words2] = [words2, words1];
      const longerWordList = new Set(words2);
      let len = words1.length;
      
      // Analyse all words in words1, but not for the added ones during this process
      // Though this way also leads to the answer, it costs too much time
      while (len--) {
          const baseWord = words1.shift();
          if (!baseWord) {
            throw new Error("baseWord is undefined");
          }
          let i = baseWord.length;
          
          // Try different positions in the base word
          while (i--) {
              
              // Try all letters
              for (let j = 97; j <= 122; j++) { 
        // New word by replacing one letter in the base word
                  const word = `${baseWord.slice(0, i)}${String.fromCharCode(j)}${baseWord.slice(i + 1)}`;
                  
                  if (longerWordList.has(word)) return step;
                  
                  // Not finished yet, but the new word exists in wordList
                  if (words.has(word)) {
                      words1.push(word);
                      words.delete(word); // Avoid analysing for one word repeatedly
                  }
              }
          }
      }
  }
  
  // Failed to connect q1 and q2
  return -1;
};
