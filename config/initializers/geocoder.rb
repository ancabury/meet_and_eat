Geocoder.configure(
  lookup: :google,
  api_key: Rails.application.secrets.google_api_key,
  use_https: true,
  units: :km
)
