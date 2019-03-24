#!/bin/bash

function=botany-blizzard-service

echo Compile the project
tsc

echo Zip up the project output
sh ./scripts/zip-project.sh

echo Upload the new code!
aws lambda update-function-code --function-name $function --zip-file fileb://./build/output.zip
