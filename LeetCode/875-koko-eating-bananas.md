---
lc-id: 875
lc-slug: koko-eating-bananas
lc-title: Koko Eating Bananas
lc-difficulty: Medium
lc-url: https://leetcode.com/problems/koko-eating-bananas/
lc-status: accepted
lc-language: python3
aliases:
  - Koko Eating Bananas
  - "875"
tags:
  - lc/medium
  - lc/array
  - lc/binary-search
lc-pattern:
  - Binary Search
---
# Koko Eating Bananas
## Problem
Koko loves to eat bananas. There are `n` piles of bananas, the `iᵗʰ` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return _the minimum integer_ `k` _such that she can eat all the bananas within_ `h` _hours_.

**Example 1:**

```text
Input: piles = [3,6,7,11], h = 8
Output: 4
```

**Example 2:**

```text
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

**Example 3:**

```text
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

**Constraints:**

-   `1 <= piles.length <= 10⁴`
-   `piles.length <= h <= 10⁹`
-   `1 <= piles[i] <= 10⁹`

## Code

```leetcode-solve
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        lp, rp = 1, max(piles)
        while lp < rp:
            mid = (lp + rp)//2
            if sum((p +mid -1)//mid for p in piles) > h:
                lp = mid + 1
            else:
                rp = mid
        return lp
```

## Notes

## Techniques

- [[Binary Search]]

## Related Variants

- [[621-task-scheduler|Task Scheduler]] — Both optimize execution time under rate and capacity constraints, but Task Scheduler uses Greedy and frequency counting rather than binary searching an answer space.
- [[1011-capacity-to-ship-packages-within-d-days|Capacity To Ship Packages Within D Days]] — Applies binary search on answer where the feasibility check requires a non-trivial greedy simulation.
- [[410-split-array-largest-sum|Split Array Largest Sum]] — Extends binary search on answer to partitioning contiguous subarrays with bounded maximum sums.

## AI Review

### Approach
Optimal. The problem exhibits monotonicity: if Koko can finish all bananas at an eating speed $k$, she can also finish them at any speed greater than $k$. This property allows binary searching the discrete answer space $k \in [1, \max(\text{piles})]$. 

For a candidate speed $k$, the total time required is $\sum \lceil p / k \rceil$. Using the integer arithmetic trick `(p + mid - 1) // mid` avoids floating-point precision issues while correctly computing $\lceil p / k \rceil$.

### Efficiency
- **Time Complexity:** $\mathcal{O}(N \log M)$, where $N$ is the number of piles and $M = \max(\text{piles})$. Each predicate check takes $\mathcal{O}(N)$ time over $\mathcal{O}(\log M)$ binary search iterations.
- **Space Complexity:** $\mathcal{O}(1)$ auxiliary space, as the sum is lazily evaluated over a generator expression.

This is optimal.

### Code Style
No issues.

*Reviewed by Custom (OpenAI-compatible) (gemini-3.6-flash) — 2026-09-01*
