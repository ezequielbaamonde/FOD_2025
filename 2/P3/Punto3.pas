program alfaPt3;

const
	valorAlto = 'ZZZZ';
type
	alfabetizacion = record
		prov: String[20];
		cantPersonas: integer;
		totalEncuestados: integer;
	end;
	
	agencias = record
		prov: String[20];
		codLoc: integer;
		cantPersonas: integer;
		cantEncuestas: integer;
	end;
	
	detalle = file of agencias; //ordenados por nombre de provincia
	maestro = file of alfabetizacion; //ordenados por nombre de provincia

{CONVERSION A BINARIO DE ARCHIVOS DE CARGA}
procedure convDetalle(var cargaD: Text; var arcD: detalle); 
 var a: agencias; //registro de ventas
 begin
  reset(cargaD); //Abro archivo de carga
  rewrite(arcD); //Creo archivo binario
  while not eof(cargaD) do begin
	readln(cargaD, a.codLoc, a.cantPersonas, a.cantEncuestas, a.prov); //Leo txt
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
	readln(cargaM, a.cantPersonas, a.totalEncuestados, a.prov); //Leo txt
	write(arcM, a); //Escribo binario
  end;
  writeln('*Convertido maestro.txt a BINARIO*');
  writeln('');
  close(cargaM); close(arcM); //Cierre de archivos
 end;

procedure leerDetalle(var arc: detalle; var dat: agencias);
 begin
	if (not eof(arc)) then
		read(arc, dat) //Leo arc binario 'detalle' y guardo registro en dat
	else
		dat.prov:= valorAlto; //Si es el fin, le asigno un valor alto al dato
 end;		

procedure minimo(var det1, det2: detalle; var r1, r2: agencias; var min: agencias);
 begin
  if (r1.prov<=r2.prov) then begin
	min:= r1;
	leerDetalle(det1, r1); //paso al sig registro
  end
  else begin
	min:= r2;
	leerDetalle(det2, r2); //Paso al sig registro
  end;
 end;
 
procedure actualizacion(var mae: maestro; var det1, det2: detalle);
 var reg1, reg2, min: agencias; //Regs temporales de la lectura de detalles
	 regM: alfabetizacion; //Reg de lectura maestro
 begin
  {Apertura de archivos}
  reset(mae);
  reset(det1);
  reset(det2);
  {Lectura de detalles}
  leerDetalle(det1, reg1);
  leerDetalle(det2, reg2);
  {Minimo de detalles}
  minimo(det1, det2, reg1, reg2, min); 
  while (min.prov <> valorAlto) do begin
	read(mae, regM);//Leo maestro

	{Busco prov que coincida con minimo}
	while (regM.prov <> min.prov) do
		read(mae, regM);//Leo maestro

	while (min.prov = regM.prov) do begin
		{Actualizo campos}
		regM.cantPersonas:= regM.cantPersonas + min.cantPersonas;
		regM.totalEncuestados:= regM.totalEncuestados + min.cantEncuestas;
		minimo(det1, det2, reg1, reg2, min);
	end;
	{Escribo maestro}
	writeln(regM.prov, ' ', regM.cantPersonas, ' ', regM.totalEncuestados);
    seek(mae, FilePos(mae)-1);
    write(mae, regM); 
  end;
  close(mae);close(det1); close(det2); //Cierre de archivos
 end;
 
procedure exp(var m: maestro);
 var a: alfabetizacion; e: Text;
 begin
  reset(m); //Abro maestro binario
  assign (e, 'NuevoMaestro.txt'); //Archivo de exportacion
  rewrite(e); //Creo archivo de exportacion
  writeln('Exportando maestro a TXT...'); //Mensaje de exportacion
  while not eof (m) do begin
	read(m, a); //Leo maestro y almaceno reg en a
	{Escribo en el archivo de exportacion}
	with a do writeln(prov:5, cantPersonas:5, totalEncuestados:5); //Escribo en pantalla el registro para corroborar cada 1
	with a do writeln(e, prov, ' ', cantPersonas, ' ', totalEncuestados);
  end;
  writeln('---> Exportacion EXITOSA.');
  close(e); close(m);
 end;
 
{Vars locales del PPAL}
var mae_txt, det1_txt, det2_txt: Text; //Carga
	det1, det2: detalle; //Binario a crear
	mae: maestro; //Maestro a crear
	
BEGIN
 assign(mae, 'MaestroBinario.txt'); //Binarios
 assign(det1, 'Detalle1Binario.txt'); //Binarios
 assign(det2, 'Detalle2Binario.txt'); //Binarios
 assign(mae_txt, 'maestro.txt'); //Carga
 assign(det1_txt, 'detalle1.txt'); //Carga
 assign(det2_txt, 'detalle2.txt'); //Carga
 
 {Conversión de TXT a BINARIO}
 convMaestro(mae_txt, mae);
 convDetalle(det1_txt, det1);
 convDetalle(det2_txt, det2);
 
 {update}
 actualizacion(mae, det1, det2);
 exp(mae);
END.
