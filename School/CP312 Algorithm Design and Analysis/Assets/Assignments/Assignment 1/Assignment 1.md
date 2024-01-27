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
Pick: $c = 1,n_{0} = 100$
$\frac{\lg100}{\lg100} \geq 1$
$1 \geq 1$
$\therefore \frac{\lg n}{10} = \Omega(1)$

#### 2.D
$\lg n^8 = O(\lg n)$ - **TRUE**
Pick: $c = 9,n_{0} = 10$
$8\lg n \leq c\lg n$
$8 \leq 9$
$\therefore \lg n^8 = O(\lg n)$

#### 2.E
$3^n = O(2^n)$
By contradiction.
Assume that $c, n_{0}$ exist:


#### 2.F

#### 2.G

#### 2.H

#### 2.I

#### 2.J
