---
lc-id: 268
lc-slug: missing-number
lc-title: Missing Number
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/missing-number/
lc-status: accepted
lc-language: python3
aliases:
  - Missing Number
  - "268"
tags:
  - lc/easy
  - lc/array
  - lc/hash-table
  - lc/math
  - lc/binary-search
  - lc/bit-manipulation
  - lc/sorting
lc-pattern:
  - Math & Geometry
---
# Missing Number
## Problem
Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return _the only number in the range that is missing from the array._

**Example 1:**

```text
Input: nums = [3,0,1]
Output: 2
Explanation:
```

`n = 3` since there are 3 numbers, so all numbers are in the range `[0,3]`. 2 is the missing number in the range since it does not appear in `nums`.

**Example 2:**

```text
Input: nums = [0,1]
Output: 2
Explanation:
```

`n = 2` since there are 2 numbers, so all numbers are in the range `[0,2]`. 2 is the missing number in the range since it does not appear in `nums`.

**Example 3:**

```text
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation:
```

`n = 9` since there are 9 numbers, so all numbers are in the range `[0,9]`. 8 is the missing number in the range since it does not appear in `nums`.

**Constraints:**

-   `n == nums.length`
-   `1 <= n <= 10⁴`
-   `0 <= nums[i] <= n`
-   All the numbers of `nums` are **unique**.

**Follow up:** Could you implement a solution using only `O(1)` extra space complexity and `O(n)` runtime complexity?

## Code

```leetcode-solve
class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        return len(nums) * (len(nums) + 1) // 2 - sum(nums)
```

## Notes
Intuition: Hash set to track seen numbers 

## Techniques

- [[Math & Geometry]]

## AI Review

### Approach
Optimal. The solution uses the arithmetic series sum formula: the sum of integers from `0` to `n` is `n(n+1)/2`. Since the array contains every number in that range except one, subtracting the array's sum from the expected sum isolates the missing number. This satisfies the follow-up constraints directly.

### Efficiency
Time: O(n) — single pass to compute `sum(nums)`. Space: O(1) — only a few integer accumulators. Matches the theoretical lower bound (must read all n elements) and the follow-up requirements.

### Code Style
No issues.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-28*
