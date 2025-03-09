<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskLog extends Model
{
    use HasFactory;

    protected $fillable = ['task_id', 'action', 'changes'];

    protected $casts = [
        'changes' => 'array', // Automatically converts JSON to array
    ];
}
