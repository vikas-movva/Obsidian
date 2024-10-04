---
tags:
  - Code
  - Fast-ai
  - ML
Web page: https://course.fast.ai/Lessons/lesson5.html
Video: https://www.youtube.com/watch?v=_rXzeWq4C6w
---
## Video Notes
```timestamp-url 
 https://www.youtube.com/watch?v=_rXzeWq4C6w
 ```
### Creating a tabular model from scratch

#### Dataset and objective
The dataset used for this model is the [titanic passengers dataset](<file:///B:\Obsidian\ML-Journey\Fast.ai\Resources\titanic_train.csv>).
The objective is to create a classifier to classify if a given passenger has survived or not.

```timestamp 
 01:59
 ```
#### Linear model and NN from scratch
Import pytorch, numpy and pandas
```python
import torch, numpy as np, pandas as pd,
from pathlib import Path
path = Path('../Resources')
```

```timestamp 
 07:30
 ```
##### Clean the data
```python
df = pd.read_csv(path/'titanic_train.csv')
df
```
![[Pasted image 20230925172359.png]]

Which fields have a value of NaN?
```python
df.isna().sum()
```
![[Pasted image 20230925172559.png]]

We can deal with NaNs by replacing them with whatever the mode is for that field.
```python
modes = df.mode().iloc[0]
modes
```
![[Pasted image 20230925172815.png]]

```python
df.fillna(modes, inplace=True)

#updated df
df.isna().sum()
```
![[Pasted image 20230925173040.png]]

How does the data look? The `describe()` method gives a quick look
```python
df.describe(include=(np.number))
```
![[Pasted image 20230925173357.png]]
From this we can see that the `Survived` column is either 1s or 0s, the `Fare` column has a wide range of values. Lets look a little deeper into the `Fare` column

```python
df['Fare'].hist()
```
![[Pasted image 20230925173620.png]]

From this histogram we can see that most of the fares are below $50 but there are some outliers. This kind of distribution is called a longtail distribution and doesn't really work well with linear models and some neural nets as well.

A simple solution to solve this problem would be to take the log of the values
```python
df['LogFare'] = np.log(df['Fare'] + 1)
df['LogFare'].hist()
```
![[Pasted image 20230925174335.png]]

How can you deal with non number values?
First we have to find out which columns have non number values and in those columns how many unique values are there?

```python
df.describe(include=[object])
```
![[Pasted image 20230925174710.png]]
It seems like the columns `Name`, `Sex`, `Ticket`, `Cabin`, and `Embarked` have non number values.

For columns like `Sex`, `Pclass`, and `Embarked` we can insert dummy variables.
```python
df = pd.get_dummies(df, columns=["Sex", "Pclass", "Embarked"])

```

The final thing that needs to be done is to create a `Tensor` for both the independent and dependent variables
```python
from torch import tensor
t_dep = tensor(df.Survived)

indep_cols = ['Age', 'SibSp', 'Parch', 'LogFare', 'Sex_male', 'Sex_female', 'Pclass_1', 'Pclass_2', 'Pclass_3', 'Embarked_C', 'Embarked_Q', 'Embarked_S']

t_indep = tensor(df[indep_cols].values, dtype=torch.float)
t_indep.shape()
```
`torch.Size([891, 12])`

From the shape we can see that `t_indep` has 891 rows and 12 columns



##### Setting up a linear model
Now that the data is cleaned the next step is to create a linear model.
```python
torch.manual_seed(442) #just for this example for reproducibility

n_coeff = t_indep.shape[1]
coeffs = torch.rand(n_coeff) -0.5
coeffs
```
```
tensor([-0.4629,  0.1386,  0.2409, -0.2262, -0.2632, -0.3147,  0.4876,  0.3136,  0.2799, -0.4392,  0.2103,  0.3625])`
```

```python
t_indep*coeffs
```
```python
tensor([[-10.1838,   0.1386,   0.0000,  -0.4772,  -0.2632,  -0.0000,   0.0000,   0.0000,   0.2799,  -0.0000,   0.0000,   0.3625],
        [-17.5902,   0.1386,   0.0000,  -0.9681,  -0.0000,  -0.3147,   0.4876,   0.0000,   0.0000,  -0.4392,   0.0000,   0.0000],
        [-12.0354,   0.0000,   0.0000,  -0.4950,  -0.0000,  -0.3147,   0.0000,   0.0000,   0.2799,  -0.0000,   0.0000,   0.3625],
        ...,
        [-11.1096,   0.1386,   0.4818,  -0.7229,  -0.0000,  -0.3147,   0.0000,   0.0000,   0.2799,  -0.0000,   0.0000,   0.3625],
        [-12.0354,   0.0000,   0.0000,  -0.7766,  -0.2632,  -0.0000,   0.4876,   0.0000,   0.0000,  -0.4392,   0.0000,   0.0000],
        [-14.8128,   0.0000,   0.0000,  -0.4905,  -0.2632,  -0.0000,   0.0000,   0.0000,   0.2799,  -0.0000,   0.2103,   0.0000]])
```

From the above output we can see that the first value in every row has a much higher value than the rest of the values. If you look back at the data you can see that this column is the age column. While this may not be a big problem it is not ideal and can be fixed by simply dividing all the values in the column with whatever the max value is. 
```python
vals, indices = t_indep.max(dim=0) # dim=0 is specifying which column to get the max of 
t_indep = t_indep / vals
```

Now lets take another look
```python
t_indep*coeffs
```
```python
tensor([[-0.1273,  0.0173,  0.0000, -0.0765, -0.2632, -0.0000,  0.0000,  0.0000,  0.2799, -0.0000,  0.0000,  0.3625],
        [-0.2199,  0.0173,  0.0000, -0.1551, -0.0000, -0.3147,  0.4876,  0.0000,  0.0000, -0.4392,  0.0000,  0.0000],
        [-0.1504,  0.0000,  0.0000, -0.0793, -0.0000, -0.3147,  0.0000,  0.0000,  0.2799, -0.0000,  0.0000,  0.3625],
        ...,
        [-0.1389,  0.0173,  0.0803, -0.1158, -0.0000, -0.3147,  0.0000,  0.0000,  0.2799, -0.0000,  0.0000,  0.3625],
        [-0.1504,  0.0000,  0.0000, -0.1244, -0.2632, -0.0000,  0.4876,  0.0000,  0.0000, -0.4392,  0.0000,  0.0000],
        [-0.1852,  0.0000,  0.0000, -0.0786, -0.2632, -0.0000,  0.0000,  0.0000,  0.2799, -0.0000,  0.2103,  0.0000]])
```
The values are now pretty similar

Next we get the predictions:
```python
preds = (t_indep*coeffs).sum(axis=1)
preds[:10]
```
```python
tensor([ 0.1927, -0.6239,  0.0979,  0.2056,  0.0968,  0.0066,  0.1306,  0.3476,  0.1613, -0.6285])
```

and the loss:
```python
loss = torch.abs(preds-t_dep).mean()
loss
```
```python
tensor(0.5382)
```

```timestamp 
 38:48
 ```
Now that all the steps have been tested lets refactor and turn them into functions.
```python
def calc_preds(coeffs, indeps): 
	return (indeps*coeffs).sum(axis=1)

def calc_loss(coeffs, indeps, deps): 
	return torch.abs(calc_preds(coeffs, indeps)-deps).mean()
```

##### Doing a gradient descent step
```timestamp 
 39:39
 ```
The following is an example of one epoch of gradient descent manually

Track the gradient. 
```python
coeffs.requires_grad_()
```

Calculate the `loss`
```python
loss = calc_loss(coeffs, t_indep, t_dep)
loss
```
```python
tensor(0.5382, grad_fn=<MeanBackward0>)
```

Tell pytorch to calculate the gradients and take a look at the grad
```python
loss.backward()
coeffs.grad
```
```python
tensor([-0.0212,  0.0258, -0.0082, -0.0969,  0.4198, -0.4265, -0.2424, -0.0494,  0.2851, -0.3771, -0.0382,  0.4085])
```

>[!tip]
>a function that ends with `_` is an in place operation.
>Ex. `torch.grad.zero_()`

One gradient descent step
```python
with torch.no_grad():
	coeffs.sub_(coeffs.grad * 0.1) # random learning rate for the example
	coeffs.grad.zero_()
	print(calc_loss(coeffs, t_indep, t_dep))
```
```python
tensor(0.4945)
``` 

##### Training the linear model

Split validation set from training set
```python
from fastai.data.transforms import RandomSplitter

trn_split,val_split=RandomSplitter(seed=42)(df)
trn_indep,val_indep = t_indep[trn_split],t_indep[val_split]
trn_dep,val_dep = t_dep[trn_split],t_dep[val_split]
len(trn_indep),len(val_indep)
```
```python
(713, 178)
```

Create some functions for automating the process.
```python
def update_coeffs(coeffs, lr):
    coeffs.sub_(coeffs.grad * lr)
    coeffs.grad.zero_()

def one_epoch(coeffs, lr):
    loss = calc_loss(coeffs, trn_indep, trn_dep)
    loss.backward()
    with torch.no_grad(): update_coeffs(coeffs, lr)
    print(f"{loss:.3f}", end="; ")

def init_coeffs(): 
	return (torch.rand(n_coeff)-0.5).requires_grad_()
```

Using the above functions you can now create a function to train the model
```python
def train_model(epochs=30, lr=0.01):
    torch.manual_seed(442)
    coeffs = init_coeffs()
    for i in range(epochs): one_epoch(coeffs, lr=lr)
    return coeffs
```

Test the function
```python
coeffs = train_model(18, lr=0.2)
```
```python
0.536; 0.502; 0.477; 0.454; 0.431; 0.409; 0.388; 0.367; 0.349; 0.336; 0.330; 0.326; 0.329; 0.304; 0.314; 0.296; 0.300; 0.289;
```

Take a look at the coefficients
```python
def show_coeffs(): return dict(zip(indep_cols, coeffs.requires_grad_(False)))
show_coeffs()
```
```python
{'Age': tensor(-0.2694),
 'SibSp': tensor(0.0901),
 'Parch': tensor(0.2359),
 'LogFare': tensor(0.0280),
 'Sex_male': tensor(-0.3990),
 'Sex_female': tensor(0.2345),
 'Pclass_1': tensor(0.7232),
 'Pclass_2': tensor(0.4112),
 'Pclass_3': tensor(0.3601),
 'Embarked_C': tensor(0.0955),
 'Embarked_Q': tensor(0.2395),
 'Embarked_S': tensor(0.2122)}
```

##### Measuring accuracy






## Textbook notes 
