---
lc-id: 21
lc-slug: merge-two-sorted-lists
lc-title: Merge Two Sorted Lists
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/merge-two-sorted-lists/
lc-status: accepted
lc-language: python3
aliases:
  - Merge Two Sorted Lists
  - "21"
tags:
  - lc/easy
  - lc/linked-list
  - lc/recursion
lc-pattern:
  - Linked List
---
# Merge Two Sorted Lists
## Problem
You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

Return _the head of the merged linked list_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/03/merge_ex1.jpg)

```text
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**

```text
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**

```text
Input: list1 = [], list2 = [0]
Output: [0]
```

**Constraints:**

-   The number of nodes in both lists is in the range `[0, 50]`.
-   `-100 <= Node.val <= 100`
-   Both `list1` and `list2` are sorted in **non-decreasing** order.

## Code

```leetcode-solve
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        head = curr = ListNode()
        while list1 and list2:
            if list1.val <= list2.val:
                curr.next = list1
                list1 = list1.next
            else:
                curr.next = list2
                list2 = list2.next
            curr = curr.next
                
        curr.next = list1 or list2
        
        return head.next
```

## Notes
Intuition: have a pointer per linked list and add the greater value node to current node. if either list is none add the entirety of the other list (all those values should be greater than or equal to the last node).


### Rust

```rust
pub fn merge_two_lists(mut list1: Option<Box<ListNode>>, mut list2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
	let mut dummy = ListNode::new(0);
	let mut current = &mut dummy;

	while let (Some( n1), Some(n2)) = (&list1, &list2) {
		if n1.val <= n2.val {
			if let Some(mut node) = list1 {
				list1 = node.next.take();
				current.next = Some(node);
			}
		} else {
			if let Some(mut node) = list2 {
				list2 = node.next.take();
				current.next = Some(node);
			}
		}
		current = current.next.as_mut().unwrap();
	}

	current.next = if list1.is_some() { list1 } else { list2 };
	dummy.next
}
```

## Techniques

- [[Linked List]]

## Related Variants

- [[88-merge-sorted-array|Merge Sorted Array]] — Same two-way merge of sorted sequences, but done in-place over arrays with pointers instead of list node splicing.
- [[148-sort-list|Sort List]] — Uses this exact two-list merge as the core subroutine of merge sort applied to a linked list.
- [[23-merge-k-sorted-lists|Merge k Sorted Lists]] — Generalizes pairwise list merging to k lists, requiring a heap to pick the next node efficiently.

## AI Review

### Approach
Optimal. This is the canonical linear merge: since both lists are sorted, each comparison determines the next node of the output, and each iteration advances exactly one input pointer — so every node is visited exactly once. The dummy sentinel node removes all special-casing of the result head, and `curr.next = list1 or list2` attaches the non-exhausted remainder in one step. No asymptotically better algorithm exists, since any correct merge must emit all n + m nodes.

### Efficiency
Time O(n + m), auxiliary space O(1). This matches the theoretical optimum — you must read every node. (A recursive formulation would cost O(n + m) stack space, so the iterative form is the right choice.)

### Code Style
One shortening: collapse the dummy-node setup into a single chained assignment:

```python
head = curr = ListNode()
```

This replaces two statements with one and is a standard idiom for shared-initialization. Everything else (`list1 or list2` for the tail splice, the `<=` tie-break preserving stability) is already idiomatic.

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-25*
