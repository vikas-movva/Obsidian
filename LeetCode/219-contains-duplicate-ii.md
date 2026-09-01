---
lc-id: 219
lc-slug: contains-duplicate-ii
lc-title: Contains Duplicate II
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/contains-duplicate-ii/
lc-status: accepted
lc-language: python3
aliases:
  - Contains Duplicate II
  - "219"
tags:
  - lc/easy
  - lc/array
  - lc/hash-table
  - lc/sliding-window
lc-pattern:
  - Arrays & Hashing
---
# Contains Duplicate II
## Problem
Given an integer array `nums` and an integer `k`, return `true` _if there are two **distinct indices**_ `i` _and_ `j` _in the array such that_ `nums[i] == nums[j]` _and_ `abs(i - j) <= k`.

**Example 1:**

```text
Input: nums = [1,2,3,1], k = 3
Output: true
```

**Example 2:**

```text
Input: nums = [1,0,1,1], k = 1
Output: true
```

**Example 3:**

```text
Input: nums = [1,2,3,1,2,3], k = 2
Output: false
```

**Constraints:**

-   `1 <= nums.length <= 10⁵`
-   `-10⁹ <= nums[i] <= 10⁹`
-   `0 <= k <= 10⁵`

## Code

```leetcode-solve
class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        dupes = {}
        for i, num in enumerate(nums):
            if num in dupes and abs(dupes[num] - i) <= k:
                return True
            dupes[num] = i
        return False
```

## Notes

## Techniques

- [[Arrays & Hashing]]

## Related Variants

- [[220-contains-duplicate-iii|Contains Duplicate III]] — Extends the duplicate check to value difference using ordered structures instead of simple hashing
- [[128-longest-consecutive-sequence|Longest Consecutive Sequence]] — Uses hash set for O(1) lookups to find consecutive sequences
- [[41-first-missing-positive|First Missing Positive]] — Uses array indices as implicit hash to find missing positive in O(n) time

## AI Review

### Approach
Optimal. The solution uses a hash map to store the most recent index of each value. The key insight is that only the latest occurrence matters: if the current index minus the last seen index exceeds `k`, any earlier occurrence would be even farther away, so it can be safely discarded. This reduces the problem to a single pass with O(1) lookups.

### Efficiency
Time: O(n) — one pass through the array.  
Space: O(min(n, k)) in practice (at most `k+1` distinct values can be in the window), worst-case O(n) when all elements are distinct.  
Matches the theoretical lower bound; no asymptotic improvement is possible.

### Code Style
No issues. The code is already concise, idiomatic Python 3, and uses `enumerate` and dictionary operations appropriately. No measurable improvement exists.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-31*
