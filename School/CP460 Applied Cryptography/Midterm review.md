**Topics:** 
1. Stream cipher
2. Block cipher
3. DES
4. Field and its arithmetic operations
6. AES 
7. RSA  algorithm

### Definitions
**Symmetric Cryptography**: Encryption and decryption are inverse opperations if the same key $K$ is used on both sides. EX:$$d_{k}(y)=d_{k}(e_{k}(x))=x$$ This basically means that given the key you can get back the original info.

### Substitution cipher
Replace each plaintext letter by another fixed letter.

Example:

| Plaintext | Ciphertext |
| --------- | ---------- |
| A         | K          |
| B         | D          |
| C         | W          |
| D         | S          |
$\therefore$ ABCD -> KDWS

#### Attacks against Substitution cipher
**Exhaustive Key Search Attack (Brute-Force)**
- Try every possible substitution table until an intelligent plaintext appears. (NOTE: For the substitution cipher the substitution table is the key)
- For a brute-force approach how many keys are there? $26! = 2^{88}$ 
- for modern computers searching through a key-space of $2^{88}$ will take years and therefore not very feasible

**Letter Frequency Analysis Attack (Brute-Force)**
- In the English language some letters are used more than others. Ex. the letter E is the most used letter followed by T and A.
- We can use this property by analyzing which letter appears most often in the ciphertext and replace it with e then pick the second most frequent letter and replace it with T etc.
- Through this method we can intelligently search through the key space and break the cipher using brute-force methods.

### Shift and Affine Ciphers
#### Shift Cipher (Caesar)
- Encryption algorithm is pretty simple for Shift ciphers. Shift each letter in the plaintext by $k$ which is the key to the cipher.
	- Example: ABCD, $k=2$ -> CDEF
- Equation for Shift ciphers: 
	- Encryption: $y = e_{k}(x)\equiv x+k |26|$
	- Decryption $x = d_{k}(x) \equiv y-k |26|$
- Because the keyspace of the shift cipher is only 26 it is **not** safe against brute-force attacks!

#### Affine Cipher
- This cipher is an extension of the shift cipher the only difference is that you multiply $x$ by a variable $a$ before adding the shift $b$ 
- Equations: 
	- Encryption: $y = e_{k}(x)\equiv ax+b |26|$
	- Decryption: $x = d_{k}(x) \equiv a^{-1}(y-b) |26|$
	- ==Remember==: $a^{-1}$ is a number such that $a\times a^{-1} \equiv 1 |m|$

### Stream Cipher
- Encrypts individual bits

### Block Cipher
- Encrypts full blocks (several bits)