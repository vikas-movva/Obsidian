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

### Missing values
```r
NA & TRUE
```

```r
NA | TRUE
```

```r
!NA
```

```r
NA + 1
```

```r
NA * 0
```

```r
NA == NA
```

```r
NA^0
```

```r
is.na(NA)
```