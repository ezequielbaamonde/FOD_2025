program punto5;

type
	celulares = record
		cod: integer;
		nom: string;
		desc: string;
		marca: string [20];
		precio: real;
		stockMin: integer;
		stockDispo: integer;
	end;
	
	celus = file of celulares; //tipo de archivo
	
	
procedure load (var b: celus; var t: Text);	
 var nomFisText: string; celText: celulares;
 begin
	writeln('Ingrese el nombre del archivo de carga a usar: '); readln(nomFisText);
	assign(t, nomFisText); //Asigno nombre logico a nombre fisico.
	reset (t); //Abro archivo de carga
	rewrite (b); //Abro y creo archivo binario
	while not eof(t) do begin //mientras el puntero en archivo de carga no llego a EOF
		with celText do begin {Lee el archivo de texto respetando los campos del registro celus}
			readln(t, cod, precio, marca);
			readln(t, stockDispo, stockMin, desc);
			readln(t, nom);
		
		end; 
		write(b, celText); //Escribo el registro leído y almacenado en celText en el archivo B (arc)
	end;
	writeln('********************************');
	writeln('El archivo BINARIO fue cargado con exito!');
	close(t); close(b);
 end;

procedure imprimir(c: celulares);
 begin
	writeln(' --> Codigo: ', c.cod);
	writeln(' --> Nombre: ', c.nom);
	writeln(' --> Descripcion: ', c.desc);
	writeln(' --> Marca: ', c.marca);
	writeln(' --> Precio: ', c.precio);
	writeln(' --> Stock: ', c.stockDispo);
	writeln(' --> Stock Minimo: ', c.stockMin);
 end;

procedure list (var a: celus);
 var cel: celulares; ok: boolean; //Record para leer los celulares del archivo
 begin
	ok:= false;
	reset(a); //Abro archvio binario.
	writeln('>>> CELULARES con bajo stock <<<');
	while not eof(a) do begin
		read(a, cel); //Leo celular
		if (cel.stockDispo < cel.stockMin) then begin //Si el stock disponbile es menor que el minimo
			imprimir(cel); //Imprimo datos del celular
			ok:= true; //Cambio OK a TRUE para dar a entender que almenos 1 celular esta bajo de stock
		end;
	end;
	if (ok = true) then writeln('**Listado de celulares OK**')
	else writeln('**No hay celulares con stock mas bajo que el stock minimo**');
	close(a); //Cierro archivo binario
 end;
 
procedure descripcion (var a: celus);
 var cel: celulares; ok: boolean; cadena: string;
 begin
	ok:= false;
	reset(a); //Abro archvio binario.
	writeln('--> Ingrese la descripcion del celular a buscar: ');
	readln(cadena);
	writeln('>>> CELULARES coincidentes con su descripcion <<<');
	while not eof(a) do begin
		read(a, cel);
		if (cel.desc = cadena) then begin
			imprimir(cel); //imprimo datos del celular coincidente
			ok:= true; //Cambio OK a TRUE para dar a entender que almenos 1 celular coincide con la desc
		end;
	end;
	if (ok = true) then writeln('**Listado de celulares OK**')
	else writeln('**No hay celulares que coincidan con su descripcion**');
	close(a); //Cierro archivo binario
 end;

var arc: celus;
	op: char; nomFis: String[20]; carga: Text;

BEGIN
	writeln('Ingrese el nombre del archivo a crear o usar:');
	readln(nomFis);
	assign(arc, nomFis);
	writeln('**MENU DE OPERACIONES**');
	writeln('a: Crear un archivo de celulares y cargarlos desde un .txt');
	writeln('b: Listar celulares con menor stock que el minimo');
	writeln('c: Listar celulares con "X" descripcion');
	writeln('d: Exportar el archivo binario de celulares a uno de texto');
		
	writeln('--> Ingrese una opcion del menu para efectuar: ');
	readln(op);
	case op of
		'a': load(arc, carga);
		'b': list(arc);
		'c': descripcion(arc);
	else writeln('La opcion ingresada no existe.');
	end;
	writeln('********************************');
	writeln('Todas las operaciones han sido realizadas.');
END.
	
