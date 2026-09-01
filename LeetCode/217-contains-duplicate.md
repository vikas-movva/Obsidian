---
lc-id: 217
lc-slug: contains-duplicate
lc-title: Contains Duplicate
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/contains-duplicate/
lc-status: accepted
lc-language: python3
aliases:
  - Contains Duplicate
  - "217"
tags:
  - lc/easy
  - lc/array
  - lc/hash-table
  - lc/sorting
lc-pattern:
  - Arrays & Hashing
---
# Contains Duplicate
## Problem
Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.

**Example 1:**

```text
Input: nums = [1,2,3,1]
Output: true
Explanation:
```

The element 1 occurs at the indices 0 and 3.

**Example 2:**

```text
Input: nums = [1,2,3,4]
Output: false
Explanation:
```

All elements are distinct.

**Example 3:**

```text
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
```

**Constraints:**

-   `1 <= nums.length <= 10⁵`
-   `-10⁹ <= nums[i] <= 10⁹`

## Code

```leetcode-solve
class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        return len(set(nums)) < len(nums)
```

## Notes

## Techniques

- [[Arrays & Hashing]]

## Related Variants

- [[136-single-number|Single Number]] — Both find duplicates in an array but Single Number uses Bit Manipulation instead of hashing.
- [[128-longest-consecutive-sequence|Longest Consecutive Sequence]] — Uses hash set to achieve O(n) time for sequence detection, a more advanced application of the same technique.

## AI Review

### Approach
Optimal. The key insight is that a set stores only unique elements. If the length of the set created from the array is strictly less than the length of the array, at least one duplicate existed. This is the standard theoretical solution for this problem.

### Efficiency
Time: O(N) average case (hash set insertion/lookup). Space: O(N) worst case (all elements unique). Matches the theoretical lower bound for comparison-based/hashing approaches.

### Code Style
No issues.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-31*
