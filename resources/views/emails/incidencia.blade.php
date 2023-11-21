<x-mail::message>
## Nueva Solicitud
### Asistencia Técnica

Buen día.

El funcionario: {{ $incidencia['usu_alias'] }} <br>
Con correo: {{ $incidencia['email'] }} <br>
del departamento: {{ $incidencia['departamento'] }} <br><br>

### Descripción del problema:<br>
{{ $incidencia['detalle_incidencia'] }}


<br><br>
Por favor para más información contáctese con el funcionario solicitante
a tráves de su correo institucional u otro medio de comunicación.


### Por favor no responder a este mensaje

Gracias,<br>
{{ config('app.name') }}
</x-mail::message>
