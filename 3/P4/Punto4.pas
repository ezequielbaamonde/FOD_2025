{IMPLENTAR MÓDULOS}
program estructura;
type 
    reg_flor = record
        nombre: String[45];
        codigo: integer;
    end;

    tArchFlores = file of reg_flor;

{a}
procedure agregarFlor(var a: tArchFlores; nombre: string; codigo: integer;);
 var flor, reg: reg_flor;
 begin
    flor.nombre:= nombre;
    flor.codigo:= codigo;
    reset(a);
    read(a, reg); //lectura cabecera
    if(reg.codigo < 0) then begin
        pos:= reg.codigo * (-1); //convierto cod negativo a positivo
        seek(a, pos); //pos del registro a recuperar
        read(a, reg); //lectura del registro actual que luego irá a la cabecera
        seek(a, filepos(a)-1); //vuelvo al registro a recuperar
        write(flor); //sobreescribo registro a recuperar y añado flor
        seek(a, 0); //Me paro sobre la cabecera
        write(a, reg); //añado registro recuperado
    end
    else
     begin
        seek(a, filesize(a)); //final del archivo
        write(a, flor); //añado flor
     end;
    close(a);
 end;

procedure listar(var a: tArchFlores);
 var reg: reg_flor;
 begin
    reset(a);
    while (not eof(a)) do begin
        read(a, reg);
        aux:= reg.codigo*(-1);
        if (reg.codigo <> 0) and (aux < 0) then begin
            writeln('Nombre de la flor: ', reg.nombre);
            writeln('Codigo de la flor: ', reg.codigo);
        end;
    end;
    close(a);
 end;


var archivo: tArchFlores;
BEGIN
 assing(archivo, 'flores.dat');
 agregarFlor(archivo, rosa, 123);
 listar(archivo); 
END.