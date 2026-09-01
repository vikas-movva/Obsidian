---
lc-id: 252
lc-slug: meeting-rooms
lc-title: Meeting Rooms
lc-difficulty: Easy
lc-url: https://leetcode.com/problems/meeting-rooms/
lc-status: accepted
lc-language: python3
aliases:
  - Meeting Rooms
  - "252"
tags:
  - lc/array
  - lc/sorting
lc-pattern:
  - Arrays & Hashing
---
# Meeting Rooms
## Problem
Given an array of meeting time interval objects consisting of start and end times `[[start_1,end_1],[start_2,end_2],...] (start_i < end_i)`, determine if a person could add all meetings to their schedule without any conflicts. The intervals may be provided in any order.

>[!Note] 
>(0,8),(8,10) is not considered a conflict at 8

**Example 1:**

```text
Input: intervals = [(0,30),(5,10),(15,20)]

Output: false
```

Explanation:

- `(0,30)` and `(5,10)` will conflict
- `(0,30)` and `(15,20)` will conflict

**Example 2:**

```text
Input: intervals = [(5,8),(9,15)]

Output: true
```

**Constraints:**

- `0 <= intervals.length <= 500`
- `0 <= intervals[i].start < intervals[i].end <= 1,000,000`

## Code

```leetcode-solve
# Definition of Interval:
# class Interval(object):
#     def __init__(self, start, end):
#         self.start = start
#         self.end = end

class Solution:
    def canAttendMeetings(self, intervals: List[Interval]) -> bool:
        intervals.sort(key=lambda x: x.start)

        for i in range(1, len(intervals)):
            if intervals[i].start < intervals[i-1].end:
                return False

        return True

```

## Notes

## Techniques

- [[Arrays & Hashing]]
- [[Sorting]]

## Related Variants

* [[253-meeting-rooms-ii|Meeting Rooms II]] (Medium)
* [[|56-merge-intervals|Merge Intervals]] (Medium)
* [[57-insert-interval|Insert Interval]] (Medium)

### Approach

Sort the list of intervals by their starting times, then iterate through the sorted list to check if any meeting starts before the previous one ends (`intervals[i].start < intervals[i-1].end`). If an overlap is found, return `False`; otherwise, if the loop completes without overlaps, return `True`.

### Efficiency

* **Time Complexity:** $O(n \log n)$ due to sorting the $n$ intervals, followed by an $O(n)$ linear scan.
* **Space Complexity:** $O(1)$ or $O(n)$ depending on Timsort's implementation memory usage, as the sorting is done in place.

## Code Style

* **Correct & Idiomatic:** The solution is concise, highly readable, and correctly handles edge cases like empty lists or single intervals.