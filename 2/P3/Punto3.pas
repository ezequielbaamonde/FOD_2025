program alfabetizacion;

type
	nombre = String [20];
	alfabetizacion = record
		prov: nombre;
		cantPersonas: integer;
		totalEncuestados: integer;
	end;
	
	agencias = record
		prov: nombre;
		codLoc: integer;
		cantPersonas: integer;
		cantEncuestas: integer;
	end;
	
	detalle = file of agencias; //ordenados por nombre de provincia
	maestro = file of alfabetizacion; //ordenados por nombre de provincia


procedure convDetalle(var cargaD: Text; var arcD: detalle); 
 var a: agencias; //registro de ventas
 begin
  reset(cargaD); //Abro archivo de carga
  rewrite(arcD); //Creo archivo binario
  while not eof(cargaD) do begin
	readln(cargaD, a.prov); //Leo txt
	readln(cargaD, a.codLoc, a.cantPersonas, a.cantEncuestas); //Leo txt
	write(arcD, a); //Escribo binario
  end;
  writeln('*Convertido detalle.txt a BINARIO*');
  writeln('');
  close(cargaD); close(arcD); //Cierre de archivos
 end;

procedure convMaestro(var cargaM: Text; var arcM: maestro); 
 var a: alfabetizacion; //registro de ventas
 begin
  reset(cargaM); //Abro archivo de carga
  rewrite(arcM); //Creo archivo binario
  while not eof(cargaM) do begin
	readln(cargaM, a.prov); //Leo txt
	readln(cargaM, a.cantPersonas, a.totalEncuestados); //Leo txt
	write(arcM, a); //Escribo binario
  end;
  writeln('*Convertido detalle.txt a BINARIO*');
  writeln('');
  close(cargaM); close(arcM); //Cierre de archivos
 end;
