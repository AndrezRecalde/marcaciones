<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    static function create(array $attributes = [])
    {
        $attributes['user_id'] = auth()->id();

        $marcacion = static::query()->create($attributes);

        return $marcacion;
    }

    function scopeUsuario($query, $usuario)
    {
        if ($usuario) {
            return $query->where('m.user_id', $usuario);
        }
    }

}
