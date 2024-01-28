### Question 1

#### 1.A
```
function CheckUnique(A, n):
	for i = 1; i < n:
		for j = i + 1; j< n:
			if $a_1$ == $a_j$ :
				return False
	return True
```

```python
i = 1                         #assign
while(i < n):                 #compare
	j = i + 1                 #arithmetic, assign
	while(j < n)              #compare
		if(a1 == a2):         #compare
			return False      
		j++                   #arithmetic, assign
	i++                       #arithmetic, assign
return True
```
##### 1.A.I
**Primitive operations:** Assign, Compare, Arithmetic
**Data structures:** Arrays

##### 1.A.II
Worst-case running-time: 
$T(n) = (\sum_{i=1}^nn)$ 
	$= ((n - 1)*(\frac{n}{2}))$ 
	$= O(n^2)$ 
#### 1.B
```python
def matrix_squared(A: list[list[int]], n: int) -> bool:
	for i in range(1, n): # Compare
		for j in range(1, n): # Compare
			for k in range(1, n): # Compare 
				C[i, j] = C[i, j] + (A[i, k] * A[k, j]) # Access, Arithmatic, Assign
			# Arithmatic
		# Arithmatic
	# Arithmatic
	return True
```
##### 1.B.I
**Primitive operations:** Assign, Sum, Product, Access
**Data structures:** Arrays

##### 1.B.II
`C[i, j] = C[i, j] + (A[i, k] * A[k, j])`
Constant time operations and their counts: 

| Operation | Occurrence |
| ---- | ---- |
| Assign | 1 |
| Sum | 1 |
| Access | 3 |
| Product | 1 |
as these primitive operations are happening in the `k` loop, the running time for the `k` loop would be $T(n_k) = 8n_k$ $\therefore T(n) = 2n*2n*8n = 32n^3$ 

