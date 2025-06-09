program golosinas;
const
 valorAlto = 9999;
 dimF = 20;
type
 producto = record
    cod: integer; //Orden
    nom: String;
    precio: real;
    stock: integer;
    stockMin: integer;
 end;

 venta = record
    cod: integer; //Orden
    vendido: integer;
 end;

 maestro: file of producto;
 detalle: file of venta;

 vectorDetalle: array [1..dimF] of detalle;
 vectorRegs: array [1..dimF] of venta;

procedure leer(var arch: detalle; var reg: venta);
 begin
    if (not eof(arch)) then
        read(arch, reg)
    else reg.cod:= valorAlto;
 end;


procedure minimo(var d: vectorDetalle; var r: vectorRegs; var min: venta);
 var i, pos: integer;
 begin
    min.cod:= valorAlto;
    for i:=1 to dimF do begin
        if (r[i].cod < min.cod) then begin
            min:= r[i];
            pos:= i;
        end;
    end;
    if (min.cod <> valorAlto) then
        leer(d[i], r[i]); //Leo el siguiente registro del detalle minimo
 end;

procedure actualizarMaestro(var mae: maestro; var vecD: vectorDetalle);
 var
    vecR: vectorRegs;
    infoMae: producto;
    min: venta;
    i, codTemp, cantidadVendida: integer;
    montoDiario: real;
    texto: Text;
 begin
    assign(texto, 'productos.txt');
    rewrite(texto); //creamos txt
    reset(mae);
    //Llenamos vector de reg de los regs de los detalles
    for i:=1 to dimF do begin
        reset(vecD[i]);
        leer(vecD[i], vecR[i]);
    end;

    minimo(vecD, vecR, min);
    while (min.cod <> valorAlto) do begin
        codTemp:= min.cod;
        cantidadVendida:= 0;
        while (codTemp = min.cod) do begin
            cantidadVendida:= cantidadVendida + min.vendido;
            minimo(vecD, vecR, min);
        end;
        {Me posiciono en maestro del producto detalle}
        read(mae, infoMae);
        while (infoMae.cod <> codTemp) do
            read(mae, infoMae);
        
        infoMae.stock:= infoMae.stock - cantidadVendida;
        {Evaluar monto diario}
        montoDiario:= infoMae.precio * cantidadVendida;
        {escribir txt}
        if (montoDiario > 10000) then
            write(texto, infoMae.cod, ' '. infoMae.stock, ' ', infoMae.stock, ' ', infoMae.stockMin, ' ', infoMae.precio, ' ', infoMae.nom);

        seek(mae, FilePos(mae)-1);
        write(mae, infoMae); //Actualizamos stock

    end; //Corte de control
    
    close(mae); close(texto);
    for i:=1 to dimF do
        close(vecD[i]);
 end; //Fin procedure


{PPAL}
var mae: maestro; //Se posee
    vecDetalles: vectorDetalle; //Se posee
    nombre: string[20];
BEGIN
 assign (mae, 'maestro.dat');
 for i:=1 to dimF do begin
    writeln('Ingrese nombre del archivo detalle: ');
    readln(nombre);
    assign (vecDetalles[i], nombre);
 end;
 actualizarMaestro(mae, vecDetalles);

END.