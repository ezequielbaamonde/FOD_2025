program menu;
type
	empleados = record
		num: integer;
		ape: string [50];
		nom: string [50];
		edad: integer;
		DNI: String[8];
	end;
	
	archivo = file of empleados;
	
procedure lecturaEmpleado(var e: empleados);
 begin
  writeln('Ingrese el apellido del empleado');
  readln (e.ape);
  if (e.ape <> 'fin') then begin
	writeln('Ingrese el nombre del empleado');
	readln (e.nom);
	writeln('Ingrese el numero del empleado');
	readln (e.num);
	writeln('Ingrese la edad del empleado');
	readln (e.edad);
	writeln('Ingrese el DNI del empleado');
	readln (e.DNI); 
  end;
 end;	

procedure creacion(var data: archivo);
 var emp: empleados;
 begin
	rewrite(data); //Crea el archivo y lo abre
	lecturaEmpleado(emp);
	while (emp.ape <> 'fin') do begin
		write(data, emp);
		lecturaEmpleado(emp);
	end;
    close(data);
    writeln('');
    writeln('El archivo ha sido creado con exito.');
    writeln('');
 end;

//Listar en pantalla los empleados de un apellido específico.
procedure impApe(var data: archivo; a: String);
 var emp: empleados;
 begin
 	reset(data);
 	writeln('');
	while not eof(data) do begin //recorremos todo el archivo en busca del apellido
		read(data, emp);
		if (emp.ape = a) then begin		
			writeln('   Datos del empleado.');
			writeln('    Nombre: ', emp.nom);
			writeln('    Numero: ', emp.num);
			writeln('    Edad: ', emp.edad);
			writeln('    DNI: ', emp.DNI);
			writeln('');
		end
	end;
	close (data);
 end;

//Listar en pantalla los empleados de a uno por línea.
procedure impEmp(var data: archivo);
 var emp: empleados;
 begin
	reset(data);
	writeln('');
	while not eof(data) do begin
		read(data, emp);
		writeln(' Linea ', FilePos(data), ':');
		writeln('  Apellido: ', emp.ape);
		writeln('  Nombre: ', emp.nom);
		writeln('  Numero: ', emp.num);
		writeln('  Edad: ', emp.edad);
		writeln('  DNI: ', emp.DNI);
		writeln('');	
	end;
	close(data);
 end;
 
procedure impEdad(var data: archivo);
 var emp: empleados; existe: boolean;
 begin
	reset(data);
	writeln('');
	while not eof(data) do begin
		read(data, emp);
		if (emp.edad > 70) then begin
			writeln('  Nombre: ', emp.nom);
			writeln('  Numero: ', emp.num);
			writeln('  Edad: ', emp.edad);
			writeln('  DNI: ', emp.DNI);
			existe:= true;	
			writeln('');
		end;
	end;
	close(data);	
	if (existe = true) then writeln('Todos los empleados mayores a 70 han sido listados.')
	else writeln('No hay empleados mayores de 70 anios.');
 end;
 
procedure listado(var data: archivo);
 var ape: String;
 begin
	writeln('Listado por APELLIDO.');
	writeln(' Ingrese un apellido determinado a listar: ');
	readln(ape);
	impApe(data, ape);
	writeln('Listado por LINEA.');
	impEmp(data);
	writeln('Listado de los empleados mayores a 70 anios.');
	impEdad(data);
	
 end;
 
var registros: archivo; op: char; nomFis: String[20];
BEGIN
    writeln('Ingrese un nombre para el archivo a crear o utilizar: ');
	readln(nomFis);
	assign(registros, nomFis); //asignamos valor logico con valor fisico
	writeln('**MENU DE OPERACIONES**');
	writeln(' A: Creacion y Carga de empleados.');
	writeln(' B: Listar archivo.');
	writeln('Ingrese una opcion del menu: ');
	readln (op);
	{while (op <> 'Z') do begin //para salir del programa}
	case op of
		'A': creacion(registros);
		'B': listado(registros);
	else
		writeln('La opcion es incorrecta.');
	end;
		{writeln('**MENU DE OPERACIONES**');
		writeln(' A: Creacion y Carga de empleados.');
		writeln(' B: Listar archivo.');
		writeln('Ingrese una opcion del menu: ');
		readln (op);
	end;}
	writeln('********************************');
	writeln('Todas las operaciones han sido realizadas.');
END.
