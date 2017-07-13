source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.2'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails', '~> 4.3', '>= 4.3.1'
gem 'ejs', '~> 1.1', '>= 1.1.1'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'pry', '~> 0.10.4'
  gem 'pry-byebug', '>= 3.3'
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  gem 'rspec-rails', '~> 3.4'
  gem 'factory_girl_rails', '~> 4.0'
end

group :test do
  gem 'database_cleaner', '>= 1.5'
  gem 'rspec-activemodel-mocks'
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'haml-rails', '~> 1.0'
gem 'haml', '~> 5.0', '>= 5.0.1'
gem 'dotenv-rails', '~> 2.2', '>= 2.2.1'

gem 'omniauth-google-oauth2', '~> 0.5.0'
gem 'foursquare2', '~> 2.0', '>= 2.0.2'

gem 'bootstrap-sass', '~> 3.3', '>= 3.3.7'
gem 'font-awesome-rails', '~> 4.7', '>= 4.7.0.2'
gem 'react-rails', '~> 2.2', '>= 2.2.1'

gem 'cancancan', '~> 2.0'

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