##### 1.B.III
From [[Assignment 1#1.B.II|1.B.II]] we got the running time: 
$T(n) = 32n^3 + 1$ 

**Running time using $\Theta$-notation:**
$c_{1}n^3 \le 32n^3 \le c_{2}n^3$
pick $c_{1} = 1, c_{2} = 40, n_{0} = 1$
$1 \le 32 \le 40$
$\therefore \Theta(n^3)$ is the **Tight bound** of the running time


#### 1.C
```python
def factorial(n):
	i = 1
	j = 1
	while(j < n):
		j = j + 1
		i = i * j
	return i
```

##### 1.C.I
Loop invariant: at the start of iteration $j$, it must be that $i = j!$

**Initialization:**
first iteration: $i = 1, j = 1$
$1 = 1!$
$1 = 1$ 
$\therefore$ the loop invariant is true at the start of the first iteration

**Maintenance:** 
Assume: $i_{j} = j!$

$i_{j+1} = (j+1)!$
$i_{j} * \cancel{ (j+1) } = j! * \cancel{ (j+1) }$
$\therefore i = (j+1)!$

**Termination:**
The loop terminates when $j = n$. Due to the loop invariant at this point $i = n!$ which is the value being returned by the algorithm. $\therefore$ the algorithm correctly outputs the factorial of an input $n$.

##### 1.C.II
Worst-case running time:
$T(n) = 2 + 5n$
$T(n) = \cancel{ 2 + 5 }n$
$T(n) = O(n)$
$\therefore$ the worst-case running-time of this algorithm is $O(n)$

### Question 2

#### 2.A
$3n^2 + n + 10 = \Theta(n^2)$ - **TRUE**
Pick: $c_{1} = 2, c_{2} = 15, n_{0} = 1$
$2(1)^2 \le 3(1)^2 + (1) + 10 \le 15(1)^2$
$2 \le 14 \le 15$
$\therefore 3n^2 + n + 10 = \Theta(n^2)$
#### 2.B
$\sqrt{ n } = \Omega(n^2)$ - **FALSE**
By contradiction.
Assume that $c, n_{0}$ exist:
$\sqrt{ n } \geq cn^2$
$n \geq cn^4$
$\frac{1}{n^3} = c$
$\\lim_{ n \to \infty } \frac{1}{n^3} = 0 \therefore \cancel{ \exists } c > 0 \text{ such that } \sqrt{ n } \geq cn^2$ which is a **contradiction**

#### 2.C
$\frac{\lg n}{10} = \Omega(1)$ - **TRUE**
Pick: $c = 1,n_{0} = 2^{10}$
$\frac{10}{10} \geq 1$
$1 \geq 1$
$\therefore \frac{\lg n}{10} = \Omega(1)$

#### 2.D
$\lg n^8 = O(\lg n)$ - **TRUE**
Pick: $c = 9,n_{0} = 10$
$8\lg n \leq c\lg n$
$8 \leq 9$
$\therefore \lg n^8 = O(\lg n)$

#### 2.E
$3^n = O(2^n)$ - **FALSE**
By contradiction.
Assume that $c, n_{0}$ exist:
$\frac{3^n}{2^n}\leq c\frac{\cancel{ 2^n }}{\cancel{ 2^n }}$
$\lim_{ n \to \infty} \frac{3}{2}^n = \infty \therefore \cancel{ \exists } c > 0 \text{ such that } 3^n \leq c2^n$ which is a **contradiction** 

#### 2.F
$100n^3 = o(n^3\lg n)$ - **TRUE**
$100\cancel{ n^3 } < c \cancel{ n^3 }\lg n$
$100 < c \lg n$
$2^{100/c} < n$
Pick: $n_{0} = 2^{101/c}$
$100 < c \lg{2^{101/c}}$
$100 < 101$
$\therefore 100n^3 = o(n^3\lg n)$
#### 2.G
$5n^{10} = \omega(n^{10})$ - **TRUE**
$5\cancel{ n^{10} } > c\cancel{ n^{10} }$
$5>c$
Pick: $n_{0} = 1$
$5(1) > c(1)$
$\therefore 5n^{10} = \omega(n^{10})$

#### 2.I
$\log^2(n) = O(\log(n^2))$ - **TRUE**
$\frac{\log^\cancel{ 2 }{n}}{\cancel{ \log(n) }} \leq \frac{2c\cancel{ \log(n) }}{\cancel{ \log(n) }}$
$\log(n) \leq 2c$
Pick: $c = 1, n = 10$
$1 \leq 2(1)$
$\therefore \log^2(n) = O(\log(n^2))$
#### 2.H
$3\log_{7}(n) = \Theta(\log_{2}(n))$
Pick: $c_{1} = 1, c_{2} = 2. n_{0} = 7$
$c_{1}\lg(n) \leq 3 \log_{7}(n)  \leq c_{2}\lg(n)$
$(1)\lg(7) \leq 3\cancel{ \log_{7}(7) }(1) \leq (2)\lg(7)$ 
$\lg(7) \approx 2.81$
$lg(7) \leq 3 \leq 2\lg(7)$
$\therefore 3\log_{7}(n) = \Theta(\log_{2}(n))$
#### 2.J
$\frac{1}{n^2} = O(1)$
Pick: $c = 1, n_{0} = 1$
$\frac{1}{1^2} \leq 1$
$1\leq 1$
$\therefore \frac{1}{n^2} = O(1)$


### Question 3

#### 3.A
$f_{1}(n)=O(g_{1}(n))$, $f_{2}(n)=O(g_{2}(n))$
$f_{1}(n) \le c_{1}g_{1}(n)$, $f_{2}(n) \le c_{2}g_{2}(n)$
Pick $c = c_{1}+c_{2}, n_{0} = max(n_{01}, n_{02})$
$f_{1}(n) + f_{2}(n) \leq c_{1}g_{1}(n) + c_{2}g_{2}(n)$ 
$f_{1}(n) + f_{2}(n) \leq (c_{1}+c_{2})(g_{1}(n) + g_{2}(n))$
$f_{1}(n) + f_{2}(n) \leq c(g_{1}(n) + g_{2}(n))$
$\therefore \text{ by definition }f_{1}(n) + f_{2}(n) = O(g_{1}(n) + g_{2}(n))$

#### 3.B
Prove that if$f(n) = O(n) + O(n^2) + O(n^3)$ then $f (n) = O(n3)$.
$f(n) = O(n) + O(n^2) + O(n^3)$
$f(n) \leq c_{1}n + c_{2}n^2 + c_{3}n^3$
$f(n) \leq c_{1}+c_{2}+c_{3}(n+n^2+n^3)$
Pick: $c = c_{1}+c_{2}+c_{3}, n_{0} = max(n_{01},n_{02},n_{03})$
$f(n) \leq cn^3$
$\therefore f(n) = O(n^3) \text{ if }f(n) = O(n) + O(n^2) + O(n^3)$
### Question 4
$T(n)=T(n - 1) + 10$
#### 4.A
Assume that the base case is $T (1) = Θ(1)$. Show that the solution to this recurrence is $O(n)$ using:
##### 4.A.I
**Substitution method:**
guess: $T(n) = O(n)$

##### 4.A.II
**Recursion tree method**

#### 4.B


#### 4.C
