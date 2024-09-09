## Introduction

- Date and time questions can be complex due to variations in:
    - Days in a year (leap years)
    - Days in a month
    - Hours in a day (daylight saving time)
    - Seconds in a minute (leap seconds)

## Types of Date/Time Data

- Three main types:
    1. Date: `<date>`
    2. Time within a day: `<time>`
    3. Date-time (date plus time): `<dttm>`
- Focus on dates and date-times (R doesn't have a native time class)
- `hms` package can help with storing times (e.g., `hms::hms(56,34,12)` for 12:34:56)

## Creating Date/Times

### Current Date/Time
```r
today()
now()
```

### From Strings

- Use `lubridate` package functions:
    - `ymd()`, `mdy()`, `dmy()` for dates
    - `ymd_hms()`, `mdy_hm()` for date-times
- Example: `ymd("2024-02-29")`

### Parsing with `readr`

- Use `col_date()` with format strings for non-standard formats
- Example:

```r
read_csv(col_types = cols(date = col_date("%y/%m/%d")))
```    

### From Individual Components

- Use `make_date()` or `make_datetime()`
- Example:

```r
make_date(year, month, day) 
make_datetime(year, month, day, hour, minute)
```

### From other types

- Use `as_datetime()` and `as_date()`
- Can convert between date-time and date
- Can take integers (seconds or days since Unix Epoch)

## Working with Date-Time Components

### Getting Components

- Functions: `year()`, `month()`, `mday()`, `yday()`, `wday()`, `hour()`, `minute()`, `second()`
- For month and weekday names: `month(datetime, label = TRUE, abbr = FALSE)`

### Setting Components

- Use the same functions to set components:
```r
year(datetime) <- 2020
```
- Or use `update()` for multiple components:
```r
update(datetime, year = 2010, month = 2, mday = 3)
```

### Practical Examples

- Analyzing flight data:
```r
flights_dt <- flights |>   
filter(!is.na(dep_time), !is.na(arr_time)) |>  
	mutate(
		dep_time = make_datetime_100(year, month, day, dep_time),
		arr_time = make_datetime_100(year, month, day, arr_time),
		sched_dep_time = make_datetime_100(year, month, day, sched_dep_time),
		sched_arr_time = make_datetime_100(year, month, day, sched_arr_time)
		)
```
- Visualizing patterns:
    - Weekend effect in flights
    - COVID-19 case numbers by day of week
    - Flight delays by minute of scheduled departure

## Rounding Dates

- Functions: `floor_date()`, `round_date()`, `ceiling_date()`
- Example: `floor_date(datetime, "week")`

## Time Spans

### Types

1. Duration: Exact number of seconds
2. Period: Human units like weeks and months
3. Intervals: Human units with start and end points

### Duration

- Created with `d<unit>s()` functions (e.g., `ddays(5)`)

### Periods

- Created with `<unit>s()` functions (e.g., `days(1)`)

### Intervals

- Created using `%--%` between two times
- Useful for calculating exact time spans between two dates

### Practical Applications

- Calculating age
- Adjusting overnight flights in dataset

## Time Zones

- Get current time zone: `Sys.timezone()`
- List all time zones: `OlsonNames()`
- Specify time zone in lubridate functions with `tz` argument
- Examples of timezone effects on calculations

## Additional Topics

### Implementation Notes

- POSIXct vs POSIXlt

## Data Visualization Examples

- Several ggplot examples for visualizing time-based data:
    - Frequency of flights by date
    - COVID-19 cases over time
    - Flights by day of week
    - Average delay by minute of scheduled departure
    - Scheduled departure minute frequencies