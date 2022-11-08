##  00 Create a freestanding Rust binary

### Introduction
To write a kernel in pure rust we need to remove any rust feature that relies upon OS features.

A consequence of this is that most of the rust standard library can't be used.
- Some features that can still be used: iterators, closures, pattern matching, option and result, string formatting,  ==ownership system==

### Disabling the standard Library
Create a new cargo project:
```shell
cargo new rust-os --bin --edition 2021
```

the directory should look like:
```
rust-os
├── Cargo.toml
└── src
    └── main.rs
```

`Cargo.toml` file contains the configuration for the rust crate
- Name
- Author
- Version
- Dependencies

### Disabling `std`
By default every crate links to the standard library in order to disable it include:
```rust
#![no_std]
```

however now that we do that we lose access to a couple key components that every rust program needs such as:
- Panic handler
- Language items
- start attribute / entry point
- C runtime

in order to fix these issues add the following in:
`scr/main.rs`:
```Rust
#![no_std] // remove link to Rust standard library
#![no_main] // disable all Rust-level entry points

use core::panic::PanicInfo;

#[no_mangle] // dont mangle the name of the function below
pub extern "C" fn _start() -> !{
	// entry point of the program
	loop {} // infinite loop for now as a placeholder
}

#[panic_handler] // tell the compiler to call this function on panic
fn panic(_info: &PanicInfo) -> !{
	loop{} // infinite loop for now as a placeholder
}
```

`Cargo.toml`:
```toml
[package]
name = "rust-os"
version = "0.1.0"
authors = [Vikas Movva <vikas.s.movva@gmail.com>]

# the profile for "cargo build"
[profile.dev]
panic = "abort" # this is to disable stack unwinding on panic -> OS related feature

[profile.release]
panic = "abort" # this is to disable stack unwinding on panic -> OS related feature
```