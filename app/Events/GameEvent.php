<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

      public $message;
      public $username;
      public $start;
      public $cells;

      public function __construct($username,$message,$start,$cells)
      {
          $this->message = $message;
          $this->username = $username;
          $this->start = $start;
          $this->cells = $cells;
      }

      public function broadcastOn()
      {
          return ['game'];
      }

      public function broadcastAs()
      {
          return 'message';
      }
}
