#! /bin/bash

file=".env"
envVariableValueChecks=(
  "NODE_ENV:development"
  "EMAIL_TRANSPORT:smtp"
  "EMAIL_HOST:maildev"
  "IGNORE_TLS:true"
  "EMAIL_SECURE:false"
  "EMAIL_PORT:25"
  "REDIS_HOST:redis"
  "REDIS_PORT:6379"
)
envVariableValueExistsChecks=(
  'NOTIFY_KEY'
  'NOTIFY_TEMPLATE'
  'CASEWORKER_EMAIL'
)

echo "Checking for $file file ..."
envVariableMistakes=false

if [ -f $file ]; then
  echo "$file file found"
  echo 'checking values of essential variables ...'
  source $file


  for variable in "${envVariableValueChecks[@]}";
  do
    KEY=${variable%%:*}
    VALUE=${variable#*:}
    if [[ "${!KEY}" != "$VALUE" ]]; then
      envVariableMistakes=true
      echo "$KEY value is incorrect, you have $KEY = ${!KEY}, should be '$VALUE'"
    fi
  done

  for variableName in "${envVariableValueExistsChecks[@]}";
  do
    if [ -z "${!variableName}" ]; then
      echo "$variableName should be added to the $file file with a value"
    fi
  done

else
  echo "File $file does not exist. Creating one ..."
  for variable in "${envVariableValueChecks[@]}";
    do
      KEY=${variable%%:*}
      VALUE=${variable#*:}
      echo "$KEY=$VALUE" >> $file
    done
  for variableName in "${envVariableValueExistsChecks[@]}";
    do
      echo "Please enter the value for $variableName:"
      read -r value
      echo "$variableName=$value" >> $file
    done
fi

if [ -z ${FILE_UPLOAD+x} ]; then
  echo "Does your project need file upload functionality? [true/false]"
  read -r value
  echo >> $file
  echo "FILE_UPLOAD=$value" >> $file
fi

if [[ ! ($FILE_UPLOAD == true || $FILE_UPLOAD == false) ]]; then
    echo "Please fix the values of FILE_UPLOAD in your $file, it needs to be either true or false."
    exit
fi

if [[ $envVariableMistakes != false ]]; then
  echo 'Please fix the values of the above env variables and run the script again.'
  exit
else
  echo "$file check completed ..."
fi