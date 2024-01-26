### Question 1

#### 1.A
function CheckUnique(A, n):
	for i = 1; i < n:
		for j = i + 1; j< n:
			if $a_1$ == $a_j$ :
				return False
	return True
	
```python
i = 1                         #assign
while(i < n):                 #compare
	j = i + 1                 #add, assign
	while(j < n)              #compare
		if(a1 == a2):         #compare
			return False      
		j++                   #add, assign
	i++                       #add, assign
return True
```
##### 1.A.I
Primitive operations: Assign, Compare, add

Data structures: Arrays

##### 1.A.II
Worst-case running-time: 
$T(n) = (\sum_{i=1}^nn)$ 
	$= ((n - 1)*(\frac{n}{2}))$ 
	$= n^2$

#### 1.B
```python
def matrix_squared(A: list[list], n: int) -> bool:
	C = [n][n]
	for i in range(1, n):
		for j in range(1, n):
			for k in range(1, n):
				C[i, j] = C[i, j] + (A[i, k] * A[k, j])
	return True
```
##### 1.B.I
Primitive operations: Assign, Sum, Product, Access
Data structures: Arrays

##### 1.B.II
`C[i, j] = C[i, j] + (A[i, k] * A[k, j])`
Constant time operations and their counts: 

| Operation | Occurrence |
| ---- | ---- |
| Assign | 1 |
| Sum | 1 |
| Access | 3 |
| Product | 1 |
as these primitive operations are happening in the `k` loop the running time for the `k` loop would be $T(n_k) = 6n_k$ $\therefore T(n) = n*n*6n = 6n^3$ 

##### 1.B.III
From [[Assignment 1#1.B.II|1.B.II]] we got the running time: 
$T(n) = 6n^3$ 
Running time using $\Theta$-notation:
$\Theta(n^3)$

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
assume: $i = j!$
$i = (j+1)!$
$j! * (j+1) = ()$