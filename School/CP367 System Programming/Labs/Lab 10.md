```bash
gcc -g -o ctest ctest.c
```

```gdb
break 9
run

print letter
```

**GDB commands**
- break [line number] - set a breakpoint at line number
- display [var] - add var to the watchlist
- undisplay [var] - remove var from the watchlist
- next - execute the next line
- cont - continue running the program
- print [var] - prints the value of var
- quit - exits the debugger
- run - starts running the program