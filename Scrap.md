1. Give a state transition diagram of DFAs recognizing the following languages (the alphabet is {0,1}): 
	1. $L1$ = the set of all strings that start with **1** or have **odd** length 
	2.  $L2$ = the set of all strings that start with **0** and have **even** length 
	3.  $L3$ = the set of all strings that end with **1** and have **even** length 
	4.  $L1 \cap L2$ 
	5.  $L2 \cup L3$ 
	6.  $L2 \cap L3$
	7.  The set of all strings such that every occurrence of **1** is followed by at least two 0s, e.g., **0001000100**, **100**, **0**, **00000000010000000100100** are in this language, but **1011**, **1**, **101** are not. 
	8.  The set of all strings that does not contain pattern **0110**. 
	9. The set of all strings except **100** and **01**.

For each NFA below: 
1. start state q1, accepting state q2 

|       | 0    | 1           | $\epsilon$  |
| ----- | ---- | ----------- | ----------- |
| -> q1 | {q2} | {q1,q2}     | $\emptyset$ |
| *q2   | {q1} | $\emptyset$ | $\emptyset$ |

2. start state q1, accepting state q2 0 1 ε -> q1 Ø Ø {q3} * q2 {q2, q3} {q3} Ø q3 {q3} {q2} {q3} 

|       | 0           | 1           | $\epsilon$  |
| ----- | ----------- | ----------- | ----------- |
| -> q1 | $\emptyset$ | $\emptyset$ | {q3}        |
| *q2   | {q2,q3}     | {q3}        | $\emptyset$ |
| q3    | {q3}        | {q2}        | {q3}        |

3. provide NFA state transition diagram 
4. use the construction given in Theorem 1.39 to convert the NFA to equivalent DFA. Show your work (including ALL intermediate steps).

Theorem 1.39:
Every nondeterministic finite automaton has an equivalent deterministic finite automaton. 

PROOF IDEA:
If a language is recognized by an NFA, then we must show the existence of a DFA that also recognizes it. The idea is to convert the NFA into an equivalent DFA that simulates the NFA. 

Recall the “reader as automaton” strategy for designing finite automata. How would you simulate the NFA if you were pretending to be a DFA? What do you need to keep track of as the input string is processed? In the examples of NFAs, you kept track of the various branches of the computation by placing a finger on each state that could be active at given points in the input. You updated the simulation by moving, adding, and removing fingers according to the way the NFA operates. All you needed to keep track of was the set of states having fingers on them. 

If k is the number of states of the NFA, it has 2 k subsets of states. Each subset corresponds to one of the possibilities that the DFA must remember, so the DFA simulating the NFA will have 2 k states. Now we need to figure out which will be the start state and accept states of the DFA, and what will be its transition function. We can discuss this more easily after setting up some formal notation. 

PROOF 
Let $N = (Q, \Sigma, \delta, q_{0}, F)$ be the NFA recognizing some language A. We construct a DFA $M = (Q' , \Sigma', \delta' , q_{0}' , F' )$ recognizing $A$. Before doing the full construction, let’s first consider the easier case wherein $N$ has no $\epsilon$ arrows. Later we take the $\epsilon$ arrows into account. 
1. $Q' = \mathcal{P}(Q).$ Every state of $M$ is a set of states of $N$. Recall that $\mathcal{P}(Q)$ is the set of subsets of $Q$. 
2. For $R \in Q'$ and $a \in \Sigma$, let $\delta'(R, a) = \{q \in Q| q \in \delta(r, a) \text{ for some } r ∈ R\}$. If $R$ is a state of $M$, it is also a set of states of $N$. When $M$ reads a symbol $a$ in state $R$, it shows where a takes each state in $R$. Because each state may go to a set of states, we take the union of all these sets. Another way to write this expression is $$\delta'(R,a) = \bigcup_{r \in R} \delta(r,a)$$[^4]
 
3. $q_{0}' = \{q0\}$. $M$ starts in the state corresponding to the collection containing just the start state of $N$. 
4. $F' = \{R \in Q' | R \text{ contains an accept state of }N\}$. The machine $M$ accepts if one of the possible states that $N$ could be in at this point is an accept state. 

Now we need to consider the ε arrows. To do so, we set up an extra bit of notation. For any state R of M, we define E(R) to be the collection of states that can be reached from members of R by going only along ε arrows, including the members of R themselves. Formally, for R ⊆ Q let E(R) = {q| q can be reached from R by traveling along 0 or more ε arrows}. Then we modify the transition function of M to place additional fingers on all states that can be reached by going along ε arrows after every step. Replacing δ(r, a) by E(δ(r, a)) achieves this effect. Thus δ' (R, a) = {q ∈ Q| q ∈ E(δ(r, a)) for some r ∈ R}. Additionally, we need to modify the start state of M to move the fingers initially to all possible states that can be reached from the start state of N along the ε arrows. Changing q0 0 to be E({q0}) achieves this effect. We have now completed the construction of the DFA M that simulates the NFA N. The construction of M obviously works correctly. At every step in the computation of M on an input, it clearly enters a state that corresponds to the subset of states that N could be in at that point. Thus our proof is complete.

[^4]The notation $\bigcup_{r \in R} \delta(r,a)$ means: the union of the sets δ(r, a) for each possible r in R.