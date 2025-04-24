program punto2;

type
    asistentes = record
        nro: integer;
        ape: String;
        nom: String;
        email: String;
        tel: String;
        dni: String[8];
    end;

    archivo: file of asistentes;

procedure leerAsistente(var r: asistentes);
 begin
  writeln('Ingrese el nro de asistente:');
  readln(r.nro);
  if (r.nro <> 0) then begin
    writeln('Ingrese el apellido del asistente:');
    readln(r.ape);
    writeln('Ingrese el nombre del asistente:');
    readln(r.nom);
    writeln('Ingrese el email del asistente:');
    readln(r.email);
    writeln('Ingrese el telefono del asistente:');
    readln(r.tel);
    writeln('Ingrese el DNI del asistente [HASTA 8 NUMEROS]:');
    readln(r.dni);
  end;
 end;


procedure generarArchivo(d: archivo);
 var a: asistentes;
 begin
  rewrite(d);
  leerAsistente(a);
  while (a.nro <> 0) do begin
    write(d, a);
    leerAsistente(a);
  end;
 close(d);
 end; 

procedure bajaLogica(var d: archivo);
 var a: asistentes;
 begin
  reset(d);
  while(not eof(d)) do begin
   read(d, a);
   if (a.nro < 1000) then begin
    a.ape:= '@' + a.ape;
    seek(d, FilePos(d)-1);
    write(d, a);
   end;
  end;
  close(d);
 end;

var data: archivo;
BEGIN
 assign(data, 'datos.txt');
 generarArchivo(data);
 bajaLogica(data);
 writeln('Programa finalizado...');
END.