---
lc-id: 110
lc-slug: balanced-binary-tree
lc-title: Balanced Binary Tree
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/balanced-binary-tree/
lc-status: accepted
lc-language: python3
aliases:
  - Balanced Binary Tree
  - "110"
tags:
  - lc/easy
  - lc/tree
  - lc/depth-first-search
  - lc/binary-tree
lc-pattern:
  - Trees
---
# Balanced Binary Tree
## Problem
Given a binary tree, determine if it is **height-balanced**.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg)

```text
Input: root = [3,9,20,null,null,15,7]
Output: true
```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg)

```text
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

**Example 3:**

```text
Input: root = []
Output: true
```

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 5000]`.
-   `-10⁴ <= Node.val <= 10⁴`

## Code

```leetcode-solve
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        return self.helper(root) != -1
        
    def helper(self, root):
        if not root:
            return 0
        left  = self.helper(root.left)
        if left == -1: 
            return -1
            
        right = self.helper(root.right)
        if right == -1: 
            return -1

        if abs(left - right) > 1: 
            return -1

        return max(left, right) +1
```

## Notes

## Techniques

- [[Trees]]

## Related Variants

- [[124-binary-tree-maximum-path-sum|Binary Tree Maximum Path Sum]] — Uses post-order tree traversal with global state to compute maximum path sum, a harder tree recursion problem.
- [[968-binary-tree-cameras|Binary Tree Cameras]] — Uses post-order tree traversal with state DP to place minimum cameras, a harder tree recursion problem.

## AI Review

### Approach
Optimal. This is the standard post-order DFS with early termination. The key insight is combining height calculation and balance checking into a single bottom-up pass: returning `-1` as a sentinel signals an unbalanced subtree immediately, avoiding unnecessary work on ancestors. A top-down approach recalculating heights at every node would be O(N²) in the worst case (skewed tree); this achieves O(N).

### Efficiency
Time: O(N) — visits each node exactly once.
Space: O(H) recursion stack, where H is tree height. Worst case O(N) (skewed), best case O(log N) (balanced). This matches the theoretical optimum for recursive DFS.

### Code Style
No issues.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-28*
