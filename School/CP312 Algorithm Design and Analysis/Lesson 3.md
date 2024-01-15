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

