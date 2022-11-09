### Summary:

### The Boot Process
On startup your computer begins to execute firmware code that is stored in motherboard ROM

The process goes something like this:
Power on -> execute firmware code
                -> POST -> detect available RAM -> pre-initialize CPU and hardware -> look for bootable drive -> boot OS

#### Firmware standards
On a x86 CPU there are two firmware standards:
- Basic Input/Output System or BIOS
	- Old and outdated standard
	- Simple to use and well supported on majority of x86 machines

- Unified Extensible Firmware Interface or UEFI
	- Modern and feature rich
	- Complex to setup


#### BIOS Boot
In order to maintain compatibility most new [[01 A Minimal Rust Kernel#Firmware standards|UEFI]] machines use an emulated [[01 A Minimal Rust Kernel#Firmware standards|BIOS]] a byproduct of this compatibility is that the CPU is put into ==real mode== which is a 16bit compatibility mode

Updated boot process
Power on -> execute firmware code
                -> POST -> detect available RAM -> pre-initialize CPU and hardware -> look for bootable drive -> run bootloader -> ?

The bootloader is a 512 byte portion of executable code that is stored at the beginning of the disk

Most of the time the bootloader is larger than 512 bytes so it is broken into two parts where the first part is 512 bytes and loads the second part

The bootloader has some key roles:
- Determine the location of the kernel image on the disk and load it into memory
- Switch the CPU from 16bit real mode to 32bit protected mode then to 64bit long mode where 64-bit registers[^1] and the complete main memory are available
- Query information (Ex. Memory map[^2]) from the BIOS and pass it to the OS kernel

Writing a bootloader is annoying and and written in assembly 🤮 however the program [bootimage](https://github.com/rust-osdev/bootimage) can automatically prepend a bootloader to a kernel 

#### Multiboot Standard
Multiboot is a standard created by the Free Software Foundation in order to avoid having every OS from implementing its own bootloader that is only compatible with itself

The standard defines an interface between the bootloader and the operating system, so that any Multiboot-compliant bootloader can load any Multiboot-compliant OS
- Reference implementation: [GNU GRUB](https://www.gnu.org/software/grub/) 
	- Most popular bootloader for linux systems

In order to make the Multiboot-compliant a Multiboot-header needs to be inserted at the beginning of the kernel file.

This does makes it easy to boot an os from GRUB but there are some problems with this method too
- Only 32bit protected mode is supported which means that the CPU configuration to switch to 64bit long mode still needs to be done
- They are designed to make the bootloader simple instead of the kernal
- Documentation for both GRUB and Multiboot is sparse at best
- GRUB needs to be installed on the host system to create a bootable disk image from the kernal file which makes development on Windows or Mac difficult

### Minimal Kernel
Preliminary goal: create a disk image that prints "Hello world" when booted.

In order to achieve this [[00 Create a freestanding Rust binary|the freestanding Rust binary]] needs to be extended.

In [[00 Create a freestanding Rust binary|Rust binary]] cargo was used to build the binary however cargo builds for the host system by default and a kernel that runs on top of Windows/Mac doesnt make sense

#### Rust Nightly
There are three different channels of Rust: stable, beta, nightly
- stable: tested features
- beta: new features that have yet to be tested
- nightly: experimental features

The nightly compiler allows you to 

`rustup` can be used to easily install / update all three channels side-by-side.




[^1]: registers are temporary storage locations in the processor.
[^2]: A data structure that indicates how memory is laid out