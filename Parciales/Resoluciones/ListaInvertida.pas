program multinacional;

type
 empleado = record
    DNI: integer;
    nom: string;
    ape: string;
    edad: integer;
    dom: string;
    fecNac: string;
 end;

 tArchivo: file of empleado;

function existeEmpleado(dni: integer; var a: tArchivo):boolean; //Se dispone
procedure leerEmpleado(var e: empleado);
 begin
    readln(e.DNI);
    readln(e.nom);
    readln(e.ape);
    readln(e.edad);
    readln(e.dom);
    readln(e.fecNac);
 end;

procedure agregarEmpleado(var a: tArchivo)
 var regA, emp: empleado;
     esta: boolean;
     pos: integer;
 begin
    reset (a);
    leerEmpleado(emp);
    esta:= existeEmpleado(emp.DNI, a);
    if (esta = false) then begin
        read(a, regA);//Leo cabecera
        if (regA.DNI <> 0) then begin
            pos:= regA.DNI * -1; //Pos a reutilizar
            seek(a, pos); //me muevo a la pos a reutilizar
            read(a, regA); //Leo lo guardado ahi
            seek(a, pos); //Vuelvo a la pos
            write(a, emp); //Escribo nuevo empleado
            seek(a, 0);
            write(a, regA); //Reescribo cabecera
        end
        else begin
            seek(a, FileSize(a));
            write(a, emp); //Escribo al final del archivo
        end;
    end
    else writeln('El empleado ya existe.')
 end;


procedure quitarEmpleado(var a: tArchivo);
 var dni: integer;
     esta: boolean;
     regA, regC: empleado;
 begin
  reset(a);
  writeln('Ingrese un DNI del empleado a eliminar: ');
  readln(dni);
  esta:= existeEmpleado(dni, a)
  if (esta = true) then begin
    read(a, regC); //Leo cabecera
    read(a, regA); //Leo primer dato
    while(regA.DNI <> dni) do
        read(a, regA);
    regA.DNI:= (FilePos(a)-1) * -1; //Niego pos y lo almaceno en DNI
    seek(a, FilePOS(a)-1);
    write(a, regC); //Escribo lo que habia en cabecera
    seek(a, 0);
    write(a, regA); //Reescribo la cabecera
  end
  else writeln('El empleado a eliminar no existe.')
 end;


var archivo: tArchivo;
BEGIN
 assign(archivo, 'empleados.dat');
END.