<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;

class MessageController extends Controller
{
    public function test()
    {
        return response()->json(['success' => true]);
    }

    public function index()
    {

        $data = Message::all();

        return response()->json(['data' =>  $data]);
    }


    public function store(Request $request)
    {

        $request->validate([
            'message' => 'required|string',
            'location' => 'required|string',
        ]);


        $newDoc = new Message([
            'message' => $request->input('message'),
            'location' => $request->input('location'),
        ]);

        $newDoc->save();

        return response()->json(['success' => true]);
    }
}
