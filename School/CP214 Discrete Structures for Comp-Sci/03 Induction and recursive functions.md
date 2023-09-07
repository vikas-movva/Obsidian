## Induction

### What is induction?
- Induction is a useful tool for [[proving]] that a certain [[01 Predicate Logic| Predicate]] is true for all positive integers

### How to do induction
- Say that there is a [[01 Predicate Logic#Propositions|Propositional]] function $P(n)$ and we want to prove that $P(n)$ is positive for all positive integers $n$ 
	1. Show that $P(1) = T$ 
	2. Show that if $P(k)$ then $P(k+1)=T , \forall k \in Z$
	3. Conclude that $P(n)$ must be true for any $n\in Z$
- Ex. Show that $n < 2^n: \forall n\in Z^+$
	- let $P(n) =n < 2^n$
	- $P(1) = 1 < 2^1 = 1 < 2$
	- Assume that if $P(k) = T$ then $P(k+1) = T$
	- $\therefore k+1 < 2^k +1$
	- $k+1<2^k+2^k$ 
	- $k+1<s^{k+1}$
	- $\therefore n < 2^n: \forall n\in Z^+$

### Practice Problems:
- Prove: $1+2+...+n = \frac{n(n+1)}{2}$
- Prove: $1+3+5+...+(2n-1) = n^2 : n\in Z^+$

### Guidelines for Mathematical Induction Proofs
- ![[Induction and Recursive Programs.pdf#page=12]]
- 

### Strong Induction
- Steps:
	1. Show that $P(1) = T$ 
	2. Conclude that $P(K+1)$ must be true if $P(1) \land P(2)\land ... \land P(k)| \forall n\in Z$
	3. Show that if $P(k)$ then $P(k+1)=T , \forall k \in Z$
- Ex. Show that if $n \in Z \land n>1$, then n can be written as the product of primes.

---
## Recursion

### What is recursion?
- recursion is a principle closely related to mathematical induction
- In a recursive def., an object is defined in terms of itself
- we can recursively define sequences, functions, and sets

### Recursive functions
- Def. : A recursive or inductive definition of a function consists of two steps.
	- ==Basis step==: Specify the value of the function at zero
	- ==Recursive step==: the rule for finding its value at an integer from its values at smaller integers
- Ex. 
	- Suppose $f$ is defined by:
	- $f(0) = 3$
	- $f(n+1) = (n+1)f(n)$
	- then $f(1) = (1+1)f(0) = 2(3) = 6$

### Recursive sets
- In order to recursively define a set there needs to be the following ==2 things==
	- ==Initial set== of elements
	- ==Rules== that construct additional elements from elements already in the set
- Ex. 
	- Let $S$ be recursively defined by: 
		- $3 \in S$ 
		- $(x+y)\in S$ if $(x \in S) \land (y \in S)$
	- This set is the set of positive integers that are divisible by 3

### Recursive algorithms
- An algorithm that solves a problem by reducing it to an instance of the same problem with a smaller input
- Ex.
	- Recursive Euclidean Algorithm:
	```python
def gcd(a: uint,b: uint) -> uint:
	if(a==0):
		return b
	else:
		return gcd(b%a, a)
print(gcd(input("a: "), input("b: ")))
	```
	- Recursive Fibonacci Algorithm
```python
def fib(n: uint) -> uint:
	if(n==0):
		return 0
	elif(n==1):
		return 1
	else:
		return fib(n-1) + fib(n-2)
print(fib(input("n: ")))
```

### Practice problems
- Give a recursive definition of the set of natural numbers $N$.
	- $0 \in S$
	- $(x+1)\in S$ if $(x \in S) \land (y \in S)$
- Give a recursive algorithm for computing n!, where n is a nonnegative integer
```python
def factorial(n: uint) -> uint:
	if(n==0):
		return 0
	elif(n==1):
		return 1
	else:
		return: n * factorial(n-1)
print(factorial(input("n: ")))
```
- Give a recursive algorithm for computing $a^n$ , where $a$ is a nonzero real number and $n$ is a nonnegative integer.
```python
def exp(a: int, n: int) -> int:
	if(n==0):
		return 1
	elif(n==1):
		return a
	else:
		return a * exp(a, n-1)	
print(exp(int(input("a: ")), int(input("n: "))))
```

```python
def foo(n, a):
	if (n==1):
		return a
	else:
		return foo(n-1, a) + a
print(foo(3,2))
```