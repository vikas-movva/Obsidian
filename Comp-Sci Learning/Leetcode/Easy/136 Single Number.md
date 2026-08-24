---
tags:
  - bit-manipulation
  - array
  - leetcode
link: https://leetcode.com/problems/single-number/
---
Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

>[!Example]
>Input: nums = [2,2,1]
>Output: 1

> [!Example]
> Input: nums = [4,1,2,1,2]
> Output: 4

> [!example]
> Input: nums = [1]
> Output: 1

> [!Constraints] 
> $1$ $\leq$ `nums.length` $\leq$ $3(10^4)$
> $-3(10^4)$ $\leq$ `nums[i]` $\leq$ $3(10^4)$
> 
> Each element in the array appears twice except for one element which appears only once.

## Brute force solution
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

## Sorted array
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

## Hash set
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

## Bit manipulation
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

First Intuition: create a hash set of encountered numbers. 
Optimal solution: XOR all numbers in the list and return the remaining number.


## Rust
```rust
fn single_number()
```