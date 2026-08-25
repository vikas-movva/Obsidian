---
lc-id: 1
lc-slug: two-sum
lc-title: Two Sum
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/two-sum/
lc-status: accepted
lc-language: python3
aliases:
  - Two Sum
  - "1"
tags:
  - lc/easy
  - lc/array
  - lc/hash-table
---
# Two Sum
## Problem
You are given an array of integers `nums` and an integer `target`, return _indices of the two numbers such that they add up to `target`_.

You may assume that each input would have **_exactly_ one solution**, and you may not use the _same_ element twice.

You can return the answer in any order.

**Example 1:**

```text
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```text
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```text
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**

-   `2 <= nums.length <= 10⁴`
-   `-10⁹ <= nums[i] <= 10⁹`
-   `-10⁹ <= target <= 10⁹`
-   **Only one valid answer exists.**

**Follow-up:** Can you come up with an algorithm that is less than `O(n²)` time complexity?

## Code

```leetcode-solve
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}
        n = len(nums)

        for i in range(n):
            complement = target - nums[i]
            if complement in numMap:
                return [numMap[complement], i]
            numMap[nums[i]] = i

        return []
```

## Notes

## AI Review

### Approach

Optimal. The single-pass hash map is the best possible algorithm class for this problem. The key insight: for each element, its required partner is fully determined (`target - nums[i]`), so a dictionary turns the "find the partner" lookup from O(n) into O(1). Checking the map **before** inserting the current element does double duty: it correctly handles duplicate values (in `[3,3]`, target `6`, the second `3` finds the first) and structurally guarantees you never pair an element with itself. Since any correct algorithm must inspect every element in the worst case, Ω(n) is a hard lower bound — no better complexity class exists.

### Efficiency

O(n) time, O(n) space. This matches the theoretical optimum. The alternatives are strictly worse or equal-at-best: brute force is O(n²)/O(1), and sort + two pointers is O(n log n) while also destroying index information (requiring a value→indices side map anyway).

### Code Style

Replace the `range(len(...))` index loop with `enumerate`, which is the standard idiom and eliminates the `n` variable and repeated `nums[i]` subscripting:

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numMap = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in numMap:
                return [numMap[complement], i]
            numMap[num] = i
        return []
```

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-24*
