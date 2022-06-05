// Converted from Python to JS: https://extendsclass.com/python-to-javascript.html

import { defaultdict, deque } from 'collections';

var _pj;

function _pj_snippets(container) {
  function in_es6(left, right) {
    if (right instanceof Array || typeof right === "string") {
      return right.indexOf(left) > -1;
    } else {
      if (right instanceof Map || right instanceof Set || right instanceof WeakMap || right instanceof WeakSet) {
        return right.has(left);
      } else {
        return left in right;
      }
    }
  }

  container["in_es6"] = in_es6;
  return container;
}

_pj = {};

_pj_snippets(_pj);

export function ladderLength(beginWord, endWord, wordList) {
  var adj_list, q, visited, word, word_count;
  adj_list = buildGraph(wordList);
  visited = new Set([beginWord]);
  q = deque([[beginWord, 1]]);

  while (q) {
    [word, word_count] = q.popleft();

    if (word === endWord) {
      return word_count;
    }

    for (var adj_word, _pj_c = 0, _pj_a = adj_list[word], _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
      adj_word = _pj_a[_pj_c];

      if (!_pj.in_es6(adj_word, visited)) {
        q.append([adj_word, word_count + 1]);
        visited.add(adj_word);
      }
    }
  }

  return 0;
}

function buildGraph(wordList) {
  var adj_list, word1, word2;
  adj_list = defaultdict([]);

  for (var i = 0, _pj_a = wordList.length; i < _pj_a; i += 1) {
    for (var j = i + 1, _pj_b = wordList.length; j < _pj_b; j += 1) {
      word1 = wordList[i];
      word2 = wordList[j];

      if (isAdjacent(word1, word2)) {
        adj_list[word1].append(word2);
        adj_list[word2].append(word1);
      }
    }
  }

  return adj_list;
}

function isAdjacent(word1, word2) {
  var char_diffs;
  char_diffs = 0;

  for (var i = 0, _pj_a = word1.length; i < _pj_a; i += 1) {
    if (word1[i] !== word2[i]) {
      char_diffs += 1;
    }

    if (char_diffs >= 2) {
      return false;
    }
  }

  return true;
}
