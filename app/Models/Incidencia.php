<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidencia extends Model
{
    use HasFactory;

    protected $table = 'srv_incidencias';

    protected $fillable = [
        'detalle_incidencia',
        'usu_alias',
        'departamento'
    ];

}
