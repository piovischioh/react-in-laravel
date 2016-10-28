<?php
$mysqli = new mysqli('localhost','root','','mytest');
if ($mysqli->connect_errno){
    echo $mysqli->connect_error;
}
$mysqli->query("SET NAMES utf8");
if(! isset($_SESSION)) {
    session_start();
}
$per_page = 6;
$page_num = isset($_GET['page_num']) ? intval($_GET['page_num']) : 1;
$sql = sprintf("SELECT * FROM `messenge_board` ORDER BY id DESC LIMIT %s, %s ", ($page_num-1)*$per_page, $per_page);
$result = $mysqli->query($sql);

$t_result = $mysqli->query("SELECT 1 FROM `messenge_board`");
$rows = $t_result->num_rows;//轉換為筆數
$total_pages = ceil($rows/$per_page);

// if (isset($_POST['name'])){
//     $sql = sprintf("INSERT INTO `messenge_board`(`id`, `name`, `email`, `number`, `content`)
//     VALUES (
//         null, '%s', '%s', '%s', '%s')",
//         $mysqli->escape_string($_POST['name']),
//         $mysqli->escape_string($_POST['email']),
//         $mysqli->escape_string($_POST['number']),
//         $mysqli->escape_string(strip_tags($_POST['content']))
//     );
//     $mysqli->query($sql);
//     header("Refresh:0");
// };

?>
<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <meta name="_token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{elixir("css/main.css")}}">
    <style>

    </style>
</head>
<body>
<div class="container">
  <table border="1">
      <tr>
          <th class="active">NO.</th>
          <th class="active">Name</th>
          <th class="active">Email</th>
          <th class="active">Number</th>
          <th class="active">Content</th>
          <th class="active">Delete</th>
      </tr>
      <?php while($row = $result->fetch_assoc()): ?>
      <tr>
          <td><?= $row['id']?></td>
          <td><?= $row['name']?></td>
          <td><?= $row['email']?></td>
          <td><?= $row['number']?></td>
          <td><?= htmlentities($row['content'])?></td>
          <td>
              <a href="javascript:delete_it(<?= $row['id']?>)">
                  <span id="delete" class="">x</span>
              </a>
          </td>
      </tr>
      <?php endwhile; ?>
    </table>
    <nav>
        <div class="controler">
          <?php
          if ($page_num==1):
            echo '&lt;&lt;&nbsp;&nbsp;';echo '&lt;&nbsp&nbsp';
          else:
            echo '<a href="?page_num=1">&lt;&lt;</a>&nbsp&nbsp';echo '<a href="?page_num='.($page_num-1).'">&lt;</a>&nbsp;&nbsp;';
          endif;
          for ($i=1;$i<=$total_pages;$i++):
            if ($page_num==$i){
              printf('%s&nbsp;&nbsp;',$i);
            }else{
              printf("<a href=\"?page_num=%s\">%s</a>&nbsp;&nbsp;",$i,$i);
            }
          endfor;
          if ($page_num==$total_pages):
            echo '&gt;&nbsp;&nbsp;';echo '&gt;&gt;&nbsp;&nbsp;';
          else:
            echo '<a href="?page_num='.($page_num+1).'">&gt;</a>&nbsp&nbsp';echo '<a href="?page_num='.$total_pages.'">&gt;&gt;</a>&nbsp&nbsp';
          endif;?>
        </div>
        <div class="total">
          total:<?= $rows ?>
        </div>
    </nav>
</div>
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous">
</script>
<script src="{{ elixir("js/all.js") }}"></script>
</body>
</html>
