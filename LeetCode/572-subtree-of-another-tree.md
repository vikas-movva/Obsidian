---
lc-id: 572
lc-slug: subtree-of-another-tree
lc-title: Subtree of Another Tree
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/subtree-of-another-tree/
lc-status: accepted
lc-language: python3
aliases:
  - Subtree of Another Tree
  - "572"
tags:
  - lc/easy
  - lc/tree
  - lc/depth-first-search
  - lc/string-matching
  - lc/binary-tree
  - lc/hash-function
lc-pattern:
  - Trees
---
# Subtree of Another Tree
## Problem
Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot` and `false` otherwise.

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree1-tree.jpg)

```text
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/28/subtree2-tree.jpg)

```text
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
```

**Constraints:**

-   The number of nodes in the `root` tree is in the range `[1, 2000]`.
-   The number of nodes in the `subRoot` tree is in the range `[1, 1000]`.
-   `-10⁴ <= root.val <= 10⁴`
-   `-10⁴ <= subRoot.val <= 10⁴`

## Code

```leetcode-solve
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not root:
            return False
        if not subRoot:
            return True
        
        def helper(root, subRoot):
            if not root and not subRoot: return True

            if root and subRoot and root.val == subRoot.val:
                return helper(root.left, subRoot.left) and helper(root.right, subRoot.right)
            return False
        
        if helper(root, subRoot):
            return True
                
        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)

```

## Notes

## Techniques

- [[Trees]]

## Related Variants

- [[297-serialize-and-deserialize-binary-tree|Serialize and Deserialize Binary Tree]] — Extends tree traversal to serialization/deserialization, a harder application of tree recursion.
- [[124-binary-tree-maximum-path-sum|Binary Tree Maximum Path Sum]] — Requires tree recursion with global state to compute maximum path sum, a more complex tree DP problem.

## AI Review

### Approach
Optimal. The solution uses the standard double recursion: an outer DFS traverses `root` to find candidate starting nodes matching `subRoot.val`, and an inner `helper` checks structural equality. This is the canonical $O(mn)$ approach. A fundamentally better $O(m+n)$ solution exists using tree serialization (e.g., Merkle hashing or KMP on preorder traversal with null markers), but given the constraints ($m \le 2000, n \le 1000$), $O(mn)$ is expected and accepted.

### Efficiency
Time: $O(m \cdot n)$ worst-case (e.g., skewed trees with repeated values). Space: $O(m)$ recursion stack depth for the outer call (worst-case skewed `root`). This matches the theoretical optimum for the double-recursion strategy. The $O(m+n)$ serialization approach is asymptotically faster but unnecessary for these constraints.

### Code Style
The `helper` function can be inlined into a single expression using short-circuiting, reducing nesting and lines without changing logic.

```python
class Solution:
    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
        if not root: return False
        if not subRoot: return True
        
        def same(p, q):
            return (not p and not q) or (p and q and p.val == q.val and same(p.left, q.left) and same(p.right, q.right))
        
        return same(root, subRoot) or self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)
```

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-28*
