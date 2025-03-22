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
	existe:= false; //Inicialmente
	reset(data); //Apertura
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
	close(data); //Cierre de archivo
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

//Añadir un empleado con distinto número de empleado
procedure add(var data: archivo);
 var empData, empLec: empleados; esta: boolean; fin: integer;
 begin
	fin:= 1; //Inicialmente es 1
	while (fin = 1) do begin
		esta:= false; //inicialmente falso
		lecturaEmpleado(empLec);
		reset(data); //apertura archivo
		while not eof(data) do begin
			read(data, empData);
			if (empLec.num = empData.num)then begin
				esta:= true;
			end;
		end;
		if (esta = true) then writeln('Ya existe un empleado con ese numero de EMPLEADO.')
		else begin 
			write(data, empLec);
			writeln('Empleado aniadido con exito!')
		end;
		writeln('');
		writeln('Quiere aniadir otro empleado? (1 SI / 0 NO): ');
		readln(fin);
	end;
	close(data); //Cierre
 end;

//Actualización empleado
procedure update(var data: archivo);
 var numEmpleado: integer; empData: empleados; newAge: integer; esta: boolean;
 begin
	esta:= false;
	writeln('Ingrese el numero de empleado a actualizar');
	readln(numEmpleado);
	reset(data); //Apertura
	while not eof (data) do begin
		read(data, empData);
		if (empData.num = numEmpleado) then begin
			writeln('Ingrese la nueva edad:');
			readln(newAge);
			empData.edad:= newAge; //Colocamos nueva edad
			seek(data, FilePos(data)-1);
			write (data, empData);
			esta:= true;
		end;
	end;
	if (esta=true) then writeln('Empleado ', numEmpleado, ' actualizado con exito.')
	else writeln('No existe un empleado con ese numero de empleado.');
	close(data); //Cierre
 end;

//Exportar de BINARIO a TEXTO
procedure exp(var data: archivo; var dataT: Text);
 var nomText: String; emp: empleados;
 begin
	writeln('Ingrese un nombre para el archivo de texto: ');
	readln(nomText);
	assign(dataT, nomText); //NomLógico, NomFísico
	reset(data); //Abro archivo binario
	rewrite(dataT); //Creo y abro archivo de texto 
	while not eof(data) do begin
		read(data, emp); //Leo empleado del archivo binario
		with emp do writeln(num:5, ape:5, nom:5, edad:5, DNI:5); //Escribo en pantalla el registro para corroborar cada 1
		with emp do writeln(dataT, ' ', num, ' ', ape, ' ', nom, ' ', edad, ' ', DNI, ' '); {Escribe
		en el archivo de texto los campos separados por un caracter en blanco}
		
	end;
	close(data); close (dataT);
 end;


var registros: archivo; op: char; nomFis: String[20];
	texto: Text; //Archivo de tipo texto
BEGIN
    writeln('Ingrese un nombre para el archivo a crear o utilizar: ');
	readln(nomFis);
	assign(registros, nomFis); //asignamos valor logico con valor fisico
	
	writeln('**MENU DE OPERACIONES**');
	writeln(' A: Creacion y Carga de empleados.');
	writeln(' B: Listar archivo.');
	writeln(' C: Aniadir un empleado.');
	writeln(' D: Actualizar empleado.');
	writeln(' E: Exportar a archivo de TEXTO.');
	
	writeln('Ingrese una opcion del menu: ');
	readln (op);
	{while (op <> 'Z') do begin //bucle para mantener el programa en ejec}
	case op of
		'A': creacion(registros);
		'B': listado(registros);
		'C': add(registros);
		'D': update(registros);
		'E': exp(registros, texto);
	else
		writeln('La opcion es incorrecta.');
	end;
	writeln('********************************');
	writeln('Todas las operaciones han sido realizadas.');
END.
