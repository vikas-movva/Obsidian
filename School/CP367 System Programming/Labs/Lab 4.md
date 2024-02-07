1. Create the files `in1.txt` and `in2.txt` with the given numbers:
```bash
echo -e "1\n2\n3\n4\n4\n5\n6\n6\n6\n7" > in1.txt
echo -e "3\n4\n9\n9\n9\n12" > in2.txt
```
2. Concatenate the contents of `in1.txt` and `in2.txt`  into `output.txt`, while sorting the values in numeric order and removing duplicates:
```bash
sort -n in1.txt in2.txt | uniq > output.txt
```
3. Generate and append at least three different error messages to `errors.txt`:
```bash
(echo "error1" > /; echo "error2" > ~; echo "error3" > ..) 2> errors.txt
```
4. List only the files or directories in your workspace that have `rwx` as one of their permissions:
```bash
ls -l | grep 'rwx'
```
5. List only the files (not directories) in the workspace that have `rwx` as the owner permissions:
```bash
find . -type f -perm -u=rwx
```