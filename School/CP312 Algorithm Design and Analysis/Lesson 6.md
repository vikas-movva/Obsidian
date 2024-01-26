---
Notes: "[[L6 - Divide-and-Conquer.pdf]]"
tags:
  - algorithms
  - "#math"
  - "#merge-sort"
  - "#binary-search"
  - "#divide-and-conquer"
  - "#recurrence"
---
### Divide-and-Conquer Algorithms
Steps:
1. **Divide** the problem (instance) into subproblems
2. **Conquer** the subproblem by solving them **recursively**
3. **Combine** subproblem solutions

The Running-time function looks like so:
$$T(n) = aT(s(n)) + C(n) + D(n)$$
**Where:**

| Symbol | Description |
| ---- | ---- |
| $T(n)$ | Running-time on input size $n$ |
| $a$ | Number of subproblems |
| $s(n)$ | Subproblem size |
| $C(n)$ | Work combining |
| $D(n)$ | Work dividing |

#### Example: Merge sort
$$T(n) = 2T(n/2) + \Theta(n) + \Theta(1)$$

| Symbol | Description |
| ---- | ---- |
| $T(n)$ | Running-time on input size $n$ |
| $2$ | Number of subproblems |
| $n/2$ | Subproblem size |
| $\Theta(n)$ | Work combining |
| $\Theta(1)$ | Work dividing |

#### Example: Binary search:
**Problem:** Find an element in a sorted array
**Input:** Sorted array `A[1, ..., n]` and target element $x$
**Output:** Location of $x$ if it exists in `A` or $-1$ otherwise.

Find $x = 7$
Steps:
1. **Divide:** Check the middle element
2. **Conquer:** Recursively search 1 sub-array
3. **Combine:** Do nothing

##### Recurrence for Binary search
$$T(n) = 1T(n/2) + \Theta(1) + \Theta(1)$$
$a = 1, b = 2$
$n^{log_ba} = n^{log_21} = n^0 = 1$  vs. $f(n) = \Theta(1)$
We can use [[Lesson 5#The Master Method|Case 2:]] $(k = 0)$ $f(n) = \Theta(n^{log_ba}lg^kn)$
$= \Theta(1lg^0n)$
$= \Theta(1)$
$\therefore, T(n) \Theta(lg\text{ }n))$ 

