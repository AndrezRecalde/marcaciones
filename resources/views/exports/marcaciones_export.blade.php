<table>
    <thead>
    <tr>
        <th>Fecha</th>
        <th>Empleado</th>
        <th>RegEntrada</th>
        <th>RegSalida</th>
        <th>Atrasos</th>
        <th>TipoPermiso</th>
        <th>Departamento</th>
    </tr>
    </thead>
    <tbody>
    @foreach($marcaciones as $marcacion)
        <tr>
            <td>{{ $marcacion->current_fecha }}</td>
            <td>{{ $marcacion->usuario }}</td>
            <td>{{ $marcacion->reg_entrada }}</td>
            <td>{{ $marcacion->reg_salida }}</td>
            <td>{{ $marcacion->atraso <= '00:00:00' ? '' : $marcacion->atraso }}</td>
            <td>{{ $marcacion->nombre_permiso }}</td>
            <td>{{ $marcacion->departamento }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
