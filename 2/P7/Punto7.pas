program facultad;
const
 VA = 9999;

type
 subNota = 1..10;
 alumnos = record
    cod: integer; //Orden
    ape: string[30];
    nom: string [20];
    cantCursadas: integer;
    cantAprobadas: integer;
 end;
 
 cursadas = record
    codAlu: integer; //Orden 1
    codMat: integer; //Orden 2
    anioCur: integer;
    aprobado: boolean; //Aprobado = True || Desaprobado = False
 end;

 finales = record
    codAlu: integer; //Orden 1
    codMat: integer; //Orden 2
    fecExa: string[10]; // dd/mm/aaaa
    nota: subNota;
 end;

 maestro = file of alumnos; //Se dispone
 arcCursadas = file of cursadas; //Se dispone
 arcFinales = file of finales; //Se dispone

{
> Si un alumno aprueba una cursada, el alumno en el maestro
  incrementa 1 cursada aprobada (cantCursadas).
> Si un alumno aprueba un final con nota >= 4, el alumno en el maestro
  incrementa 1 final aprobado (cantAprobadas)
}
procedure leerMae(var a: maestro; var r: alumnos);
 begin
    if (not eof(a)) then
        read(a, r)
    else
        r.cod:= VA;
 end:

procedure leerFinal(var a: arcFinales; var r: finales);
 begin
    if (not eof(a)) then
        read(a, r)
    else
        r.codAlu:= VA;
 end:

procedure leerCursada(var a: arcCursadas; var r: cursadas);
 begin
    if (not eof(a)) then
        read(a, r)
    else
        r.codAlu:= VA;
 end;

procedure updateMae(var mae: maestro; var detC: arcCursadas; var detF: arcFinales);
 var regF: finales;
     regC: cursadas;
     regMae: alumnos;
 begin
    reset(mae);
    reset(detC);
    reset(detF);
    leerFinal(detF, regF);
    leerCursada(detC, regC);
    leerMae(mae, regMae)
    while (regMae.cod <> VA) do begin
        write('Código de alumno: ', regMae.cod);
        {Analizamos primero detalle de cursadas}
        while (regMae.cod = regC.codAlu) do begin //Ordenado por cod alumno y luego por cod materia
            codMatAct:= regC.codMat;
            while (regMae.cod = regC.codAlu) and (regC.codMat = codMatAct) do begin
                if (regC.aprobado) then regMae.cantCursadas:= regMae.cantCursadas +1;
                leerCursada(detC, regC);
            end; //Si sale es porque el código de alumno cambió o el  código de materia
        end;
        {Analizamos detalle de finales}
        while (regMae.cod = regF.codAlu) do begin
            codMatAct:= regC.codMat;
            while (regMae.cod = regF.codAlu) and (regF.codMat = codMatAct) do begin
                if (regF.nota >= 4) then regMae.cantAprobadas:= regMae.cantAprobadas + 1;
                leerFinal(detF, regF); 
            end;
        end;
        seek(mae, FilePos(mae)-1);
        write(mae, regMae);
    end,
    close(mae);
    close(detF);
    close(detC);
end;