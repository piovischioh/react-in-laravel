<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;

class TodoController extends Controller
{
    public function add(){
      $mysqli = new mysqli('localhost','root','','mytest');
      if (isset($_POST['name'])){
          $sql = sprintf("INSERT INTO `messenge_board`(`id`, `name`, `email`, `number`, `content`)
          VALUES (
              null, '%s', '%s', '%s', '%s', '%s')",
              $mysqli->escape_string($_POST['name']),
              $mysqli->escape_string($_POST['email']),
              $mysqli->escape_string($_POST['number']),
              $mysqli->escape_string(strip_tags($_POST['content']))
          );
         echo $sql;
          $mysqli->query($sql);
          header("Refresh:0");
      };
    }
}
