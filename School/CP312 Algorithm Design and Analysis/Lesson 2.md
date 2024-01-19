---
Notes: "[[L2 - Analyzing Algorithms.pdf]]"
tags:
  - algorithms
  - "#insertion-sort"
  - Code
---
### Insertion Sort
Recall [[Lesson 1#What are algorithms?|The Sorting Problem]]
```python
def insertion_sort(items: list) -> list:
	for j in range(len(items)):
		temp = items[j]
		i = j - 1
		while i > 0 and items[i] > temp:
			items[i+1] = items[i]
			i = i - 1
		items[i+1] = temp
	return items 
```
for a more in depth look: [[L2 - Analyzing Algorithms.pdf]]
