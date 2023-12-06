<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SrvJustificacion extends Model
{
    use HasFactory;

    protected $table = 'srv_justificaciones';

    protected $fillable = [
        'fecha_inicio',
        'hora_inicio',
        'fecha_inicio',
        'hora_inicio',
        'srv_permiso_id',
        'user_id',
        'detalle'
    ];

    public $timestamps = false;
}
