## 1.1 Sample spaces and events
probability allows us to quantify the variability in the outcome of any experiment whose exact outcome cannot be predicted with certainty.
- An **experiment** is any action or process whose **outcome** is subject to uncertainty
- The **sample space** $S$ of a random phenomenon is the set of all possible outcomes
- An **event** is an outcome or set of outcomes of a random phenomenon. That is, an event is a subset of the sample space

A _discrete sample_ space is an itemized list of outcomes, where each outcome has an associated probability

A _continuous sample space_ is an interval of outcomes.

**Example 1.1.2**: Random number generator
$S=\{x|x \in R : 0 \leq x \leq 1\}$
This is the set of all real numbers between 0 and 1

**Example 1.1.3**: Family Planning. 
A couple wants to have three children. Assume that the probabilities of a newborn being male or female are the same and that the sex of one child does not influence the sex of another child. There are eight possible arrangements of males and females.
-  What is the sample space for having three children (sex of the first, second, and third child)? All eight arrangements are (approximately) equally likely.
	- $S=$ {mmm, fff, mmf, mfm, fmm, ffm, fmf, mff}
- The future parents wonder how many males they might get if they have three children. Give the sample space for the number of males.
	- $S=\{0,1,2,3\}$

### Events: Union, Intersection and Compliment
If $A$ and $B$ are any two events (sets) in a sample space $S$
- **Union** $A \cup B$: the subset of $S$ that contains all elements that are either in A, B or both
- **Intersection** $A \cap B$ is the subset of $S$ that contains all the elements of $S$ that are in both $A$ and $B$
- **Complement** is the subset $S$ that contains all the elements of $S$ that are not in $A$
- When $A$ and $B$ have no outcomes in common they are **disjoint** or **mutually exclusive**. As a result $A\cap B= \emptyset$ where $\emptyset$ is the _empty_ or _null_ set


**Example 1.1.5**
Suppose that vehicles taking a particular freeway exit can turn right (R), turn left (L), or go straight (S). Consider observing the direction for each of three successive vehicles.
- List all outcomes in the event 𝐴 that all three vehicles go in the same direction.
	- $A=\{ RRR, SSS, LLL \}$
- List all outcomes in the event 𝐵 that all three vehicles take different directions.
	- $B= \{ RSL, SRL, LRS, LSR, SLR, RLS \}$
- List all outcomes in the event 𝐶 that exactly two of the three vehicles turn right.
	- $C= \{ RRS,RRL,SRR, LRR, RSR, RLR \}$
- List all outcomes in the event 𝐷 that exactly two vehicles go in the same direction.
	- $D=\{ RRS,RRL,SRR, LRR, RSR, RLR, \dots \}$
- List outcomes in 𝐷, 𝐶 ∪ 𝐷, and 𝐶 ∩ 𝐷.
	- $\overline{D} = A\cup B$
	- $C \cup D=D$
	- $C \cap D=C$

## 1.2 Counting

>[!Theorem]
>If sets $A_{1}, A_{2}, \dots, A_{k}$ contain, respectively $n_{1}, n_{2}, \dots, n_{k}$ ways of choosing first an element of $A_{1}$, then an element of $A_{2}, \dots, $ and finally an element of $A_{k}$

**Example 1.2.1**
If a test consists of 12 true-false questions, in how many different ways can a student mark the test paper with one answer to each question?
- $2^{12}$

**Example 1.2.2**
In how many different ways can the phi club (with a membership of 25) choose a vice president and a president?
- $25 \times 24 = 600$

**Permutations**
When describing sample spaces and events, we are often concerned with the number of different ways that we can choose and order subsets (events) from the sample space.

>[!Theorem]
>The number of **permutations** of $r$ objects selected from a set of $n$ distinct objects is 
>$$_{n}P_{r} = \dfrac{n!}{(n - r)!}$$
>
>This is the number of different ways that we can choose and order the $r$ objects - the _order matters_!

**Example 1.2.3**
From an alphabet consisting of 10 digits, 26 lower-case and 26 capital letters, how many different 8-character passwords can one create? (Assume no repeated characters.)
- $_{62}P_{8} = \frac{62!}{(62-8)!}$ -> really big number

**Combinations**
There are many problems in which we must find the number of ways in which $r$ objects can be selected from a set of $n$ objects, but we do not care about the order in which the selection is made.

>[!Theorem 1.2.3 ]
>The number of ways in which 𝑟 objects can be selected from a set of 𝑛 distinct objects is
>$${n \choose r} = \frac{n!}{r!(n-r!)}$$
>
>This is the number of different ways that we can choose the $r$ objects - but the _order does not matter_!


**Example 1.2.4**: OLG Lotto Max Winners
The top prize for the weekly Lotto Max (Up to $70 million) is shared between all tickets that match all 7 of the randomly drawn numbers between 1 and 49 (i.e. there are 49 distinct numbers, and 7 numbers drawn without replacement). How many different combinations of winning numbers are possible?
- ${49 \choose 7} =$ big number

