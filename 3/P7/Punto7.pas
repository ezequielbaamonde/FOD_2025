{Llegue hasta la bajaFisica, corroborar y consultar si el procedimiento
de los corrimientos de registros está ok}
program extincion;
type
    aves = record
        cod: integer;
        nom: String;
        familia: String;
        descrip: String;
        zona: String;
    end;

    archivo: file of aves;

procedure leerAve(a: aves);
 begin
    writeln('Ingrese un codigo de AVE: ');
    readln(a.cod);
    if (a.cod <> 0) then begin
        writeln('Ingrese el nombre de la AVE: ');
        readln(a.nom); 
        writeln('Ingrese la familia de la AVE: ');
        readln(a.familia);
        writeln('Ingrese la descripcion de la AVE: ');
        readln(a.descrip);
        writeln('Ingrese la zona geografica de la AVE: ');
        readln(a.zona);
    end;
 end;

procedure cabecera(var a: archivo);
 var reg: aves;
 begin
    reg.cod:= 0; //indica que no hay elementos borrados
    reg.nom:= 'cabecera';
    reg.familia:= 'cabecera';
    reg.descrip:= 'cabecera';
    reg.zona:= 'cabecera';
    write(a, reg); //escribo reg cabecera inicial
 end;

{No pregunto por la cabecera porque recien se crea el archivo
por ende no se supone que tenga elementos previamente eliminados}
procedure crearArchivo(var arc: archivo);
 var ave: aves;
 begin
    rewrite(arc);
    cabecera(arc);
    leerAve(ave);
    while (ave.cod <> 0) do begin
        write(arc, ave);
        leerAve(ave);
    end;
    close(arc);
 end;

procedure bajaLogica(var arc: archivo);
 var reg: aves;
     cod: integer;
 begin
  writeln('Ingrese el codigo de AVE a borrar: ');
  readln(cod);
  reset(arc);
  read(arc, reg);
  while (not eof(arc)) and (reg.cod <>) do
    readl(arc, reg);
  
  if (reg.cod = cod) then begin
    reg.cod:= reg.cod * (-1);
    seek(arc, filepos(arc)-1);
    write(arc, reg); //marco borrado el elemento encontrado cambiando su codigo a negativo
  end
  else
    writeln('No existen ninguna AVE con ese codigo...');
  close(arc);
 end;

procedure bajaFisica(var arc: archivo);
 var reg, regAux: aves;
     count: integer;
 begin
  reset(arc);
  count:= 0; //Contador de veces que movi un reg atras
  while (not eof(arc)) do begin
    read(arc, reg);
    aux:= reg.cod * (-1);
    {el IF hace los corrimientos al final y a la pos del elem a eliminar}
    if (aux > 0) then begin
      pos:= FilePos(arc) - 1; //Pos reg a eliminar
      seek(arc, FileSize(arc) - count); //final del archivo - corrimientos a la izq
      read(arc, regAux); //Leo reg ubicado en el final
      seek(arc, filepos(arc) - 1); //vuelvo a apuntar al reg final, no a eof
      write(arc, reg); //Escribo elem a borrar
      seek(arc, pos); //Vuelvo a la pos del elem con marca de borrado
      write(arc, regAux); //Muevo elem final a donde tenia el reg a eliminar
      count:= count + 1; //Incremento contador para que el proximo reg a eliminar se mueva x veces hacia la izq desde el final
    end;
  end;
  count:= count - 1; //Si no resto, me muevo un lugar más
  seek(arc, FileSize(arc) - count); //Me muevo al registro a eliminary todo lo que sigue
  truncate(arc);
  close(arc);
 end;

var archi: archivo;

BEGIN
 assign(archi, 'aves.dat');
 crearArchivo(archi);
 bajaLogica(archi);
 bajaFisica(archi);
END.