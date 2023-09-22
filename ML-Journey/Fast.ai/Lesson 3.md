---
tags:
  - Code
  - Fast-ai
  - ML
Web page: https://course.fast.ai/Lessons/lesson3.html
Video: https://www.youtube.com/watch?v=hBBOjCiFcuo
---
## Video Notes
```timestamp-url 
 https://www.youtube.com/watch?v=hBBOjCiFcuo
 ```

```timestamp 
 12:34
 ```
### Make a better pet detector
The pet detector used in [[Lesson 2]] finetunes the ==Resnet18== model to classify images. You can increase the performance by finetuning a different model such as a ==convnext== model.

```timestamp 
 20:40
 ```
### What is in the model
The `export.pkl` file you get through the `export` function gives saves a `Learner` object to your disk.

The `Learner` object has two main things inside of it.
1. The list of pre-proccessing steps done in order to turn your images into the model
	- `Dataloaders`, `Datablocks`
2. The parameters
	- The model weights 

### How do we fit a function to data
Machine learning models are things that ==fit functions to data==. You start with an infinitely flexible function and using data you mold the function to fit the data you are providing.

Find the loss of the model (how wrong the models is) and then tweak the parameters so that the loss becomes lower. This can be accomplished with ==gradient descent==.

#### Ex. Automating the search of parameters for a better loss
>This example will be using a quadratic function as the function
```python
#quardratic funciton
def quad(a, b, c, x): return a*x**2 + b*x + c
def mk_quad(a,b,c): return partial(quad, a,b,c)

# loss
def mae(preds, acts): return (torch.abs(preds-acts)).mean()
def quad_mae(params):
    f = mk_quad(*params)
    return mae(f(x), y)
#params
abc = torch.tensor([1.1,1.1,1.1])
#tell pytorch that you want it to track the gradient
abc.requires_grad_()
#get the loss
loss = quad_mae(abc)
#compute gradient
loss.backwards()
#update weights
with torch.no_grad(): # you dont want pytorch to track the gradients for this part
    abc -= abc.grad*0.01
    loss = quad_mae(abc)
```

```python
for i in range(10):
    loss = quad_mae(abc)
    loss.backward()
    with torch.no_grad(): abc -= abc.grad*0.01
    print(f'step={i}; loss={loss:.2f}')
```

>[!important] 
At the most basic level deep learning is just a bunch of activation functions stringed together plus gradient descent to optimize the parameters.

## Textbook notes 
### Bias
According to a paper from [MIT](https://arxiv.org/abs/1901.10002) there are six types of biases in machine learning.

- Historical bias
	- comes from the fact that people are biased, processes are biased, and society is biased 
	- it is a fundamental, structural issue with the first step of the data generation process
	- 
- Representation bias
- Measurement bias
- Aggregation bias
- Evaluation bias
- Deployment bias




