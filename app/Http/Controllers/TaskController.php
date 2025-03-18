<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\TaskLog;

class TaskController extends Controller
{
   public function index()
   {
      $tasks = Task::orderby('created_at', 'desc')->get();
      return $tasks;
   }

   public function destroy($id)
   {
      $task = Task::find($id);

      if (!$task) {
         return response()->json(['message' => 'Task not found'], 404);
      }

      $task->delete();

      return response()->json(['message' => 'Task deleted successfully'], 200);
   }

   public function update(Request $request, $id)
   {
      $task = Task::find($id);

      if (!$task) {
         return response()->json(['message' => 'Task not found'], 404);
      }

      $validated = $request->validate([
         'title' => 'string',
         'description' => 'string',
         'status' => 'string',
         'due_date' => 'string',
         'assigned_person' => 'string',
      ]);

      $task->update($validated);

      return response()->json(['message' => 'Task updated successfully', 'task' => $task], 200);
   }

   public function show() {}

   public function create(Request $request)
   {
      // Validate the incoming request
      $validated = $request->validate([
         'title' => 'string',
         'description' => 'string',
         'status' => 'string',
         'due_date' => 'string',
         'assigned_person' => 'string',
      ]);

      // Create the task record in the database
      $task = Task::create($validated);

      // Return the created task and 201 status code (Created)
      return response()->json($task, 201);
   }
}
