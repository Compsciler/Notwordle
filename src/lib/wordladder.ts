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
              for (let j = 'A'.charCodeAt(0); j <= 'Z'.charCodeAt(0); j++) { 
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

export function ladderLengthSlow(beginWord: string, endWord: string, wordList: string[]): number {
    let firstLadder = findFirstLadder(beginWord, endWord, wordList)
    return firstLadder.length - 1  // -1 if ladder doesn't exist
}

// Prioritize ladder with most common words?
export function findFirstLadder(beginWord: string, endWord: string, wordList: string[]): string[] {
    let ladders = findLadders(beginWord, endWord, wordList)
    if (ladders.length === 0) {
        return []
    }
    return ladders[0]
}

export function findLadders(beginWord: string, endWord: string, wordList: string[]): string[][] {
    // to check if two words can connect
    let connected = (a: string, b: string) => {
        let c = 0
        for (let i = 0; i < a.length && c < 2; i++) {
            if (a[i] !== b[i]) c++
        }
        return c === 1
    }

    // dictionary to help us search words faster
    // and to trackback what word was used
    let dict = new Set(wordList);
    if (dict.has(endWord) === false) return []

    if (beginWord === endWord) {
        return [[endWord]]
    }

    dict.delete(beginWord)
    let queue = [beginWord]
    let nodes = []

    
    // find all ways from beginning
    // level by level, until reach end at a level
    let reached = false;    
    while (queue.length && !reached) {
        // update nodes of paths for this level
        nodes.push(queue.slice())

        // access whole level   
        let qlen = queue.length;
        for (let i = 0; i < qlen && !reached; i++) {

            let from = queue.shift()!;
            
            // find all nodes that connect to the nodes of this level
            for (let to of dict) {                

                if (connected(from,to) === false) continue

                // if connect
                // - and one of them is end word
                // - then we can stop moving forward
                if (to === endWord) {
                    reached = true
                    break;
                }

                // - otherwise,
                // - add all connected nodes to the record for the next level
                // - and delete them from dict to prevent revisiting to form cycles
                queue.push(to)                
                dict.delete(to)                
            }
        }
    }

    // try but did not find endWord
    if (!reached) return []

    // move backward to construct paths
    // add nodes to paths in reverse order to have paths from begin to end
    let ans = [[endWord]]
    for (let level = nodes.length - 1; level >= 0; level--) {        
        let alen = ans.length
        for (let a = 0; a < alen; a++) {
            let p = ans.shift()!
            let last = p[0]            
            for (let word of nodes[level]) {                
                if (!connected(last, word)) continue                
                ans.push([word, ...p])
            }
        }        
    }

    return ans
}
