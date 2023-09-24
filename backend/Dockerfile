# Use the official Ruby image as the base image
FROM ruby:3.2.2

# Set an environment variable for the Rails app
ENV RAILS_ROOT /app
RUN mkdir -p $RAILS_ROOT
WORKDIR $RAILS_ROOT

# Install system dependencies
RUN apt-get update -qq && apt-get install -y nodejs

# Install gems
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install
RUN rake rswag:specs:swaggerize

# Copy the Rails app into the container
COPY . .

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
