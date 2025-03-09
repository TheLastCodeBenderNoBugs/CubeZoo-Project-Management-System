<?php

namespace Tests\Unit;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    // Use RefreshDatabase to ensure the database is rolled back after each test
    use RefreshDatabase;

    /**
     * Test if a task can be created successfully.
     *
     * @return void
     */
    public function test_task_creation()
    {
        $taskData = [
            'title' => 'Test Task',
            'description' => 'This is a test task description.',
            'status' => 'pending',
            'due_date' => '2020-03-05',
            'assigned_person' => '1',
        ];

        $task = Task::create($taskData);

        // Assert that the task is created successfully in the database
        $this->assertDatabaseHas('tasks', $taskData);
    }

    /**
     * Test if a task can be assigned to a user successfully.
     *
     * @return void
     */
    public function test_task_assignment()
    {
        // Create a task
        $task = Task::create([
            'title' => 'Assigned Task',
            'description' => 'This task is assigned to a user.',
            'status' => 'pending',
            'due_date' => '2025-05-03',
            'assigned_person' => '2', // Assigning to user with ID 2
        ]);

        // Assert that the task is assigned to the correct person
        $this->assertEquals(2, $task->assigned_person);
    }
}
