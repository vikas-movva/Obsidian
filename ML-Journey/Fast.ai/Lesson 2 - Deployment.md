---
tags:
  - ML
  - Fast-ai
  - Code
Web page: https://course.fast.ai/Lessons/lesson2.html
Video: https://www.youtube.com/watch?v=F4tvM4Vb3A0
---
## Video Notes

```timestamp-url 
 https://www.youtube.com/watch?v=F4tvM4Vb3A0
 ```

```timestamp 
 06:45
 ```
### Data cleaning
- It might seem counter intuitive but in order to clean the data you first train a model
- Then call the `ImageClassifierCleaner` function with the trained model as a parameter
```python
# call cleaner function
cleaner = ImageClassifierCleaner(learn)

# after selecting all invalid examples call to clean
for idx in cleaner.delete(): cleaner.fns[idx].unlink()
for idx, cat in cleaner.change(): shutil.move(str(cleaner.fns[idx]), path/cat)
```

```timestamp 
 27:12
 ```
### How to put your model into production
- Create a new space on [huggingface](huggingface.co/new-space)
- Clone huggingface repo onto your machine
- Create Gradio script 
- Push updates to huggingface
>after setting up gradio / hf spaces you can use that space as an api

## Textbook Notes

### The Practice of Deep Learning
- Deep learning can solve a lot of challenges with little code however that doesn't mean that deep learning is magic.
	- The same [[Lesson 1 - Getting started#Code Example|6 lines of code]] wont work for every problem.
	- But at the same time it is important to realistically gauge the constraints and capabilities correctly so that you dont under or over estimate deep learning

### Starting Your Project
- When selecting a project to start the most important thing is data availability
- When trying to find data the the goal is not to find the ==perfect== dataset but one that is good enough to get started
- It is also recommend to iterate end to end while completing each step in a reasonable amount of time 
	- By using this approach you will get a better understanding of how much data is really needed for the project

### The State of Deep Learning
Is deep learning even right for the problem you want to solve?
The following is a list of use cases that deep learning is effective in:
#### Computer Vision
- Object recognition
	- Recognize what objects are in an Image
	- This task can be preformed at or beyond the human level by computers
- Object detection
	- Recognize the ==location== and name of an object in an Image
- Segmentation
	- Categorize each pixel of an image based on what kind of object it is part of
- Limitations
	- Deep learning algorithms are not very good at images that are significantly different in structure to the training data
		- black and white images
		- hand drawn sketches
		- etc.
	- Image labelling can be slow and expensive 
		- A work around is to synthetically generate variations of input images. This is called ==Data Augmentation==
			- Rotate
			- Change brightness or contrast

#### Natural Language Processing (text / NLP)
- Classifier 
	- Classify both short and long documents based on categories
		- Spam
		- Author 
		- Source website
		- etc.
		- Sentiment
- Generation
	- Generating content-appropriate text
		- Social media replies
		- writing style imitation
		- Compelling content to humans
		- Translations
		- Summarizations
- Limitations
	- Deep learning might be good at generating content that is appealing to humans but it is not very good at generating ==correct information==

#### Combining Text and Images
- Image Captioning
	- Caption a given image based on the contents of the image or other factors
		- Medical imaging
		- Security screening (post, airport)
- Limitations
	- Same as with NLP the output is not guaranteed to be correct thus human screening is still needed at this time

#### Tabular Data / Recommendation Systems
- Advantages with using deep learning
	- greatly increases the variety of columns that can be included 
		- natural language columns
		- high cardinality categorical columns #look-up 
- Limitations
	- deep learning models take longer to train than the traditional methods
	- more info in [[Lesson 9]]

### The Drivetrain Approach
There are many accurate models that are not useful at all, and there are many inaccurate models that are highly useful to people. How can we ensure that a model is useful?

The Drivetrain Approach is a method to think about this issue.
1. Defined Objective
	- What is the outcome to be achieved
2. Levers
	- What inputs are controllable
3. Data
	- What data is collectable
4. Models
	- How do the levers influence the objective

### Gathering Data
For most projects the data that you need is usually found online. Ex. for a bear classifier all of the image data can gathered by any of the modern search engines (Duck Duck Go, Bing, Google)

> all code snippets are using the fast.ai python library

In order to download images from DuckDuckGo
```python
#get urls for images
ims = search_images_ddg("grizzly bear")
```

```python
#download images
bear_types = 'grizzly', 'black', 'teddy'
path = Path('bears')

if not path.exists():
	path.mkdir()
	for o in bear_types:
		dest = (path/o)
		dest.mkdir(exits_ok=True)
		results = search_images_ddg(f'{o} bear')
		download_images(dest, urls=results)

```

Now you verify that the images that are downloaded are valid
```python HI
path = Path('bears')

for o in bear_types:
	dest = (path/o)
	fns = get_image_files(dest)
	#get all invalid images
	failed = verify_images(fns)
	#delete all invalid images
	failed.map(Path.unlink)
```

#### Data to Dataloaders
`Dataloaders` is a class that stores whatever `Dataloader` objects that are passed to it, as well as making them available as `train` and `valid`. Although simple it is a key part of the fast.ai library as it provides the data for the model.

```python
bears = DataBlock(
	blocks=(ImageBlock, CategoryBlock), 
	get_items=get_image_files, 
	splitter=RandomSplitter(valid_pct=0.2, seed=42), 
	get_y=parent_label, 
	item_tfms=Resize(128)
)
```
1. `blocks` - the independent (`ImageBlock`) and dependent (`CategoryBlock` aka the label) variables
2. `get_items` - a function that retrieves the data (`get_image_files`)
3. `splitter` - how (`RandomSplitter`) and what percentage (`valid_pct`) of the dataset to split for a validation set as well as the `seed` for RNG if `RandomSplitter` is being used
4. `get_y` - a function to generate labels (`parent_label`)
5. `item_tfms` - transformations that are applied to the data

After creating the `Datablock` you need to tell fastai the path to the images
```python
dls = bears.dataloaders(path)
```

#### Training a model using cleaned Data
because there is not a lot of data we can use Data Augmentation to increase the accuracy of the model
```python
bears = bears.new(
	  item_tfms=RandomResizedCrop(224, min_scale=0.5),
	  batch_tfms=aug_transforms()
)
dls = bears.dataloaders.path()
```

The next step is to create a ``Learner`` and fine-tune the model
```python
learn = vision_learner(dls, resnet18. metrics=error_rate)
learn.fine_tune(4)
```
Ex output:

| epoch | train_loss | valid_loss | error_rate | time  |
| ----- | ---------- | ---------- | ---------- | ----- |
| 0     | 1.235733   | 0.212541   | 0.087302   | 00:05 |

|epoch|train_loss|valid_loss|error_rate|time|
|---|---|---|---|---|
|0|0.213371|0.112450|0.023810|00:05|
|1|0.173855|0.072306|0.023810|00:06|
|2|0.147096|0.039068|0.015873|00:06|
|3|0.123984|0.026801|0.015873|00:06|

Now that we have a fine-tuned model we can see what mistakes that it made:
```python
interp = ClassificationInterpretation.from_learner(learn)
interp.plot_confusion_matrix()
```
![[Pasted image 20230918111054.png]]
From this confusion matrix we can see that the model made 2 wrong predictions where it misclassified grizzly and black bear once each and teddy bears 0 times.

We can see which images the model had the highest loss for (loss in this case represents low probability correct label or high probability incorrect answer)
```python
interp.plot_top_losses(5, nrows=1)
```
![[Pasted image 20230918111543.png]]

Now we can use a GUI tool in fastai called a cleaner to clean the data
```python
cleaner = Image_Classifier_Cleaner(learn)
cleaner
```
![[Pasted image 20230918111850.png]]

After using the tool to either keep, delete, or change labels you can use the following to apply your choices and train the model again on the cleaned dataset.
```python
#delete images
for idx in cleaner.delete():
	cleaner.fns[idx].unlink()
	
#move images
for idx, cat in cleaner.change():
	shutil.move(str(cleaner.fns[idx]), path/cat)
```

### Turn your Model into a Web App
####


### Questionnaire
1. Provide an example of where the bear classification model might work poorly in production, due to structural or style differences in the training data.
2. Where do text models currently have a major deficiency?
3. What are possible negative societal implications of text generation models?
4. In situations where a model might make mistakes, and those mistakes could be harmful, what is a good alternative to automating a process?
5. What kind of tabular data is deep learning particularly good at?
6. What's a key downside of directly using a deep learning model for recommendation systems?
7. What are the steps of the Drivetrain Approach?
8. How do the steps of the Drivetrain Approach map to a recommendation system?
9. Create an image recognition model using data you curate, and deploy it on the web.
10. What is `DataLoaders`?
11. What four things do we need to tell fastai to create `DataLoaders`?
12. What does the `splitter` parameter to `DataBlock` do?
13. How do we ensure a random split always gives the same validation set?
14. What letters are often used to signify the independent and dependent variables?
15. What's the difference between the crop, pad, and squish resize approaches? When might you choose one over the others?
16. What is data augmentation? Why is it needed?
17. What is the difference between `item_tfms` and `batch_tfms`?
18. What is a confusion matrix?
19. What does `export` save?
20. What is it called when we use a model for getting predictions, instead of training?
21. What are IPython widgets?
22. When might you want to use CPU for deployment? When might GPU be better?
23. What are the downsides of deploying your app to a server, instead of to a client (or edge) device such as a phone or PC?
24. What are three examples of problems that could occur when rolling out a bear warning system in practice?
25. What is "out-of-domain data"?
26. What is "domain shift"?
27. What are the three steps in the deployment process?