---
lc-id: 121
lc-slug: best-time-to-buy-and-sell-stock
lc-title: Best Time to Buy and Sell Stock
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
lc-status: accepted
lc-language: python3
aliases:
  - Best Time to Buy and Sell Stock
  - "121"
tags:
  - lc/easy
  - lc/array
  - lc/dynamic-programming
---
# Best Time to Buy and Sell Stock
## Problem
You are given an array `prices` where `prices[i]` is the price of a given stock on the `iᵗʰ` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return _the maximum profit you can achieve from this transaction_. If you cannot achieve any profit, return `0`.

**Example 1:**

```text
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2:**

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

**Constraints:**

-   `1 <= prices.length <= 10⁵`
-   `0 <= prices[i] <= 10⁴`

## Code

```leetcode-solve
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        def dp():
            max_p = 0
            l_buy = prices[0]
            
            for sell_p in prices:
                max_p = max(max_p, sell_p - l_buy)
                l_buy = min(sell_p, l_buy)
            return max_p
        
        def two_pointer():
            max_p, lp, rp = 0, 0, 1
            
            while rp < len(prices):
                profit = prices[rp] - prices[lp]
                if profit >=0:
                    max_p = max(max_p, profit)
                else:
                    lp = rp
                rp += 1
            
            return max_p
        
        return dp()
```

## Notes
Intuition: two pointers left pointer is the buy day and right pointer is the sell day. track max profit; O(n) time O(1) space.

## AI Review

### Approach
The `dp()` method implements the optimal single-pass greedy algorithm. The key insight: at each day, the best profit achievable by selling on that day is the current price minus the minimum price seen so far. Maintaining the running minimum and maximum difference yields the global optimum. This is the theoretical optimum for this problem.

### Efficiency
Time: O(n), Space: O(1). Matches the theoretical lower bound (must read all prices at least once). Optimal.

### Code Style
The nested `dp` and `two_pointer` functions are unnecessary; only `dp` is called. Inlining the logic into `maxProfit` removes two lines (`def dp():` and `return dp()`) and a level of indentation. The unused `two_pointer` should be deleted.

```python3
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        max_p = 0
        min_price = prices[0]
        
        for price in prices:
            max_p = max(max_p, price - min_price)
            min_price = min(min_price, price)
            
        return max_p
```

*Reviewed by OpenRouter (nvidia/nemotron-3-ultra-550b-a55b:free) — 2026-08-31*
