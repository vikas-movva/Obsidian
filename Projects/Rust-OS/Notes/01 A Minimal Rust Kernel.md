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


### BIOS Boot
In order to maintain compatibility most new [[01 A Minimal Rust Kernel#Firmware standards|UEFI]] machines use an emulated [[01 A Minimal Rust Kernel#Firmware standards|BIOS]] a byproduct of this compatibility is that the CPU is put into ==real mode== which is a 16bit compatibility mode


