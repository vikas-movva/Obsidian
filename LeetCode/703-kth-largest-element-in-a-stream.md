---
lc-id: 703
lc-slug: kth-largest-element-in-a-stream
lc-title: Kth Largest Element in a Stream
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/kth-largest-element-in-a-stream/
lc-status: accepted
lc-language: python3
aliases:
  - Kth Largest Element in a Stream
  - "703"
tags:
  - lc/easy
  - lc/tree
  - lc/design
  - lc/binary-search-tree
  - lc/heap-priority-queue
  - lc/binary-tree
  - lc/data-stream
---
# Kth Largest Element in a Stream
## Problem
You are part of a university admissions office and need to keep track of the `kth` highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.

You are tasked to implement a class which, for a given integer `k`, maintains a stream of test scores and continuously returns the `k`th highest test score **after** a new score has been submitted. More specifically, we are looking for the `k`th highest score in the sorted list of all scores.

Implement the `KthLargest` class:

-   `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of test scores `nums`.
-   `int add(int val)` Adds a new test score `val` to the stream and returns the element representing the `kᵗʰ` largest element in the pool of test scores so far.

**Example 1:**

**Input:**  
["KthLargest", "add", "add", "add", "add", "add"]  
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

```text
Output: [null, 4, 5, 5, 8, 8]
Explanation:
```

KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);  
kthLargest.add(3); // return 4  
kthLargest.add(5); // return 5  
kthLargest.add(10); // return 5  
kthLargest.add(9); // return 8  
kthLargest.add(4); // return 8

**Example 2:**

**Input:**  
["KthLargest", "add", "add", "add", "add"]  
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]

```text
Output: [null, 7, 7, 7, 8]
Explanation:
```

KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);  
kthLargest.add(2); // return 7  
kthLargest.add(10); // return 7  
kthLargest.add(9); // return 7  
kthLargest.add(9); // return 8

**Constraints:**

-   `0 <= nums.length <= 10⁴`
-   `1 <= k <= nums.length + 1`
-   `-10⁴ <= nums[i] <= 10⁴`
-   `-10⁴ <= val <= 10⁴`
-   At most `10⁴` calls will be made to `add`.

## Code

```leetcode-solve
class KthLargest:

    def __init__(self, k: int, nums: List[int]):
        self.k, self.nums = k, nums
        heapq.heapify(nums)
        
        while len(self.nums) > self.k:
            heapq.heappop(self.nums)      

    def add(self, val: int) -> int:
        if len(self.nums) == self.k:
            heapq.heappushpop(self.nums, val)
        else:
            heapq.heappush(self.nums, val)

        return self.nums[0]        


# Your KthLargest object will be instantiated and called as such:
# obj = KthLargest(k, nums)
# param_1 = obj.add(val)
```

## Notes

## AI Review

### Approach
Optimal. Maintains a min-heap of size `k` containing the `k` largest elements seen so far. The heap root (`nums[0]`) is the smallest among these `k`, i.e., the `k`-th largest overall. Initialization heapifies the input and evicts the smallest until size `k`. Each `add` inserts the new value and evicts the smallest if the heap exceeds size `k`.

### Efficiency
**Init:** `O(N log N)` (heapify `O(N)` + up to `N` pops `O(N log N)`). Theoretical optimum is `O(N log k)` by pushing into a size-`k` heap, but `N ≤ 10⁴` makes this negligible.  
**Add:** `O(log k)` time, `O(k)` space. Matches the theoretical optimum for comparison-based streaming selection.

### Code Style
1.  **Simplify `add`**: The branch is unnecessary. Push unconditionally, then pop if oversized. This is shorter, handles the initial `len < k` case uniformly, and is the standard idiom.
2.  **Avoid input mutation**: `heapify` and pops mutate the caller's `nums` list. Copy it (`self.nums = list(nums)`) to prevent side effects.

```python
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.nums = list(nums)      # copy to avoid mutating caller's list
        heapq.heapify(self.nums)
        while len(self.nums) > self.k:
            heapq.heappop(self.nums)

    def add(self, val: int) -> int:
        heapq.heappush(self.nums, val)
        if len(self.nums) > self.k:
            heapq.heappop(self.nums)
        return self.nums[0]
```

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-31*
