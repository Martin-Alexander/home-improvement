require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module HomeImprovement
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Find `config/env_vars.yml`, use appropriate rails environemnt, and set
    # environment variables
    config.before_configuration do 
      env_vars_file_path = File.join(Rails.root, "config", "env_vars.yml")

      if File.exist?(env_vars_file_path) && ENV["RAILS_ENV"]
        env_vars_hash = YAML.load(File.open(env_vars_file_path))
        env_vars_hash[ENV["RAILS_ENV"]].each do |key, value|
          ENV[key] = value.to_s
        end
      end
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
  end
end
