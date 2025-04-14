{5. Suponga que trabaja en una oficina donde está montada una LAN (red local). La misma fue
construida sobre una topología de red que conecta 5 máquinas entre sí y todas las
máquinas se conectan con un servidor central. Semanalmente cada máquina genera un
archivo de logs informando las sesiones abiertas por cada usuario en cada terminal y por
cuánto tiempo estuvo abierta. Cada archivo detalle contiene los siguientes campos:
cod_usuario, fecha, tiempo_sesion. Debe realizar un procedimiento que reciba los archivos
detalle y genere un archivo maestro con los siguientes datos: cod_usuario, fecha,
tiempo_total_de_sesiones_abiertas.
Notas:
● Cada archivo detalle está ordenado por cod_usuario y fecha.
● Un usuario puede iniciar más de una sesión el mismo día en la misma máquina, o
inclusive, en diferentes máquinas.
● El archivo maestro debe crearse en la siguiente ubicación física: /var/log.}
program ejer5
const
	n=5;
	valorAlto=99999;
	stringAlto='ZZZ';
type
	sesion=record
		cod_usuario:integer;
		fecha:string;
		tiempo:real;
	end;
	archivo=file of sesion;
	vd=array[1..n]of archivo;
	vr=array[1..n]of sesion;
procedure leer(var d:archivo;var r:sesion);
begin
	if(not eof(d))then
		read(d,r);
	else
		r.cod_usuario:=valorAlto;
end;
procedure minimo(var v:vd;var r:vr;var min:sesion);
var
	i,pos:integer
begin
	min.cod_usuario:=valorAlto;
	min.fecha:=stringAlto;
	for(i:=1 to n)do begin
		if(r[i].cod_usuario<min.cod_usuario or (r[i].cod_usuario = min.cod_usuario and r[i].fecha < min.fecha))then begin
			min:=r[i];
			pos:=i;
		end;
	end;
	if(min.cod_usario <> valorAlto)then begin
		leer(v[pos],r[pos]);
	end;
end;
procedure generarM(var m:archivo; var v:vd);
var
	i:integer;
	r:vr;
	min:sesion;
	aux:sesion;
begin
	rewrite(m);
	for(i:=1 to n)do begin
		reset(v[i]);
		leer(v[i],r[i]);
	end;
	minimo(v,r,min);
	while(min.cod_usuario <> valorAlto)do begin
		aux.cod_usuario:=min.cod_usuario;
		while(min.cod_usario = aux.cod_usuario)do begin
			aux.fecha:=min.fecha;
			aux.tiempo:=0;
			while(min.cod_usario = aux.cod_usuario) and (f= min.fecha)do begin
				aux.tiempo:= aux.tiempo + min.tiempo;
				minimo(v,r,min);
			end;
			write(m,aux);
		end;
	end;
	close(m);
	for(i:= 1 to n)do begin
		close(v[i]);
	end;
end;
var
	m:archivo;
	v:vd;
	i:integer;
	num:string;
begin
	assign(m,'/var/log.');
	for(i:= 1 to n)do begin
		str(i,num);
		assign(v[i],'detalle'+num);
	end;
	generarM(m,v);
	writeln('ARCHIVO CREADO');
end;
