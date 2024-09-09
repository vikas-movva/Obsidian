## Part 1: R Basics and Data Manipulation

1. Consider the following R code, where switch is used.
   ```R
   operation <- function(x, y, op) {
     switch(op,
       plus = x + y,
       minus = x - y,
       times = x * y,
       divide = x / y,
       stop("Unknown op!")
     )
   }
   ```

a) Write the R code to calculate 3+5 using the code above.
```r
operation(3,5,plus)
```
b) Write the R code to calculate 3-5 using the code above.
```r
operation(3,5,minus)
```

2. Express the results of the following R command:
```R
(x <- (0:10)^2)
```
```r
0 1 4 9 16 25 36 49 64 81 100
```
3. Express the results of the following R command:
```R
(y <- seq(from = 0, to = 100, by = 10))
```
```r
0 10 20 30 40 50 60 70 80 90 100
```

4. Express the results of the following R command:
```R
ymd("20241103")
```
```bash
"2024-11-03"
```
5. Express the results of the following R command:
```R
years(1)/days(1)
```
```r
365.25
```

6. Express the results of the following R command:
```R
x <- 6
if_else(
	x > 0,
    "Perfect",
    "Not good"
)
```
```r
"Perfect"
```

7. Given the following R code:
```R
A <- c(2, 9, 3, 1, 12)
B <- c(0, 10)
D <- c(15, 30)
Z <- c(A, B, D)
```
What would be the output of the following operations?
a) `length(Z)`
```r
9
```
b) `Z[Z > 5]`
```r
9 12 10 15 30
```
c) `sum(Z %% 2 == 0)`
```r
5
```

## Part 2: Data Visualization with ggplot2

8. Using the `diamonds` dataset:
   a) Write R code to create a scatter plot showing the relationship between `price` and `carat`, with points colored by `cut`.
   b) How would you modify this plot to use different shapes for each `cut` category instead of colors?
```r
plot <- diamonds |> ggplot(mapping=aes(x=carat, y=price, color=cut)) +
	geom_point()+
	labs(title="Relationship between Price and Carat for Diamonds", x="Carat", y="Price", color="Cut")
```

```r
plot <- diamonds |> ggplot(mapping=aes(x=carat, y=price, shape=cut)) +
	geom_point()+
	labs(title="Relationship between Price and Carat for Diamonds",
	 x="Carat", 
	 y="Price", 
	 shape="Cut"
	 )
```
Change `color` in the `aes` function to `shape`

9. Using the `ggplot2` package, write R code to create a bar plot of the `cut` variable from the `diamonds` dataset. How would you modify this plot to show the proportion of each cut category instead of counts?
```r
plot <- diamonds %>% ggplot(mapping=aes(x=cut)) +
	geom_bar() +
	labs(
		title = "Count of Each Cut Category in the Diamonds Dataset", 
		x = "Cut", 
		y = "Count"
	)
```

```r
diamonds2 <- diamonds %>% group_by(cut) %>%
	summarize(count = n()) %>%
	mutate(proportion = count / sum(count))

plot <- diamonds2 %>% ggplot(mapping=aes(x=cut, y=proportion)) +
	geom_bar(stat="identity") +
	scale_y_continuous(labels = scales::percent) +
	labs(
	title="Proportion of Each Cut Category in the Diamonds Dataset",
	x="Cut",
	y="Proportion"
	)
```
In the context of the `geom_bar` function in `ggplot2`, `stat = "identity"` is used to tell `ggplot2` to use the values provided in the data frame for the y-axis. By default, `geom_bar` uses `stat = "count"`, which counts the number of occurrences of each x value. However, when you provide your own y values (like proportions), you need to specify `stat = "identity"` to instruct `ggplot2` to use those values directly.

>[!Tip] Explanation
>- **Default behavior (`stat = "count"`):** `geom_bar` will count the occurrences of each x value and use these counts for the height of the bars.
>- **Custom y values (`stat = "identity"`):** `geom_bar` will use the y values provided in the data frame without modification.
## Part 3: Data Joining and Manipulation

10. Consider the following tables x and y:
```R
x <- tribble(
    ~key, ~val_x,
    1, "x1",
    2, "x2",
    3, "x3"
)
y <- tribble(
    ~key, ~val_y,
    1, "y1",
    2, "y2",
    4, "y3"
)
```

| key | val_x |
| --- | ----- |
| 1   | x1    |
| 2   | x2    |
| 3   | x3    |

| key | val_y |
| --- | ----- |
| 1   | y1    |
| 2   | y2    |
| 4   | y3    |

a) Show the table T1 that is created by the following R code:
```R
T1 <- x |> inner_join(y, by = join_by(key))
```

| key | val_x | val_y |
| --- | ----- | ----- |
| 1   | x1    | y1    |
| 2   | x2    | y2    |

b) Show the table T2 that is created by the following R code:
```R
T2 <- left_join(x, y, by = "key")
```

