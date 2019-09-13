#!/bin/bash
# Kill any currently running servers
set -e
if [[ -f /app/tmp/pids/server.pid ]]; then
  rm /app/tmp/pids/server.pid
fi

if [[ ${RAILS_ENV} == "test" ]] ; then
    # If in test mode but not running on CI, then reset db.
    if [[ -z "$CI_NAME" ]] ;then
       echo "Resetting test database."
    else
     echo "Running on CI."
    fi
else
    bundle exec rake db:migrate
    bundle exec rails server -p 3000 -b 0.0.0.0
fi

exec "$@"