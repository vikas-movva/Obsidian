### Matrix addition:
- The matrices that are being added must have the dimensions of $m\cdot n+m\cdot n$
- Suppose $\vec{a}$ $\&$ $\vec{b}$ are 3x1 and 1x3 matrices respectively
	- It is impossible to add the two matrices.

### Matrix multiplication
- The matrices that are being added must have the dimensions of $m\cdot n+n\cdot m$
- **Matrix multiplication is associative but not commutative!!**
	- Let $A = \begin{bmatrix}0&1\\1&-1\end{bmatrix}$ and $\begin{bmatrix}1&0\\-1&1\end{bmatrix}$ be two 2x2 square matrices
		- $AB \neq BA$ 
		- #### Step by Step
			- $\begin{bmatrix}0&1\\1&-1\end{bmatrix}\cdot\begin{bmatrix}1&0\\-1&1\end{bmatrix} = \begin{bmatrix}-1&2\\1&-1\end{bmatrix}$
			- $\begin{bmatrix}1&0\\-1&1\end{bmatrix}\cdot\begin{bmatrix}0&1\\1&-1\end{bmatrix} = \begin{bmatrix}0&1\\1&2\end{bmatrix}$
			- $\begin{bmatrix}-1&2\\1&-1\end{bmatrix} \neq \begin{bmatrix}0&1\\1&2\end{bmatrix}$
-  Suppose $\vec{a}$ $\&$ $\vec{b}$ are 3x1 and 1x3 matrices respectively
	- The result is a 1x1 matrix
		- $\begin{bmatrix} 1, 2, 1\end{bmatrix} \cdot\begin{bmatrix}  1\\ 2\\ 3\end{bmatrix} = \begin{bmatrix}14\end{bmatrix}$

### Gauss-Jordan elimination
- Is an algorithm to efficiently solve linear equations

### Inversing a Matrix
- The inverse of a matrix is a matrix such that when multiplied by the original the product is the identity matrix Ex. $I_2 = \begin{bmatrix}1&0\\0&1\end{bmatrix}$
- There are 2 ways to get the inverse of a matrix:
	- Append the respective identity matrix and preform [[#Gauss-Jordan elimination]]
	- Multiply the matrix by $\frac{1}{d}$ where $d$ is the determinant

### Determinant
- The area of the space that a matrix has scaled

### Transpose
- Where the rows of a matrix becomes its columns and its columns become its rows
	- The diagonal is unchanged

### Gram-Schmidt process
- 
