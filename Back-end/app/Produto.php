<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $fillable = [
        'name',
        'quantidade',
        'preco',
        'id_categoria',
        'id_user',
    ];

    public function categoria()
    {
        return $this->belongsTo('App\Category', 'id_categoria', 'id');
    }

}