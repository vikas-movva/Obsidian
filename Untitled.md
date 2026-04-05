Prove that the following problems are NP-complete.

1. Clubs: Given
	- a set of n persons that we associate with the numbers $\{1,2,\dots,n\}$
	- a collection $C$ of clubs, where each club is a subset $C \subseteq \{1,2,\dots,n\}$ that represents the persons who are members of the club
	- a positive integer $k$

	Determine if there is a set $S \subseteq \{1,2,\dots,n\}$ of size $|S| \leq k$ such that every club contains at least one of the persons in $S$

2. EvenSplit: Given $n$ integers $a_{1},\dots ,a_{n}$, determine whether there is a set $S \subseteq \{1,2,\dots,n\}$ for which $$\sum_{i \in S}a_{i}= \sum_{i \in \{1,2,\dots,n\}\setminus S}a_{i}$$
Provide complete proof that Clubs and EvenSplit are in complexity class NP, by defining suitable certificates and presenting and analyzing running time of verification algorithms for the certificates you defined. Then prove that they are NP-complete by reducing from known NP-complete problems.



Recall, that for a given undirected graph G = (V, E), a subset S of the set of vertices V is called an independent set if $(u,v) \notin E$ for every pair of vertices $u,v \in S$. The independent set decision problem for an undirected graph is:  

ISD:
Input: a graph G = (V, E), and an integer k.  
Output: TRUE, if there is a subset V' of V with at least k elements such that no edge in E has endpoints in V'.  

Consider an instance of 3-SAT problem:  
$(X_1 \lor \neg X_2 \lor \neg X_3) \land (\neg X_1 \lor X_2 \lor X_3) \land (X_1 \lor X_2 \lor \neg X_3) \land (\neg X_1 \lor \neg X_2 \lor X_3)$

and reduction from 3-SAT to ISD. What is the instance of ISD problem that corresponds to the above instance of 3-SAT? If the above instance of 3-SAT is YES instance, show a certificate, verifying this, and also corresponding certificate of the ISD problem.