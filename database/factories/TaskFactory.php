<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $status = fake()->randomElement(['pending', 'in-progress', 'completed']);
        $due = fake()->dateTimeBetween('now', '+1 month');
        return [
            'title' => fake()->sentence,
            'description' => fake()->realText(500),
            'status' => $status,
            'due_date' => $due,
            'created_by' => fake()->numberBetween(1,5),
            'assigned_person' => fake()->numberBetween(1,5)
        ];
    }
}
