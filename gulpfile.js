const elixir = require('laravel-elixir');
const path = require('path');
require('laravel-elixir-webpack-official');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir.webpack.mergeConfig({
 module: {
   loaders: [{
     test: /\.(js||jsx)?$/,
     loaders: ['babel'],
     include: path.join(__dirname, 'resources', 'assets')
   }]
 },
 resolve: {
   extensions: ['', '.js', '.jsx']
 },
});

elixir(mix => {
    mix.sass('main.sass')
      //  .webpack(['test.js'])
       .webpack(['new.js'])
       .version(['js/*.js', 'css/*.css']);
});
