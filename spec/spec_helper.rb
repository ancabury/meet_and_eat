RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  ENV['RAILS_ENV'] ||= 'test'
  require File.expand_path('../../config/environment', __FILE__)
  require 'rspec/rails'

  require 'database_cleaner'

  DatabaseCleaner.strategy = :truncation

  class ActiveSupport::TestCase
    ActiveRecord::Migration.check_pending!
    DatabaseCleaner.clean
  end
end
