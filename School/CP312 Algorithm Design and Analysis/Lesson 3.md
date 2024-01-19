---
Notes: "[[L3 - Characterizing Running Time.pdf]]"
---
### Simplify Running time Expansion
consider the following running time:
- $T(n) = a_0 + a_1n +a_2n^2, ... a_dn^d$
- Too complicated
- Too many terms
- Difficult to compare two expressions of the same form
Example:
- $T(n) = 10n^3 + n^2 + 40n + 800$
- suppose $n = 1000$ then $T(n) = 10,001,040,800$ where as $10n^3 = 10,000,000,000$
- the error rate between $T(n)$ and $10n^3$ is only 0.01%
- $\therefore$ it is worth simplifying complexity to get the core factor in the expansion

>[!important]
>The error rate between a simplified and a non simplified running time function shrinks as $n$ increases.

### Asymptotic Complexity
- finding the **exact** complexity of a running time function ($T(n)$) is difficult
- It is easier to **approximate** the running time function in a way that does not substantially change the magnitude of $T(n)$
- This "approximate" measure of efficiency is called **Asymptotic complexity**

There are **Three** main types of asymptotic complexity expressions:
- Big-$O$ 
	- Expresses asymptotic **upper bound**
	- $T(n) = O(g(n)) =>$ for large enough $n$, $T(n) \ge cg(n)$  
	- This is represented by Big $O$ notation ($O$). If $f(n)$ is a function representing the running time of an algorithm, $g(n)$ is an upper bound of $f(n)$ if there exist some positive constants $c$ and $n0$ such that $0 ≤ f(n) ≤ c.g(n)$ for all $n ≥ n0$. It indicates the maximum time an algorithm may take.
- Big-$\Omega$ 
	- Express asymptotic **lower bound**
	- This is represented by Big Omega notation (Ω). If $f(n)$ and $g(n)$ are two nonnegative functions indicating the running time of two algorithms, we say the function $g(n)$ is a lower bound of function $f(n)$ if there exist some positive constants $c$ and $n0$ such that $0 ≤ c.g(n) ≤ f(n)$ for all $n ≥ n0$.
- Big-$\Theta$ 
	- Express asymptotic **tight bound**
	- This is represented by Big Theta notation (Θ). It requires both Big O and Omega, so it’s referred to as a tight bound (it must be both the upper and lower bound). If $f(n) = Θ(g(n))$, that gives you more precise information. It tells you that the algorithm is bounded on both sides by the given function, so it will never be significantly faster or slower than stated.

### Asymptotic notation $\Theta$
Recall that $f(n) = \Theta(g(n))$ if $f(n) = g(n)$ after removing the lower order terms and constant factors([[Lesson 3#Simplify Running time Expansion]])
- #defn For a given function $g(n)$, we denote by $\Theta(g(n))$ the set of functions:
- $$\Theta(g(n)) = \{f(n)|\exists c_1, c_2, n_0 > 0 \text{ such that}\forall n \ge n_0, 0\le c_1g(n)\le f(n)\le c_2g(n) \}$$
- Example: 
	- $\frac{1}{2}n^2 - 3n = \Theta(n^2)$ ?
	- $c_1n^2 \le \frac{1}{2}n^2 - 3n \le c_2n^2$
	- $c_1 \le \frac{1}{2} - \frac {3}{n} \le c_2$
	- pick $c_1 = \frac{1}{14}, c_2 = \frac{1}{2}, n_0. = 7$

### Asymptotic notation $O$
- #defn For a given function $g(n)$, we denote by $O(g(n))$ the set of functions:
- $$O(g(n)) = \{f(n)|\exists c, n_0 > 0 \text{ such that }\forall n\ge n_0, f(n) \le cg(n)\}$$
- Example:
- Is $2^{n+1} = O(2^n)$? (==YES==)
	- $2^{n+1} = c2^n$
	- $2^n * 2 = c2^n$
	- $2 \le c$ 
	- $\therefore 2^{n+1} = O(2^n)$ 
- is $2^{2n} = 2^{O(n)}$?(==NO==)
- is $log_10(n) = O(log_2(n))$? (==YES==)
	- $log_10(n) \le clog_2(n)$
	- $log_10(n) \le c\frac{log_10(n)}{log_2(2)}$
	- $log_2(2) \le c$
	- $\therefore log_10(n) = O(log_2(n))$ 
- is $n^2.5 = O(n^2.8)$?
	- $n^{2.5} \le cn^{2.8}$
	- $n^{-0.3} \le c$
	- as $\lim_{{n \to \infty}} \exists n \le c$

### Asymptotic notation $\Omega$
- #defn For a given function $g(n)$, we denote $\Omega(g(n))$ the set of functions:
- $$\Omega(g(n)) = \{f(n)|\exists c, n_0 > 0 \text{ such that } \forall n\ge n_0, 0 \le cg(n) \le f(n)\}$$
- 