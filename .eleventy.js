const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const {DateTime} = require('luxon')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)

  eleventyConfig.addFilter('date', function(value) {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_FULL)
  })
}
