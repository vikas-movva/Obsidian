>[!Recall]
>`Library(tidyverse)` should apear in the beginning of every `.qmd` or `.rmd` file we have from now on
>


### Example task utilizing `filter()`
>[!Task]
>Get flights going out on a given day. **Note** that the column names month and day are not in quotation marks

```r
library(nycflights13)
filter(flights, month==6, day==30) #June 30th
```

```r
Jun30 <- flights |> filter(month==6, day==30)
Jun30
```

Surrounding the assign statement by a pair of round parenthesis () accomplishes assignment and print-out in one go.

```r
(September <- flights |> filter(month == 9))
```

get flights during the first half of the months

```r
flights |> filter(day %in% 1:15
```

#### Rules of logical operations:
- **DeMorgan's Laws**
	- $!(x|y) = (!x) \cap (!y)$
	- $!(x\cap y) = (!x) | (!y)$
- **Distributivity**
	- $x \cap (y|z) = (x\cap y)| (x \cap z)$
	- $x|(y\cap z)= (x|y) \cap (x|z)$

The following commands give the same list of flights 
- In filter’s parameter list: and can be represented by , and & in the filtering conditions.

```r
flights |> filter(!(arr_delay > 120 | dep_delay > 120)) 

flights |> filter(arr_delay <= 120 & dep_delay <= 120) 

flights |> filter(arr_delay <= 120, dep_delay <= 120)
```

in order to filter out `NA` values use the function `is.na()`

#### Common `filter()` mistakes:
- using = (assignment operator) instead of == (comparison operator)


