# Introduction to MPI: Detailed Notes

## 1. **MPI Basics**
- **Message Passing Interface (MPI):** A standardized library for parallel programming in distributed memory systems.
- **Processes:** Independent instances of a program running in parallel. Identified by **ranks** (integers `0` to `p-1`, where `p` is the total number of processes).

> [!NOTE] **Key Concepts:**
>   - **SPMD (Single Program Multiple Data):** All processes execute the same program but branch based on their rank.
>   - **MIND (Multiple Instruction Multiple Data):** Processes run different programs (less common; SPMD is typical).

---
## 2. **Structure of an MPI Program**
### **Essential Components**
1. **Include Header:** `#include "mpi.h"`.
2. **Initialize MPI:** `MPI_Init(&argc, &argv)` **must** be called before any MPI functions.
3. **Finalize MPI:** `MPI_Finalize()` cleans up resources after MPI operations.
4. **Communicators:** 
   - `MPI_COMM_WORLD`: Default communicator grouping all processes.
   - `MPI_Comm_rank(comm, &rank)`: Retrieves the process rank.
   - `MPI_Comm_size(comm, &size)`: Retrieves the total number of processes.

### **Example Code Breakdown (`greetings.c`)**
```c
#include <stdio.h>
#include <string.h>
#include "mpi.h"

int main(int argc, char* argv[]) {
    int my_rank, p, source;
    char message[100];
    MPI_Status status;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    MPI_Comm_size(MPI_COMM_WORLD, &p);

    if (my_rank != 0) {
        sprintf(message, "Greetings from process %d!", my_rank);
        MPI_Send(message, strlen(message)+1, MPI_CHAR, 0, 0, MPI_COMM_WORLD);
    } else {
        for (source = 1; source < p; source++) {
            MPI_Recv(message, 100, MPI_CHAR, source, 0, MPI_COMM_WORLD, &status);
            printf("%s\n", message);
        }
    }
    MPI_Finalize();
    return 0;
}
```

>[!NOTE] **Key Points**
>- **Non-Rank 0 Processes:** Send messages to rank 0 using `MPI_Send`.
>- **Rank 0 Process:** Receives messages using `MPI_Recv` in a loop.
>**`strlen(message)+1`:** Ensures the null terminator `\0` is transmitted.
>- **Buffer Size:** Receiver (rank 0) allocates a fixed buffer (`char[100]`), which must be large enough to hold incoming messages.

---
## 3. **Message Passing Mechanics**
### **Message Envelope**
A message is identified by three components:
1. **Rank of Sender/Receiver:** Unique identifier for processes.
2. **Tag:** Integer (`0` to `MPI_TAG_UB`) to distinguish message types (e.g., `0` for greetings, `1` for data).
3. **Communicator:** Context for communication (e.g., `MPI_COMM_WORLD`).

### **MPI_Send and MPI_Recv Syntax**
```c
int MPI_Send(
    void* message,      // Pointer to data buffer
    int count,          // Number of elements to send
    MPI_Datatype type,  // Data type (e.g., MPI_CHAR, MPI_INT)
    int dest,           // Rank of destination process
    int tag,            // Message tag
    MPI_Comm comm       // Communicator
);

int MPI_Recv(
    void* message,      // Buffer to store received data
    int count,          // Maximum number of elements to receive
    MPI_Datatype type,  // Data type
    int source,         // Rank of sender (or MPI_ANY_SOURCE)
    int tag,            // Tag (or MPI_ANY_TAG)
    MPI_Comm comm,      // Communicator
    MPI_Status* status  // Info about received message
);
```
- **Wildcards:**
  - `MPI_ANY_SOURCE`: Receive from any sender.
  - `MPI_ANY_TAG`: Receive messages with any tag.
- **Status Object:** 
  - `status.MPI_SOURCE`: Rank of the sender.
  - `status.MPI_TAG`: Tag of the received message.
  - Use `MPI_Get_count(&status, type, &count)` to get the actual message size.

---

## 4. **Execution Flow in SPMD**
4. **Program Launch:** The OS starts multiple instances of the same executable.
5. **Branching:** Processes diverge using `if (my_rank == 0) { ... } else { ... }`.
6. **Communication:** Processes send/receive messages based on their roles.

---

## 5. **Common Pitfalls & Best Practices**
- **Forgetting MPI_Init/MPI_Finalize:** Causes undefined behavior.
- **Buffer Overflows:** Ensure the receiver’s buffer is large enough.
- **Mismatched Tags/Communicators:** Sender and receiver must agree on these.
- **Deadlocks:** Avoid circular dependencies (e.g., A waits for B, B waits for A).

---

## 6. **Advanced Concepts**
### **Tags in Practice**
- Use tags to differentiate message types (e.g., `0` for control signals, `1` for data).
- Example: A library might use tag `100` for internal messages, avoiding clashes with user tags.

### **Communicators**
- Create custom communicators to isolate communication groups (e.g., `MPI_Comm_split`).
- Useful for modular code or libraries to avoid tag collisions.

### **Wildcards in MPI_Recv**
- `MPI_ANY_SOURCE` and `MPI_ANY_TAG` allow flexible message handling but require checking `status` for details.

---

## 7. **Why Use strlen+1 in MPI_Send?**
- C strings end with `\0`. Including `strlen(message)+1` ensures the null terminator is sent, so the receiver can print the string correctly.

---

## 8. **Summary of Key MPI Functions**
| Function               | Purpose                                  |
|------------------------|------------------------------------------|
| `MPI_Init`             | Initializes MPI environment             |
| `MPI_Finalize`         | Cleans up MPI resources                 |
| `MPI_Comm_rank`        | Retrieves current process rank          |
| `MPI_Comm_size`        | Retrieves total number of processes     |
| `MPI_Send`             | Sends a message to a process            |
| `MPI_Recv`             | Receives a message                      |
| `MPI_Get_count`        | Determines size of received message     |

---

## 9. **Analogy for Communicators**
Think of communicators as different chat groups:
- `MPI_COMM_WORLD` is the "global chat" where everyone can message each other.
- Custom communicators are "private chats" where only members can communicate.