| key | val_x | val_y |
| --- | ----- | ----- |
| 1   | x1    | y1    |
| 2   | x2    | y2    |
| 3   | x3    | NA    |
>[!Tip] Explanation
>The difference in the syntax between `join_by(key)` and `"key"` is due to the different functions or versions of the functions being used in the examples.
>1. **The pipe operator (`|>`) and `inner_join` with `join_by()`**:
>```r
>T1 <- x |> inner_join(y, by = join_by(key))
>```
This syntax uses the pipe operator (`|>`) and `join_by()`, which is part of a newer and more flexible approach in the `dplyr` package for specifying join conditions. The `join_by()` function allows for more complex join specifications, such as non-equijoin conditions or joins involving multiple keys. This approach is available in recent versions of `dplyr`.
>2. **Traditional `left_join` with a string for the key**:
>```r
T2 <- left_join(x, y, by = "key")
>``` 
This syntax uses the traditional way of specifying the join key as a string directly in the `by` parameter. This method is simple and works well for straightforward joins where the key is a single column and the join condition is an equality.

11. Write R code to perform an outer join of the tables x and y from the previous question. What would the resulting table look like?
```r
T3 <- full_join(x, y, by = "key")
```

| key | val_x | val_y |
| --- | ----- | ----- |
| 1   | x1    | y1    |
| 2   | x2    | y2    |
| 3   | x3    | NA    |
| 4   | NA    | y3    |

1. Explain the difference between `inner_join()` and `left_join()` in the context of merging data frames. Provide an example scenario where you would prefer to use each type of join.
>[!Answer]
>The `inner_join()` function only includes rows where the key is present in both data frames, resulting in a data frame that contains only the intersecting rows. In contrast, the `left_join()` function includes **all** rows from the left data frame and adds any matching rows from the right data frame based on the key. If there is no matching row in the right data frame, the result will still include the row from the left data frame, with `NA` values for the columns from the right data frame.
## Part 4: Statistical Analysis and Modeling

13. Given the following information about a temperature dataset:
```R
var(temperature$RegionA)
[1] 10.03
var(temperature$RegionB)
[1] 10.12
cov(temperature$RegionA, temperature$RegionB)
[1] 9.93
```
- Calculate the correlation coefficient between RegionA and RegionB. What does this value indicate about the relationship between these two variables?

>[!Answer] 
>Correlation is given by the formula:
$$cor(X,Y)= \frac{cov(X,Y)}{\sqrt{ var(X)var(Y) }}$$
therefore  $cor(X,Y)= \frac{9.93}{\sqrt{ (10.03)(10.12) }}=0.986$. This indicates that `RegionA` and `RegionB` are strongly correlated

14. In the `prcticedata` dataframe, u and x are the explanatory variables, and y is the response variable. We fitted a linear regression model, mod, to identify the relationship between u, x, and y. The output of the summary(mod) command is provided below:

```
Coefficients:
            Estimate Std. Error t value Pr(>|t|)
(Intercept) 0.5033   0.1020     5.121   0.710221
u           0.3215   0.0533     6.001   4.56e-06 ***
x           0.2901   0.0402     5.123   2.34e-05 ***
I(x^2)      0.1559   0.0312     3.353   0.001201 ***
u:x         0.0502   0.0253     2.516   0.000142 ***
---
Signif. codes: 0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
Residual standard error: 0.6523 on 95 degrees of freedom
Multiple R-squared: 0.8031, Adjusted R-squared: 0.7955
F-statistic: 104.7 on 4 and 95 DF, p-value: < 2.2e-16
```

a) Write down the equation of the linear regression model expressing y as a combination of functions of u and x, with the appropriate coefficients.
$$y=0.5033+0.3215u+0.2901x+0.1559x^2+0.0502(ux)$$
b) How confident are you that the estimated non-zero value for the intercept is not by chance? Justify your answer.

>[!Answer]
>From the output of `summary(mod)` we can see that the **p** value is 0.710221. This is significantly greater than the **p**-value threshold of 0.05. Therefore we can determine that the intercept is **not** statistically significant and is most likely 0. 

c) Calculate the predicted y value when u = 2 and x = 3.
$$y=0.5033+0.3215(2)+0.2901(3)+0.1559(3)^2+0.0502(2)(3) = 3.7209$$
d) Interpret the coefficient of the interaction term (u:x) in the context of the model.

>[!Answer]
>The coefficient of interaction term ($u:x$) represents the how the relationship between $u$ and $y$ change as $x$ changes and vice versa. This term captures the combined influence of both variables on the response variable

15. Write R code to create a simple linear regression model predicting `price` based on `carat` in the `diamonds` dataset. How would you interpret the coefficient for `carat` in this model?
>[!Answer]
>```r 
>model <- linear_reg() %>% 
>	set_engine("lm") %>% 
>	set_mode("regression") %>% 
>	fit(price ~ carat, data=diamonds)
>```
>`intercept` - The price if carat is 0. While this doesn't make in reality as 0 carat diamonds don't exist it is important in order to get an accurate prediction.
>
>`carat` - The expected change in price as carat increases.

