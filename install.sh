function checkStatus(){
    if test $1 -eq 1
    then
     echo "An error occured: $2"
     exit $1
    fi
}

beginning="\$the_cow = <<EOC;
     \$thoughts
      \$thoughts"


ending="EOC"

cowsay -l > /dev/null

checkStatus $? "Cowsay not installed or not in PATH"
    
    cowpath=$(cowsay -l | grep -o -E "(/(\w|\.|_|\d)+)+")
    
for f in bartfiles/*.cow
do
    file_name=$(sed -e 's/bartfiles\///' <<< $f)
    new_text="$beginning
$(cat $f | sed -e 's/\\/\\\\/g')
$ending"
    echo "$new_text" > "$cowpath/$file_name"
    checkStatus $? "Could not copy $file_name"
    echo "Copied $file_name"
done
    
if [[ $# -gt 1 ]]
    then
        export NODE_ENV=$1
    else
        export NODE_ENV='development'
fi

npm start

checkStatus $? "Server start script exited with status 1"

echo "Bartsay started"
exit $?