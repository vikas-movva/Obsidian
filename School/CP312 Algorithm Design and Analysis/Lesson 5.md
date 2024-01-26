---
Notes: "[[Lesson 6]]"
tags:
  - algorithms
  - math
  - running-time
  - "#recurrence"
---
### Recurrences
- A **recurrence** is an equation or inequality that describes a function in terms of its value on **smaller inputs**
- Recurrences give us a natural way to analyze the running times of **divide-and-conquer** algorithms

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
	    $\le cn^3 \text{ whenever }((c/2)n^3 - n)\ge 0 \text{ which is when }c\ge 2$
	**Base case:** $k = n_0$: Let $n_0 = 1$
	$T(n_0) = T(1) \le d$
		       $\le c(1)^3$  (by inductive hypothesis)
	$\therefore$ the constants are $n_0 = 1$ and $c \ge d$
	Thus, $T(n) = O(n^3)$, However is this a tight upper bound?	
	$T(n) = 4T(n/2) + n$ 
	Assume that $T(1) = \Theta(1) \le d$ for some constant $d$
	$T(n) = 4T(n/2) + n$
		$\le 4c(n/2)^2 + n$
		$= cn^2 + n$
		$\le cn^2$ for what value of c does this inequality hold?
		==For **no** value of $c > 0$==
#### Recursion Tree Method
#question Why is the second level of the tree $T(n/4) \text{ and } T(n/2)$ instead of $T(n/2) \text{ and } T(n/2)$
Solve: 
$T(n) = T(n/4) + T(n/2) + n^2$
	$= n^2 + \frac{5}{15}n^2 + \frac{5}{15}^2n^2 + \frac{5}{15}^3n^2 + ... \frac{5}{15}^hn^2$ 
	$= n^2 \sum^{\infty}_{i=0}\frac{5}{16}^i$
	$= \frac{16}{11}n^2 = O(n^2)$
#todo add example problem

### The Master Method
This method applies to recurrences of the form: 
$T(n) = aT(n/b) + f(n)$ where $a \ge 1, b> 1$ are constants and $f(n)$ is asymptotically positive

#### The Master Theorem
Given $T(n) = aT(\frac{n}{b}) + f(n)$ where $a \ge 1, b> 1$ are constants
- **Case 1:** $f(n) = O(n^{log_ba-\epsilon})$ for some constant $\epsilon > 0$
	- $f(n)$ grows polynomially slower than $n^{log_ba-\epsilon}$ (by a factor of $n^\epsilon$)
	- $T(n) = \Theta(n^{log_ba})$ 
- **Case 2:** $f(n) = \Theta(n^{log_ba}lg^kn)$ for some constant $k \ge 0$
	- $f(n)$ and $n^{log_ba}$ grow at similar rates
	- $T(n) = \Theta(n^{log_ba}lg^{k+1}n)$
- **Case 3:** $f(n) = \Omega(n^{log_ba+\epsilon})$ for some constant $\epsilon > 0$
	- $f(n)$ grows polynomially faster than $n^{log_ba}$ by a factor of $n^\epsilon$
	- $f(n)$ must satisfy the **regularity condition** that $af(n/b) \le cf(n)$ for some constant $c < 1$
	- $T(n) - \Theta(f(n))$

#### Examples
**Example 1:**
	$T(n) = 4T(n/2) + n$ | $a = 4, b = 2$

**Example 2:**
	$T(n) = 4T(n/2) + n^2$ | $a = 4, b = 2$
	$n^{log_ba} = n^2$ and $f(n) = n^2$
	this is **Case 2**: $f(n) = \Theta(n^2lg^0n)$, thus $k=0$
	$\therefore T(n) = \Theta(n^2lgn)$

**Example 3:**
	$T(n) = 4T(n/2) + n^3$ | $a = 4, b = 2$
	$n^{log_ba} = n^2$ and $f(n) = n^3$
	this is **Case 3:** $f(n) = \Omega(n^{2+\epsilon})$ for $\epsilon = 1$ **and** $4(n/2)^3 \le cn^3$ for $c = 1/2$ (this is the regularity condition)
	$\therefore T(n) = \Theta(n^3)$

**Example 4:**
	$T(n) = 4T(n/2) + \frac{n^2}{lg(n)}$ | $a = 4, b = 2$
	$n^log_ba = n^2$  and $f(n) = n^2/lg(n)$
	In this example **None** of the cases' conditions are filled therefore the [[Lesson 5#The Master Theorem|Master Theorem]] can't be used