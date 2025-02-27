| Line No. | Address | Machine Code | Code             |
| -------- | ------- | ------------ | ---------------- |
| 1        | 1004    |              | ldr r2, =Data    |
| 2        | 1008    |              | ldr r3, =_Data   |
| 3        | 100c    |              | mov r5, #0       |
| 4        | 1010    |              | mov r6, #0       |
| 5        |         |              | mov r7, #0       |
|          |         |              | Loop:            |
| 6        | 1014    |              | ldr r0, [r2], #4 |
| 7        | 1018    |              | cmp r0, #0       |
|          |         |              | TestNegative:    |
| 8        | 101c    | AA??????     | bge TestPositive |
| 9        | 1020    |              | add r5, r5, #1   |
| 10       | 1024    | EA??????     | bal Next         |
|          |         |              | TestPositive:    |
| 11       | 1028    | 0A??????     | beq TestZero     |
| 12       | 102c    |              | add r6, r6, #1   |
| 13       | 1030    | EA??????     | bal Next         |
|          |         |              | TestZero:        |
| 14       | 1034    |              | add r7, r7, #1   |
|          |         |              | Next:            |
| 15       | 1038    |              | cmp r2, r3       |
| 16       | 103c    | 1A??????     | bne Loop         |
|          |         |              | _stop:           |
| 17       | 1040    | 1A??????     | b _stop          |