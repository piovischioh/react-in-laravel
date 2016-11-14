<?php

namespace App\Repositories;

use App\Models\MessageBoard;

class MessageBoardRep {
  private $mb;
  private $pageSize = 15;

  public function __construct(MessageBoard $mb) {
    $this->mb = $mb;
  }

  public function getList($page=1) {
    return $this->mb->select('id', 'name', 'email', 'number', 'content', 'edit', 'created_at')
                ->orderBy('created_at', 'desc')
                ->skip(($page-1) * $this->pageSize)
                ->take($this->pageSize)
                ->get()
                ->toArray();
  }

  public function postContent($params) {
    return $this->mb->create([
      'name'    => $params->name,
      'email'   => $params->email,
      'number'  => $params->number,
      'content' => $params->content,
    ]);
  }

  public function delMessage($params) {
    return $this->mb->where('id', $params->id)
                    ->delete();
  }

  public function editMessage($params) {
    $aUpdData = [];
    if (isset($params->name))    { $aUpdData['name']    = $params->name; }
    if (isset($params->email))   { $aUpdData['email']   = $params->email; }
    if (isset($params->number))  { $aUpdData['number']  = $params->number; }
    if (isset($params->content)) { $aUpdData['content'] = $params->content; }
    if (isset($params->edit))    { $aUpdData['edit']    = $params->edit; }
    return $this->mb->where('id', $params->id)
                    ->update($aUpdData);
  }
}
