---
Notes: "[[L4 - Merge Sort.pdf]]"
tags:
  - "#algorithms"
  - "#merge-sort"
  - Code
---
## Merge sort

### Algorithm Design
- There are various design techniques for building algorithms(divide and conquer, BFS, DFS, greedy, etc.)
- Insertion sort used the **incremental** approach for the design
- Merge sort is a different approach to designing a sorting algorithm

In python:
```python
def merge_sort(arr:list) -> list:
    # If the list is a single element, return the list
    if len(arr) <= 1:
        return arr

    # Find the middle point to divide the array into two halves
    mid = len(arr) // 2

    # Call merge_sort for first half and second half
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    # A temporary array to store the sorted elements
    sorted_array = []

    # Initial indexes of first and second subarrays
    left_index = right_index = 0

    # Copy data to temporary array sorted_array[]
    while left_index < len(left_half) and right_index < len(right_half):
        if left_half[left_index] <= right_half[right_index]:
            sorted_array.append(left_half[left_index])
            left_index += 1
        else:
            sorted_array.append(right_half[right_index])
            right_index += 1

    # Copy the remaining elements of left_half[], if there are any
    while left_index < len(left_half):
        sorted_array.append(left_half[left_index])
        left_index += 1

    # Copy the remaining elements of right_half[], if there are any
    while right_index < len(right_half):
        sorted_array.append(right_half[right_index])
        right_index += 1

    return sorted_array
```

in psuedocode:
```pseudocode
function mergeSort(array, leftIndex, rightIndex)
    // If the left index is less than the right index, the array has more than one element
    if leftIndex < rightIndex then
        // Calculate the middle index
        middleIndex = (leftIndex + rightIndex) / 2

        // Recursively sort the left half
        mergeSort(array, leftIndex, middleIndex)

        // Recursively sort the right half
        mergeSort(array, middleIndex + 1, rightIndex)

        // Initialize pointers for the left, right, and merged subarrays
        leftPointer = leftIndex
        rightPointer = middleIndex + 1
        mergePointer = leftIndex

        // Temporary array for merged numbers
        tempArray = []

        // Merge the two sorted subarrays
        while leftPointer <= middleIndex and rightPointer <= rightIndex do
            if array[leftPointer] <= array[rightPointer] then
                tempArray[mergePointer] = array[leftPointer]
                leftPointer = leftPointer + 1
            else
                tempArray[mergePointer] = array[rightPointer]
                rightPointer = rightPointer + 1
            end if
            mergePointer = mergePointer + 1
        end while

        // If there are remaining elements in the left subarray, add them to the merged array
        while leftPointer <= middleIndex do
            tempArray[mergePointer] = array[leftPointer]
            leftPointer = leftPointer + 1
            mergePointer = mergePointer + 1
        end while

        // If there are remaining elements in the right subarray, add them to the merged array
        while rightPointer <= rightIndex do
            tempArray[mergePointer] = array[rightPointer]
            rightPointer = rightPointer + 1
            mergePointer = mergePointer + 1
        end while

        // Copy the merged numbers back into the original array
        for i = leftIndex to rightIndex do
            array[i] = tempArray[i]
        end for
    end if
end function
```

### Math
We are merging 2 **sorted lists** each of size $n/2$ 
In every step there is:
- 1 comparison
- 1 copy
- 1 pointer increment
In the worst case running-time is $3n \Rightarrow \Theta(n)$



