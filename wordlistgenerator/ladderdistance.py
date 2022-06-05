from collections import defaultdict, deque
from typing import List

from jsonfilelist import list_to_json_file
from jsonfilelist import json_file_to_list

def all_pairs_ladder_lengths(word_list: List[str]) -> dict:
    res = {begin_word: [] for begin_word in word_list}
    adj_list = build_graph(word_list)
    i = 0
    for begin_word in word_list:
        res[begin_word] = single_source_ladder_lengths(begin_word, word_list, adj_list)
        i += 1
    return res

def single_source_ladder_lengths(begin_word: str, word_list: List[str], adj_list: defaultdict[str, List[str]]) -> dict:
    res = {}  # {word: -1 for word in word_list}
    res[begin_word] = 0
    visited = set([begin_word])
    q = deque([(begin_word, 0)])
    while q:
        word, word_count = q.popleft()
        res[word] = word_count
        for adj_word in adj_list[word]:
            if adj_word not in visited:
                q.append((adj_word, word_count + 1))
                visited.add(adj_word)
    return res

def ladder_length(begin_word: str, end_word: str, word_list: List[str]) -> int:
    adj_list = build_graph(word_list)
    visited = set(begin_word)
    q = deque([(begin_word, 0)])
    while q:
        word, word_count = q.popleft()
        if word == end_word:
            return word_count
        for adj_word in adj_list[word]:
            if adj_word not in visited:
                q.append((adj_word, word_count + 1))
                visited.add(adj_word)
    return -1

def build_graph(word_list):
    adj_list = defaultdict(list[str])
    for i in range(len(word_list)):
        for j in range(i + 1, len(word_list)):
            word1 = word_list[i]
            word2 = word_list[j]
            
            if is_adjacent(word1, word2):
                adj_list[word1].append(word2)
                adj_list[word2].append(word1)
    return adj_list

def is_adjacent(word1, word2):
    char_diffs = 0
    for i in range(len(word1)):
        if word1[i] != word2[i]:
            char_diffs += 1
        if char_diffs >= 2:
            return False
    return True

valid_guesses_json_file = 'constants/oldvalidGuesses.json'
all_pairs_ladder_lengths_fie = 'constants/ladderdistances.json'

valid_guesses = json_file_to_list(valid_guesses_json_file)
list_to_json_file(all_pairs_ladder_lengths(valid_guesses), 'test.json')

# word_list = ['can', 'ban', 'cap', 'cop', 'dog', 'xyz', 'bad', 'dad']
# list_to_json_file(all_pairs_ladder_lengths(word_list), 'test2.json')
