program covid;
const valorAlto = 9999;
      DF = 10; //cantidad de localidades.
type
    infoDetalle = record
        codLocalidad: integer; //orden
        codCepa: integer; //orden
        casosActivos: integer;
        casosNuevos: integer;
        casosRecuperados: integer;
        casosFallecidos: integer;
    end;

    infoMaestro = record
        codLocalidad: integer;
        nombreLocalidad: String;
        casosActivos: integer;
        casosNuevos: integer;
        casosRecuperados: integer;
        casosFallecidos: integer;
    end;

    maestro = file of infoMaestro;
    detalle = file of infoDetalle;

    vectorDetalles = array[1..DF] of detalle;
    vectorRegistros = array[1..DF] of infoMunicipio;

//PROCEDIMIENTOS
procedure leer(var arc: detalle; var dat: infoDetalle); //recibe v[i] y un reg
 begin
	if (not eof(arc)) then
		read(arc, dat) //Leo arc binario 'detalle' y guardo registro leido en dat
	else
		dat.codLocalidad:= valorAlto; //Si es el fin, le asigno un valor alto al dato
        dat.codCepa:= valorAlto;
 end;

procedure minimo(var vecDet: vectorDetalles; var vecReg: vectorRegistros; var min: infoDetalle) 
 var i, pos: integer;
 begin
  min.codLocalidad:= valorAlto;
  min.codCepa:= valorAlto;
  for i:=1 to DF do begin
	if (vecReg[i].codLocalidad < min.codLocalidad)then begin
		if (vecReg[i].codCepa < min.codCepa)  then begin
			min:= vecReg[i]; //Almaceno menor registro
			pos:= i; //Almaceno pos para luego avanzar en el detalle a la hora de leerse.
		end;
	end;
  end;
  //Lectura sig detalle
  if (min.codLocalidad <> valorAlto) and (min.codCepa <> valorAlto) then
   leer(vecDet[i], vecReg[i]); //Leo detalle minimo para avanzar al sig reg.
 end;

{Los procedimientos de carga de archivos binarios no se incluyen en el código, los ASUMO yo}
//procedure crearMaestro(var mae: maestro);

procedure crearUnDetalle(var det: detalle);
 var
	nombre: String;
	txt: Text; //Archivo carga
	info: infoDetalle;
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
	with info do begin
		readln(txt, codLocalidad, codCepa, casosActivos, casosNuevos, casosRecuperados, casosFallecidos);
		write(det, info);
	end;
  writeln('Archivo binario detalle creado...');
  close(txt); close(det);
  end;
 end; 
 
procedure crearVariosDetalles(var v: vectorDetalles);
 var i: integer;
 begin
  for i:=1 to DF do
	crearUnDetalle(v[i]);
 end;

procedure actualizarMaestro(var mae: maestro; var vecDet: vectorDetalles; var cant: integer);
 var vecReg: vectorRegistros;
     min: infoDetalle;
     infoMae: infoMaestro;
     i, aux, aux2, totalActivos, totalNuevos: integer;
 begin
    assign(mae, 'maestro.dat'); //se asume que está creado
    reset(mae)
    {Apertura de archivos de detalle}
    for i:=1 to DF do begin
        reset(vecDet[i]);
        leer(vecDet[i], vecReg[i]); //Envía detalle y infoDetalle
    end;

    minimo(vecDet, vecReg, min);
    read(mae, infoMae);

    while (min.codLocalidad <> valorAlto) do begin
        aux:= min.codLocalidad;
        writeln('Código de Localidad: ', aux);

        {Busqueda de criterios de orden}
        while (infoMae.codLocalidad <> aux) and (not eof(mae)) do begin
            read(mae, infoMae); //Leo maestro hasta encontrar el registro que corresponde al detalle
        end;

        while(infoMae.codCepa <> min.codCepa) do
            read(mae, infoMae); //Leo maestro hasta encontrar el registro que corresponde al detalle

        {PRE-CONDICIONES}
        while(infoMae.codLocalidad = min.codLocalidad) and (infoMae.codCepa = min.codCepa) do begin
            {//Actualizo maestro con los datos del detalle}
            infoMae.casosFallecidos:= infoMae.casosFallecidos + min.casosFallecidos; //se suman los casos fallecidos
            infoMae.casosRecuperados:= infoMae.casosRecuperados + min.casosRecuperados; //se suman los casos recuperados
            infoMae.casosActivos:= min.casosActivos; //se actualizan los casos activos
            infoMae.casosNuevos:= min.casosNuevos; //se actualizan los casos nuevos
            minimo(vecDet, vecReg, min);
        end;
        {Acumulador}
        if (infoMae.casosActivos > 50) then cant:= cant + 1; //Contador de localidades con más de 50 casos activos
        {Escribo en MAESTRO}
        seek(mae, filepos(mae)-1);
        write(mae, infoMae);

        writeln('Actualizado maestro: ', regNew.codLocalidad, ' ', regNew.casosActivos, ' ', regNew.casosNuevos, ' ', regNew.casosRecuperados, ' ', regNew.casosFallecidos);      
        end;
    end; 
    close(mae); //cierro maestro
    for i:=1 to DF do begin
        close(vecDet[i]); //cierro detalles
    end;
    writeln('Se han actualizado los archivos maestro en base a los detalles...');
 end;

//PROGRAMA PRINCIPAL
var mae: maestro; vecDet: vectorDetalles;
    cantidadLocalidades: integer;
BEGIN
 crearVariosDetalles(vecDet); //Crea los archivos de detalle
 cantidadLocalidades:= 0;
 actualizarMaestro(mae, vecDet, cantidadLocalidades);
 writeln('Cantidad de localidades con más de 50 casos activos: ', cantidadLocalidades);
END.