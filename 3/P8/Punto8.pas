program linux;

{Se CUENTA con un archivo con información de las diferentes
distribuciones de linux existentes}
type
    record = distribucion
        nom: String; //Irrepetible
        anio: integer;
        numKernel: integer;
        cantDesarrollo: integer;
        descripcion: String;
    end;

    archivo = file of distribucion;

procedure BuscarDistribucion(var a: archivo; d: String; var p: integer);
 var reg, regCabe: distribucion;
 begin
    reset(a);
    read(a, regCabe); //Leo cabecera
    read(a, reg); //Leo 1er registro
    while (not eof (a)) and (reg.nom <> d) do
        read(a, reg);
    if (reg.nom = d) then
        pos:= (FilePos(a) - 1); //Almaceno pos del reg buscado
    else
        pos:= -1; //No existe el archivo buscado
    close(a);
 end;

procedure NuevaDistri(var d: distribucion);
 begin
    d.nom:= 'Mint OS';
    d.anio:= 2012;
    d.numKernel:= 2122;
    d.cantDesarrollo:= 20;
    d.descripcion:= 'Minimalista y Optimo';
 end;

procedure AltaDistribucion(var a: archivo; var d: distribucion);
 var regCabe: distribucion;
     aux, posAux: integer;
 begin
    //Primero corroboramos que la distribucion NO exista en el archivo
    BuscarDistribucion(a, d.nom, posAux);
    if (posAux <> -1) then
        writeln('La distribucion a insertar ya existe en el archivo...');
    else
     begin
        reset(a);
        read(a, regCabe);
        {Supongo en este algoritmo que la marca de borrado
        logico es en el campo de cantDesarrollo, donde almaceno la POS en negativo}
        aux:= regCabe.cantDesarrollo * (-1);
        if (aux > 0) then begin
            seek(a, aux); //Me muevo al espacio a recuperar
            read(a, regCabe); //Almaceno lo que tenia ese espacio. Avanzo
            seek(a, aux); ////Me muevo al espacio a recuperar de nuevo
            write(a, d); //Escribo la nueva distribucion
            seek(a, 0); //Me muevo a la cabecera
            write(a, regCabe); //Re-escribo cabecera nueva
        end
        else begin
            seek(a, filesize(a)); //Me muevo al final del archivo
            write(a, d); //Inserto la distribucion al final del archivo
        end;
        close(a);
     end;
    end;
 end;

procedure BajaDistribucion(var a: archivo; nom: String;);
 var posAux: integer;
     reg, regCabe: distribucion;
 begin
    BuscarDistribucion(a, nom, posAux);
    if (posAux <> -1) then begin
        reset(a);
        read(a, regCabe); //Leo cabecera
        seek(a, posAux); //Voy al registro a eliminar logicamente
        write(a, regCabe); //Escribo lo que estaba en la cabecera en esa POS
        seek(a, 0); //Vuelvo a cabecera
        regCabe.cantDesarrollo:= posAux * (-1); {Marca nueva de espacio disponible en cabecera. Niego la POS}
        write(a, regCabe); //Actualizo cabecera
        close(a):
    end
    else
        writeln('Distribución no existente');
 end;

{Programa PPAL}
var distri: archivo;
    newDistri: distribucion; //Reg
    pos: integer;
BEGIN
 assign(distri, 'nombreArchivo.dat');
 pos:= 0;
 BuscarDistribucion(distri, 'Zorin OS', pos);
 NuevaDistri(newDistri); //Creo una distribucion
 AltaDistribucion(distri, newDistri);
 BajaDistribucion(distri, 'Zorin Lite OS');
END.