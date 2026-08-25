---
lc-id: 202
lc-slug: happy-number
lc-title: Happy Number
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/happy-number/
lc-status: accepted
lc-language: python3
aliases:
  - Happy Number
  - "202"
tags:
  - lc/easy
  - lc/hash-table
  - lc/math
  - lc/two-pointers
  - lc/floyds-cycle-finding-algorithm
lc-pattern:
  - Arrays & Hashing
---
# Happy Number
## Problem
Write an algorithm to determine if a number `n` is happy.

A **happy number** is a number defined by the following process:

-   Starting with any positive integer, replace the number by the sum of the squares of its digits.
-   Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
-   Those numbers for which this process **ends in 1** are happy.

Return `true` _if_ `n` _is a happy number, and_ `false` _if not_.

**Example 1:**

```text
Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

**Example 2:**

```text
Input: n = 2
Output: false
```

**Constraints:**

-   `1 <= n <= 2³¹ - 1`

## Code

```leetcode-solve
class Solution:
    def isHappy(self, n: int) -> bool:
        seen = set()
        while n != 1 and n not in seen:
            seen.add(n)
            n = sum(int(d) ** 2 for d in str(n))
    		
        return n == 1
```

## Notes
Intuition: create a set to track seen numbers, if a number is seen twice there is a cycle -> false

>[!Note]
>Time complexity: $O(\log n)$
>Space complexity: $O(\log n)$

```python
def isHappy(self, n: int) -> bool:
	seen = set()
	while n != 1 and n not in seen:
		seen.add(n)
		n = sum(int(d) ** 2 for d in str(n))
		
	return n == 1
```

## Techniques

- [[Arrays & Hashing]]

## Related Variants

- [[141-linked-list-cycle|Linked List Cycle]] — Same cycle-detection structure where repeated state transitions must be detected, solvable with Floyd's two-pointer variant instead of a hash set.
- [[287-find-the-duplicate-number|Find the Duplicate Number]] — Detects a cycle formed by iteratively applying a deterministic function f(x) = nums[x], mirroring the digit-square-sum transition.
- [[128-longest-consecutive-sequence|Longest Consecutive Sequence]] — Next step up in the Arrays & Hashing cluster, requiring clever use of a hash set for O(n) membership-driven iteration.

## AI Review

### Approach

Yes — hash-set cycle detection is the right algorithm. The key insight making it fast: the digit-square map is deterministic, and the sequence collapses immediately — after one step `n ≤ 10·9² = 810`, after two steps `n ≤ 3·9² = 243`, and it never exceeds 243 again. By pigeonhole the sequence must hit 1 or repeat within ~245 steps, so the set terminates quickly and correctly.

If you want to eliminate the set entirely, Floyd's tortoise-and-hare detects the same cycle in O(1) auxiliary space (same time class, trades recomputation for memory):

```python
def nxt(x):
    return sum(int(d) ** 2 for d in str(x))

slow, fast = n, nxt(n)
while fast != 1 and slow != fast:
    slow, fast = nxt(slow), nxt(nxt(fast))
return fast == 1
```

This is a space optimization, not a complexity-class win — the submitted approach is already time-optimal.

### Efficiency

Time **O(log n)**: the first transformation reads Θ(log n) digits; every subsequent value is ≤ 243, so the remainder is a bounded number of O(1) steps. Optimal — any solution must examine all digits of `n`. Space: the set stores one entry per visited value; since everything drops below 243 within two steps, that's at most ~245 entries for 32-bit inputs — effectively constant, and exactly O(1) with Floyd's variant above.

### Code Style
No issues.

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-24*
