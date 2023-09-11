---
tags:
  - "#ML"
  - "#Fast.ai"
  - "#Code"
---

```timestamp-url 
 https://www.youtube.com/watch?v=8SF_h3xF3cE
 ```

```timestamp 
 22:39
 ```
### Why is it possible to create a bird classifier on a generic laptop now vs it being impossible before?
- in 2012 the approach used at the time was to create a big team of various experts to manually create features and then feed those features into a ML model
	- this approach requires immense manpower and funding in order to create a single model
- In the present neural networks learns these features automatically.
- Deep learning is ==deep== because you can take features and combine them into more advanced features
- The learning outcome is to discover how neural networks learn these features

```timestamp 
 28:46
 ```
### ML Myths

| Myths               | Truth                                                          |
| ------------------- |-------------------------------------------------------------- |
| Advanced Math       | Highschool math is sufficient                                  |
| Lots of data        | Some record breaking results are found with < 50 items of data |
| Expensive computers | cloud providers decrease this barrier                          |
>for the majority of deep learning this is true 

```timestamp 
 43:49
 ```
### Data blocks, Dataloaders, & Learners
- datablocks represent your data
- over many projects what are all the params that change from project to project
	- `blocks`: Input & Output
	- `get_items`: Items
	- `splinter`: Validation set
	- `get_y`: label
	- `item_tfms`: Item transforms
- dataloaders feed batches to a NN batch by batch
- A learner links a model with the data
	- `.fine_tune`: fine tunes an existing model on your data
>fast.ai docs can be found [here](https://docs.fast.ai/)



