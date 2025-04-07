program encargadoDeVentas;

const valorAlto = 9999;
type
	productos = record
		cod: integer;
		nombre: String[20];
		precio: real;
		stock: integer;
		stockMin: integer;
	end;

	ventas = record
		codProd: integer;
		cantVentas: integer;
	end;
	
	maestro = file of productos;
	detalle = file of ventas;

procedure leer(var arc: detalle; var dat: ventas);
 begin
	if (not eof(arc)) then begin
		read(arc, dat); //Leo arc binario 'detalle' y guardo registro en dat.
	end
	else
		dat.codProd:= valorAlto; //Si es el fin, le asigno un valor alto al dato
 end;	

procedure update (var arcM: maestro; var arcD: detalle);
 var regM: productos; regD: ventas; act: integer; total: integer;
 begin
  reset(arcM); 
  reset(arcD);
  read(arcM, regM); //Leo maestro. Si existe es porque tengo almenos 1 prod en detalle.
  leer(arcD, regD); //Leo detalle controlando el fin.
  while (regD.codProd <> valorAlto) do begin
	act:= regD.codProd; //Almaceno cod de detalle actual
	total:= 0;
	while (act = regD.codProd) do begin
		total:= total + regD.cantVentas; //Sumo ventas
		leer(arcD, regD);
	end;
	
	while (regM.cod <> act) do
		read(arcM, regM); //Busco el detalle en el maestro.
	regM.stock:= regM.stock - total; //Resto el stock acumulado del producto.
	
	seek(arcM, FilePos(arcM)-1); //Vuelvo un registro antes del maestro para ubicarme encima del original
	write(arcM, regM); //Reescribo registro en archivo maestro
	
	if not eof(arcM) then read(arcM, regM); //Si no es el fin del maestro, avanzo y leo el sig registro
  end; //Fin 1er while
  writeln('---> Archivo MAESTRO actualizado con EXITO.');
  close(arcM); close(arcD); //Cierre de archivos
 end;
 
procedure convDetalle(var cargaD: Text; var arcD: detalle); 
 var v: ventas; //registro de ventas
 begin
  reset(cargaD);
  rewrite(arcD);
  while not eof(cargaD) do begin
	readln(cargaD, v.codProd, v.cantVentas); //Leo txt
	write(arcD, v); //Escribo binario
  end;
  writeln('*Convertido detalle.txt a BINARIO*');
  writeln('');
  close(cargaD); close(arcD); //Cierre de archivos
 end;
 
procedure convMaestro(var cargaM: Text; var arcM: maestro); 
 var p: productos; //registro de ventas
 begin
  reset(cargaM);
  rewrite(arcM);
  while not eof(cargaM) do begin
	readln(cargaM, p.cod, p.nombre); //Leo txt
	readln(cargaM, p.precio, p.stock, p.stockMin); //Leo txt
	write(arcM, P); //Escribo binario
  end;
  writeln('*Convertido Productos.txt a BINARIO*');
  writeln('');
  close(cargaM); close(arcM); //Cierre de archivos
 end;
 
 
procedure exp(var m: maestro);
 var p: productos; e: Text;
 begin
  assign (e, 'StockMin.txt');
  reset(m);
  rewrite(e);
  while not eof (m) do begin
	read(m, p); //Leo maestro y almaceno reg en P
	if (p.stock < p.stockMin) then begin
		with p do writeln(cod:5, nombre:5, precio:5, stock:5, stockMin:5); //Escribo en pantalla el registro para corroborar cada 1
		with p do writeln(e, p.cod, ' ', p.nombre, ' ', p.precio:2:2, ' ', p.stock, ' ', p.stockMin);
    end;
  end;
  writeln('---> Exportacion EXITOSA.');
  close(e); close(m);
 end;
 
var det: detalle; mae: maestro; cargaD, cargaM: Text;
	opc: char;

BEGIN
	assign (cargaM, 'Productos.txt'); //Archivos de Carga
	assign (cargaD, 'Detalle.txt'); //Archivos de carga
	assign (det, 'binarioDetalle.txt'); //Pre-Establezco el nombre
	assign (mae, 'binarioMaestro.txt'); //Pre-Establezco el nombre	
	
	//Convierto los txt en binario, para luego hacer el update mae-det.
	convDetalle(cargaD, det);
	convMaestro(cargaM, mae);
	
	writeln('*** MENU ***');
	writeln('--> a: Actualizacion del archivo MAESTRO');
	writeln('--> b: Exportar STOCK MINIMO en TXT');
	repeat
		readln(opc);
		case opc of
			'a': update(mae, det);
			'b': exp(mae);
		else
			writeln('La opcion ingresada es incorrecta.');
		end;
	until(opc = 'z');
END.




