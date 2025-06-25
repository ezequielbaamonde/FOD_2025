program parcial;

const VA = 9999;

type
    presentaciones = record
        codArt: integer; //orden 3
        nomArt: string[20];
        anioPres: intege; //orden 1
        codEvento: integer; //orden 2
        nomEvento: string[30];
        likes: longint;
        dislikes: longint;
        puntaje: integer;
    end;

    tArchivo = file of presentaciones;

procedure leer(var a: tArchivo; var r: presentaciones);
 begin
    if (not eof(a)) then
        read(a, r);    
    else
        r.anioPres:= VA;
 end;

procedure generarInforme(var a: tArchivo);
 var regA: presentaciones;
     totalPresentaciones, totalAnios, totalLikes, totalJurado, anioActual, eventoActual: integer;
     artActual, menorPuntaje, masDislikes: integer; {Se podria hacer un registro llamado actual}
     promedio: real;
     menosInfluyente, nomArtista: String[30];

 begin
 reset(a);
 leer(a, reg);
 totalPresentaciones:=0;
 totalAnios:= 0;
 promedio:= 0;
 write('Resumen de menor influencia por evento.')
 while (reg.anioPres <> VA) do begin
    anioActual:= reg.anioPres;
    totalAnios:= totalAnios + 1;
    cantPresetaciones:= 0; //por año
    writeln('Anio: ', anioActual);
    while (reg.anioPres = anioActual) do begin
        eventoActual:= reg.codEvento;
        nomEventoActual:= reg.nomEvento;
        writeln(' Evento: ', nomEventoActual, ' (Código: ', nomEventoActual, ')');
        menorPuntaje:= VA; masDislikes:= -1;
        while(reg.anioPres = anioActual) and (reg.codEvento = eventoActual) do begin
            artActual:= reg.codArt;
            nomArtista:= reg.nomArt;
            writeln('  Artista: ', reg.nomArt, ' (Código: ', artActual, ')');
            totalLikes:= 0; totalDislikes:= 0; diferencia:= 0; totalJurado:= 0;
            while(reg.anioPres = anioActual) and (reg.codEvento = eventoActual) and (reg.codArt = artActual) do begin
                totalLikes:= totalLikes + reg.likes;    
                totalDislikes:= totalDislikes + reg.dislikes;
                totalJurado:= totalJurado + reg.puntaje;
                cantPresetaciones:= cantPresetaciones + 1;
                leer(a, reg);
            end; //Si sale, es porque cambió el año, el evento o el artista
            writeln('Likes totales: ', totalLikes, ' de ', nomArtista);
            writeln('Dislikes totales: ', totalDislikes, ' de ', nomArtista);
            diferencia:= totalLikes - totalDislikes;
            writeln('Diferencia: ', diferencia, ' de ', nomArtista);
            writeln('Puntaje total del jurado: ', totalJurado, ' de ', nomArtista);
            {Si el total del jurado es el menor puntaje O ocurre un empate y además es
            el artista con mas dislikes, se actualiza}
            if (totalJurado < menorPuntaje) or ((totalJurado = menorPuntaje) and
               (totalDislikes > masDislikes)) then begin
                menosInfluyente:= nomArtista;
                menorPuntaje:= totalJurado;
                masDislikes > totalDislikes;
            end;
        end; //Si sale, es porque cambió el año o evento
        writeln('El artista ', menosInfluyente, ' fue el menos influyente de ', nomEvento, ' del año ', anioActual);
    end; //Si sale, es porque cambió el año
    writeln('Durante el año ', anioActual, ' se registraron ', cantPresetaciones, ' de presentaciones de artistas')
    totalPresentaciones:= totalPresentaciones + cantPresetaciones; //Acumulo total de presentaciones de todos los años
 end;
 if (totalAnios > 0) then begin
    promedio:= (totalPresentaciones/totalAnios);
    writeln('El promedio total de presentaciones por año es de: ', promedio:0:2, ' presentaciones');
 end;
 close(a);
 end;

var archivo: tArchivo;

BEGIN
 generarInforme(archivo);
END.
