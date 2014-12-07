cowsay -l > /dev/null
status=$?

if test $status -eq 0
then
    cowpath=$(cowsay -l | grep -o -E "(/(\w|\.|_|\d)+)+")
    cp ./bart.cow "$cowpath/"
    status=$?
    if test $status -eq 0
    then
        echo "Copied bart to your cowpath."
    else
        echo "Could not copy bart to your cowpath"
    fi
else
    echo "Couldn't find cowsay executable"
fi

if [[ $# -gt 1 ]]
    then
        export NODE_ENV=$1
    else
        export NODE_ENV='development'
fi

npm start

status=$?

if test $tatus -eq 0
    echo "$NODE_ENV server started"

exit $status