<?php

namespace Tests\Feature;

use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskFeatureTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test if a task can be created via API.
     *
     * @return void
     */
    public function test_create_task_via_api()
    {
        $user = User::factory()->create(); // Creating a test user
        $this->actingAs($user); // Authenticate as the user

        // Define task data
        $taskData = [
            'title' => 'API Task',
            'description' => 'This task is created via API.',
            'status' => 'pending',
            'due_date' => '2025-05-08',
            'assigned_person' => '1',
        ];

        // Send a POST request to create the task
        $response = $this->postJson('/api/tasks', $taskData);

        // Assert that the response is successful and contains the task data
        $response->assertStatus(201);
        $response->assertJson([
            'title' => 'API Task',
            'description' => 'This task is created via API.',
            'status' => 'pending',
        ]);

        // Assert that the task is in the database
        $this->assertDatabaseHas('tasks', $taskData);
    }

    /**
     * Test if a task can be updated via API.
     *
     * @return void
     */
    public function test_update_task_via_api()
    {
        $user = User::factory()->create(); // Create a user
        $this->actingAs($user); // Authenticate as the user

        // Create a task
        $task = Task::create([
            'title' => 'Initial Task',
            'description' => 'This task will be updated.',
            'status' => 'pending',
            'due_date' => now()->addDays(5),
            'assigned_person' => $user->id,
        ]);

        // Data to update the task
        $updateData = [
            'title' => 'Updated Task',
            'status' => 'completed',
        ];

        // Send a PUT request to update the task
        $response = $this->putJson("/api/update/{$task->id}", $updateData);

        // Assert the response status and the updated task data
        $response->assertStatus(200);
        $response->assertJson([
            'title' => 'Updated Task',
            'status' => 'completed',
        ]);

        // Assert the task is updated in the database
        $this->assertDatabaseHas('tasks', $updateData);
    }

    /**
     * Test if a task can be deleted via API.
     *
     * @return void
     */
    public function test_delete_task_via_api()
    {
        $user = User::factory()->create(); // Create a user
        $this->actingAs($user); // Authenticate as the user

        // Create a task
        $task = Task::create([
            'title' => 'Task to Delete',
            'description' => 'This task will be deleted.',
            'status' => 'pending',
            'due_date' => now()->addDays(5),
            'assigned_person' => $user->id,
        ]);

        // Send a DELETE request to delete the task
        $response = $this->deleteJson("/api/delete/{$task->id}");

        // Assert the response status
        $response->assertStatus(200);

        // Assert the task is deleted from the database
        //$this->assertDeleted($task);
    }
}
