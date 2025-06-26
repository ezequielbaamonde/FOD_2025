program ventasEmpresa;
const VA = 9999;
type
 subMes = 1..31;
 cliente = record
    cod: integer;
    nom: String[30];
    ape: String[30];
 end;

 //Formato fecha dd-mm-aaaa (Todos numeros)
 infoMaestro = record
    cli: cliente; //cli.cod es el orden 1
    anio: integer; //Orden 2
    mes: submes; //Orden 3
    dia: integer;
    montoVenta: real;
 end;
 
 tArchivo = file of infoMaestro;

procedure leerMaestro(var m: tArchivo; var r: infoMaestro);
 begin
    if (not eof(m)) then
     read(m, r);
    else
     r.cli.cod:= VA;
 end;

procedure informe(var m: tArchivo);
 var totalMensual, montoAnual, montoVentasEmpresa: real;
     regMae: infoMaestro;
     cliAct, anioAct: integer;
     mesAct: subMes;
 begin
  reset(m);
  leerMaestro(m, regMae);
  montoVentasEmpresa:= 0; //Total obtenidode la empresa
  while(regMae.cod.cli <> VA) do begin
    cliAct:= regMae.cod.cli;
    writeln('Cliente ', regMae.cli.nom, ' ', regMae.cli.ape, ' (Codigo: ', cliAct, ')');
    while (cliAct = regMae.cod.cli) do begin
        anioAct:= regMae.anio;
        writeln(' Anio: ', anioAct);
        montoAnual:= 0;
        while (cliAct = regMae.cod.cli) and (anioAct = regMae.anio) do begin
            mesAct:= regMae.mes;
            writeln('  Mes: ', mesAct)
            totalMensual:= 0;
            while (cliAct = regMae.cod.cli) and (anioAct = regMae.anio) and (mesAct = regMae.mes) do begin
                totalMensual:= totalMensual + regMae.montoVenta;
                leerMaestro(m, regMae);
            end; //Cambio cliente, anio o mes
            montoAnual:= montoAnual + totalMensual;
            if (totalMensual > 0) do
                writeln('Total mensual: ', totalMensual);
        end; //Cambio cliente  o anio
        montoVentasEmpresa:= montoVentasEmpresa + montoAnual;
        writeln('Total anual: ', montoAnual);
    end; //Cambio cliente
  end;
  writeln('Monto total de ventas obtenido por la empresa: ', montoVentasEmpresa)
  close(m);
 end;