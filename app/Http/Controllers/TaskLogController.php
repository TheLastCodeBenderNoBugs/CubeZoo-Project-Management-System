<?php

namespace App\Http\Controllers;

use App\Models\TaskLog;
use Illuminate\Http\Request;

class TaskLogController extends Controller
{
    public function index()
    {
        return response()->json(TaskLog::latest()->get());
    }
}

