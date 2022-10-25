## Summary  of topics covered
- The Language of Propositions 
	- Connectives  
	- Truth Values  
	- Truth Tables 
- Applications  
	- Translating English Sentences  
	-  System Specifications  
	- Logic Puzzles  
- Logical Equivalences  
	- Important Equivalences  
	- Showing Equivalence  
	- Satisfiability

# Section 1.1

## Section Summary
- Propositions  
- Connectives  
	- Negation  
	- Conjunction  
	- Disjunction  
	- Implication; contrapositive, inverse, converse  
	- Biconditional  
- Truth Tables

### Propositions
- *def* : A proposition is a declarative sentence that is either true or false
- Examples of propositions
	- The moon is made of green cheese
	- Trenton is the capital of new jersey
	- Toronto is the capital of Canada
	- 1 + 0 = 1
	- 0 + 0 = 2
- Examples that are **not** propositions
	- sit down!
	- What time is it?
	- x + 1 = 2
	- x + y = z
- Practice:
| Statement                        | Truth value (T/F) |
| -------------------------------- | ----------------- |
| Elephants are bigger than mice   | T                 |
| 520 < 111                        | F                 |
| y > 5                            | N/A               |
| Today is September 13 and 99 < 5 | F                 |
| Today is Jan. 1 or 99 > 5        | F                  |

- Propositional Logic
	- Prop. Vars: *p, q, r, s, ...*
	- Compound props; constructed from logical connectives and other props
		- Negation $\neg$e
			- Flips the value - T becomes F and F becomes T
		- Conjunction $\land$
			- AND - Only true if both values are true
			- T$\land$T=T, T$\land$F=F
		- Disjunction $\lor$
			- OR - True if one of the values is true
			- T$\lor$T=T, T$\lor$F=T 
			- There is another type of OR the XOR or exclusive or
				- $\oplus$ 
		- Implication $\implies$ or $\rightarrow$
			- F p and q are propositions, then p → q is a conditional  statement or implication which is read as “if p, then q” and has this truth table:
			- True in every case except T$\rightarrow$F = F
			- With implications new conditional statements can be formed
				- Converse: $q\rightarrow p$
				- Contrapositive: $\neg q \rightarrow \neg p$
				- Inverse: $\neg p \rightarrow \neg q$
				- Example: It raining is a sufficient condition for my not going to town
					- Converse: 
						- **My not going to town** is sufficient condition **for it to be raining**
					- Contrapositive: 
						- **My going to town** is sufficient condition **for it to be not raining**
					- Inverse: 
						- **It not raining** is a sufficient condition **for my going to town**
		- Biconditional
			- If $p$ and $q$ are propositions, then we can form the biconditional proposition $p \iff q$, read as "$p$ if and only if "q"
			- if the value of $p$ is the same as $q$ then the result is True
			- Alternative ways of saying if and only if:
				- $p$ is necessary and sufficient for $q$
				- if $p$ then $q$, and conversely
				- $p$ iff $q$  
	- Practice Problems
		- let $p$ and $q$ be propositions
			- $p$: I bought a lottery ticket this week
			- $q$: I won the million dollar jackpot
		1. $\neg p$: I did ==not== buy a lottery ticket this week
		2. $p \lor q$: I either bought a lottery ticket this week or I won the million dollar jackpot
		3. $p \rightarrow q$: If i bought a lottery ticket this week then I won the million dollar jackpot
		4. $p \land q$: I bought a lottery ticket this week and I won the million dollar jackpot
		5. $p \iff q$: I bought a lottery ticket this week if and only if I won the million dollar jackpot.
		6. $\neg p \rightarrow \neg q$:  If I didn't buy a lottery ticket this week then I didn't win the million dollar jackpot
		7. $\neg p \land \neg q$: I didn't buy a lottery ticket this week and I didn't win the million dollar jackpot
		8. $\neg p \lor (p \land q)$: I didn't buy a lottery ticket this week or I did and I won the jackpot
	  - Truth tables for compound Propositions
		  - Rows: there needs to be a row for every possible combination of values for the atomic propositions
		  - Columns: there needs to be a column for the compound proposition (usually at the far right) and there needs to be a column for the truth values of each expression that occurs in the compoiund proposition as it is built up
			  - this includes the atomic propositions
		  - Example: $p \lor q \rightarrow \neg r$
		  - <table>

	<tr>
	<th>$p$</th>
	<th>$q$</th>
	
	<th>$r$</th>
	
	<th>$\negr$</th>
	
	<th>$p\lorq$</th>
	
	<th>$p\lorq\rightarrow\neg r$</th>
	
	</tr>
	
	<tr>
	
	<td>T</td><td>T</td><td>T</td><td>F</td><td>T</td><td>F</td>
	
	</tr>
	
	<tr>
	
	<td>T</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td>
	
	</tr>
	
	<tr>
	
	<td>T</td><td>F</td><td>T</td><td>F</td><td>T</td><td>F</td>
	
	</tr>
	
	<tr>
	
	<td>T</td><td>F</td><td>F</td><td>T</td><td>T</td><td>T</td>
	
	</tr>
	
	<tr>
	
	<td>F</td><td>T</td><td>T</td><td>F</td><td>T</td><td>F</td>
	
	</tr>
	
	<tr>
	
	<td>F</td><td>T</td><td>F</td><td>T</td><td>T</td><td>T</td>
	
	</tr>
	
	<tr>
	
	<td>F</td><td>F</td><td>T</td><td>F</td><td>F</td><td>T</td>
	
	</tr>
	
	<tr>
	
	<td>F</td><td>F</td><td>F</td><td>T</td><td>F</td><td>T</td>
	
	</tr>
	
	</table>
	
	- Equivalent Propositions
		- Example: Show using a truth table that the conditional is equivalent to the contra positive
		- <table>

