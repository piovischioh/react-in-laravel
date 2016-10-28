<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/


Route::get('/', function () {
  return view('test');
});

Route::get('list/{page?}', 'MessageController@getList');
Route::post('content', 'MessageController@postContent');
Route::post('edit', 'MessageController@editMessage');
Route::post('del', 'MessageController@delMessage');
//
// Route::post('/', function () {
//   $mysqli = new mysqli('localhost','root','','mytest');
//   if (isset($_POST['name'])){
//       $sql = sprintf("INSERT INTO `messenge_board`(`id`, `name`, `email`, `number`, `content`)
//       VALUES (
//           null, '%s', '%s', '%s', '%s')",
//           $mysqli->escape_string($_POST['name']),
//           $mysqli->escape_string($_POST['email']),
//           $mysqli->escape_string($_POST['number']),
//           $mysqli->escape_string(strip_tags($_POST['content']))
//       );
//       $mysqli->query($sql);
//       echo true;
//   };
// });
// // Route::post('/', 'TodoController@add');
