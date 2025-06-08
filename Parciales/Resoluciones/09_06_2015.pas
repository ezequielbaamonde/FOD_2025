program restaurantes;
const
 valorAlto:= 9999;
type
 productos = record
    cod: integer; //Orden
    nom: String;
    des: String;
    codBarra: integer;
    categoria: String;
    stock: integer;
    stockMin: integer;
 end;

 pedidos = record
    cod: integer; //Orden
    cant: integer;
    des: String;
 end;

 maestro: file of productos; //Se posee
 detalle: file of pedidos;
 
procedure leer(var arc: detalle; var reg: pedidos);
 begin
    if not eof(arc) then 
        read(arc, reg);
    else reg.cod:= valorAlto;
 end;

procedure minimo(var d1, d2, d3: detalle; var reg1, reg2, reg3: pedidos; var min: pedidos;);
 begin
  if(reg1.cod<=reg2.cod) and (reg1.cod<=reg3.cod) then begin
    min:= reg2;
    leer(d1, reg1);
  end
  else if(reg2.cod<=reg3.cod) then begin
    min:= reg2;
    leer(d2, reg2);
  end
  else begin
    min:= reg3;
    leer(d3, reg3);
  end;
 end;

procedure actualizarMaestro(var mae: maestro; var det1, det2, det3: detalle);
 var reg1, reg2, reg3, min; pedidos;
     infoMae: productos;
     diferencia: integer;
 begin
  reset(mae); reset(det1); reset(det2); reset(det3);
  leer(det1, reg1);
  leer(det2, reg2);
  leer(det3, reg3);
  minimo(det1, det2, det3, reg1, reg2, reg3, min);
  while (min.cod <> valorAlto) do begin
    read(mae, infoMae); //Leo maestro
    while (mae.cod <> min.cod) do //Busco maestro que coincida con detalle
        read(mae, infoMae);
    while (min.cod = infoMae.cod) do begin
        if (min.cant > infoMae.stock) then begin //Si no hay stock para lo solicitado
            diferencia:= min.cant - infoMae.stock;
            writeln('No hay stock suficiente para el pedido del producto ', min.cod);
            writeln('Diferencia de stock: ', diferencia);
            if (infoMae.stock > 0) then begin
                writeln('Stock a enviar: ', infoMae.stock);
                //Se envia stock actual tras pedido
                infoMae.stock:= infoMae.stock - infoMae.stock;
                {actualizo stock del mae}
                seek(mae, FilePos(mae) - 1);
                write(mae, infoMae); //Reescribo info
            end;
            minimo(det1, det2, det3, reg1, reg2, reg3, min)
        else begin
            infoMae.stock:= infoMae.stock - min.cant;
            {actualizo stock del mae}
            seek(mae, FilePos(mae) - 1);
            write(mae, infoMae); //Reescribo info
            minimo(det1, det2, det3, reg1, reg2, reg3, min);
        end;
    end;
    if (infoMae.stock < info.stockMin) then begin
        writeln('El producto ', infoMae.cod, ' quedo por debajo del stock minimo.')
        writeln('Categoria: ', infoMae.categoria);
    end;
  end;
  close (mae); close(det1); close(det2); close(det3);
 end;

var mae: maestro; det1, det2, det3: detalle;
BEGIN
 assign(mae, 'maestro.dat');
 assign(det1, 'detalle1.dat');
 assign(det2, 'detalle2.dat');
 assign(det3, 'detalle3.dat');
 actualizarMaestro(mae, det1, det2, det3);
END.