<tr>

<th>$p$</th>

<th>$q$</th>

<th>$r$</th>

<th>$\negr$</th>

<th>$p\lorq$</th>

<th>$p\lorq\rightarrow\negr$</th>

</tr>

<tr>

<td>T</td><td>T</td><td>F</td><td>F</td><td>T</td><td>T

</tr>

<tr>

<td>T</td><td>F</td><td>F</td><td>T</td><td>F</td><td>F

</tr>

<tr>

<td>F</td><td>T</td><td>T</td><td>F</td><td>T</td><td>T

</tr>

<tr>

<td>F</td><td>F</td><td>T</td><td>T</td><td>T</td><td>T

</tr>

</table>

	 - Precedence of Logical Operators
		 - $\neg$ : 1
		 - $\land$ : 2
		 - $\lor$ : 3
		 - $\rightarrow$ : 4
		 - $\iff$ : 5
 
 ### 1.2 Application of Propositional Logic
- Translating English to Propositional Logic
	- Steps to convert:
		- Identify atomic props. and represent using prop. variables
		- Determine appropriate logical connectives
		- Example: "If I go to Harry's or to the country, I will not go shopping"
			- $p$ : I go to Harry's
			- $q$ : I go to the country
			- $r$ : I will go shopping
			- If $p$ or $q$ then not $r$ : $(p \lor q)\rightarrow \neg r$
- System Specifications
	- System and Software engineers take requirements in English and Express them in a precise specification language based on logic
		- Example: “The automated reply cannot be sent when the file system is full”
		- $q \rightarrow \neg p$
	- Consistent System Specifications
		- ==Definition==: A list of propositions is *consistent* if it is possible to assign truth values to the proposition variables so that each proposition is true
		- Example: Lets say that we have the following three statements
			- “The diagnostic message is stored in the buffer or it is retransmitted.”
			- “The diagnostic message is not stored in the buffer.”
			- “If the diagnostic message is stored in the buffer, then it is retransmitted.""
		- Then the three statements could be represented by:
			- $p \lor q$ 
			- $\neg p$
			- $p \rightarrow q$ 
		- In these examples when $p$ is false and $q$ is true all three statements are true $\therefore$ the specification is consistent
		- However if an additional statement is added:
			- “If the diagnostic message is stored in the buffer, then it is retransmitted.”
		- $\neg q$ is added and there is no satisfying assignment and $\therefore$ the specification is not consistent
- Logic Puzzles
	- Question: An island has two kinds of inhabitants, knights, who always tell the truth, and knaves, who always lie.
	- You go to the island and meet A and B.
		- A says “B is a knight.”
		- B says “The two of us are of opposite types.”
	- What are the types of A and B?
		- if A is a knight it the statement can be represented by the following:
			- $(p \land \neg q)\lor(\neg p \land q) = T  \therefore$ A is not a knight and that means that A must be a knave
			- If A is a knave then both are lying which fulfils the criteria
### 1.3 Propositional equivalences
- Tautologies
	- a proposition which is always true
		- $p \lor \neg p$
- Contradictions 
	- a proposition which is always false
		- $p \land \neg p$
- Contingencies
	- a proposition which is neither a tautology or a contradiction
	- Ex. [[Predicate Logic.pdf#page=39|example]]
- Logical equivalence
	- Two compound propositions p and q are logically equivalent if $p\iff q$ is a tautology
	- two compound propositions $p$ and $q$ are equivalent if and only if the columns in a truth table giving their truth values agree.
	- Ex. This table shows that $\neg p \lor q$ is equivalent to $p \rightarrow q$
		- [[Predicate Logic.pdf#page=40|Link to table]]
	- De Morgan's Laws
		- $\neg (p\land q)\equiv \neg p \lor \neg q$
		- $\neg (p\lor q)\equiv \neg p \land \neg q$
			- ==notice that the negative is applied to all variables and conjunctions/disjunctions are flipped==
	- Key Logical Equivalences
		- [[Predicate Logic.pdf#page=42|Key Logical Equivalences]]
- Propositional satisfiability
	- a compound proposition is satisfiable if there is an assignment of truth values to its variables that make it true
	- if there is no such outcome then it is unsatisfiable
		- [[Predicate Logic.pdf#page=49|Propositional satisfiability practice questions]]

