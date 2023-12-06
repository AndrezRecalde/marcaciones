<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Marcacion extends Model
{
    use HasFactory;

    protected $table = 'srv_marcaciones';

    protected $fillable = [
        'fecha',
        'reg_entrada',
        'reg_salida',
        'user_id'
    ];

    protected $casts = [
        'fecha' => 'date',
    ];

    /* static function create(array $attributes = [])
    {
        $attributes['user_id'] = auth()->id();

        $marcacion = static::query()->create($attributes);

        return $marcacion;
    } */

    function justificaciones() : BelongsToMany {
        return $this->belongsToMany(User::class, 'srv_justificaciones', 'srv_marcacion_id', 'user_id');
    }

    function scopeUsuario($query, $usuario)
    {
        if ($usuario) {
            return $query->where('m.user_id', $usuario);
        }
    }

    function scopeFecha($query, $fecha)
    {
        if ($fecha) {
            return $query->where('m.fecha', $fecha);
        }
    }

    function scopeFechas($query, $fecha_inicio, $fecha_fin)
    {
        if ($fecha_inicio) {
            return $query->whereBetween('m.fecha', [$fecha_inicio, $fecha_fin]);
        }
    }

    function scopeDepartamento($query, $departamento)
    {
        if ($departamento) {
            return $query->where('d.cdgo_dprtmnto', $departamento);
        }
    }
}
