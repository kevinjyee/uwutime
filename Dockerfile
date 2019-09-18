FROM ruby:2.6.2-stretch

ENV APP_HOME /app

RUN mkdir $APP_HOME && \
    apt-get update -qq && \
    apt-get install -y --no-install-recommends \
       build-essential \
       libpq-dev \
       nodejs

RUN apt-get -y update && \
    mkdir -p /usr/share/man/man1 /usr/share/man/man7 && \
    apt-get install --fix-missing --no-install-recommends -qq -y \
      build-essential vim wget gnupg git-all curl ssh postgresql-client libpq5 libpq-dev -y && \
    curl -sL https://deb.nodesource.com/setup_10.x | bash -  && \
    apt-get install -y nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists* /tmp/* /var/tmp/* && \
    npm install -g yarn && \
    npm uninstall node-sass && npm install node-sass --sass-binary-name=linux-x64-57

WORKDIR $APP_HOME

COPY Gemfile* $APP_HOME/

RUN yarn install && \
    yarn install --check-files

RUN gem install bundler -v 2.0.2
RUN bundle install --jobs 4
COPY . $APP_HOME

# Make util and entry executable
RUN chmod +x /app/deploy/wait-for-it.sh && \
    chmod +x /app/deploy/entrypoint.sh

# Open up this container port (can be remapped using compose)
EXPOSE 3000
# Basic entry for db creation/migration
ENTRYPOINT ["/app/deploy/entrypoint.sh"]