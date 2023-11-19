<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    use HasFactory;

    protected $table = 'srv_asistencias';

    protected $fillable = [
        'detalle_asistencia',
        'user_id'
    ];

    static function create(array $attributes = [])
    {
        $attributes['user_id'] = auth()->id();

        $actividad = static::query()->create($attributes);

        return $actividad;
    }
}
