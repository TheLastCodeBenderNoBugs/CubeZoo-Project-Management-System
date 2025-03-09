<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('task_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('task_id'); // Reference to tasks table
            $table->string('action'); // 'created', 'updated', or 'deleted'
            $table->json('changes')->nullable(); // Store changed values
            $table->timestamps();

            /*$table->foreign('task_id')->references('id')->on('tasks')->onDelete('cascade');*/
        });
    }

    public function down()
    {
        Schema::dropIfExists('task_logs');
    }
};
