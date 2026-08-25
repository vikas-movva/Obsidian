---
lc-id: 104
lc-slug: maximum-depth-of-binary-tree
lc-title: Maximum Depth of Binary Tree
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/maximum-depth-of-binary-tree/
lc-status: accepted
lc-language: python3
aliases:
  - Maximum Depth of Binary Tree
  - "104"
tags:
  - lc/easy
  - lc/tree
  - lc/depth-first-search
  - lc/breadth-first-search
  - lc/binary-tree
lc-pattern:
  - Trees
---
# Maximum Depth of Binary Tree
## Problem
Given the `root` of a binary tree, return _its maximum depth_.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)

```text
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**

```text
Input: root = [1,null,2]
Output: 2
```

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 10⁴]`.
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
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
```

## Notes
Intuition: recursively find the height of each node and pass the max upwards.

## Techniques

- [[Trees]]

## Related Variants

- [[222-count-complete-tree-nodes|Count Complete Tree Nodes]] — Also computes subtree heights recursively over a binary tree, but adds binary search on height as its primary technique.
- [[236-lowest-common-ancestor-of-a-binary-tree|Lowest Common Ancestor of a Binary Tree]] — Same recursive post-order traversal structure returning information aggregated from left and right subtrees.
- [[124-binary-tree-maximum-path-sum|Binary Tree Maximum Path Sum]] — Extends the recursive subtree-aggregation idea to track a global maximum across all root-to-node paths.
- [[337-house-robber-iii|House Robber III]] — Combines tree recursion with per-node state decisions, requiring memoized DFS over the same depth-computation skeleton.

## AI Review

### Approach
Optimal. The key insight is the recurrence: a tree's depth is `1 + max(depth(left), depth(right))`, with the empty tree as the base case (`0`). Any correct algorithm must examine every node — an unvisited node could always be the start of a deeper path — so Θ(n) work is a lower bound, and this post-order traversal meets it exactly. No better complexity class exists.

### Efficiency
Time O(n): each node is visited exactly once. Space O(h) for the recursion stack — O(log n) for a balanced tree, O(n) worst case for a skewed one — which is the minimum achievable for this traversal. Matches the theoretical optimum.

### Code Style
The two height variables can be collapsed into the return statement — same evaluation order (left before right), fewer lines and names:

```python
def maxDepth(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
```

*Reviewed by OpenRouter (stealth/ox-alpha) — 2026-08-25*
