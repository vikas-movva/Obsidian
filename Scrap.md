```python
def recursuve_function(n):
	if n == 0:
		return 0
	else:
		return n + recursuve_function(n-1)
for i in range(1, 26):
	print(f"{i}: {recursuve_function(i)}")
```

