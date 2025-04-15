program covid;
const valorAlto = 9999;
      DF = 10; //cantidad de localidades
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
     regNew: infoMaestro;
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
    
    while (min.codLocalidad <> valorAlto) do begin
        aux:= min.codLocalidad;
        writeln('Código de Localidad: ', aux);
        while (aux = min.codLocalidad) do begin
            aux2:= min.codCepa;
            totalFallecidos:= 0;
            totalRecuperados:= 0;
            totalActivos:= 0;
            totalNuevos:= 0;
            writeln('Código de Cepa: ', aux2);
            while (aux = min.codLocalidad) and (aux2 = min.codCepa) do begin
               totalFallecidos:= totalFallecidos + min.casosFallecidos;
               totalRecuperados:= totalRecuperados + min.casosRecuperados;
               totalNuevos:= totalNuevos + min.casosNuevos;
               totalActivos:= totalActivos + min.casosActivos;
                //Leo el siguiente detalle
                minimo(vecDet, vecReg, min);
            end; //fin while aux2

            read(mae, regNew); //Leo maestro para actualizar
		    while (regNew.cod <> aux) do //Busco el codproducto maestro que coincida con el codproducto del detalle
			    read(mae, infoMae);
            
            //Actualizo maestro
            regNew.casosFallecidos:= regNew.casosFallecidos + totalFallecidos;
            regNew.casosRecuperados:= regNew.casosRecuperados + totalRecuperados;
            regNew.casosNuevos:= totalNuevos; //se actualizan con el valor recibido en el detalle.
            regNew.casosActivos:= totalActivos; //se actualizan con el valor recibido en el detalle.
            
            if (totalActivos > 50) then cant:= cant + 1; //Contador de localidades con más de 50 casos activos
            
            seek(mae, filepos(mae)-1); //Me posiciono en el registro que leí antes
            write(mae, regNew); //Escribo el nuevo registro actualizado
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