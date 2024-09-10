---
Notes: "[[School/ST230 Probability and Statistics for Sci./Week 1|Week 1]]"
---
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

## 1.3 Probability

### The Classical Probability Concept
If there are $m$ equally likely possibilities of which one must occur and $s$ satisfies a condition(success), then the probability of a success is given by $\frac{s}{m}$

**Example 1.3.2** Return to Loto Max
The top prize for the weekly Lotto Max (Up to $70 million) is shared between all tickets that match all 7 of the randomly drawn numbers between 1 and 49 (i.e. there are 49 distinct numbers, and 7 numbers drawn without replacement).

Find the probability that a randomly chosen Lotto Max entry wins the Jackpot.
$$P(win) = \frac{1}{49 \choose 7} = 1.16 \times 10^{-8}$$
	
A much smaller prize (say $5000) is awarded to all entries with 6 out of 7 matching numbers. What is the probability of this occurring, for a single play (one set of randomly selected Lotto Max numbers)?
$$P(6of7) = \frac{{7 \choose 6}{42 \choose 1}}{49 \choose 7} = 3.42 \times 10^{-6}$$

### The Frequency Interpretation of Probability
The **probability** of an event is the proportion of times the event will occur in a _long run_ of repeated experiments.

**Example 1.3.3**: 
Consider tossing a coin 250 times in a row and calculate, for example, the proportion of tosses that gave a head.
$$\lim_{ n \to \infty } = 50\%$$

>[!Note]
>Computing probabilities based on what happens in the _long run_ is called a **frequentist** approach to defining probabilities, because we rely on the relative frequency (proportion) of one particular outcome among very many observations of the random phenomenon

**Example 1.3.4**:
Probability is a measure of how likely an event is to occur. Match the probabilities that follow with each statement of likelihood given. (The probability value is usually a more exact measure of likelihood than is the verbal statement.)

| 0   | 0.01 | 0.6 | 0.99 | 1   |
| --- | ---- | --- | ---- | --- |

| Statement                                                                                    | Probability |
| -------------------------------------------------------------------------------------------- | ----------- |
| This event is impossible. It can never occur.                                                | 0           |
| This event is certain. It will occur on every trial.                                         | 1           |
| This event is very unlikely, but it will occur once in a while in a long sequence of trials. | 0.01        |
| This event will occur more often than not.                                                   | 0.99        |

## Probability Rules

>[!Important]
>**Axioms of Probabilities**
>1. The probability $P(A)$ for any event $A$ satisfies $0 \leq P(A) \leq 1$
>2. If $S$ is the sample space in a probability model, then $P(S)=1$
>3. If sets $A$ and $B$ are disjoint ($A \cap B=\emptyset$) then: $$P(A\cup B) = P(A)+P(B)$$

**Example 1.4.1**: Rabies in Florida
Rabies is a viral disease of mammals transmitted through the bite of a rabid animal. The virus infects the central nervous system, causing encephalopathy and ultimately death. The Florida Department of Health reports the distribution of documented cases of rabies for all of 2016

| Species | Probability |
| ------- | ----------- |
| Racoon  | 0.53        |
| Bat     | 0.22        |
| Fox     | 0.10        |
| Other   | ?           |

What probability should replace "?" in the distribution?
$1 - Racoon - Bat-Fox =Other$

What is the probability that a reported case of rabies is not a racoon
$1-Racoon = 0.47$

What is the probability that a reported case of rabies is either a bat or a fox
$Bat+Fox = 0.32$

>[!Theorem]
>If $A$ is an event in the finite sample space $S$, the $P(A)$ is equal to the sum of the probabilities of the individual outcomes comprising $A$

**Example 1.4.2**: Soda consumption
A national survey asked a random sample of Canadian adults about their soda consumption. Let’s call $X$ the number of glasses of soda consumed on a typical day. The survey found the following probabilities for $X$.


| 𝑋  | Probability |
| --- | ----------- |
| 0   | 0.52        |
| 1   | 0.28        |
| 2   | 0.09        |
| 3   | 0.04        |
| 4+  | 0.07        |

Consider the events:
$A=$ {number of glasses of soda is 1 or more}
$B=${number of glasses of soda is 2 or less}

What outcomes make up the event $A$? what is $P(A)$?
$$A=P(1) + P(2) +P(3)+P(4+) = 0.48$$

What outcomes make up the event $B$? What is $P(B)$?
$$P(B)= P(0) + P(1)+P(2) = 0.89$$

What outcomes makeup the event $A \cup B$? what is $P(A\cup B)$? why is this probability not equal to $P(A)+P(B)$?
$A\cup B = S$
$P(A\cup B) = 1$
$A\cup B \neq \emptyset$

>[!Note]
>**General Addition Rule for Any Two Events**
>1. For two _disjoint_ events $A$ and $B$, $P(A\cup B) = P(A)+P(B)$
>2. For _any_ two events $A$ and $B$, $P(A\cup B)=P(A)+P(B)-P(A\cap B)$
>(subtract the overlap that’s counted twice)

**Example 1.4.2**: Soda consumption continued
What is $P(A\cup B)$
$P(A\cup B) = 1$

**Example 1.4.3**: Income and Stress
The following data is taken from a study on the link between stress levels and income levels using 5000 individuals. Here an individual is identified as “stressed” if they reported feeling extremely or quite stressed on most days, and “not stressed” if they felt a bit stressed, not very stressed, or not at all stressed on most days.

| Stress level | Low Income | Med Income | High Income | Totals |
| ------------ | ---------- | ---------- | ----------- | ------ |
| Stressed     | 230        | 321        | 144         | 695    |
| Not stressed | 1920       | 1025       | 1360        | 4305   |
| Totals       | 2150       | 1346       | 1504        | 5000   |

Let $L, M,H$ represent the events that a randomly selected individual has low, medium or high income respectively. Let 𝑆 and 𝑁 denote the events that a randomly selected individual is “stressed” and “not stressed”, respectively. Find the following probabilities:

$P(H) = \frac{1504}{5000} = 0.3008$
$P(\bar{L}\cap S) = 321+144 = 465$
$P(L\cup M) = \frac{3496}{5000} = 0.6992$
$P(L\cup S) = \frac{2615}{5000}=0.523$
\
## 1.5 Conditional Probability and Independence