---
title: "DATA 100 Quiz 1"
author: "Vikas Movva"
date: "2024-05-30"
output:
  pdf_document: default
  html_document: default
---

```r
knitr::opts_chunk$set(echo = TRUE)
```

```r
library(tidyverse)
```


## mgp data
```r
mpg
```

#### 1. Remove the the cluster of points from the "2seater" class to create a new dataset.
```r
mpg_new <- mpg |> 
  filter(class != "2seater")
mpg_new
```
#### 2. Use a scatter plot to visualize the relationship between highway fuel efficiency (hwy) and the displacement of its engine (displ).
```r
plot(ggplot(mpg_new, aes(x = displ, y = hwy)) +
  geom_point() +
  labs(title = "Highway Fuel Efficiency vs Engine Displacement",
       x = "Engine Displacement (L)",
       y = "Highway Fuel Efficiency (mpg)"))
```

#### 3. Filter the data to select the points where cty < 10 or cty > 32.5. Use the relocate function to move the column cty after the column year and move the column hwy before the column cyl.
```r
mpg_filtered <- mpg |>
  filter(cty < 10 | cty > 32.5) |>
  relocate(cty, .after = year) |>
  relocate(hwy, .before = cyl)
mpg_filtered
```
