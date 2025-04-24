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

procedure eliminarFlor(var a: tArchFlores; f: reg_flor);
 var reg: reg_flor; pos: integer;
 begin
    reset(a);
    read(a, reg); //lectura cabecera 1° registro
    {busco la flor}
    while (not eof(a)) and (reg.codigo <> f.codigo) do begin
        read(a, reg);
    end;

    if (reg.codigo = f.codigo) then begin {evaluo si salí del while porque encontre la flor}
        pos:= filepos(a)-1; //almaceno pos de la flor a eliminar
        seek(a, 0); //voy a cabecera
        read(a, reg); //me traigo reg cabecera
        seek(a, pos); //vuelvo a la flor que encontre
        write(a, reg); //marco reg eliminado
        seek(a, 0); //vuelvo a cabecera
        reg.codigo:= pos * (-1); //niego la pos donde encontre el elemento
        write(a, reg); //esribo el reg cabecera con el codigo (pos elemento borrado) negado
    end
    else writeln('La flor no se encuentra en el archivo...');
    close(a);
 end;


var archivo: tArchFlores; flor: reg_flor;
BEGIN
 assing(archivo, 'flores.dat');
 agregarFlor(archivo, rosa, 123);
 listar(archivo); 
 {Módulo 'delete' implementado como en enunciado}
 flor.nombre:= rosa;
 flor.codigo:= 123;
 eliminarFlor(archivo, flor);
END.