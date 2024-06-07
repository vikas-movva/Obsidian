### Exponent rule
if $f(x) = x^2$
$f^`(x) = 2x$

>[!Rule]
>$$f^`(x) = nx^{n-1}$$
### Log rule
if $f(x) = \log_{2}(x)$
$f\prime(x) = \frac{1}{x\ln(2)}$

>[!Rule]
>$$f\prime(x) = \frac{1}{x\ln(b)} \text{ where } \log_{b}(a)$$ 
### Product rule
>[!Rule]
>$$\frac{d}{dx}(f(x)g(x)) = f^`(x)g(x) + f(x)g^`(x)$$
>
>Note: $\frac{d}{dx} (fg) \ne (f^`)(g^`)$

Example
$f(x) = e^x(x^2+5x)$
$f^`(x) = e^x$

### Quotient Rule
>[!Rule]
>$$\frac{d}{dx} \frac{f(x)}{g(x)} = \frac{f^`(x)g(x) - f(x)g^`(x)}{g(x)^2}$$

### Differentiating Trigonometric functions
Some common things to know:
#### Normal trig functions
$$\frac{d}{dx} \sin(x) = \cos(x)$$
$$\frac{d}{dx} \cos(x) = -\sin(x)$$
$$\frac{d}{dx} \tan(x) = \sec^2(x)$$
#### Inverse trig functions
$$\frac{d}{dx} \csc(x) = -\csc(x)\cot(x)$$
$$\frac{d}{dx} \sec(x) = \sec(x)\tan(x)$$
$$\frac{d}{dx}\cot(x) = -\csc^2(x)$$
#### Arc trig functions
$$\frac{d}{dx} \arcsin(x) = \frac{1}{\sqrt{ 1-x^2 }}$$
$$\frac{d}{dx} \arccos(x) = -\frac{1}{\sqrt{ 1-x^2 }}$$
$$\frac{d}{dx} \arctan(x) = \frac{1}{1+x^2}$$

### Chain rule
>[!Rule]
>$$\frac{d}{dx} f(g(x)) = f^`(g(x)) * {g^`(x)}$$

### Special limit identities
>[!rule]
$$\lim_{ h \to 0 } \frac{\sin(h)}{h} = 1$$
$$\lim_{ h \to 0 } \frac{\cos(h) -1}{h} = 0$$

### Examples
>[!Example] Example 1
$$\lim_{ x \to 0 } \frac{x^2}{\sin(4x)\cos(3x)}$$
$$\lim_{ x \to 0 } \frac{x\cdot \cancel{x}}{\frac{\sin(4x)}{4x}\cos(3x)4\cancel{x}}$$
$$\lim_{ x \to 0 } \frac{x}{(1)\cancel{\frac{\sin(4x)}{4x}}\cos(3x)(4)}$$
$$\lim_{ x \to 0 } \frac{0}{(1)(1)\cancel{\cos(3x)}(4)}$$
$$\lim_{ x \to 0 } \frac{0}{4} = 0$$

>[!Example] Example 2
Find the equation of the tangent line and the normal line to $y = 2^{\cos(x)}$ where $x= \frac{\pi}{2}$
>$$(x_{0}, y_{0} = (\frac{\pi}{2}), y(\frac{\pi}{2}) = (\frac{\pi}{2}, 1))$$
>$$y\prime = 2^{\cos(x)} \cdot \ln(2) \cdot -\sin(x)$$
>$$y-y_0 = m(x-x_{0})$$
>$$y-1 = \ln(2)(x-\frac{\pi}{2})$$
>
>Tangent Line:
>$$y = \ln(2) x - \frac{\pi \ln(2)}{2} + 1$$
>Normal Line:
>$$y = -\frac{1}{\ln(2)(} x - \frac{\pi \ln(2)}{2} + 1$$

