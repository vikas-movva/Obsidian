Sign language to text model - [Twostream-SLR](https://github.com/FangyunWei/SLRT/tree/main/TwoStreamNetwork)
text to natural language - [Phi-2](https://huggingface.co/microsoft/phi-2)

1. extract signs form video
	1. go frame by frame detect if frame has sign
	2. if the sign is the same as the previous sign skip else add to string
	3. 
2. feed images to sign to text model
3. combine words
4. feed string to llm fixing grammar and adding punctuation where needed
