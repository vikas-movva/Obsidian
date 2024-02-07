1. Create a new script file `p.sed` that wraps `<p>…</p>` tags around every line in a file:
```bash
echo 's/.*/<p>&<\/p>/' > p.sed
```
2. Create a new script file `newwrap.sed` that wraps the body of an HTML document around an entire file. This script should do the same as `wraphtml.sed`, but without the `<pre>…</pre>` tags:
```bash
echo -e '1i\\\n<html>\n<head><title>sed generated html</title></head>\n<body>' > newwrap.sed
echo -e '$a\\\n</body>\n</html>' >> newwrap.sed
```
3. 
```bash
sed -f p.sed your_file | sed -f newwrap.sed > output.html
```