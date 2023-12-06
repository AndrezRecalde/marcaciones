<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        footer {
            position: fixed;
            bottom: -20px;
            left: 0px;
            right: 0px;
            height: 120px;

            /** Extra personal styles **/
            text-align: center;
            border-top: solid 4px green;
            color: green;
        }

        .marginFooter {
            margin-top: 125px;
            bottom: -20px;
            width: 100%;
            text-align: center;
        }
    </style>
    <title>{{ $title }}</title>
</head>

<body>

    <footer>
        <div style="line-height: normal;">
            <p style="font-size: 14px;">Dirección: 10 de Agosto entre Bolívar y Pedro Vicente Maldonado</p>
            <p style="font-size: 14px;">Telefono: 06-2721433</p>
        </div>
    </footer>

    <main class="mb-5">
        @if ($marcaciones[0]->id_empresa === 2)
            <div class="text-center mb-3">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoTransparente.png') }}
                    height="250" width="190">
            </div>
            <div class="text-center mb-5">
                <b>GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS</b>
            </div>
        @else
            <div class="text-center mb-3">
                <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/logo_unamydesc.png') }}
                    height="250" width="190">
            </div>
            <div class="text-center mb-5">
                <b>UNIDAD DE ASISTENCIA MÉDICA Y DESARROLLO SOCIAL Y CULTURAL</b>
            </div>
        @endif
        <p> <b>REPORTE CON FECHAS DE:</b> {{ $fecha_inicio }} hasta {{ $fecha_fin }} </p>
        <table style="width:100%" class="mt-5">
            <tr>
                <th>Fecha</th>
                <th>Funcionario</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
                <th>Atrasos</th>
                <th>Tipo Permiso</th>
                <th>Departamento</th>
            </tr>
            @foreach ($marcaciones as $marcacion)
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
        </table>
    </main>

    <div class="marginFooter">
        <table>
            <tr>
                <td>
                    <div>
                        <p class="mb-5" style="font-size: 12px">Generado por:</p>
                        <hr class="solid margines">
                        <p style="font-size: 14px">{{ $marcaciones[0]->usuario }}</p>
                        <p style="font-size: 14px">{{ $marcaciones[0]->cargo_usuario }}</p>
                    </div>
                </td>


                {{-- <td>
                    <div class="align-item: right;">
                        <p class="mb-5" style="font-size: 12px">Aprobado por:</p>
                        <hr class="solid 2px margines">
                        <p style="font-size: 14px">{{ $marcaciones[0]->director }}</p>
                        <p style="font-size: 14px">{{ $marcaciones[0]->cargo_director }}</p>
                    </div>
                </td> --}}
            </tr>
        </table>
    </div>

</body>

</html>
