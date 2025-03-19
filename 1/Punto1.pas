program punto1;

//1. Realizar un algoritmo que cree un archivo de números enteros no ordenados y permita incorporar datos
//al archivo. Los números son ingresados desde teclado. La carga finaliza cuando se ingresa el número 30000,
//que no debe incorporarse al archivo. El nombre del archivo debe ser proporcionado por el usuario desde
//teclado.

type
	archivo = file of integer;

procedure cargarArchivo(var data: archivo);
 var num: integer;
 begin
	writeln('Ingrese un numero entero: ');
	readln(num);
	while (num <> 30000) do begin
		write(data, num);
		writeln('Ingrese un numero entero: ');
		readln(num);
	end;
	
 end;

var arc: archivo; nom_fis: string[20];

begin
 writeln('Ingrese un nombre para el archivo: ');
 readln(nom_fis);
 assign(arc, nom_fis); //Asigno el archivo lógico al archivo físico "enteros.dat"
 rewrite(arc); //Creo y abro el archivo lógico
 cargarArchivo(arc); //Llamo al procedimiento de carga del archivo
 close(arc); //Ciero el archivo.
 end.
