---
Notes: "[[L8 - Quicksort.pdf]]"
tags: 
aliases:
  - quicksort
  - Quicksort
---
### Quicksort

#### At a glance
Quicksort is based on the divide-and-conquer paradigm and is a [[Lesson 5|Recursive]] algorithm (like [[Lesson 4|Merge Sort]])

>[!tip] Quicksort time complexity
>Worst case:     $\Theta(n^2)$
>Average case: $O(n\lg n)$

#### The Quicksort Algorithm
1. **Divide**:
	- Partition the $n$-element array around some **pivot** $x$ into two subarrays representing elements $\leq x$ and $> x$
	![[Pasted image 20240205083906.png]]
2. **Conquer**:
	- Sort the two subarrays recursively
3. **Combine**:
	- automatically happens (in-place)

```python
def quicksort(A: array, p: first_item, r: last_item):
	if p < r:
		q = partition(A, p, r)
		Quicksort(A, p, q -1)
		Quicksort(A, q + 1, r)

def partition(A: array, p: first_item, r: last_item):
	x = A[r]
	for i in range(p-1, r):
		if A[j] <= x:
			i = i + 1
			A[i], A[j] = A[j], A[i]
	A[i + 1], A[r] = A[r], A[i + 1]
	return i + 1
```