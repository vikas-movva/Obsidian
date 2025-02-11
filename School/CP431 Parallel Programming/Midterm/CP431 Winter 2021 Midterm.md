## Part A: Theoretical Questions \[40 marks\] (each question counts for 4 marks)

1. Explain the difference between “shared memory” and “distributed memory” architectures. 
	- **Shared Memory**: All processors access a single memory space. Communication occurs via reading/writing shared variables (e.g., multicore CPUs with RAM).
	- **Distributed Memory**: Each processor has its own memory. Communication requires explicit message passing (e.g., clusters).

2. Give a concrete example of a difference between shared and distributed memory programming. 
	- In **shared memory** (e.g., OpenMP), threads synchronize using locks.
	- In **distributed memory** (e.g., MPI), processes explicitly send/receive messages (e.g., `MPI_Send`/`MPI_Recv`).
3. Explain the difference between “task parallelism” and “data parallelism”. 
	- **Task Parallelism**: Different tasks run concurrently (e.g., image processing and audio compression in parallel).
	- **Data Parallelism**: Same operation on different data subsets (e.g., vector addition split across processors).

4. Describe in detail an example of task parallelism.
	- A video encoder processes audio and video streams concurrently on separate threads.

5. Describe in detail an example of data parallelism.
	- Matrix multiplication where each processor computes a subset of rows/columns.

6. What is a “communicator” (in MPI)?
	- A group of processes that can communicate (e.g., `MPI_COMM_WORLD` defines the default group).

7. What is a “collective communication” (in MPI)?
	- Operations involving all processes in a communicator (e.g., `MPI_Bcast`, `MPI_Reduce`).

8. What is a “broadcast” (in MPI)?
	- A root process sends data to all other processes (e.g., `MPI_Bcast` distributes input parameters).

9. What is a “reduction” operator (in MPI)?
	- Combines data from all processes using an operation (e.g., sum, max) into a single result (e.g., `MPI_Reduce`).

10. Explain the “tag” concept of MPI.
	- Integer identifier attached to messages to distinguish types (e.g., tag 0 for data, tag 1 for control signals).

## Part B: Algorithmic Questions \[40 marks\] (each question counts for 8 marks)

Consider the problem of writing a parallel algorithm to compute the sum of n numbers $a_{1},\dots,a_{n}$ by using a pairwise summation strategy illustrated here with an example for $n = 8$: the 8 numbers: 7, 3, 15, 10, 13, 18, 6, 4 sum to 76.

1. Design a parallel algorithm to compute the sum of n numbers, using the aforementioned strategy.
2. Describe in detail your parallel algorithm using pseudocode only, not C/MPI. 3. Mention explicitly which computations of your algorithm can be performed in parallel. 4. For n = 8 the height of the tree is equal to 3. What is the height of the tree for arbitrary n? 5. When the n numbers are given, how many processors are needed (at least) for your parallel algorithm to work properly?

Part C: Work Division Schemes \[20 marks\]

√2 πe−x22 and suppose you are using a parallel program to implement the trapezoidal rule of numerical integration, to evaluate numerically the definite integral Consider the function φ(x) = 1

$I = Z +10-10  \phi(x)dx$

Which one of the two work division scheme alternatives seen in class is better suited for this particular function? Document your answer thoroughly.
