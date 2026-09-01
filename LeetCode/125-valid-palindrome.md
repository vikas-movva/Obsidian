---
lc-id: 125
lc-slug: valid-palindrome
lc-title: Valid Palindrome
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/valid-palindrome/
lc-status: accepted
lc-language: python3
aliases:
  - Valid Palindrome
  - "125"
tags:
  - lc/easy
  - lc/two-pointers
  - lc/string
lc-pattern:
  - Two Pointers
---
# Valid Palindrome
## Problem
A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` _if it is a **palindrome**, or_ `false` _otherwise_.

**Example 1:**

```text
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**

```text
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**

```text
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

**Constraints:**

-   `1 <= s.length <= 2 * 10⁵`
-   `s` consists only of printable ASCII characters.

## Code

```leetcode-solve
class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = "".join(char.lower() for char in s if char.isalnum())
        n = len(s)
        if s == "":
            return True
        
        
        for i in range(n//2):
            if s[i] != s[(n - 1) - i]:
                return False
        
        return True
```

## Notes

## Techniques

- [[Two Pointers]]

## Related Variants

- [[680-valid-palindrome-ii|Valid Palindrome II]] — Extends the two-pointer palindrome check by allowing at most one character deletion.
- [[5-longest-palindromic-substring|Longest Palindromic Substring]] — Uses two-pointer expansion around centers to find the longest palindromic substring.

## AI Review

### Approach
Sub-optimal space usage. The solution creates a filtered copy of the string (`O(N)` space). The optimal approach uses **two pointers on the original string** (`O(1)` space): advance left pointer rightwards and right pointer leftwards, skipping non-alphanumeric characters, comparing lowercased characters at each step.

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        l, r = 0, len(s) - 1
        while l < r:
            while l < r and not s[l].isalnum():
                l += 1
            while l < r and not s[r].isalnum():
                r -= 1
            if s[l].lower() != s[r].lower():
                return False
            l += 1
            r -= 1
        return True
```

### Efficiency
- **Current:** Time `O(N)`, Space `O(N)` (filtered string allocation).
- **Optimal:** Time `O(N)`, Space `O(1)`.
The current solution is sub-optimal in space complexity. The two-pointer approach achieves the theoretical optimum.

### Code Style
- Redundant empty-string check: `if s == "": return True` is handled implicitly by `range(n//2)` being empty. Remove it (2 lines).
- Index calculation `s[(n - 1) - i]` is verbose; Python idiom `s[~i]` (bitwise complement, equivalent to `-i-1`) is standard for reverse indexing.

```python
class Solution:
    def isPalindrome(self, s: str) -> bool:
        s = "".join(char.lower() for char in s if char.isalnum())
        for i in range(len(s) // 2):
            if s[i] != s[~i]:
                return False
        return True
```

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-29*
