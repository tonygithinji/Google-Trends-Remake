const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        './src/**/*.tsx',
        './src/**/*.ts',
        './src/**/*.js',
        './public/index.html'
    ],
    css: ['./src/tailwind.css'],
    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
})


module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        autoprefixer,
        ...process.env.NODE_ENV === 'production' ? [purgecss] : []
    ],
};
