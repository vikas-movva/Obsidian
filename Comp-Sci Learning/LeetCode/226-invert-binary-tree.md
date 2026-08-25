---
lc-id: 226
lc-slug: invert-binary-tree
lc-title: Invert Binary Tree
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/invert-binary-tree/
lc-status: accepted
lc-language: python3
aliases:
  - Invert Binary Tree
  - "226"
tags:
  - lc/easy
  - lc/tree
  - lc/depth-first-search
  - lc/breadth-first-search
  - lc/binary-tree
lc-pattern:
  - Trees
---
# Invert Binary Tree
## Problem
Given the `root` of a binary tree, invert the tree, and return _its root_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert1-tree.jpg)

```text
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/03/14/invert2-tree.jpg)

```text
Input: root = [2,1,3]
Output: [2,3,1]
```

**Example 3:**

```text
Input: root = []
Output: []
```

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 100]`.
-   `-100 <= Node.val <= 100`

## Code

```leetcode-solve
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: TreeNode | None) -> TreeNode | None:
        # base case: empty subtree
        if not root:
            return
        
        # swap child nodes recursively
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root
```

## Notes

### Recursive solution:

> [!NOTE]
> Time complexity: $O(n)$
> Space complexity: $O(n)$

```python
def invertTree(self, root: TreeNode | None) -> TreeNode | None:
	# check if root is a leaf node
	if not root:
		return
	
	# swap child nodes recursively, neat one-liner
	root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
	return root
```

### Rust
```rust
use std::rc::Rc;
use std::cell::RefCell;
use std::mem;
fn invert_tree(root: Option<Rc<RefCell<TreeNode>>>) -> Option<Rc<RefCell<TreeNode>>> {
	if let Some(node) = root.clone() {
		// Borrow the node mutably
		let mut node_borrow = node.borrow_mut();
		
		// Take ownership of the left and right children, replacing them with None
		let left = node_borrow.left.take();
		let right = node_borrow.right.take();
		
		// Recursively invert the subtrees and swap their positions
		node_borrow.left = Self::invert_tree(right);
		node_borrow.right = Self::invert_tree(left);
	}
	root
}
```

Intuition: recursively call the invert tree function on child nodes.
Optimal solution: recursively call the invert tree function on child nodes.

## Techniques

- [[Trees]]

## Related Variants

- [[206-reverse-linked-list|Reverse Linked List]] — Both problems reverse a recursive pointer structure by reassigning child/next references, one on trees and one on lists.
- [[24-swap-nodes-in-pairs|Swap Nodes in Pairs]] — Both rely on local node-reference swaps applied uniformly across a linked structure.
- [[102-binary-tree-level-order-traversal|Binary Tree Level Order Traversal]] — Next step up in tree traversal mastery, moving from simple recursion to structured level-by-top processing.
- [[124-binary-tree-maximum-path-sum|Binary Tree Maximum Path Sum]] — Harder tree problem requiring recursive post-order computation with values combined across subtrees.

## AI Review

### Approach

Optimal. Any algorithm must touch every node to invert the tree, so Θ(n) time is a hard lower bound and this solution meets it. The key insight: inversion is purely local — mirroring the whole tree is achieved by independently swapping the two children of every node, so one recursive post-order-style pass suffices. The tuple assignment also evaluates **both** recursive calls before rebinding `root.left`/`root.right`, so no temporary variable is needed and the original subtrees aren't lost mid-swap.

### Efficiency

Time O(n) — each node visited exactly once. Space O(h) for the recursion stack, O(n) worst case on a skewed tree. An iterative BFS/DFS version swaps stack depth for queue/stack width, which is also O(n) worst case, so there's no asymptotic improvement available. This is optimal.

### Code Style
No issues.

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-24*
