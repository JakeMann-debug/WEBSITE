<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auto:sanctum')->group(function (){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/user', function (Request $request){
        return $request->users();
    });
});
