Write a C program (name it as regex.c) that asks the user to enter the name of an email text input file  
(emails.txt) in the current directory. The program reads the text file and uses a regular expression with  
the grep command to redirect the valid emails to an output file (valid.txt). Use the system () function for  
running the shell command in the program.  
The emails are considered valid:  
• Usernames can contain letters (a-z), numbers (0-9), and periods (.).  
• Username can contain: Periods (.), Hyphens (-), Underscores (_), Plus signs (+)  
• Usernames cannot contain an ampersand (&), equals sign (=), apostrophe ('), comma (,), brackets  
(<,>), ! (exclamation mark), space, etc., or more than one period (.) in a row.  
You are free to explore the error handling for file handling. Use the following command to compile the  
code:  
$ gcc -Werror -Wall -g -std=gnu99 regex.c -o regex  
The above code will create the ./regex executable file  
The expected output for executing:
>./regex
>Enter the name of the input file: email.txt
>Enter the name of the output file for valid emails: valid.txt
>Valid emails saved to valid.txt
>./regex
>Enter the name of the input file: invalid_input.txt
>Error opening in input file: No such file or directory
>./regex
>Enter the name of the input file: email.txt
>Enter the name of the output file for valid emails: new_output.txt
>Valid emails saved to new_output.txt