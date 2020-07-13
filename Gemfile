source "https://rubygems.org"

group :jekyll_plugins do
  # Github pages
  gem "github-pages"
  gem 'jekyll-commonmark-ghpages'

  # Rss feed
  gem "jekyll-feed", "~> 0.12"

  # Run `bundle exec jekyll page` to create a new page
  # https://github.com/jekyll/jekyll-compose
  gem 'jekyll-compose'

  # Add little icon to external links
  gem "jekyll-external-links"

  # You can {% gist f72e835011f2535c89bddddb3f9ac685 %} to embed a gist
  gem 'jekyll-gist'

  # Seo
  gem 'jekyll-seo-tag'
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

