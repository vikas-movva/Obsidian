### Vectors
Vectors can have different types:
- EX. Integer, bool, float, etc.
A vector can have multiple types in a single vector
```r
# boolean and integer mix
x <- c(TRUE, 2L)
typeof(x)

# integer and double mix
y <- c(1L, 3)
typeof(y)
```
```shell
#> [1] "integer"
#> [1] "double"
```
prio: `boolean < integer < double < character`

### GGplot basiscs
```r
install.packages("tidyverse")
library(tidyverse)
diamonds <- read.csv(dataset)
glimpse(diamonds)
```