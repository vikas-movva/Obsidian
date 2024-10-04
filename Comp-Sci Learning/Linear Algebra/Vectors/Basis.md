### Basis
A basis is a set of vectors that generates all elements of the vector space and the vectors in the set are linearly independent.

This also means that [[Vectors]] exist independent of its basis as it could fall into another set of vectors that make up a different basis

#### Changing basis
Suppose you have $\hat{e}_{1} = \begin{vmatrix}1\\0\end{vmatrix}, \hat{e}_{2} =\begin{vmatrix}0\\1\end{vmatrix}$ to represent vector $\vec{r} = \begin{vmatrix}3\\4\end{vmatrix}$ then $\vec{r} = 3\hat{e}_1+4\hat{e}_2$
now let us define a new basis $b$: $\begin{align*}\hat{b}_{1} =\begin{vmatrix}2\\1\end{vmatrix}, \hat{b}_{2} =\begin{vmatrix}-2\\4\end{vmatrix}\end{align*}$
If $\hat{b}_{1}$ and $\hat{b}_{2}$ are 90$\degree$ from each other you can then represent $\vec{r}$ in terms of basis $b$ by:
$$
\begin{align*}
\vec{r} = proj_{\hat{b}_{1}}\vec{r}\cdot\hat{b}_{1} + proj_{\hat{b}_{2}}\vec{r}\cdot\hat{b}_{2}\\\\
\vec{r} = 2\hat{b}_{1} + \frac{1}{2}\hat{b}_{2} 
\end{align*}
$$
or in terms of basis $b$ $\vec{r} = \begin{vmatrix}2\\ \frac{1}{2}\end{vmatrix}$

You can also use linear systems.


 