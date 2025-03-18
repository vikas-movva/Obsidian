**Language $L_1 = \{ x^n y^m x^m z^n \mid n > 0, m > 0 \}$** is context-free.
**Language $L_2 = \{ x^n y^n x^n z^m \mid n > 0, m \geq 0 \}$** is not context-free.

---
### Proof that $L_1$ is Context-Free
#### Context-Free Grammar for $L_1$:
- **Start symbol**: $S$
- **Productions**:
  - $S \to x A z$
  - $A \to x A z \mid B$
  - $B \to y B y \mid y y$

This CFG generates all strings in $L_1$, so $L_1$ is context-free.

---
### Proof that $L_2$ is Not Context-Free

To show that $L_2$ is not context-free, we use the **Pumping Lemma for context-free languages**.

#### Pumping Lemma Statement:
If $L_2$ is context-free, there exists a constant $p$ such that for any string $w \in L_2$ with $|w| \geq p$, we can write $w = uvxyz$ where:
1. $|vxy| \leq p$
2. $|vy| \geq 1$
3. For all $k \geq 0$, $uv^k x y^k z \in L_2$.

#### Proof by Contradiction:
Assume $L_2$ is context-free. Let $p$ be the pumping constant.

Choose $w = x^p y^p x^p$ (where $n = p > 0, m = 0 \geq 0$):
- $w \in L_2$
- $|w| = p + p + p = 3p \geq p$

Now, divide $w = uvxyz$ with $|vxy| \leq p$ and $|vy| \geq 1$. Since $|vxy| \leq p$, $vxy$ cannot span all three parts ($x^p, y^p, x^p$). We consider possible cases:

- **Case 1: $vxy$ is within the first $x^p$**  
  - $v$ and $y$ are $x$'s, $u = x^a, v = x^b, x = x^c, y = x^d, z = x^{p-a-b-c-d} y^p x^p$ (where $b + c + d \leq p, b + d \geq 1$).
  - Pump with $k = 2$: $uv^2 x y^2 z = x^{p + b + d} y^p x^p$.
  - This has more $x$'s in the first part than $y$'s or the second $x^p$, so it’s not in $L_2$.

- **Case 2: $vxy$ is within $y^p$**  
  - $v$ and $y$ are $y$'s, $u = x^p y^a, v = y^b, x = y^c, y = y^d, z = y^{p-a-b-c-d} x^p$.
  - Pump with $k = 2$: $uv^2 x y^2 z = x^p y^{p + b + d} x^p$.
  - The number of $y$'s exceeds $n$, so it’s not in $L_2$.

- **Case 3: $vxy$ is within the second $x^p$**  
  - $v$ and $y$ are $x$'s, $u = x^p y^p x^a, v = x^b, x = x^c, y = x^d, z = x^{p-a-b-c-d}$.
  - Pump with $k = 2$: $uv^2 x y^2 z = x^p y^p x^{p + b + d}$.
  - The third part has more $x$'s than the first, so it’s not in $L_2$.

- **Case 4: $vxy$ straddles $x^p y^p$ or $y^p x^p$**  
  - Similar analysis shows pumping disrupts the $x^n y^n x^n$ equality (e.g., adding $x$'s and $y$'s unevenly).

In all cases, pumping produces a string not in $L_2$, contradicting the assumption. Thus, $L_2$ is not context-free.
