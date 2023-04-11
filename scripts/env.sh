#!/bin/bash

VARIABLES=(
  TICTACTOE_BASE_API_URL
  TICTACTOE_CLIENT_PORT
)

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment
echo "window.process = {" >> ./env-config.js
echo "  env: {" >> ./env-config.js

for varname in "${VARIABLES[@]}"
do
  # Read value of current variable if exists as Environment variable
  value=$(printf '%s\n' "${!varname}")

  # Set value from .env file if does not exist as Environment variable
  if [ -z "$value" ]; then
    envline=$(grep -E "^$varname=" .env)
    value=$(printf '%s\n' "$envline" | sed -e 's/^[^=]*=//')
  fi

  # Append configuration property to JS file
  echo "    $varname: '$value'," >> ./env-config.js
done

echo "  }," >> ./env-config.js
echo "};" >> ./env-config.js
