program clinica;

type
 profesional = record
    DNI: integer; //Campo de borrado (0 vacio o -N posición)
    nombre: String;
    apellido: String;
    sueldo: real;
 end;

 tArchivo: file of profesional; //Se asume maestro


procedure crear (var arch: tArchivo; var info: TEXT);
 var p: profesional;
 begin
  rewrite(arch); //Creación y apertura
  //Inicializo registro de cabecera en pos 0
  p.DNI:= 0; p.nombre:= zzz; p.apellido: zzz; p.sueldo: 0;
  write(arch, p);
  //Apertura texto
  reset (info);
  while not eof(info) do begin
    readln(info, p.DNI, p.sueldo, p.nombre);
    readln(info, p.apellido);
    write(arch, p);
  end;
  close(arch); close(info);
 end;

procedure agregar (var arch: tArchivo; p: profesional);
 var regM: info; aux: integer;
  begin
  reset(arch);
  read(arch, regM);
  if (regM.DNI <> 0) then begin
     aux:= regM.DNI * -1; //Calculo pos del reg a reutilizar
     seek(arch, aux); //Me dirijo a pos
     read(arch, regM); //Leo lo que hay en esta pos
     seek(arch, aux); //vuelvo a la pos
     write(arch, p); //escribo profesional en pos a reutilizar
     seek(arch, 0); //Vuelvo a cabecera
     write(arch, regM); //Cambio cabecera
  end
  else begin
    {Inserción al final del archivo}
    seek(arch, FileSize(arch)); 
    write(arch, p);
  end;
 end;

procedure eliminar(var arch: tArchivo; DNI: integer; var bajas: TEXT);
 var regM, regC: info;
 begin
 reset(arch);
 read(arch, regC); //Cabecera
 if (not eof(arch)) then read(arch, regM);

 while (not eof(arch)) and (regM.DNI <> DNI) do 
    read(arch, regM)

 if (regM.DNI = DNI) then begin
    reset (bajas);
    seek(bajas, FileSize(bajas));
    writeln(bajas, regM.DNI, '', regM.sueldo, '', regM.nombre);
    writeln(bajas, regM.apellido);
    close(bajas);
    pos:= FilePos(arch) - 1;
    regM.DNI:= pos * -1;
    seek(arch, pos);
    write(arch, regC); //Colocamos lo que estaba en la cabecera en la pos borrada
    seek(arch, 0);
    write (arch, regM); //Reemplazo cabecera
 end;
 end;