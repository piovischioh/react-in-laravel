<?php

namespace App\Repositories;

use App\Models\MessageBoard;

class MessageBoardRep {
  private $mb;
  private $pageSize = 15;

  public function __construct(MessageBoard $mb) {
    $this->mb = $msg;
  }

  public function getList($page=1) {
    return $this->mb->select('id', 'name', 'email', 'number', 'content', 'created_at')
                ->orderBy('created_at', 'desc')
                ->skip(($page-1) * $pageSize)
                ->take($pageSize)
                ->get()
                ->toJson();
  }

  public function postContent($name, $email, $number, $content) {
    return $this->mb->create([
      'name'    => $name,
      'email'   => $email,
      'number'  => $number,
      'content' => $content,
    ]);
  }
}
