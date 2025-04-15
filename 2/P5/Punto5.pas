{Consultar cómo seria la creación del maestro teniendo en cuenta el orden de cada campo}

program LAN;
const
	DF = 5;
	valorAlto = 9999;
	stringAlto = 'ZZZZ';
type
	infoDetalle = record
		cod_usuario: integer;
		fecha: String[10]; // dd/mm/aaaa
		tiempo_sesion: integer;
	end;
	
	infoMaestro = record
		cod_usuario: integer;
		fecha: String[10]; // dd/mm/aaaa
		tiempo_total_de_sesiones_abiertas: integer;
	end;
	
	maestro = file of infoMaestro;
	detalle = file of infoDetalle;
	
	maquinas = array [1..DF] of detalle; //Array de archivos detalle
	maquinasReg = array [1..DF] of infoDetalle; //Array de registros detalle
	
procedure leer(var arc: maquinas; var dat: infoDetalle); //recibe v[i] y un reg
 begin
	if (not eof(arc)) then
		read(arc, dat) //Leo arc binario 'detalle' y guardo registro leido en dat
	else
		dat.cod_usuario:= valorAlto; //Si es el fin, le asigno un valor alto al dato
 end;
 
 
procedure crearUnDetalle(var det: detalle);
 var
	nombre: String;
	txt: Text; //Archivo carga
	maquina: infoDetalle;
 begin
  writeln('Ingrese el nombre del archivo de carga: ');
  readln(nombre);
  assing(txt, nombre);
  reset(txt);
  writeln('Ingrese un nombre para el archivo detalle BINARIO: ');
  readln(nombre);
  assing(det, nombre);
  rewrite(det);
  while not eof(txt) do begin
	with maquina do begin
		readln(txt, cod_usuario, fecha);
		readln(txt, tiempo_sesion);
		write(det, maquina);
	end;
  writeln('Archivo binario detalle creado...');
  close(txt); close(det);
  end;
 end; 
 
procedure crearVariosDetalles(var v: maquinas);
 var i: integer;
 begin
  for i:=1 to DF do
	crearUnDetalle(v[i]);
 end;

procedure abrirDetalles(var det: detalle; var dat: infoDetalle)
 begin
  reset(det);
  leer(det, dat); //Envía detalle y infoDetalle 
 end;

procedure minimo(var vecDet: maquinas; var vecReg: maquinasReg; var min: infoDetalle) 
 var i, pos: integer;
 begin
  min.cod_usuario:= valorAlto;
  min.fecha:= stringAlto;
  for i:=1 to DF do begin
	if (vecReg[i].cod_usuario < min.cod_usuario)then begin
		if (vecReg[i].fecha < min.fecha)  then begin
			min:= vecReg[i]; //Almaceno menor registro
			pos:= i; //Almaceno pos para luego avanzar en el detalle a la hora de leerse.
		end;
	end;
  end;
  //Lectura sig detalle
  if (min.cod_usuario <> valorAlto) and (min.fecha <> stringAlto) then
   leer(vecDet[i], vecReg[i]); //Leo detalle minimo para avanzar al sig reg.
 end;
 
procedure crearMaestro(var m: maestro; var vecDet: maquinas);
 var
	vecReg: maquinasReg; //Vector de Registros
	i, total: integer;
	aux, aux2: infoDetalle;
	regMae: infoMaestro;
	min: infoDetalle;
 begin
  assign (m, '/var/logs/maestro.txt');
  rewrite(m);
  //apertura y lectura de detalles
  for i:= 1 to DF do
	abrirDetalles(vecDet[i], vecReg[i]);
  
  minimo(vecDet, vecReg, min);
  
  while (min.cod_usuario <> valorAlto) do begin
	aux:= min.cod_usuario;
	while (min.cod_usuario = aux) do begin
		writeln('Fecha: ' min.fecha);
		aux2:= min.fecha;
		total:= 0;
		while (min.cod_usuario = aux) and
		(min.fecha = aux2) do begin
			total:= total + min.tiempo_sesion;
			minimo(vecDet, vecReg, min);
		end;
		writeln('Total de tiempo de sesion del usuario en la fecha indicada: ', total);
		regMae.cod_Usuario:= aux;
    	regMae.fecha:= aux2;
		regMae.tiempo_total_de_sesiones_abiertas:= total;
		write(mae, regMae); //Escribo archivo maestro y avanzo
	end;
	
  end;
  close(m);
  for i:= 1 to DF do begin
	close(vecDet[i]); //Cierro detalles
  end;
  
 end;
 
var mae: maestro; vecDetalles: maquinas;

BEGIN
 crearDetalles(vecDetalles);
 crearMaestro(mae, vecDetalles);
END.

