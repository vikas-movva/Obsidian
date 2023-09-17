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
	- The same [[Lesson 1#Code Example|6 lines of code]] wont work for every problem.
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

#### Tabular Data
- Advantages with using deep learning
	- greatly increases the variety of columns that can be included 
		- natural language columns
		- high cardinality categorical columns #look-up 
- Limitations
	- deep learning models take longer to train than the traditional methods
	- more info in [[Lesson 9]]

#### Recommendation Systems
- 

