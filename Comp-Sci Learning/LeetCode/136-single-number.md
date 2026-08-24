---
lc-id: 136
lc-slug: single-number
lc-title: Single Number
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/single-number/
lc-status: accepted
lc-language: python3
aliases:
  - Single Number
  - "136"
tags:
  - lc/easy
  - lc/array
  - lc/bit-manipulation
lc-pattern:
  - Bit Manipulation
---
# Single Number
## Problem
Given a **non-empty** array of integers `nums`, every element appears _twice_ except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**

```text
Input: nums = [2,2,1]
Output: 1
```

**Example 2:**

```text
Input: nums = [4,1,2,1,2]
Output: 4
```

**Example 3:**

```text
Input: nums = [1]
Output: 1
```

**Constraints:**

-   `1 <= nums.length <= 3 * 10⁴`
-   `-3 * 10⁴ <= nums[i] <= 3 * 10⁴`
-   Each element in the array appears twice except for one element which appears only once.

## Code
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        
```leetcode-solve
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        ans = 0
        for n in nums:
            ans ^= n
        return ans
        
```

## Notes
### Brute force solution
>[!NOTE]
>Time complexity: $O(n^2)$
Space complexity: $O(1)$

```python
# for every number in the array check the rest of the array if there
# exists a duplicate
def single_number(nums: List[int]) -> int:
	for i in range(len(nums)):
		unique = True
		for j in in range(len(nums)):
			if i!= j and nums[i] == nums[j]:
				unique = False
				break
		if flag:
			return nums[i]
```

### Sorted array
>[!NOTE]
>Time complexity: $O(n\log n + n)$
Space complexity: $O(1)$

```python
# Sort array from lowest to highest and track if two of the same
# number was seen.
def single_number(nums: List[int]) -> int:
	nums.sort()
        ans = nums[0]
        seen = False
        
        if len(nums) == 1:
            return nums[0]

        for n in nums[1:]:
            if seen == True and n > ans:
                ans = n
                seen = False
            elif ans == n:
                seen = True
            else:
                return ans
            
        return ans
```

### Hash set
>[!NOTE]
>Time complexity: $O(n)$
Space complexity: $O(n)$

```python
# Track seen in a hash set. 
# Add number if not in set, remove if in set.
# return remaining value
def single_number(nums: List[int]) -> int:
	seen = {}
	for n in nums:
		if n not in seen:
			seen[n] = True
		else:
			del seen[n]
                
    return next(iter(seen.keys()))
```

### Bit manipulation
>[!NOTE]
>Time complexity: $O(n)$
Space complexity: $O(1)$

```python
# Since the XOR of two of the same numbers is 0, if we XOR all numbers
# in the list the remaining value is the missing number
def single_number(nums: List[int]) -> int:
	ans = 0
	for n in nums:
		ans ^= n
	return ans
```

Intuition: create a hash set of encountered numbers. 
Optimal solution: XOR all numbers in the list and return the remaining number.


### Rust
```rust
pub fn single_number(nums: Vec<i32>) -> i32 {
	let mut result = 0;
	for num in nums{
		result = result ^ num;
	}
	result
}
```

## Techniques

- [[Bit Manipulation]]

## Related Variants

- [[287-find-the-duplicate-number|Find the Duplicate Number]] — Same structure of paired/duplicated values in an array, but solved via Floyd's cycle detection (Two Pointers) instead of XOR cancellation.
- [[268-missing-number|Missing Number]] — Identical 'exactly one value differs' setup over a fixed range, typically solved with sum formula (Math) rather than XOR folding.
- [[137-single-number-ii|Single Number II]] — Extends the XOR insight to elements appearing three times, requiring per-bit counting/modular arithmetic.
- [[260-single-number-iii|Single Number III]] — Requires isolating two single numbers by finding a differing bit and partitioning the array into two XOR groups.

## AI Review

### Approach
Optimal. The key insight is XOR's algebraic properties: it's commutative and associative, `x ^ x = 0`, and `x ^ 0 = x`. XOR-ing every element therefore cancels each pair regardless of position, leaving only the unique element. No asymptotically better approach exists — any correct algorithm must examine every element (an unread element could be the singleton), so Ω(n) time is a hard lower bound, and this meets it while using a single accumulator.

### Efficiency
O(n) time, O(1) extra space. Matches the theoretical optimum for both dimensions.

### Code Style
No issues.

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-24*
