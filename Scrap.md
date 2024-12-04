## Implementing Multi-Layer Perceptron using PyTorch
**Step-by-Step Implementation** 
1. Prepare the IMDB dataset for training the MLP model by preprocessing the text data and splitting it into training, validation, and test sets. 
	1. Load the IMDB Dataset: use pandas to load the IMDB dataset CSV file into a DataFrame.
	2. Preprocess the Text Data: use ‘TfidfVectorizer’ from scikit-learn to convert the text reviews into TF-IDF features. Limit the number of features to a manageable number (e.g., 5000). 
	3. Encode the Labels: convert the sentiment labels (’positive’ and ’negative’) into numerical values using ‘LabelEncoder’ from scikit-learn. 
	4. Split the Data: split the dataset into training, validation, and test sets using ‘train test split’ from scikit-learn. Use 60% of the data for training, 20% for validation, and 20% for test- ing.
	5. Create Dataset Class: define a custom ‘Dataset’ class for PyTorch to handle the data. This class should return the features and labels as tensors.
	6. Create DataLoaders: use ‘DataLoader’ from PyTorch to create iterators for the training, validation, and test sets. At the end of this step, you should have three DataLoaders (train loader, val loader, and test loader) ready for training, validation, and testing the MLP model. 
2. Define the architecture of the MLP model using PyTorch. 
	1. Define the MLP Class: create a class MLP that inherits from nn.Module. Define the network layers in the constructor. For this assignment, you have the flexibility to design your MLP with a single hidden layer and use ReLU as the activation function. 
	2. Initialize the Model: specify the input size (number of features), hidden layer size (e.g., 512), and number of classes (2 for binary classification). Create an instance of the MLP model.
	3. By the end of this step, you should have an MLP model defined and ready to be trained. 
3. Train the MLP model using the training data and validate its performance on the validation data.
	1. Define Loss and Optimizer: use ‘CrossEntropyLoss’ as the loss function and ‘Adam’ as the optimizer.
	2. Initialize Lists for Storing Metrics: create lists to store training and validation losses and accuracies for each epoch.
	3. Training Loop: implement the training loop to train the model for a specified number of epochs (e.g., 10). For each epoch: 
		1. Set the model to training mode.
		2. Iterate over batches of data from the training DataLoader.
		3. Perform a forward pass, compute the loss, perform a backward pass, and update the weights.
		4. Track the running loss and accuracy for each batch. 
	4. Validation Loop: after each epoch, evaluate the model on the validation data.
		1. Set the model to evaluation mode. 
		2. Iterate over batches of data from the validation DataLoader.
		3. Perform a forward pass and compute the loss.
		4. Track the running loss and accuracy for each batch. 
		5. At the end of this step, you should have a trained MLP model and recorded training/validation losses and accuracies for each epoch. 
4. Evaluate the trained MLP model on the test data and visualize the training process. 
	1. Evaluate on Test Set: 
		1. Set the model to evaluation mode.
		2. Iterate over batches of data from the test DataLoader. 
		3. Perform a forward pass and compute predictions. 
		4. Track the accuracy and generate a classification report. 
	2. Plot Training and Validation Losses/Accuracies: use matplotlib to visualize the training and validation losses and accuracies over epochs. 
	3. By the end of this step, you should have evaluated the model’s performance on the test set and visualized the training process through loss and accuracy plots.


## Using Pre-trained BERT for Sentiment Analysis with Hugging Face: 
Use the `nlptown/bert-base-multilingual-uncased-sentiment` model directly with Hugging Face’s pipeline. This model is designed to work out of the box without needing fine-tuning.
**Step-by-Step Implementation** 
1. Data Preparation: 
	1. The dataset is loaded, and labels are encoded using ‘LabelEncoder’. 
	2. The data is split into training, validation, and test sets using train test split. 
2. Pipeline Usage: 
	1. The `pipeline` API from Hugging Face is used to initialize a sentiment analysis model. 
	2. The pre-trained model `nlptown/bert-base-multilingual-uncased-sentiment` is used directly without further fine-tuning. 
3. Text Truncation:
	1. The truncate texts function ensures that no input text exceeds the maximum length of 512 tokens. This avoids the error due to exceeding the maximum sequence length.
	2. The validation and test texts are truncated accordingly. 
4. Prediction Conversion: 
	1. The convert sentiment label function converts the sentiment labels from the pipeline to binary labels (0 for negative, 1 for positive). 
	2. Convert the sentiment labels to binary values: if the label is ’4 stars’ or ’5 stars’, change it to ‘1‘ (positive sentiment). For all other labels, change it to ‘0‘ (negative sentiment). 
5. Evaluation: 
	1. The accuracy and classification report are calculated for both the validation and test sets to evaluate the model’s performance