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
library(tidyverse)
plot(ggplot(data = diamonds, mapping = aes(x = cut)) + geom_bar())
```

```r
by_cut <- diamonds |> group_by(cut) |> count() 
by_cut
```

