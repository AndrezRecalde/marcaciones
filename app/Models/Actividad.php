<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actividad extends Model
{
    use HasFactory;

    protected $table = 'srv_actividades';

    protected $fillable = [
        'actividad',
        'user_id',
        'fecha_actividad',
    ];

    protected $casts = [
        'fecha_actividad' => 'date',
    ];

    static function create(array $attributes = [])
    {
        $attributes['user_id'] = auth()->id();

        $actividad = static::query()->create($attributes);

        return $actividad;
    }
}
