---
lc-id: 141
lc-slug: linked-list-cycle
lc-title: Linked List Cycle
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/linked-list-cycle/
lc-status: accepted
lc-language: python3
aliases:
  - Linked List Cycle
  - "141"
tags:
  - lc/easy
  - lc/hash-table
  - lc/linked-list
  - lc/two-pointers
  - lc/floyds-cycle-finding-algorithm
---
# Linked List Cycle
## Problem
Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.

Return `true` _if there is a cycle in the linked list_. Otherwise, return `false`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png)

```text
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png)

```text
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

**Example 3:**

![](https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png)

```text
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

**Constraints:**

-   The number of the nodes in the list is in the range `[0, 10⁴]`.
-   `-10⁵ <= Node.val <= 10⁵`
-   `pos` is `-1` or a **valid index** in the linked-list.

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

## Code

```leetcode-solve
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
        
        fast, slow = head.next, head
        
        while fast and slow and fast.next:
            if slow == fast:
                return True
            slow = slow.next
            fast = fast.next.next
            
        return False
```

## Notes

## AI Review

### Approach
Optimal. This is Floyd's Tortoise and Hare algorithm. The key insight: in a cycle, a fast pointer (2 steps) and slow pointer (1 step) are guaranteed to meet because the relative speed is 1 step per iteration, closing the gap modulo cycle length. If no cycle exists, the fast pointer reaches the end (`None`).

### Efficiency
Time: O(N) — fast pointer traverses at most 2N nodes (N before cycle + cycle length). Space: O(1) — only two pointers used. Matches theoretical optimum.

### Code Style
No issues.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-29*
