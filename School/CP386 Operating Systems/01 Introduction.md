---
Notes: "[[01_Introduction.pdf]]"
---
What happens when a program runs? **The CPU**:
 - **fetches** an instruction from memory
 - **decodes** the instruction
 - **executes** the instruction
the processor the moves on to the next instruction and so on

The operating system is responsible for:
- Making it easy to **run** programs
- allowing programs to **share** memory
- enabling programs to **interact** with devices

>[!Tip]
>The OS is in charge of making sure the system operates **correctly** and **efficiently**

**System components:**
- **Hardware**: provides basic computing resources (CPU, memory, I/O)
- **Operating System**: Controls and coordinates the use of hardware among application programs
- **Application Programs**: Solve computing problems of users (compilers, DB systems, video games, business systems, etc.)
- **Users**: people, machines, other computers

**Multitasking:**
- **Idea**: We want to run more than one process at once. When one process blocks we run another process
- **Problem**: What can an ill-behaved process do?
	- Infinite loop (never relinquish usage of the CPU)
	- Corrupt the memory of another process and proceed to make them fail
- **Solution**: The OS provides mechanisms to address these problems
	- Preemption: take the CPU away from looping processes
	- Memory protection: protect process's memory other processes

**Virtualization**
- The OS takes a Physical resource and transforms it onto a virtual form of itself
	- The virtual form is more general, powerful and easy-to-use/
	- Sometimes, we refer to the OS as a *Virtual Machine* 
- The OS creates a virtual layer that represents the physical resource in a way that allows multiple applications or processes to use the resource without interfering with each other. This is often refereed to as virtualization
- The OS does this because it makes the system easier to use

The OS is a resource manager. The OS allows:
- Many programs to run -> Sharing the CPU
- Many programs to concurrently access their own instructions and data -> Sharing memory
- Many programs to access devices -> Sharing disks

**System Calls**
System calls (syscalls) allow the user to tell the OS what to do.
- The OS provides some interface (API, Standard Lib)
- A typical OS exports a few hundred syscalls
	- Run programs
	- Access memory
	- Access devices
- Programming interface to the services provided by the OS
- Typically written in a high level language (C, C++)
- Mostly accessed by programs via a high level Application Programming Interface (API) rather than direct syscall use
- They interface between applications and the OS
	- Application uses an assembly instruction to trap the kernel
	- Some higher-level languages provide wrappers for system calls (C)
- System calls pass parameters between an application and OS via registers or memory
- Linux has over 300 syscalls
	- `read()`, `write()`, `open()`, `close()`, `fork()`, `exec()`, `ioctl()`

>[!Example]
>In the C Standard Library the function `printf()` is a wrapper for the `write()` syscall

