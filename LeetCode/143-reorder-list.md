---
lc-id: 143
lc-slug: reorder-list
lc-title: Reorder List
lc-difficulty: Medium
lc-url: https://leetcode.com/problems/reorder-list/
lc-status: accepted
lc-language: python3
aliases:
  - Reorder List
  - "143"
tags:
  - lc/medium
  - lc/linked-list
  - lc/two-pointers
  - lc/stack
  - lc/recursion
lc-pattern:
  - Linked List
---
# Reorder List
## Problem
You are given the head of a singly linked-list. The list can be represented as:

```text
L0 → L1 → … → Ln - 1 → Ln
```

_Reorder the list to be on the following form:_

```text
L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
```

You may not modify the values in the list's nodes. Only nodes themselves may be changed.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/04/reorder1linked-list.jpg)

```text
Input: head = [1,2,3,4]
Output: [1,4,2,3]
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/09/reorder2-linked-list.jpg)

```text
Input: head = [1,2,3,4,5]
Output: [1,5,2,4,3]
```

**Constraints:**

-   The number of nodes in the list is in the range `[1, 5 * 10⁴]`.
-   `1 <= Node.val <= 1000`

## Code

```leetcode-solve
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        if not head or not head.next:
            return
        
        # find middle of list
        sp = fp = head
        
        while fp.next and fp.next.next:
            sp = sp.next
            fp = fp.next.next
            
        # sp is now middle
        # reverse second half of list 
        # and cut off sp
        prev, curr, sp.next = None, sp.next, None
        while curr:
            curr.next, prev, curr = prev, curr, curr.next
        
        # merge two lists
        l1, l2 = head, prev
        while l2:
            n1, n2 = l1.next, l2.next
            l1.next = l2
            l2.next = n1
            l1, l2 = n1, n2
            
```

## Notes

## Techniques

- [[Linked List]]

## Related Variants

- [[234-palindrome-linked-list|Palindrome Linked List]] — Uses fast/slow pointers to find middle and reverses second half, similar split-reverse-merge structure.
- [[25-reverse-nodes-in-k-group|Reverse Nodes in k-Group]] — Advanced linked list manipulation requiring reversal of segments and pointer reconnection.
- [[138-copy-list-with-random-pointer|Copy List with Random Pointer]] — Complex linked list restructuring with arbitrary pointers, building on node manipulation skills.

## AI Review

### Approach

The solution is optimal. 

The problem cannot be solved faster than $O(N)$ time because every node must be visited, and $O(1)$ extra space is the lower bound since we must modify the list in-place.

The key insights enabling $O(N)$ time and $O(1)$ auxiliary space are decomposing the operation into three standard, space-efficient list manipulations:
1. **Find the middle** using slow and fast pointers (Floyd's cycle-finding variant).
2. **Reverse the second half** in-place using iterative pointer reassignment.
3. **Interleave/merge** the two resulting halves alternating between $L_i$ and $L_{n-i}$.

### Efficiency

- **Time Complexity:** $O(N)$ — requires a single pass to find the middle, a half-pass to reverse, and a half-pass to interleave.
- **Space Complexity:** $O(1)$ — pointer modifications are done entirely in-place with a constant number of auxiliary variables.

This matches the theoretical optimum.

### Code Style

No issues.

*Reviewed by Custom (OpenAI-compatible) (gemini-3.6-flash) — 2026-09-01*
