module.exports = {
  "stories": [
    "../src/**/*.story.mdx",
    "../src/**/*.story.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    //'@react-theming/storybook-addon', :(
    'storybook-addon-styled-component-theme/dist/preset',
  ],
  "framework": "@storybook/react"
}