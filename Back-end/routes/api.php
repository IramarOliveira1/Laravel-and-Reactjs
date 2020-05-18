<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/login', 'Api\\AuthController@login');

Route::post('/store', 'Api\\UserController@store');

Route::group(['middleware' => ['apiJwt']],function () {
    Route::post('auth/logout', 'Api\\AuthController@logout');

    Route::get('/produtos', 'Api\\ProdutoController@index'); 

    Route::get('/category', 'Api\\CategoryController@index');
    
    Route::post('/store/category', 'Api\\CategoryController@store');

    Route::delete('/delete/category/{id}', 'Api\\CategoryController@destroy');

    Route::put('/update/category/{id}', 'Api\\CategoryController@update');

});