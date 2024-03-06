## 1.
```bash
#!/bin/bash
echo "Hello, $USER"

echo "Please enter a command:"
read user_command

$user_command >output.txt 2>errors.txt

echo "Output:"
cat output.txt

echo "Errors:"
cat errors.txt
```

## 2.
```bash
#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo "Usage: ./submit.sh <submission_directory> <file>"
    exit 1
fi

submission_directory=$1
file=$2

cd $submission_directory

mkdir -p $USER

cp ~/$file $USER/

echo "Files in the directory $USER:"
ls $USER
```