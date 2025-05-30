program PrimerFecha2024_P1;

const
    valorAlto = 9999;

type
    prestamo = record
        numSuc: integer; //Orden 1
        dni: String[8]; //xx.xxx.xxx | Orden 2
        numPrest: integer;
        fecha: String[10]; // dd/mm/aaaa | Orden 3
        monto: real;
    end;

    maestro = file of prestamo; //Se dispone

//Se dispone
function extraerAño(var fecha: String):integer; //Se le pasa el campo FECHA del registro prestamo

function leer(var arc: maestro; var data: prestamo);
 begin
    if (not eof(arc)) then
        read(arc, dat);
    else
        dat.numSuc = valorAlto;
 end;

procedure generarInforme (var m: maestro);
 var
  t: Text; //Archivo de texto
  regMae: prestamo; //Info del maestro

  codSuc: integer; dniEmp: String[8]; fec: integer; //Regs temporales de recorrido archivo

  cantVentas: integer; //Cantidad de prestamos otorgados al empleado
  montoVentas: real; //Monto por cantidad de prestamos del empleado

  totalVentas: integer; //Total ventas empleado
  totalMontos: real; //Total montos empleado

  totalVentasSucursal: integer;
  totalMontosSucursal: real;

 begin
    assign(t, 'informe.txt'); //Asigno un nombre logico a un nombre fisico
    rewrite(t); {creacion y apertura de txt}
    writeln(t, 'Informe de ventas de la empresa'); //1er LABEL del txt

    reset(m); {apertura maestro}
    leer(m, regMae); {primer lectura}
    fechaMae:= extraerAño(regMae.fecha); //Extraigo año
    
    totalVentasSucursal:= 0;
    totalMontosSucursal:= 0;

    {si no esta vacio, escribe la primer sucursal}
    if (regMae.numSuc <> valorAlto) then
        writeln(t, 'Sucursal ', regMae.numSuc); //Primer sucursal

    {el quilombo en cuestión: }
    while(regMae.numSuc <> valorAlto) do begin
        codSuc:= regMae.numSuc; //Almaceno temporalmente numero de sucursal

        dniEmp:= regMae.dni; //Almaceno temporalmente DNI
        writeln('DNI del empleado: ', dniEmp);

        totalVentas:= 0; totalMontos:= 0; //Totales del empleado
        
        writeln(t, 'Empleado: DNI ', dniEmp); //Escribo el DNI del empleado a tratar en TXT
        writeln(t, 'Año', '', 'Cantidad de ventas', '', 'Monto de ventas'); //Escribo LABELS de datos 
        
        {se procesan todos los registros de una misma sucursal y un mismo dni de empleado}
        while (regMae.numSuc = codSuc) and (regMae.dni = dniEmp) do begin 
            fec:= fechaMae; //ALmaceno temporalmente el año

            cantVentas:= 0; //Cantidad de ventas en el año
            montoVentas:= 0; //Montos de esas ventas del año

            {se procesan todos los registros de una misma sucursal, de un mismo empleado en el mismo año}
            while (regMae.numSuc = codSuc) and (regMae.dni = dniEmp) and (fechaMae = fec) do begin
                cantVentas:= cantVentas + 1; //Acumulo cantidad de ventas (prestamos) por año
                montoVentas:= montoVentas + regMae.monto; //Acumulo montos por ventas(Prestamos) del año
                leer(m, regMae); //Avanza el puntero
                fechaMae:= extraerAño(regMae.fecha); //Extraigo año
            end;

            {si el año, dni o sucursal no es el mismo, yo tengo que
            escribir la cantidad de ventas y montos de ese empleado en ese año}
            writeln(t, fec, cantVentas, montoVentas);

            {sigo acumulando totales del empleado}
            totalVentas:= totalVentas+cantVentas; //Total de todos los años
            totalMontos:= totalMontos + montoVentas; //Total de todos los años
        end;
        {Si el empleado cambió, debo ir sumando de igual manera el total de la sucursal antes de setear
        en 0 las ventas y montos de otro empleado}
        totalVentasSucursal:= totalVentasSucursal + totalVentas;
        totalMontosSucursal:= totalMontosSucursal + totalMontos;
        
        {si el DNI o sucursal cambian, yo tengo que
        escribir la cantidad de ventas total del empleado y montos totales de empleado}
        writeln(t, 'Totales', totalVentas, totalMontos);

        {Si cambia la sucursal, escribo lo restante.
         Sino, vuelve a la primer linea del while viendo que sea distinto de valor alto
        y comienza con otro empleado}
        if(codSuc <> regMae.numSuc) then begin
            writeln(t, 'Cantidad total de ventas sucursal: ', totalVentasSucursal);
            writeln(t, 'Monto total vendido por sucursal: ', totalMontosSucursal);
            writeln(t, ''); //Espacio en blanco
            totalVentasSucursal:= 0; //Seteamos en cero para siguiente sucursal
            totalMontosSucursal:= 0; //Seteamos en cero para siguiente sucursal
            writeln(t, 'Sucursal ', regMae.numSuc); //Nueva sucursal
        end,
    end;
    close(m); close(t); //Cierre de archivos.
 end;

var
    mae: maestro;
BEGIN
 assing(mae, 'maestro.dat');
 generarInforme(mae);
END.
