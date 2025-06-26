program yerbamate;
const VA = 9999;
      DF = 16;
type
 infoMaestro = record
    codProvincia: integer; //Orden
    nomProv: string[30];
    cantHabitantes: integer;
    cantConsumido: real; // var:0:2
 end;

 infoDetalle = record
    codProvincia: integer; //Orden
    cantConsumido: real;
 end;
 
 maestro = file of infoMaestro; //Se dispone
 detalle = file of infoDetalle;
 vecDet = array [1..DF] of detalle; //Se dispone
 vecReg = array [1..DF] of infoDetalle;


procedure leerMaestro(var m: maestro; var r: infoMaestro);
 begin
    if (not eof(m)) then
     read(m, r)
    else
     r.codProvincia:= VA;
 end;

procedure leerDetalle(var d: detalle; var r: infoDetalle);
 begin
    if (not eof(d)) then
     read(d, r)
    else
     d.codProvincia:= VA;
 end;


procedure minimo(var detalles: vecDet; registros: vecReg; min: infoDetalle);
 var i, pos: integer;
 begin
    min.codProvincia:= VA;
    for i:= 1 to DF do begin
        if (registros[i].codProvincia < min.codProvincia) then begin
            min:= registros[i];
            pos:= i;
        end;
    end;
    if (min.codProvincia <> VA) then leerDetalle(detalles[pos], registros[pos]);
 end;


procedure updateMaster(var mae: maestro; var vDet: vecDet);
 var vReg: vecReg;
     i: integer;
     regMae: infoMaestro;
     min: infoDetalle;
 begin
  reset(mae);
  for i:= 1 to DF do begin
    reset(vDet[i]);
    leerDetalle(vDet[i], vReg[i]); //Cargo vector de registros
  end;
  minimo(vDet, vReg, min);
  leerMaestro(mae, regMae);
  while(regMae.codProvincia <> VA) do begin
    write('Provincia: ', regMae.codProvincia);
    while (regMae.codProvincia = min.codProvincia) do begin
        regMae.cantConsumido:= regMae.cantConsumido + min.cantConsumido; //Acumulo consumos recibidos en detale
        minimo(vDet, vReg, min);
    end;
    if (regMae.cantConsumido > 10000) then begin
        writeln('Provincia de ', regMae.nomProv, ' (Código ', regMae.codProvincia, ') consumió más de 10.000KG de yerba.');
        writeln('Promedio por habitante: ', (regMae.cantConsumido/regMae.cantHabitantes));
    end;
    seek(mae, FilePos(mae)-1);
    write(mae, regMae);
    leerMaestro(mae, regMae);
  end;
  {cierres}
  close(mae);
  for i:=1 to DF do begin
    close(vDet[i]);
    close(vReg[i]);
  end;
 end;


 {MAIN....}