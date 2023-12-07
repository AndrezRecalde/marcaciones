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

    function scopeUsuario($query, $user_id)
    {
        if ($user_id) {
            return $query->where('srvj.user_id', $user_id);
        }
    }

    function scopeFechas($query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('srvj.fecha', [$fecha_inicio, $fecha_fin]);
        }
    }
}
