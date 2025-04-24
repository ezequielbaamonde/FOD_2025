program novelasP3;

type
    novela = record
        cod: integer;
        gen: String;
        nom: String;
        duracion: String;
        director: String;
        precio: real;
    end;

    aNovelas = file of novela;

{creacion}
procedure leerNovela (var r: novela);
 begin
  writeln('Ingrese el codigo de la novela:');
  readln(r.cod);
  if (r.cod <> 0) then begin
    writeln('Ingrese el genero de la novela:');
    readln(r.gen);
    writeln('Ingrese el nombre de la novela:');
    readln(r.nom);
    writeln('Ingrese la duracion de la novela:');
    readln(r.duracion);
    writeln('Ingrese el nombre del director:');
    readln(r.director);
    writeln('Ingrese el precio de la novela:');
    readln(r.precio);
  end;
 end;

procedure iniCabecera (var c: aNovelas; var r: novela);
 begin
 r.cod:= 0;
 r.gen:= '';
 r.nom:= '';
 r.duracion:= '';
 r.director:= '';
 r.precio:= 0;
 write(c, r); //Escribo el reg cabecera en el archivo
 end;

procedure crear();
 var nuevo: aNovelas;
     nom: String;
     reg: novela;
 begin
  writeln('Ingrese el nombre del archivo a crear: ');
  readln(nom);
  assign(nuevo, nom);
  rewrite(nuevo);
  iniCabecera(nuevo, reg);
  leerNovela(reg);
  while (reg.cod <> 0) do begin
    write(nuevo, reg);
    leerNovela(reg);
  end;
  close(nuevo);
 end;

{mantenimientos}
procedure alta (var a: aNovelas);
 var aux, regNov: novela;
     pos: integer;
 begin
  reset(a);
  leerNovela(regNov);
  read(a, aux);
  if (aux.cod < 0) then begin //Si el codigo que hay en mi cabecera es negativo, significa que hay un espacio disponible a ocupar
    pos:= aux.cod * (-1); 
    seek(a, pos); //me dirijo a la posicion positiva del registro a leer
    read(a, aux); //me guardo el registro que hay en esa pos
    seek(a, FilePos(a)-1); //Vuelvo a POS originalmente.
    write(a, regNov); //Escribo la nueva novela en la pos disponible
    seek(a, 0); //Vuelvo a la pos 0 de mi archivo
    write(a, aux); //Escribo el registro que estaba en la pos disponible
  end
  else begin
    seek(a, FileSize(a));
    write(a, regNov);
  end;
  writeln('> ALTA REALIZADA CON EXITO <');
  close(a);
 end;

procedure editarNovela(r: novela);
 begin
  writeln('Ingrese el genero de la novela:');
  readln(r.gen);
  writeln('Ingrese el nombre de la novela:');
  readln(r.nom);
  writeln('Ingrese la duracion de la novela:');
  readln(r.duracion);
  writeln('Ingrese el nombre del director:');
  readln(r.director);
  writeln('Ingrese el precio de la novela:');
  readln(r.precio);
 end;

procedure editar(var a: aNovelas);
 var regNov: novela;
     cod: integer;
 begin
 reset(a);
 writeln('Ingrese el codigo de la novela a modificar: ');
 readln(cod);
 read(a, regNov);
 while (not eof(a)) and (cod <> regNov.cod) do
    read(a, regNov);

 if (regNov.cod = cod) then begin
    editarNovela(regNov); //Sin modificar su codigo
    seek(a, FilePos(a)-1);
    write(a, regNov);
 end
 else
    writeln('No existe ninguna novela con el codigo ingresado...');
 
 close(a);
 end;

procedure baja(var a: aNovelas);
 var cod, pos, auxPos: integer;
     regNov: novela;
 begin
  reset(a);
  writeln('Ingrese el codigo de la novela a eliminar: ');
  readln(cod);
  read(a, regNov);
  while(not eof(a)) and (cod <> regNov.cod) do
    read(a, regNov);
  
  if (regNov.cod = cod) then begin
    pos:= FilePos(a)-1; //Posicion del registro a eliminar
    seek(a, 0); //me muevo al reg cabecera
    read(a, regNov); //leo el reg cabecera
    auxPos:= regNov.cod; //Posicion que figuraba en cabecera
    regNov.cod:= pos * (-1); //Modifico a negativo la pos de mi registro a eliminar
    seek(a, FilePos(a)-1); //Vuelvo a cabecera. Puede ser un seek a 0
    write(a, regNov); //Reescribo la cabecera con el codigo cambiado.
    seek (a, pos); //Me dirijo a mi registro a eliminar
    read(a, regNov); //Lo leo
    regNov.cod:= auxPos; //Coloco el codigo que estaba en la cabecera
    seek(a, pos); //Me reubico allí
    write(a, regNov);
  end
  else
    writeln('No existe ninguna novela con el codigo ingresado...');
  
  close(a);
 end;
 
 {apertura}
procedure abrir();
 var exis: aNovelas;
     nom: String;
     op: integer;
 begin
  writeln('Ingrese el nombre del archivo a abrir: ');
  readln(nom);
  assign(exis, nom);
  writeln('**MENU DE OPERACIONES**');
  writeln('--> 1: Dar de alta una novela por teclado');
  writeln('--> 2: Modificar datos de una novela');
  writeln('--> 3: Eliminar una novela');
  repeat
    writeln('> Ingrese una opcion del menu de operaciones <');
    readln(op);
    case op of
        1: alta(exis);
        2: editar(exis);
        3: baja(exis);
    else
        writeln('Opcion incorrecta -> "0" para salir volver al menu principal...')
    end;
  until(op = 0);
 end;
 
{listado}
procedure listar();
 var exis: aNovelas;
     reg: novela;
     nom: String;
     txt: Text;
 begin
  writeln('Ingrese el nombre del archivo de novelas a listar: ');
  readln(nom);
  assign(exis, nom);
  writeln('Ingrese el nombre que tendra el archivo exportado: ');
  readln(nom);
  assign(txt, nom);
  reset(exis);
  rewrite(txt);
  while (not eof(exis)) do begin
    read(exis, reg);
    writeln(txt, reg.cod, ' ', reg.precio:2:2);
    writeln(txt, reg.gen);
    write(txt, reg.nom);
    writeln(txt, reg.director);
    writeln(txt,reg.duracion);
  end;
  close(exis); close(txt);
 end;


{PROGRAMA PRINCIPAL}
var op: char;
BEGIN
 writeln('**MENU DE OPCIONES**');
 writeln('--> a: Crear archivo y cargarlo por teclado');
 writeln('--> b: Abrir el existente y realizar mantenimiento');
 writeln('--> c: Listar las novelas en un archivo de texto');
 repeat
    writeln('> Ingrese una opcion del menu principal <');
    readln(op);
    case op of
       'a': crear();
       'b': abrir();
       'c': listar();
    else
	 begin
       if (op <> 'z') then
		writeln('Opcion incorrecta -> "z" para salir del programa...');
     end;
    end;
 until (op = 'z');
END.
