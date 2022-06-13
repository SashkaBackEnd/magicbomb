<?php

namespace App\Http\Controllers;

use App\Events\GameEvent;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function message(Request $request) {
    	event(new GameEvent($request->username, $request->message,$request->start, $request->sells));
    	return [
    		"success" => true
    	];
    }
}
