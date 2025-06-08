program congelados;

const
	valorAlto = 9999;
	DF: 30;
type
	subrango: 1..DF;
	productos = record
		cod: integer;
		nombre: String[20];
		desc: String [100];
		stock: integer;
		stockMin: integer;
		precio: real;
	end;
	
	infoDet = record
		cod: integer;
		cantVendida: integer;
	end;
	
	maestro = file of productos;
	detalle = file of infoDet;
	
	vectorDetalles = array [subrango] of detalle; //Array de 30 detalles
	vectorRegistros = array [subrango] of infoDet; //array de Registros detalles

	
procedure leer(var arc: detalle; var dat: infoDet);
 begin
	if (not eof(arc)) then
		read(arc, dat) //Leo arc binario 'detalle' y guardo registro leido en dat
	else
		dat.cod:= valorAlto; //Si es el fin, le asigno un valor alto al dato
 end;


procedure crearMaestro(var mae: maestro);
var
    txt: text; //Carga
    p: producto; //Reg temporal
    nombre: string; //Nombre para maestro binario
begin
    assign(txt, 'productos.txt'); //Carga TXT
    reset(txt);
    writeln('Ingrese un nombre para el archivo maestro BINARIO: ');
    readln(nombre);
    assign(mae, nombre);
    rewrite(mae);
    while(not eof(txt)) do begin
		with p do begin
			readln(txt, codigo, stockDisp, stockMin, precio, nombre);
			readln(txt, descripcion); 
            write(mae, p);
        end;
    end;
    writeln('Archivo binario maestro creado...');
    close(txt);
    close(mae);
end

procedure crearDetalle(var det: detalle); //Recibe una pos del vectorDetalles.
var
    carga: text;
    nombre: string;
    p: infoDet;
begin
    writeln('Ingrese la ruta del detalle TXT: '); {La ruta del detalle txt}
    readln(nombre);
    assign(carga, nombre);
    reset(carga);
    writeln('Ingrese un nombre para el archivo detalle BINARIO: ');
    readln(nombre);
    assign(det, nombre);
    rewrite(det); {Creamos binario}
    while(not eof(carga)) do
        begin
            with p do
                begin
                    readln(carga, codigo, cant);
                    write(det, p);
                end;
        end;
    writeln('Archivo binario detalle creado...');
    close(det);
    close(carga);
end;


procedure crearVariosDetalles(var vec: vecDetalles);
 var i: subrango;
 begin
  for i:=1 to DF do begin
	crearDetalle(vec[i]);
  end;
 end;
 
procedure minimo(var vecDet: vectorDetalles; var vecReg:vectorRegistros; var min: infoDet) 
 var i, pos: subrango;
 begin
  min.cod:= valorAlto;
  for i:=1 to DF do begin
	if (vecReg[i].cod < min.cod)then begin
		min:= vecReg[i]; //Almaceno menor registro
		pos:= i; //Almaceno pos para luego avanzar en el detalle a la hora de leerse.
	end;
  end;
  if (min.cod <> valorAlto) then leer(vecDet[i], vecReg[i]); //Leo detalle minimo para avanzar al sig reg.
 end;
 
 
procedure reporte (var mae: maestro);
 var
  txt: Text
  infoMae: producto;
 begin
	assign(txt, 'reporte.txt');
	reset (mae);
	rewrite(txt);
	while not eof(mae) do begin
		read(infoMae, mae);
		if (infoMae.stock < infoMae.stockMin) then
			writeln(txt, infoMae.nombre,' ', infoMae.desc,' ', infoMae.stock, ' ', p.precio:0:2);
	end;
 end; 
 
procedure updateMaster(var mae: maestro; var vecD: vectorDetalles);
 var
	infoMae: producto;
	vecReg: vectorRegistros;
	aux, cant: integer;
	i: subrango;
	min: infoDet;
 begin
	reset(mae); //Abro maestro
	
	{Abro y leo los detalles. Estos se almacenan y guardan en cada pos del vector registros}
	for i:= 1 to DF do begin //DF detlales
		reset(vecD[i]);
		leer(vecD[i], vecReg[i]);
	end;
	
	minimo(vecD, vecReg, min); //Busco el minimo
	while (min.cod <> valorAlto) do begin
		aux:= min.cod; //Cod producto temporal
		cant:= 0; //Inicializo en cero el stock a restar
		while (min.cod = aux) do begin
			cant:= cant + min.cantVendida;
			minimo(vecD, vecReg, min);
		end;
		
		read(mae, infoMae); //Leo maestro
		while (infoMae.cod <> aux) do //Busco el codproducto maestro que coincida con el codproducto del detalle
			read(mae, infoMae);
			
		seek(mae, filepos(mae)-1); //Vuelvo al maestro a modificar
        infoMae.stock:= infoMae.stock - cant; //Actualizo stock
        write(mae, infoMae); //Actualizo archivo maestro
	end;
	reporte(mae); //Exporto el maestro en un txt
	close(mae); //Cierro maestro
	for i:= 1 to DF do
		close(vecD[i]);
 end;
 
var mae: maestro; vecDetalles: vectorDetalles;

BEGIN
 crearMaestro(mae);
 crearVariosDetalles(vecDetalles);
 updateMaster(mae, vecDetalles);
END.
