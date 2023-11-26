<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
    <style>
        /* @page {
            margin: 0.5in 0.5in 0.2in 0.8in;
        } */

        .marginMain {
            margin: 0.5in 0.5in 0.2in 0.5in;
        }

        body {
            background-image: url("https://prefecturadeesmeraldas.gob.ec/wp-content/uploads/2023/11/FondoArchivo7.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

        .margines {
            margin-top: 80px;
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
            position: static;
            bottom: -80px;
            left: 0px;
            right: 0px;
            height: 400px;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            /* border: 1px solid #dddddd; */
            text-align: left;
            padding: 8px;
        }

        /* tr:nth-child(even) {
            background-color: #dddddd;
        } */
    </style>

    <title>{{ $title }}}</title>
</head>

<body>

    {{-- <footer>
        <div style="line-height: normal;">
            <p style="font-size: 14px;">Dirección: 10 de Agosto entre Bolívar y Pedro Vicente Maldonado</p>
            <p style="font-size: 14px;">Telefono: 06-2721433</p>
        </div>
    </footer> --}}


    <main class="mb-5">
        <div class="text-center mb-3">
            <img class="img-fluid" alt="logo" src={{ public_path('/assets/images/LogoTransparente.png') }}
                height="380" width="320">
        </div>
        <div class="text-center mb-3">
            <b>GOBIERNO AUTÓNOMO DESCENTRALIZADO DE LA PROVINCIA DE ESMERALDAS</b>
        </div>
        <table style="width:100%">
            <tr>
                <td width="80px"><b>DE:</b></td>
                <td>{{ $actividades[0]->usuario }}</td>
            </tr>

            @if ($actividades[0]->crgo_id !== 5)
                <tr>
                    <td width="80px"><b>PARA:</b></td>
                    <td>
                        {{ $actividades[0]->director }}
                        <sub><i>{{ $actividades[0]->cargo_director . ' DE ' . $actividades[0]->departamento }}</i></sub>
                    </td>

                </tr>
            @endif
            <tr>
                <td width="80px"><b>ASUNTO:</b></td>
                <td>{{ $title }}</td>
            </tr>
            <tr>
                <td width="80px"><b>FECHA:</b></td>
                <td>{{ $current_fecha }}</td>
            </tr>
        </table>

        <p class="mt-3" style="text-align: justify;">El presente informe presenta un detalle de las actividades
            realizadas durante el período {{ $fecha_inicio }} hasta {{ $fecha_fin }}.
            Estas actividades en las cuales me desempeñé en el marco de mis responsabilidades laborales están alineadas
            con los objetivos establecidos del departamento de {{ $actividades[0]->departamento }}.
        </p>
        <p>A continuación, detallo las siguientes actividades realizadas: </p>
        <div class="mt-3 mb-3">
            <table style="width:100%;">
                <tr>
                    <th><b>FECHA:</b></th>
                    <th><b>ACTIVIDAD</b></th>
                </tr>
                @foreach ($actividades as $actividad)
                    <tr>
                        <td width="150px">{{ $actividad->current_fecha }}</td>
                        <td style="text-align: justify;">{{ $actividad->actividad }}</td>
                    </tr>
                @endforeach
            </table>
        </div>
    </main>

    <div class="marginFooter">
        <table>
            <tr>
                <td>
                    <div>
                        <p class="mb-5" style="font-size: 12px">Generado por:</p>
                        <hr class="solid margines">
                        <p style="font-size: 14px">{{ $actividades[0]->usuario }}</p>
                        <p style="font-size: 14px">{{ $actividades[0]->cargo_usuario }}</p>
                    </div>
                </td>


                @if ($actividades[0]->crgo_id !== 5)
                    <td>
                        <div class="align-item: right;">
                            <p class="mb-5" style="font-size: 12px">Aprobado por:</p>
                            <hr class="solid 2px margines">
                            <p style="font-size: 14px">
                                {{ $actividades[0]->crgo_id === 5 ? 'González Cervantes Mónica Alexandra' : $actividades[0]->director }}
                            </p>
                            <p style="font-size: 14px">
                                {{ $actividades[0]->crgo_id === 5 ? 'DIRECTOR/A' : $actividades[0]->cargo_director }}
                            </p>
                        </div>
                    </td>
                @endif
            </tr>
        </table>
    </div>



</body>

</html>
