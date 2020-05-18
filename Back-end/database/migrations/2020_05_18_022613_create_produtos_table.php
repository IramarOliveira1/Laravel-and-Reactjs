<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdutosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
           $table->increments('id');
            $table->string('name');
            $table->integer('quantidade');
            $table->double('preco');
            $table->integer('id_categoria')->unsigned();
            $table->integer('id_user')->unsigned();
            $table->timestamps();
            $table->foreign('id_categoria')->references('id')->on('categories');
            $table->foreign('id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produtos');
    }
}
