1. calculator.sh
```bash
#!/bin/bash
echo "Enter two numbers:"
read a
read b
sum=$((a+b))
echo "The sum is: $sum"
```

2. calculator2.sh
```bash
#!/bin/bash
echo "Enter two numbers:"
read a
read b
echo "Enter operation (+,-,*,/,%)"
read op
result=$(echo "$a $op $b" | bc)
echo "The result is: $result"
```

3. calculator3.sh
```bash
#!/bin/bash
while true
do
  echo "Enter two numbers (or 'q' to quit):"
  read a
  if [ "$a" == "q" ]; then
    break
  fi
  read b
  echo "Enter operation (+,-,*,/,%)"
  read op
  result=$(echo "$a $op $b" | bc)
  echo "The result is: $result"
done

```

4. calculator4.sh
```bash
#!/bin/bash
filename="calculation_results.txt"
while true
do
  echo "Enter two numbers (or 'q' to quit):"
  read a
  if [ "$a" == "q" ]; then
    break
  fi
  read b
  echo "Enter operation (+,-,*,/,%)"
  read op
  result=$(echo "$a $op $b" | bc)
  echo "The result is: $result"
  echo "$a $op $b = $result" >> $filename
done
echo "Results stored in $filename"
```
