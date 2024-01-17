ctest.c:
```C
/*
 * ctest.c
 *
 *  Created on: 2024-01-03
 */
#include <stdio.h>

int main() {
    char letter;
    for (letter = 'A'; letter <= 'z'; letter++) {
        printf("%c\n", letter);
    }
    return 0;
}
```

Terminal:
```bash
gcc -g -o ctest ctest.c
./ctest
```

