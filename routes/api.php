<?php

use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskLogController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']); // Get all users
Route::post('/users', [UserController::class, 'store']); // Create a user
Route::get('/users/{id}', [UserController::class, 'show']); // Get a single user
Route::put('/users/{id}', [UserController::class, 'update']); // Update user
Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete user

Route::get('/task-logs', [TaskLogController::class, 'index']);
Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/create', [TaskController::class, 'create']);
Route::put('/update/{id}', [TaskController::class, 'update']);
Route::delete('/delete/{id}', [TaskController::class, 'destroy']);



