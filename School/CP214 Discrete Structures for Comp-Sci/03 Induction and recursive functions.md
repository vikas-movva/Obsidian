### What is induction?
- Induction is a useful tool for proving that a certain [[01 Predicate Logic| Predicate]] is true for all positive integers

### How to do induction
- Say that there is a [[01 Predicate Logic#Propositions|Propositional]] function $P(n)$ and we want to prove that $P(n)$ is positive for all positive integers $n$ 
	1. Show that $P(1) = T$ 
	2. Show that if $P(k)$ then $P(k+1)=T , \forall k \in Z$
	3. Conclude that $P(n)$ must be true for any $n\in Z$
- EX. Show that $n < 2^n: \forall n\in Z+$
	- let $P(n) =n < 2^n$
	- $P(1) = 1 < 2^1 = 1 < 2$
	- Assume that if $P(k) = T$ then $P(k+1) = T$
	- $\therefore k+1 < 2^k +1$
	- $k+1<2^k+2^k$ 
	- $k+1<s^{k+1}$
	- $\therefore n < 2^n: \forall n\in Z+$

