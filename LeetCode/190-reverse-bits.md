---
lc-id: 190
lc-slug: reverse-bits
lc-title: Reverse Bits
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/reverse-bits/
lc-status: accepted
lc-language: python3
aliases:
  - Reverse Bits
  - "190"
tags:
  - lc/easy
  - lc/divide-and-conquer
  - lc/bit-manipulation
lc-pattern:
  - Bit Manipulation
---
# Reverse Bits
## Problem
Reverse bits of a given 32 bits signed integer.

**Example 1:**

```text
Input: n = 43261596
Output: 964176192
Explanation:
```

| Integer   | Binary                           |
| --------- | -------------------------------- |
| 43261596  | 00000010100101000001111010011100 |
| 964176192 | 00111001011110000010100101000000 |

**Example 2:**

```text
Input: n = 2147483644
Output: 1073741822
Explanation:
```

| Integer    | Binary                           |
| ---------- | -------------------------------- |
| 2147483644 | 01111111111111111111111111111100 |
| 1073741822 | 00111111111111111111111111111110 |

**Constraints:**

-   `0 <= n <= 2³¹ - 2`
-   `n` is even.

**Follow up:** If this function is called many times, how would you optimize it?

## Code

```leetcode-solve
class Solution:
    def reverseBits(self, n: int) -> int:
        r = 0
        for i in range(32):
            r = (r << 1) | (n & 1)
            n >>= 1
        return r
```

## Notes
Intuition: check if right most bit is 1 if it is add it to reverse integer, then bitshift n right once and reverse left once.

## Techniques

- [[Bit Manipulation]]

## Related Variants

- [[191-number-of-1-bits|Number of 1 Bits]] — Both involve iterating through bits using bitwise operations to extract information from an integer
- [[7-reverse-integer|Reverse Integer]] — Shares the reversal concept but operates on decimal digits rather than binary bits
- [[201-bitwise-and-of-numbers-range|Bitwise AND of Numbers Range]] — Requires deeper bit-level reasoning to find the range AND by identifying common prefixes in binary representation

## AI Review

### Approach
The solution exploits the problem constraints (`n ≤ 2³¹-2` and `n` even) to reverse bits in 31 iterations instead of 32. Because the input's sign bit (bit 31) is always 0 and its LSB is always 0, the reversed number's LSB is 0 — a condition satisfied by the final left shift in the loop. The algorithm is correct and runs in constant time. A more general 32‑iteration approach (`r = (r << 1) | (n & 1); n >>= 1`) works for any 32‑bit unsigned integer and is equally optimal asymptotically. For the follow‑up (many calls), a byte/word lookup table or a divide‑and‑conquer bitwise reversal (swapping halves with masks) reduces the constant factor.

### Efficiency
Time: O(32) = O(1). Space: O(1). This meets the theoretical optimum for a single call. For repeated calls, a precomputed lookup table (e.g., 256‑entry byte reversal) or the parallel bitwise method (5 steps) would be faster in practice while remaining O(1).

### Code Style
The loop can be written more idiomatically and concisely using the standard 32‑bit reversal pattern, which also removes the reliance on the specific constraints:
```python
for _ in range(32):
    r = (r << 1) | (n & 1)
    n >>= 1
```
This is shorter (one statement per iteration), uses a well‑known idiom, and works for all 32‑bit inputs. The current `range(31)` with separate add‑then‑shift is correct but less conventional.

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-28*
