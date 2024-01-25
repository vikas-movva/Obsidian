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
Worst-case running-time


