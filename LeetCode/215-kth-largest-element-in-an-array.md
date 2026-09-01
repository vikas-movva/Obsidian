---
lc-id: 215
lc-slug: kth-largest-element-in-an-array
lc-title: Kth Largest Element in an Array
lc-difficulty: Medium
lc-url: https://leetcode.com/problems/kth-largest-element-in-an-array/
lc-status: accepted
lc-language: python3
aliases:
  - Kth Largest Element in an Array
  - "215"
tags:
  - lc/medium
  - lc/array
  - lc/divide-and-conquer
  - lc/sorting
  - lc/heap-priority-queue
  - lc/quickselect
---
# Kth Largest Element in an Array
## Problem
Given an integer array `nums` and an integer `k`, return _the_ `kᵗʰ` _largest element in the array_.

Note that it is the `kᵗʰ` largest element in the sorted order, not the `kᵗʰ` distinct element.

Can you solve it without sorting?

**Example 1:**

```text
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

**Example 2:**

```text
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

**Constraints:**

-   `1 <= k <= nums.length <= 10⁵`
-   `-10⁴ <= nums[i] <= 10⁴`

## Code

```leetcode-solve
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heapq.heapify(nums) 
        while len(nums) > k:
            heapq.heappop(nums)
        return nums[0]
```

## Notes

## AI Review

### Approach
This solution heapifies the entire array into a min-heap (O(n)), then pops the smallest element `n-k` times (O((n-k) log n)). While correct, **this is not the optimal algorithm**. The worst-case time complexity is O(n log n) (when k=1), matching a full sort.

A fundamentally better approach is **Quickselect** (Hoare's selection algorithm), which achieves **O(n) average time** and **O(1) extra space** by partitioning the array around a random pivot and recursing only into the partition containing the k-th largest element. This avoids the log factor entirely on average.

```python
import random
def quickselect(left, right, largest_k):
	if left == right:
		return nums[left]
	
	pivot_i = random.randint(left, right)
	pivot = nums[pivot_i]
	
	lp = left
	i = left
	rp = right
	
	while i <= rp:
		if nums[i] < pivot:
			nums[lp], nums[i] = nums[i], nums[lp]
			lp += 1
			i += 1
		elif nums[i] > pivot:
			nums[rp], nums[i] = nums[i], nums[rp]
			rp -= 1 
		else:
			i += 1
			
	if largest_k < lp:
		return quickselect(left, lp - 1, largest_k)
	elif largest_k > rp:
		return quickselect(rp + 1, right, largest_k)
	else:
		return pivot
		
quickselect(0, len(nums) - 1, len(nums) - k)
```

### Efficiency
- **Current Solution**: Time O(n + (n-k) log n) → **O(n log n)** worst-case. Space **O(1)** extra (in-place heapify).
- **Theoretical Optimum**: **O(n) average time** (Quickselect) with O(1) space, or **O(n log k)** time / O(k) space (bounded min-heap). The current solution is suboptimal in time complexity class.

### Code Style
No issues. The implementation is concise, uses the standard library correctly, and the in-place mutation of `nums` is acceptable for this problem.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-31*
