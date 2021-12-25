#!/usr/bin/env bash

#  node task.js 

if [ $# -eq 0 ] || [ $1 = "help" ]
then
    echo  "Usage :-"
    echo "$ ./task add 2 hello world    # Add a new item with priority 2 and text 'hello world' to the list"
    echo '$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order'
    echo '$ ./task del INDEX            # Delete the incomplete item with the given index'
    echo '$ ./task done INDEX           # Mark the incomplete item with the given index as complete'
    echo '$ ./task help                 # Show usage'
    echo '$ ./task report               # Statistics'
    node task.js
fi

if [ $# -ne 0 ]
then
    if [ $1 = "ls" ]
    then
        node task.js ls
    fi

    if [ $1 = "del" ]
    then
        
        node task.js del --n $2
    fi

    if [ $1 = "report" ]
    then
        node task.js report
    fi


    if [ $1 = "add" ]
    then
    job=""
        re='^[0-9]+$'
        if  [[ $2 =~ $re ]] 
        then
            job=$3
            echo -e $3 $2 >> task.txt
            echo 'task added :'  $job ' to the list with prority :' $2
            # node task.js add --n $2 --t $3

        fi
    fi

    if [ $1 = "done" ]
    then
        node task.js 'done' --n $2
    fi
fi


