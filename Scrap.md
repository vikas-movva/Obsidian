# Project Outline
Purpose: To demonstrate your knowledge of the course topics.  
- Make sure you’re using things learned in the course. You might want to train an LLM from scratch and document it perfectly, but that wouldn’t demonstrate your knowledge of the course!  

A detailed rubric is below, but you should include the following components:  
- Data cleaning using pandas/numpy  
- Effective visualizations of your data and model results  
	- I’m expecting approx. 3 plots in EDA, 2-3 for model results.  
- Feature engineering  
	- I’m expecting at least 5 features in your data, with at least some being continuous, discrete, and categorical.  
- Correctly using cross-validation and test sets  
- Regularization techniques, with appropriate interpretations (especially regarding the bias-variance tradeoff)  
- Regression and classification (and potentially clustering)  

You may continue on your given project with your current group, or you may use different data or a different group!  

Submissions will be ipynb files uploaded to GradeScope. Be sure to include all group members when submitting! 

# Rubric  
As before, 0 means incomplete, 2 is somewhere between 1 and 3, and 4 means above and beyond in some way. This rubric also acts as a suggestion for you to organize your project. You may deviate as necessary.  
## Introduction  
- Problem in context  
	- 1: The introduction assumes the reader is already familiar with the problem  context.  
	- 3: The introduction provides the necessary context and makes the reader ex-cited to know how you solved the problem.  
- Clear Goals  
	-  1: A broad idea of the goals is given.  
	-  3: Goals are clearly laid out and can be solved with the available data.  
- Data Description  
	- 1: All data are shown to the reader instead of taking time to orient the reader.  
	- 3: Data are described concisely, with emphasis on the important features.  

## Exploratory Data Analysis  
- Use of course concepts  
	-  1: Only a few data cleaning concepts are used, e.g. just groupby and agg a bunch of times.  
	- 3: A variety of data cleaning concepts are used effectively, e.g., groupby/agg with custom functions, pivoting, regex, clustering-as-preprocessing, etc.  
- Correctness of cleaning  
	- 1: Major errors in cleaning code.  
	- 3: Code is correct.  
	- 4: Code is correct and concise.  
- Visualization Content  
	- 1: Important visualizations are missed, or irrelevant visualizations are included.  
	- 3: Visualizations are all relevant to the analysis and each reveal something unique.  
- Visualization Density  
	- 1: Visualizations are too sparse or too dense.  
	- 3: Visualizations contain enough information for the reader to make the same conclusion as you.  
- Feature Engineering 
	- 1: Features are all used as-is.  
	- 3: Appropriate features are constructed from the input data.  
## Modelling  
- Feature Selection  
	- 1: Models are chosen by stepwise regression techniques.  
	- 3: Features are chosen based on what’s important to the problem, with appropriate regularization.  
- Model Building  
	- 1: Basic linear regression is the only model attempted.  
	- 3: Several models are attempted, and the evaluation of models is based on the context of the problem.  
- Regression and Classification  
	- 1: Only linear regression is attempted.  
	- 3: Both regression and classification are used in appropriate contexts, both contributing to the project goals.  
- Clustering (Option 1; only one of the three options will be graded)  
	- 1: Clustering is used.  
	- 3: Clustering is used effectively and interpreted correctly.  
- Custom Models (Option 2)  
	- 1: A non-linear transformation of either 𝑦 or 𝑋 is used  
	- 3: A custom model, requiring a self-coded gradient descent algorithm, is used. (Similar to Sigmoid Regression on assignment 3, but Sigmoid Regression would not count towards this.)  
- Advanced Modelling: (Option 3)  
	- 1: Base implementations of advanced models (such as Random Forests or smoothing splines) are applied.  
	- 3: Advanced models are explained, used, and interpreted effectively.  
- Training/Test Set  
	- 1: Training and test sets are used, but there is significant data leakage (e.g., visualizations or transformations include the test set)  
	- 3: The training/test split is respected throughout the project.  
	- 4: The test set is used effectively to compare the final versions of each model.  
- Cross-Validation  
	- 1: Cross-validation is used to estimate prediction accuracy.  
	- 3: CV is used to estimate parameters and decide between models.  
- Results  
	- 1: Results are presented.  
	- 3: More than one evaluation metric is used, and models are compared effectively.  

## Conclusions  
- Relation to Goals  
	- 1: Conclusions only vaguely relate to the stated goals of the paper, or do not follow from your analysis.  
	- 3: Conclusions apply to the research goals and follow logically from the results of the analysis.  
- Exposition  
	- 1: The conclusions only relate to some of the work shown.  
	- 3: The conclusions neatly tie up all of the work shown in the notebook.  
## Miscellaneous  
- Code Cell Organization  
	- 1: Code is poorly organized.  
	- 3: Code is neatly organized into cells based on logical steps in the analysis.  
- Output  
	- 1: No thought appears to be given into what output should be shown. Output is clearly for your benefit, not the readers’.  
	- 3: All code output contributes to the reader’s understanding of your analysis/results.  
- Markdown Cell Organization  
	- 1: Conclusions or interpretations are included as comments in code cells.  
	- 3: Markdown cells are included where appropriate, containing concise explanations or interpretations.  
- Scrollability  
	- 1: The reader must scroll through a lot in order to find the important things.  
	- 3: Everything is concise and the reader can easily find the explanations, interpretations, and results.  

Benefit-of-the-Doubt Marks: Each project will be given 4 marks by default. Marks  
can be removed for major errors not covered by this rubic, such as not including names  
or submitting an assignment with errors (or no outputs).  

## Bonus Marks  
- 3 marks: Notebook is hosted publicly on GitHub, GitLab, Bitbucket, etc., with a commit history documenting the contributions of each team member over time.  
	- Be careful not to include personal information - such as student numbers - in the version hosted publicly. Your GradeScope submission should have this information, but not the version on GitHub.  
	- You can only get these marks if each group member contributed throughout the project. One member uploading the final notebook does not count. I check the commit history, including timing and content!  
- Up to 4 marks can be added for extra creativity in the modelling approaches.