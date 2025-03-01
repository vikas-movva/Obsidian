Given an array of 16 words labeled Data as shown below:
```arm_asm
.align
Data:
.word OxA, 0xB, 0xC, 0x1, 0x2, 0x4, 0x9, 0x3 
.word 0xD, 0xF, 0xE, 0x7, 0x5, 0x6, 0x8, 0x0 
_Data:
```

Write a program to convert each hexadecimal number to its corresponding ASCII code and store the ASCII codes in an array starting at the address 00001500. Note that each ASCII code is byte- sized. Table 1 shows the ASCII code table and Table 2 shows the result that should be generated for the array Data.

Your program must involve a loop that traverses through the array Data and you must implement a lookup table that outputs an ASCII code corresponding to the hexadecimal input.

Table 1: ASCII code table

| Hexadecimal | ASCII |
| --- | --- |
| 0 | 0x30 |
| 1 | 0x31 |
| 2 | 0x32 |
| 3 | 0x33 |
| 4 | 0x34 |
| 5 | 0x35 |
| 6 | 0x36 |
| 7 | 0x37 |
| 8 | 0x38 |
| 9 | 0x39 |
| A | 0x41 |
| B | 0x42 |
| C | 0x43 |
| D | 0x44 |
| E | 0x45 |
| F | 0x46 |



Table 2: Expected result after your program completes execution

| Data Memory Address | Value |
| --- | --- |
| 00001500 | 0x41 |
| 00001501 | 0x42 |
| 00001502 | 0x43 |
| 00001503 | 0x31 |
| 00001504 | 0x32 |
| 00001505 | 0x34 |
| 00001506 | 0x39 |
| 00001507 | 0x33 |
| 00001508 | 0x44 |
| 00001509 | 0x46 |
| 0000150A | 0x45 |
| 0000150B | 0x37 |
| 0000150C | 0x35 |
| 0000150D | 0x36 |
| 0000150E | 0x38 |
| 0000150F | 0x30 |
