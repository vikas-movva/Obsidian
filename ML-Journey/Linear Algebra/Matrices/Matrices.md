### How matrices transform space

Since any vector can be made from the [[Basis|Basis]] [[Vectors|Vectors]] the resulting vector is just a sum of the transformed [[Basis|Basis]] [[Vectors|Vectors]]. 

This means that the "Grid lines" of the graph can be stretched or sheared but can not curved. They stay parallel and evenly spaced

The reason for this property is because of the rules of matrix/[[Vectors|Vector]] [[Opperations with Vectors#Addition|addition]] and [[Opperations with Vectors#Dot Product|multiplication]]


### Types of matrix transformations
#### No Change - Identity matrix
- Causes no transformation to the matrix
	- Equivalent to multiplying by 1 
	- Example: $\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}$

#### Stretch
- Causes the axis to scale by a factor of a number (e.g 2, -1 ,$\frac{1}{2}$)
- Example: $\begin{bmatrix}x&0&0\\0&x&0\\0&0&x\end{bmatrix}$
- Where the values of x scale the axis

#### Invert
- Causes the axis to invert (eg. $x$ becomes $y$ and $y$ becomes $x$)
- Example: $\begin{bmatrix}0&0&x\\0&x&0\\x&0&0\end{bmatrix}$
	- Where values of x bigger than 1 stretch the axis
#### Shear
- Causes a transformation in which all points along a given line remain fixed while other points are shifted parallel to by a distance proportional to their perpendicular distance from.
- Example: $\begin{bmatrix}x&x&1\\x&1&x\\1&x&x\end{bmatrix}$

#### Rotation
- Causes a transformation where you rotate the axis
- Example: $\begin{bmatrix}\cos{\theta}&-\sin{\theta}\\\sin{\theta}&\cos{\theta}\end{bmatrix}$
	- Where $\theta$ is the angle of rotation counter-clockwise


#### Einstein summation convention
- For any entry in the product of 2 matrices that entry can be found by the following equation $ab_{ik} = a_{ij}b_{jk}$

#### Orthogonal matrices
- A matrix where its [[Matrix Operations#Inversing a Matrix|Inverse matrix]] is its [[Matrix Operations#Transpose|transpose matrix]]
	- $a_{i}\cdot a_{j} = 0 : i\neq j$
	- $a_{i}\cdot a_{j} = 1 : i= j$
