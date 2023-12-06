<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('srv_justificaciones', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_inicio');
            $table->time('hora_inicio');
            $table->date('fecha_inicio');
            $table->time('hora_inicio');
            $table->unsignedInteger('srv_permiso_id');
            $table->unsignedInteger('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('srv_justificaciones');
    }
};
