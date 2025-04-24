{Se asume que se posee el maestro y un archivo de venta}
program tiendaDeIndumentarias;
type
    prenda = record
        cod_prenda: integer;
        descripcion: String;
        colores: String;
        tipo_prenda: String;
        stock: integer;
        precio_unitario: real;
    end;

    maestro = file of prenda; //no ordenado
    detalle = file of integer; //archivo de cod prendas


procedure marcado(var m: maestro; var d: detalle)
 var p: integer; //cod prenda
     infoMae: prenda;
 begin
    reset(m);
    read(m, infoMae);
    reset(d);
    while (not eof(d)) do begin
        read(d, p);
        writeln('Codigo de prenda: ', p);

        while (not eof(m)) and (infoMae.cod_prenda <> p) do
            read(m, infoMae);
        
        if (infoMae.cod_prenda = p) then
            infoMae.stock:= infoMae.stock * (-1);
            seek(m, filepos(m)-1);
            write(m, infoMae);
    end;
    close(m); close(d);
 end;

procedure bajaLogica(var m, n: maestro);
 var infoMae: prenda;
 begin
    rewrite(n);
    reset(m);
    while (not eof(m)) do begin
        read(m, infoMae);
        if (infoMae.stock > 0) then
            write(n, infoMae);
    end;
    close(n); close(m);
 end;

var mae, nue: maestro; det: detalle;
BEGIN
 assign(mae, 'maestro.dat');
 assign(det, 'ventas.dat');
 marcado(mae, det);
 assign(nue, 'nuevo.dat')
 bajaLogica(mae, nue);
 rename(mae, 'maestroOld.dat');
 rename(nue, 'maestro.dat');
END.