17. Given a data frame `df` with variables `x1`, `x2`, and `y`, write R code to create a multiple regression model that includes an interaction term between `x1` and `x2`. How would you interpret the coefficient of the interaction term?
>[!Answer]
>```r
>model <- linear_reg() %>% 
>	set_engine("lm") %>%
>	set_mode("regression")
>
>recipe <- recipe(y~ x1*x2)
>
>workflow <- workflow() %>%
>	add_model(model) %>%
>	add_recipe(recipe)
>
>fit <- workflow %>%
>	fit(data = df)
>```
>`intercept` - the y intercept of the model
>`x1` - how `y` changes as `x1` changes
>`x2` - how `y` changes as `x2` changes
>`x1:x2` - how the relationship between `x1` and `y` changes as `x2` changes and vice versa
>$$y=\beta + W_{1}x_{1} + W_{2}x_{2} + W_{3}x_{1}x_{2}$$

## Part 5: R Formulas and Mathematical Expressions

1. Write the explicit mathematical formula corresponding to each of the R formulas:
    1. `y ~ x1 + x2`
        - $y=b_{0} + b_{1}x_{1} + b_{2}x_{2}$ 
    2. `y ~ x1:x2`
        - $y= b_{0} + b_{1}(x_{1}x_{2})$ 
    3. `y ~ x1 * x2`
        - $y=b_{0} + b_{1}x_{1}+b_{2}x_{2}+b_{3}(x_{1}x_{2})$ 
    4. `y ~ x1 * x2 - x1`
        - $y= b_{0}+b_{2}x_{2}+b_{3}(x_{1}x_{2})$ 
    5. `y ~ x1 * x2 - 1`
        - $y=b_{1}x_{1}+b_{2}x_{2}+b_{3}(x_{1}x_{2})$
    6. `y ~ I(x1 * x2 - 1)`
        - $y=b_{0} + b_{2}(x_{1}x_{2}-1)$ 

18. Translate the following R formula into its explicit mathematical form:
```R
y ~ x1 * x2 + I(x3^2) - 1
```
$$y=b_{1}x_{1}+b_{2}x_{2}+b_{3}x_{3}^2 + b_{4}(x_{1}x_{2})$$
19. Describe the purpose of the `I()` function in R formulas. Provide an example of when you might use it in a linear regression model.
>[!Answer]
>The `I()` funciton is used in r formulas to indicate that whatever is inside it should be treated as a single term and not an interaction.

## Part 6: Advanced R Functions and Tidyverse

20. Write a function in R that uses `case_when()` instead of `switch()` to perform the same operations as in question 1. Then, demonstrate how to use this function to multiply 4 and 7.
>[!Answer]
>   ```R
   >operation <- function(x, y, op) {
 >    case_when(
>       op == plus ~ x + y,
>       op == minus ~ x - y,
>       op == times ~ x * y,
>     op == divide ~ x / y,
>       TRUE ~ stop("Unknown op!")
>     )
>   }
>   ```
   

22. Using the `tibble` function from the tidyverse package, create a dataframe that contains the sequences from questions 2 and 3. Then, use `mutate()` to add a new column that calculates the difference between the two sequences.
>[!Answer]
>```r
>df <- tibble(
>value1= c(0:10),
>value2=seq(from = 0, to = 100, by = 10)
>) %>%
>mutate(value_diff = value2 - value1)
>```

23. The `lubridate` package (part of tidyverse) was used in questions 4 and 5. Write R code to calculate the number of days between the date in question 4 and today's date.
>[!Answer]
>```r
>as.numeric(ymd("20240801")- ymd("20231103"))
>```

25. Create a function that takes a vector of numbers as input and returns a vector of strings based on the following conditions:
    - If the number is positive, return "Positive"
    - If the number is negative, return "Negative"
    - If the number is zero, return "Zero"
    Use `purrr::map()` to apply this function to the vector `c(-2, 0, 3, -1, 5)`.
>[!Answer]
>```r
>categorize_number <- function(x) {
> 	case_when(
> 		x > 0 ~ "Positive",
>		x < 0 ~ "Negative",
>		TRUE ~ "Zero"
>	  )
>}
>
>input_vector <- c(-2, 0, 3, -1, 5)
>
>result <- map_chr(input_vector, categorize_number)
>```
1. Create a small dataset using `tibble()` that demonstrates a right-skewed distribution. Then, use ggplot2 to create a histogram of this distribution and explain how you can tell it's right-skewed from the plot.
>[!Answer]
>```r
>df <- tibble(
>	letter=c("A", "B", "C", "D", "E")
>	count=c(8, 6, 4, 2, 1)
>)
>plot <- ggplot(mapping=aes(x=letter, y=count)) +
>	geom_histogram(stat="identity")+
>	labs(xlab="Letter", ylab="Count", title="Histogram of x vs y")
>```
>
>This histogram has right skew because the mean is less than the median
