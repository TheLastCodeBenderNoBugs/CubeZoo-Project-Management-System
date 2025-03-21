<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('tasks', function () {
        return Inertia::render('tasks');
    })->name('tasks');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('activitylog', function () {
        return Inertia::render('activitylog');
    })->name('activitylog');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('users', function () {
        return Inertia::render('users');
    })->name('users');
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';