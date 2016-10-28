<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Repositories\MessageBoardRep;

class MessageController extends Controller
{
    private $mbr;

    public function __construct(MessageBoardRep $mbr) {
      $this->mbr = $mbr;
    }

    public function postContent(){
      return $this->mbr->postContent(request());
    }

    public function getList($page=1) {
      return $this->mbr->getList($page);
    }

    public function editMessage() {
      return $this->mbr->editMessage(request());
    }

    public function delMessage() {
      return $this->mbr->delMessage(request());
    }
}
