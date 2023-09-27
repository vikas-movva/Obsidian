---
tags:
  - Code
  - Fast-ai
  - ML
Web page: https://course.fast.ai/Lessons/lesson4.html
Video: https://www.youtube.com/watch?v=toUgBQv1BT8
---
## Video Notes
```timestamp-url 
 https://www.youtube.com/watch?v=toUgBQv1BT8
 ```

```timestamp 
 05:18
 ```
### Finetuning models
Finetuning means taking weights of a trained neural network and use it as initialization for a new model being trained on data from the same domain (often e.g. images). It is used to: speed up the training. overcome small dataset size.

Ex.
```mermaid
flowchart LR
a(wikitext - Language model)
b(IMDb - Language model)
c(IMDb - Classifier)
a-- Finetune -->b-- Finetune -->c
```
```timestamp 
 29:26
 ```
### Tokenization and Numericalization
If a deep learning model uses matrix multiplication with numbers how can you input words into it?
This is solved by tokenization and numericalization.

**Tokenization** is the act of breaking down a sentence into discrete tokens. Sometimes a token represents an entire word and sometimes it breaks down words into parts. A tokenizer may also encode information such as the beginning / end of a word / sentence.

**Numericalization** is the act of turning the tokens created from the tokenization step and giving them a numerical value so that matrix multiplication is possible

```timestamp 
 45:55
 ```
### Over and Underfitting
**Overfitting** is when the model is too optimized on the data and is thus unable to generalize well outside of the training dataset

**Underfitting** is when the model is not optimized enough on the data and is thus unable to capture the relationship between the input and output variables accurately leading to high error rates

```timestamp 
 52:31
 ```
### Creating a good validation set
Split your train / test sets depending on what kind of data you are using
- Ex. for time series data truncate the last x% of the data into the training set in order to simulate real use cases

```timestamp 
 01:04:10
 ```
### Pearson correlation coefficient
Is a descriptive statistic that describes the strength and direction of the linear relationship between two quantitative variables. 
It is usually represented by the letter $r$
$$\rho _{X,Y}={\frac {\operatorname {cov} (X,Y)}{\sigma _{X}\sigma _{Y}}}$$

## Textbook notes 
