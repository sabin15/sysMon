#!/bin/bash
# My first script

echo "Hello World"


while :
do
	top -b -n 2 -d 0.5 > top.txt

	cpu_i=$(grep Cpu top.txt | cut -d ',' -f 4 | cut -d ' ' -f 2)
	cpu=$(echo $cpu_i | cut -d ' ' -f 2)
	echo $cpu

	mem=$(grep "KiB Mem :" top.txt | cut -d ':' -f 2)
	#echo $mem
	mem_used=$(echo $mem | cut -d ',' -f 3 | cut -d ' ' -f 2)
	echo $mem_used
	
	curl --header "Content-Type: application/json" -d "{\"cpu\":\"$cpu\", \"memory\":\"$mem_used\",\"device\":\"ubuntu\"}" http://localhost:4000/post

	sleep 2 
done



 








