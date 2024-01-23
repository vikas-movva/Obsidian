---
Notes: "[[L5 - Recurrences.pdf]]"
---
### Recurrences
- A **recurrence** is an equation or inequality that describes a function in terms of its value on **smaller inputs**
- Recurrences give us a natural way to analize the running times of **divide-and-conquer** algorithms

#### Examples
$T(n) = \{ \Theta(1) \text{ if } n=1 \text{ or } 2T(n/2) + \Theta(n) \text{ if } n>1\}$
$T(n) = T(2n/3) + T(n/3) + \Theta(n)$
$T(n) \le 4T(n/4) + \Theta(n^2)$

>[!info]
>Unless otherwise stated it is always assumed that the base case ==$T(1) = \Theta(1)$==
#### Solving recurrences
- There are three methods that will be covered in this course
	1. Substitution Method
	2. Recursion Tree Method
	3. The Master Method

#### The Substitution Method
1. **Guess** the form of the solution
2. **Verify** by induction
3. **Solve** for constants $(n_0, c)$

Example:
- $T(n) = 4T(n/2) + n$
- We are given that $T(1) = \Theta(1) \le d$ for some constant $d$
	1. Guess $T(n) = O(n^3)$
	2. Assume that $T(k) \le ck^3 for k < n$ and **Prove** $T(n) \le cn^3$ by induction
- Inductive Hypothesis: $T(k) \le ck^3 \text{ for }k < n$
	$T(n) = 4T(n/2) + n$
	    $\le 4c(n/2)^3 + n$
    	$=(c/2)n^3 + n$
	    $= (c/2)n^3 + n +(c/2)n^3 - (c/2)n^3$
    	$= cn^3 - ((c/2)n^3 -n)$
	    $\le cn^3 \text{ whenever }((c/2)m^3 - n)\ge 0 \text{ which is when }c\ge 2$
	However is this guess ($O(n^3)$) a ==tight Upper Bound==?
#todo ![[L5 - Recurrences.pdf#page=8]]
#### Recursion Tree Method

