# Parallel Trapezoidal Rule using MPI: Detailed Notes

## 1. Trapezoidal Rule Formula
The trapezoidal rule approximates the integral of a function \( f(x) \) over \([a, b]\) by dividing the interval into \( n \) trapezoids:
- **Area of the \( i \)-th trapezoid**:  
  $\frac{1}{2} h \left( f(x_{i-1}) + f(x_i) \right)$
  where $h = \frac{b-a}{n}$.
- **Total area (integral approximation)**:  
  $h \left[ \frac{f(a) + f(b)}{2} + \sum_{i=1}^{n-1} f(x_i) \right]$

## 2. Serial Implementation (Key Points)
- **Structure**:
  - Read \( a \), \( b \), and \( n \).
  - Compute \( h \).
  - Accumulate the integral starting with \( \frac{f(a) + f(b)}{2} \) and adding \( f(x_i) \) for all interior points.
  - Multiply by \( h \) at the end.
- **Code Highlights**:
  ```c
  // Loop to compute f(x) at interior points
  for (i = 1; i <= n-1; i++) {
    x = a + i*h;
    integral += f(x);
  }
  integral *= h;
```

- **Function \( f(x) \)**: Hardcoded as \( f(x) = x^2 \).

---

## 3. Parallelization with MPI
### Domain Decomposition
- Divide \([a, b]\) into \( p \) subintervals (one per process).
- **Subinterval for process \( i \)**:
  $\text{Local interval: } [a + i \cdot \text{local\_n} \cdot h, \,\, a + (i+1) \cdot \text{local\_n} \cdot h]$
  where $\text{local\_n} = n/p$.

### Key Steps in Parallel Code
1. **Initialization**:
   - MPI setup: `MPI_Init`, `MPI_Comm_rank`, `MPI_Comm_size`.
2. **Data Distribution**:
   - Process 0 reads \( a \), \( b \), \( n \), and broadcasts to others using `MPI_Send`/`MPI_Recv`.
3. **Local Computation**:
   - Each process computes its local integral using the `Trap` function.
4. **Result Aggregation**:
   - Process 0 collects results from all processes (`MPI_Recv`), sums them, and prints the total.
   - Other processes send their results to process 0 (`MPI_Send`).

---

## 4. Code Walkthrough (Parallel Version)
### Key Functions
1. **`Trap` Function**:
   - Computes the integral over a local interval.
   - Same logic as the serial version but operates on `local_a` and `local_b`.
2. **`Get_data` Function**:
   - Handles input distribution:
     - Process 0 reads input and sends \( a \), \( b \), \( n \) to other processes.
     - Other processes receive these values via `MPI_Recv`.

### Code Corrections
- **Syntax Fixes**:
  - **Function Definitions**: `float Trap(...) {` (not `float Trap{`).
  - **MPI Calls**: Use `MPI_COMM_WORLD` (not `_MPI_COMM_WORLD`).
  - **Missing Semicolons**: E.g., `tag = 17;` (not `tag = 17`).
- **Message Passing**:
  - Use `MPI_Recv(&integral, ...)` (not `sintegral`).

---

## 5. Key Concepts in MPI
### SPMD Model (Single Program Multiple Data)
- All processes run the same code but branch based on `my_rank`.
- Example:
  ```c
  if (my_rank == 0) {
    // Master process tasks (I/O, aggregation)
  } else {
    // Worker process tasks (computation, sending results)
  }
  ```

### Communication Patterns
- **Point-to-Point Communication**:  
  - `MPI_Send` and `MPI_Recv` with unique tags to avoid message mixing.
  - Example for sending \( a \), \( b \), \( n \):
    ```c
    // Process 0 sends data
    MPI_Send(a_ptr, 1, MPI_FLOAT, dest, 0, MPI_COMM_WORLD);
    MPI_Send(b_ptr, 1, MPI_FLOAT, dest, 1, MPI_COMM_WORLD);
    // Process 1 receives data
    MPI_Recv(a_ptr, 1, MPI_FLOAT, 0, 0, MPI_COMM_WORLD, &status);
    MPI_Recv(b_ptr, 1, MPI_FLOAT, 0, 1, MPI_COMM_WORLD, &status);
    ```

---

## 6. Common Pitfalls & Tips
1. **Input/Output (I/O)**:
   - Only process 0 should handle `printf`/`scanf` to avoid race conditions.
   - Use `MPI_Bcast` for efficient broadcasting (not shown in the code).
2. **Domain Division**:
   - Ensure \( n \) is divisible by \( p \). Add checks in code to handle edge cases.
3. **Tag Mismatch**:
   - Use unique tags for different messages (e.g., tag 0 for \( a \), tag 1 for \( b \)).
4. **Syntax Errors**:
   - Watch for missing semicolons, incorrect function braces, and typos in MPI parameters.

---

## 7. Example Input/Output
- **Input**: `a = 0`, `b = 1`, `n = 1024`.
- **Output**:
  ```
  With n = 1024 trapezoids, our estimate
  of the integral from 0.000000 to 1.000000 = 0.333344
  ```
- **Expected Result**: \( \int_0^1 x^2 dx = \frac{1}{3} \approx 0.333333 \).

---

## 8. Further Optimizations
- **Collective Communication**: Replace `MPI_Send`/`MPI_Recv` with `MPI_Gather` for efficient result aggregation.
- **Dynamic Load Balancing**: Handle cases where \( n \) is not divisible by \( p \).

