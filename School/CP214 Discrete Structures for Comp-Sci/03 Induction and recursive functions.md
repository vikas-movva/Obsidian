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

### Strong Induction
- Steps:
	1. Show that $P(1) = T$ 
	2. Conclude that $P(K+1)$ must be true if $P(1) \land P(2)\land ... \land P(k)| \forall n\in Z$
	3. Show that if $P(k)$ then $P(k+1)=T , \forall k \in Z$
- Ex. Show that if $n \in Z \land n>1$, then n can be written as the product of primes.