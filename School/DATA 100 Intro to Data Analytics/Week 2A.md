All `.rmd` and `.qmd` should have the following at the beginning of each file

```r
library(tidyverse)
library(ggthemes)
```

### Dataframes
Calling a dataframe directly by its name normally shows only a portion of the data inside of it ex.
![[Pasted image 20240514153749.png]]

In order to see more of the dataframe the functions `glimpse()` or `view()` can be used
```r
glimpse(mydf)
view(mydf)
```

`glimpse()` - Turns the table around, making sure that all columns show up
`view()` - generates a separate output tab, showing the **full dataframe** in a large table

### Scatter plots

General structure of a `ggplot` call:
```r
ggplot(data=DATA) + GEOME_FUNCTION(mapping = aes(MAPPINGS))
```

Let's say that we need to visualize which city a datapoint belongs to.
This can be done by doing:
```r
ggplot(data = mydf) + geom_point(mapping = aes(x=displ, y=hwy, color=cty))
```
or
```r
ggplot(data = mydf) + geom_point(mapping = aes(x=displ, y=hwy, color=class))
```

In a scatterplot sometimes points overlap too much. A solution to this is the `geom_jitter()` function
```r
ggplot(data=mydf) + geom_jitter(mapping=aes(x=displ, y=hwy, size=cty), alpha=0.3)
```

We can also change the shape of the data point using the `shape` parameter