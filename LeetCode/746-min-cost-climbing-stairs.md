---
lc-id: 746
lc-slug: min-cost-climbing-stairs
lc-title: Min Cost Climbing Stairs
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/min-cost-climbing-stairs/
lc-status: accepted
lc-language: python3
aliases:
  - Min Cost Climbing Stairs
  - "746"
tags:
  - lc/easy
  - lc/array
  - lc/dynamic-programming
lc-pattern:
  - 1-D Dynamic Programming
---
# Min Cost Climbing Stairs
## Problem
You are given an integer array `cost` where `cost[i]` is the cost of `iᵗʰ` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return _the minimum cost to reach the top of the floor_.

**Example 1:**

```text
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example 2:**

```text
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
```

**Constraints:**

-   `2 <= cost.length <= 1000`
-   `0 <= cost[i] <= 999`

## Code

```leetcode-solve
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        for i in range(len(cost)-3, -1, -1):
            cost[i] += min(cost[i + 1], cost[i +2])
        
        return min(cost[0], cost[1])
```

## Notes
Intuition: recursively find the min cost for previous stairs

## Techniques

- [[1-D Dynamic Programming]]

## Related Variants

- [[64-minimum-path-sum|Minimum Path Sum]] — Same minimum-cost-to-reach-the-end recurrence, generalized from one/two-step moves on a line to moves on a grid (2-D DP instead of 1-D).
- [[198-house-robber|House Robber]] — Extends the same linear dp over indices where each state depends on skipping ahead, adding a take/skip adjacency constraint.
- [[91-decode-ways|Decode Ways]] — Uses the same one-or-two-element decomposition into subproblems, with trickier base cases and zero-handling.

## AI Review

### Approach

Optimal. The key insight: let `dp[i]` be the minimum total cost to reach the top when standing on step `i`. Then `dp[i] = cost[i] + min(dp[i+1], dp[i+2])`, with the last two steps as base cases (`dp[n-1] = cost[n-1]`, `dp[n-2] = cost[n-2]`, since one payment reaches the top from either). The answer is `min(dp[0], dp[1])` because the start can be index 0 or 1. Filling right-to-left in place means each cell only needs its two successors, so the array doubles as both input and DP table — no fundamentally better algorithm exists.

### Efficiency

O(n) time, O(1) auxiliary space (in-place). This matches the theoretical optimum — every cost must be read at least once.

### Code Style

No issues.

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-25*
