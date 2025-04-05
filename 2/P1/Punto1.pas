//Archivos Secuenciales ordenados - Algorítmica Clásica
program punto1;

const
	valorAlto = 9999;
type
	empleados = record
		cod: integer; //si es str no compara que sean iguales.
		nom: String [20];
		monto: real;
	end;
	
	archivo = file of empleados;
	
procedure leer (var arc: Text; var dat: empleados);
 begin
	if (not eof(arc)) then begin
		readln (arc, dat.cod, dat. monto); //Almaceno el registro leido en dato con cada campo
		readln(arc, dat.nom);
	end
	else
		dat.cod:= valorAlto; //Si es el fin, le asigno un valor alto al dato
 end;	
	
procedure genArchivo(var det: Text; var n: archivo);
 var regDet, regN: empleados;
	 regCod: integer; regNom: String[20];
	 total: real;
 begin
	reset(det); rewrite(n); //Abro detalle y abro creo archivo nuevo
	leer (det, regDet); //leo primer registro del detalle
	while (regDet.cod <> valorAlto) do begin
		total:= 0; //Seteamos el total temporal del cod leído
		regCod:= regDet.cod; //almaceno el cod del empleado del detalle que se leyó
		regNom:= regDet.nom; //Almaceno el nombre del cod empleado que se leyó
		
		while (regDet.cod <> valorAlto) and (regCod = regDet.cod) do begin
			total:= total + regDet.monto; //Acumulo total
			leer(det, regDet); //Leo registro
		end;
		
		//Almaceno campo por campo los valores del nuevo reg para el archivo
		regN.cod:= regCod;
		regN.nom:= regNom;
		regN.monto:= total;
		{writeln('Registro guardado:');
		writeln(regN.cod);
		writeln(regN.nom);
		writeln(regN.monto);}
		write(n, regN); //Escribo en el nuevo archivo
	end;
	close(det); close(n);
 end;
 
//Exportar de BINARIO a TEXTO
procedure exp(var data: archivo; var dataT: Text);
 var emp: empleados;
 begin
	assign(dataT, 'Exportado.txt'); //NomLógico, NomFísico
	reset(data); //Abro archivo binario
	rewrite(dataT); //Creo y abro archivo de texto 
	while not eof(data) do begin
		read(data, emp); //Leo empleado del archivo binario
		with emp do writeln(cod:5, monto:5, nom:5); //Escribo en pantalla el registro para corroborar cada 1
		with emp do writeln(dataT, ' ', cod, ' ', monto:2:2, ' ', nom); {Escribe en el archivo de texto los campos separados
		por un caracter en blanco}
	end;
	close(data); close (dataT);
 end;
 
var detalle, newT: Text; new: archivo; //Del detalle genero el arhivo "MAESTRO"
BEGIN
	assign(detalle, 'Empleados.txt'); //Archivo a leer
	assign (new, 'Resumen.txt'); //Archivo nuevo
	writeln('** Generando archivo BINARIO de Empleados **');
	genArchivo(detalle, new);
	writeln('');
	writeln('**Exportandolo a TXT...**');
	exp(new, newT);
END.
