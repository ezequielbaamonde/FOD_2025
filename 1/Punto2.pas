//2. Realizar un algoritmo, que utilizando el archivo de números enteros no ordenados creado en el ejercicio 1,
//informe por pantalla cantidad de números menores a 1500 y el promedio de los números ingresados. El nombre del
//archivo a procesar debe ser proporcionado por el usuario una única vez. Además, el algoritmo deberá listar el
//contenido del archivo en pantalla.
type
	archivo = file of integer;
	
function promedio(nums:real; coc: integer): real;
 begin
	promedio:= nums/coc; //los números sumados del archivo sobre la cantidad de enteros en el.
 end;
 	
procedure recorrido(var data: archivo; var m: integer; var t: integer; var e: integer);
 var num: integer;
 begin
	reset(data); //Apertura del archivo
	while not eof(data) do begin //mientras no se llego al final del archivo
	 read (data, num); //leo (nom_log, variable)
	 writeln('Numero ', FilePos(data), ':', num); //Me está trayendo la POS del siguiente num, lo uso para que se comprenda mejor el write
	 
	 if (num < 1500) then m:= m+1; //Si el valor leído es menor a 1500, incremento contador.
	 
	 t:= t + num; //acumulo valor leído al parametro p
	 e:= e+1; //Sumo la cantidad de enteros en el archivo
	end; 
 end;
 
var arcApertura: archivo; menores, total, elems: integer; prom: real; nomFis: string[20];

BEGIN
 writeln('Ingrese el nombre del archivo al que operar: ');
 read(nomFis);
 assign (arcApertura, nomFis); //asigno nombre logico al archivo ya creado
 
 menores:= 0; total:= 0; elems:= 0;
 recorrido(arcApertura, menores, total, elems);
 
 writeln('La cantidad de numeros menores a 1500 son: ', menores);
 
 prom:= promedio(total, elems); //Calculo promedio a devolver.
 writeln('El promedio de esos numeros da: ', prom:1:2);
 
 close(arcApertura)
END.	
