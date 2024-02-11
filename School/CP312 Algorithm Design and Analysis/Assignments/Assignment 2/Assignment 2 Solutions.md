### Question 1

#### 1.A
```python
def ternary_search(A: sorted_array, q: int, p: int)
	if p <= q:
		m1 = p + (q-p)//3
		m2 = m1 + (q - p)//3
		if A[m1]==k:
			return m1
		if A[m2]==k:
			return m2
		if k < A[m1]:
			return ternary_search(A, p, m1 - 1, k)
		elif k > A[m2]:
			return ternary_search(A, m2 + 1, q, k)
		else:
			return ternary_search(A, m1 + 1, m2 -1, k)
```

$T(n) = T\left(\frac{2n}{3}\right) + c$
