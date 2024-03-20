`funcsort()`:
```bash
funcsort() {
    # Check arguments
    if [[ $# -lt 1 || $# -gt 3 ]]; then
        echo "Invalid number of arguments."
        exit 4
    fi

    # Check if -n argument is present
    if [[ $1 == "-n" ]]; then
        if [[ $# -eq 1 ]]; then
            echo "No filename provided."
            exit 5
        fi
        checkfile $2
        if [[ $# -eq 3 ]]; then
            sort -n $2 > $3
        else
            sort -n $2
        fi
    else
        checkfile $1
        if [[ $# -eq 2 ]]; then
            sort $1 > $2
        else
            sort $1
        fi
    fi
}
```

`checkfile()`:
```bash
checkfile() {
    if [[ ! -e $1 ]]; then
        echo "File does not exist."
        exit 1
    elif [[ ! -f $1 ]]; then
        echo "Not a normal file."
        exit 2
    elif [[ ! -r $1 ]]; then
        echo "File cannot be read."
        exit 3
    fi
}
```

```bash
funcsort "$@"
```