---
## 9. I/O Handling in Parallel Systems
### Why Only Process 0 Handles I/O?
- **Race Conditions**: If multiple processes attempt `scanf`/`printf` simultaneously, output may interleave unpredictably.
- **Consistency**: Centralizing I/O ensures input is read once and results are printed once.
- **Implementation**:
  - Process 0 reads `a`, `b`, `n` and distributes them via `MPI_Send`.
  - Other processes receive data via `MPI_Recv`.

### Code Example: `Get_data` Function
```c
void Get_data(float* a_ptr, float* b_ptr, int* n_ptr, int my_rank, int p) {
    if (my_rank == 0) {
        printf("Enter a, b, and n\n");
        scanf("%f %f %d", a_ptr, b_ptr, n_ptr);
        // Broadcast to other processes
        for (int dest = 1; dest < p; dest++) {
            MPI_Send(a_ptr, 1, MPI_FLOAT, dest, 0, MPI_COMM_WORLD);
            MPI_Send(b_ptr, 1, MPI_FLOAT, dest, 1, MPI_COMM_WORLD);
            MPI_Send(n_ptr, 1, MPI_INT, dest, 2, MPI_COMM_WORLD);
        }
    } else {
        MPI_Recv(a_ptr, 1, MPI_FLOAT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        MPI_Recv(b_ptr, 1, MPI_FLOAT, 0, 1, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        MPI_Recv(n_ptr, 1, MPI_INT, 0, 2, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
    }
}
```
---

## 10. Domain Decomposition Details
### Subinterval Calculation
For process \( i \):
- **Local Trapezoids**: $\text{local\_n} = \frac{n}{p}$
- **Subinterval**:
  $\text{local\_a} = a + i \cdot \text{local\_n} \cdot h$
  $\text{local\_b} = \text{local\_a} + \text{local\_n} \cdot h$
- **Example**: If \( a=0 \), \( b=1 \), \( n=1024 \), \( p=4 \):
  - Process 0: \[0, 0.25\] 
  - Process 1: \[0.25, 0.5\] , etc.

### Visualization
| Process | Subinterval          |
|---------|----------------------|
| 0       | \([a, a+qh]\)        |
| 1       | \([a+qh, a+2qh]\)    |
| ...     | ...                  |
| \( p-1 \)| \([a+(p-1)qh, b]\) |

---

## 11. Common MPI Errors & Fixes
### Syntax Pitfalls
1. **Function Definitions**:
   - **Wrong**: `float Trap{ ... }`
   - **Correct**: `float Trap(...) { ... }`
2. **MPI Parameters**:
   - **Wrong**: `_MPI_COMM_WORLD`
   - **Correct**: `MPI_COMM_WORLD`
3. **Missing Semicolons**:
   - **Wrong**: `tag = 17`
   - **Correct**: `tag = 17;`

### Communication Best Practices
- **Tag Uniqueness**: Use distinct tags for different data types (e.g., tag 0 for `a`, tag 1 for `b`).
- **Buffer Addresses**: Always pass addresses for `MPI_Recv` (e.g., `&integral`, not `integral`).

---

## 12. Collective Communication vs. Point-to-Point
### `MPI_Bcast` vs. `MPI_Send/Recv`
- **`MPI_Bcast`**:
  - Efficiently broadcasts data from root to all processes.
  - Reduces code complexity.
  - **Modification to `Get_data`**:
    ```c
    if (my_rank == 0) scanf(...);
    MPI_Bcast(a_ptr, 1, MPI_FLOAT, 0, MPI_COMM_WORLD);
    MPI_Bcast(b_ptr, 1, MPI_FLOAT, 0, MPI_COMM_WORLD);
    MPI_Bcast(n_ptr, 1, MPI_INT, 0, MPI_COMM_WORLD);
    ```
- **When to Use**:
  - Use `MPI_Bcast` for identical data sent to all processes.
  - Use `MPI_Send/Recv` for process-specific data.

---

## 13. Handling Non-Divisible \( n/p \)
### Dynamic Load Balancing
- **Problem**: If \( n \% p \neq 0 \), some processes get an extra trapezoid.
- **Solution**:
  ```c
  int base_local_n = n / p;
  int remainder = n % p;
  if (my_rank < remainder) {
      local_n = base_local_n + 1;
      local_a = a + my_rank * local_n * h;
  } else {
      local_n = base_local_n;
      local_a = a + (remainder * (base_local_n + 1) + (my_rank - remainder) * base_local_n) * h;
  }
  local_b = local_a + local_n * h;
  ```

---

## 14. Extending the Code
### Integrating Custom Functions
4. **Modify `f(x)`**:
   ```c
   float f(float x) {
       return sin(x); // Example: Integrate sin(x)
   }
   ```
5. **User-Defined Functions**:
   - Read function choice at runtime (e.g., via `switch` statement).

### Testing & Validation
- **Serial vs. Parallel**: Run both versions with small \( n \) and compare results.
- **Known Integrals**: Test against \( \int_0^1 x^3 dx = 0.25 \).

---

## 15. Performance Considerations
### Scalability
- **Strong Scaling**: Measure time reduction as \( p \) increases for fixed \( n \).
- **Weak Scaling**: Increase \( p \) and \( n \) proportionally; ideal runtime remains constant.

### Overheads
- **Communication**: Aggregating results with `MPI_Send/Recv` introduces latency.
- **Optimization**: Use non-blocking calls (`MPI_Isend`, `MPI_Irecv`) to overlap computation and communication.

---

## 16. Beyond the Trapezoidal Rule
### Alternative Methods
6. **Simpson's Rule**:
   - Higher accuracy using parabolic segments.
   - Parallelization requires even \( n \).
7. **Adaptive Quadrature**:
   - Dynamically adjust subinterval sizes based on error estimates.
   - More complex to parallelize due to load imbalance.