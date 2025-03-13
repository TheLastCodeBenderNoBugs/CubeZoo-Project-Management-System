<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TaskLog;

class Task extends Model
{
    protected $fillable = ['title', 'description', 'status', 'due_date', 'assigned_person', 'created_by'];
    /** @use HasFactory<\Database\Factories\TaskFactory> */

    /** Track activity in the Task model */
    protected static function boot()
    {
        parent::boot();

        static::created(function ($task) {
            TaskLog::create([
                'task_id' => $task->id,
                'action' => 'created',
                'changes' => json_encode($task->toArray()),
            ]);
        });

        static::updated(function ($task) {
            TaskLog::create([
                'task_id' => $task->id,
                'action' => 'updated',
                'changes' => json_encode($task->getChanges()),
            ]);
        });

        static::deleted(function ($task) {
            TaskLog::create([
                'task_id' => $task->id,
                'action' => 'deleted',
                'changes' => json_encode(['id' => $task->id]),
            ]);
        });

    }
    use HasFactory;
}
