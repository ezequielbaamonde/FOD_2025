document.write("<script type='text/javascript' src='js/jquery-1.3.2.min.js'></script>");
document.write("<script type='text/javascript' src='js/jquery-ui-1.7.2.custom.min.js'></script>");
function marcarCaminoBusquedaBMas(elemento,ultimoElemento,existeElemento)
{
	for(var x=0;x<=vectorCaminoBMas.length;x++)
	{
		var idNodoAMarcar=vectorCaminoBMas[x];
		var nodoAMarcar=document.getElementById(idNodoAMarcar);
		if(nodoAMarcar!=undefined)
		{
			if(nodoAMarcar.hasChildNodes())
			{
					var nodoPadre=nodoAMarcar.parentNode.parentNode;
					if((nodoAMarcar.firstChild.nodeValue==elemento)&&(nodoPadre.childNodes.length == 1))
					{								  
						nodoAMarcar.style.backgroundColor='#3CC';
						$("#"+idNodoAMarcar+"").effect("pulsate",{times:5});
					}else
					{
						if(nodoAMarcar.firstChild.nodeValue < elemento)
						{
							if(existeElemento==true)
							{
								nodoAMarcar.style.backgroundColor='#3CC';
							}else
							{
								if(nodoAMarcar.firstChild.nodeValue==ultimoElemento)
								{
									nodoAMarcar.style.backgroundColor='#F9F';
								}else
								{
									nodoAMarcar.style.backgroundColor='#F9F';
								}
							}
						}else
						{
							if(existeElemento==true)
							{
								nodoAMarcar.style.backgroundColor='#3CC';
							}else
							{
				    			if(nodoAMarcar.firstChild.nodeValue==ultimoElemento)
								{
									nodoAMarcar.style.backgroundColor='#F9F';
								}else
								{
									nodoAMarcar.style.backgroundColor='#F9F';
								}
							}
						}
					}
				}
			}
		}
}


/*FUNCION QUE VUELVE EL ARBOL AL ESTADO ANTERIOR A REALIZAR UNA BUSQUEDA, RESETENADO LOS COLORES Y ELIMINANDO LAS EXPLICACIONES INCORPORADAS EN FUNCION MARCARCAMINODEBUSQUEDA*/
function rollBackBMas(altura,nodo,posicion,elemento)
{
	var longitudVector=vectorCaminoBMas.length;
	for(var x=0;x<=longitudVector;x++)
	{
		var idNodoAMarcar=vectorCaminoBMas[x]
		var nodoAMarcar=document.getElementById(idNodoAMarcar);
		if(nodoAMarcar!=undefined)
		{	
			nodoAMarcar.style.backgroundColor='#D1DFDE';
		}	
	}
	for(var i=0;i<=longitudVector;i++)
	{
		vectorCaminoBMas[i]=null;
		vectorCaminoBMas.length=0;
	}
	var divExplicacionBusqueda=document.getElementById("explicacionBusqueda");
	divExplicacionBusqueda.removeChild(divExplicacionBusqueda.lastChild);
}


/****************************************************************************************/
/*FUNCION QUE MUESTRA LA CREACION DEL ARBOL EN FUNCION DEL ORDEN QUE LLEGA COMO PARAMETRO CREANDO UN ARBOL VACIO PREPARADO PARA PODER EMPEZAR A INSERTAR, BORRAR Y BUSCAR ELEMENTOS*/
function crearArbolBMas(orden,maxElementos)
{
	
	vectorNumeracionBMas=new Array();//vector utilizado para almacenar los numeros de nodos a reutilizar
	contadorNumeroNodo=0;
	/*seteo la variable global que representa el ancho total de un nodo*/
	anchoTotalNodo=(anchoElemento*maxElementos)+(anchoPuntero*(maxElementos+1));
	/*creo el div que me representa el nodo raiz*/
	var divNodo=document.createElement('div');
	divNodo.id='N00';
	divNodo.style.position='relative';
	divNodo.style.zIndex=contadorNumeroNodo;//utilizo el zindex solo para guardar el numero de nodo	
	divNodo.style.width=anchoTotalNodo+170;
	/*creo el div que me representa el conjunto de elmentos de la raiz*/
	var divElementos=document.createElement('div');
	divElementos.id="E00";
	divNodo.appendChild(divElementos);
	/*creo los divs que representan los punteros y los elementos*/
	for(var x=0;x<=maxElementos-1;x++)
	{
		var divPuntero=document.createElement('div');
		divPuntero.id='P00'+x;
		divPuntero.style.width=anchoPuntero;
		divPuntero.style.height=30;
		divPuntero.className='puntero';	
		divPuntero.style.position='relative';
		divPuntero.style.cssFloat='left';
		divElementos.appendChild(divPuntero);
		var elementoNuevo=document.createElement('div');
		elementoNuevo.className="elemento";
		elementoNuevo.id='00'+x;
		elementoNuevo.style.width=anchoElemento;
		elementoNuevo.style.height=25;
		elementoNuevo.style.backgroundColor=color_nodo;
		elementoNuevo.style.color=color_texto_nodo;
		elementoNuevo.style.border=borde_elemento;
		elementoNuevo.style.position='relative';
		elementoNuevo.style.cssFloat='left';
		divElementos.appendChild(elementoNuevo);	
	}
	/*creo el ultimo puntero*/
	divPuntero=document.createElement('div');
	divPuntero.id='P00'+x;
	divPuntero.style.width=anchoPuntero;
	divPuntero.style.height=30;
	divPuntero.className='puntero';	
	divPuntero.style.position='relative';
	divPuntero.style.cssFloat='left';
	divElementos.appendChild(divPuntero);
	var contenedor=document.getElementById('contenedor');
	contenedor.style.width=(anchoTotalNodo*3)+500;
	contenedor.appendChild(divNodo);
	var movimientoArbol=(2*anchoTotalNodo)+(2*anchoElemento);
	$('#N00').animate({top:0, left:movimientoArbol},1250,function(){//rotulo raiz con numero Nodo 0
																	contexto.beginPath();
																	contexto.fillStyle= "green";
																	contexto.font="bold 11px Arial";
																	var posicionNodo=position(divNodo);
																	var container=document.getElementById("contenedor");
																	var posicionContenedor=position(container);
																	var coordenadaXNodo=parseFloat(posicionNodo.left)-parseFloat(posicionContenedor.left)-50;
																	var coordenadaYNodo=parseFloat(posicionNodo.top)-parseFloat(posicionContenedor.top)+15;		
																	contexto.fillText(" Nodo 0",coordenadaXNodo,coordenadaYNodo);
																	contadorNumeroNodo++;
																	ejecutarProximaAnimacionBMas();});	
}

/*FUNCION QUE MUESTRA LA INSERCION DE UN ELEMENTO SIN PRODUCIRSE OVERFLOW*/
function insertarSinOverFlowBMas(altura,nodo,posicion,elemento)
{
	/*me quedo con el div donde hay que insertar el elementos*/
	var idInsercion=""+altura+nodo+posicion;
	var divInsercion=document.getElementById(idInsercion);
	if(divInsercion.hasChildNodes())
	{
		ordenarNodoBMas(altura,nodo,elemento);
	}else
	{
		divInsercion.appendChild(document.createTextNode(elemento));
	}
	var idNodoMensaje="N"+altura+nodo;
	var nodoMensaje=document.getElementById(idNodoMensaje);
	var numeroNodoMensaje=nodoMensaje.style.zIndex;
	var mensaje="- Inserci\u00f3n  elemento "+elemento+" en el nodo "+numeroNodoMensaje;
	mostrarMensajeOperacionBMas(mensaje);
}

/*FUNCION QUE ORDENA LOS ELEMENTOS DENTRO DE UN NODO (OBVIAMENTE ORDEN MENOR A MAYOR)*/
function ordenarNodoBMas(altura,pos,elemento)
{
	for(var x=0;x<=maxElementos-1;x++)
	{
		var idPosicion=""+altura+pos+x;
		var posicion=document.getElementById(idPosicion);
		if(posicion.hasChildNodes())
		{
			if(parseInt(elemento) < parseInt(posicion.firstChild.nodeValue))
			{
				var elementoAuxiliar=posicion.firstChild.nodeValue;
				posicion.removeChild(posicion.firstChild);
				posicion.appendChild(document.createTextNode(elemento));
				elemento=elementoAuxiliar;
			
			}
		}else
		{
			if(elemento!=undefined)
			{
				posicion.appendChild(document.createTextNode(elemento));
				elemento=undefined;
			}
		}
	}
}

function deshabilitarBotonesBMas()
{
	var botonInsertar=document.getElementById("insertar");
	botonInsertar.disabled=true;
	var botonEliminar=document.getElementById("eliminar");
	botonEliminar.disabled=true;
	var botonBuscar=document.getElementById("busco");
	botonBuscar.disabled=true;
	var botonLimpiar=document.getElementById("resetear");
	botonLimpiar.disabled=true;
	var botonCrear=document.getElementById("crearArbol");
	botonCrear.disabled=true;
	var editInsercion=document.getElementById("numeroAInsertar");
	editInsercion.disabled=true;
	var editEliminacion=document.getElementById("numeroAEliminar");
	editEliminacion.disabled=true;
	var editBuscar=document.getElementById("numeroABuscar");
	editBuscar.disabled=true;
	var editOrden=document.getElementById("orden");
	editOrden.disabled=true;
	var editTipoArbol=document.getElementById("tipoArbol");
	editTipoArbol.disabled=true;
}

function habilitarBotonesBMas()
{
	var botonInsertar=document.getElementById("insertar");
	botonInsertar.disabled=false;
	var botonEliminar=document.getElementById("eliminar");
	botonEliminar.disabled=false;
	var botonBuscar=document.getElementById("busco");
	botonBuscar.disabled=false;
	var botonLimpiar=document.getElementById("resetear");
	botonLimpiar.disabled=false;
	var botonCrear=document.getElementById("crearArbol");
	botonCrear.disabled=false;
	var editInsercion=document.getElementById("numeroAInsertar");
	editInsercion.disabled=false;
	var editEliminacion=document.getElementById("numeroAEliminar");
	editEliminacion.disabled=false;
	var editBuscar=document.getElementById("numeroABuscar");
	editBuscar.disabled=false;
	var editOrden=document.getElementById("orden");
	editOrden.disabled=false;
	var editTipoArbol=document.getElementById("tipoArbol");
	editTipoArbol.disabled=false;
}

/*FUNCION QUE INSERTA EL ULTIMO ELEMENTO QUE PRODUCE OVERFLOW HACIENDO TITILAR TODO EL NODO QUE ENTRA EN OVERFLOW*/
function insertarConOverflowBMas(altura,nodo,posicion,elemento)
{
	deshabilitarBotonesBMas();
	/*me quedo con el div que representa el nodo*/
	var idNodoAInsertar="E"+altura+nodo;
	var nodoAInsertar=document.getElementById(idNodoAInsertar);
	/*me quedo con el elemento mas grande del nodo*/
	var ultimoPuntero=nodoAInsertar.lastChild;
	var numeroMasGrande=ultimoPuntero.previousSibling.lastChild.nodeValue;
	/*creo el div que me hara desbordar el nodo*/
	if(elemento < numeroMasGrande)
	{
		elementoNuevoDiv=numeroMasGrande;
	}else
	{
		elementoNuevoDiv=elemento;
	}
	ordenarNodoBMas(altura,nodo,elemento);
	var nuevoDiv=document.createElement('div');
	nuevoDiv.className="elemento";
	nuevoDiv.id='desborde';
	nuevoDiv.style.width=anchoElemento;
	nuevoDiv.style.height=25;
	nuevoDiv.style.backgroundColor=color_nodo;
nuevoDiv.style.color=color_texto_nodo;
	nuevoDiv.style.border=borde_elemento;
	nuevoDiv.style.position='relative';
	nuevoDiv.style.cssFloat='left';
	nuevoDiv.appendChild(document.createTextNode(elementoNuevoDiv));
	nodoAInsertar.appendChild(nuevoDiv);
	/*function que marca el el grafico que el nodo esta desbordado*/
	efectoTitilacionBMas(idNodoAInsertar);
}

/*FUNCION QUE HACE TITILAR EL ELEMENTO CON ID IGUAL A IDNODOATITILAR*/
function efectoTitilacionBMas(idNodoATitilar)
{
	$("#"+idNodoATitilar+"").effect("pulsate",{times:5},700,ejecutarProximaAnimacionBMas);
}

/*FUNCION QUE MUESTRA EN EL GRAFICO CUANDO SE PARTE LA RAIZ DEL ARBOL POR EFECTO DE UN SOBREFLUJO*/
function partirRaizBMas(elementoAPromocionar)
{
	borrarEnlacesBMas();
	//me quedo con el nodo raiz
	var nodoRaiz=document.getElementById('N00');
	//guardo el numero de la raiz para reutilizar
	vectorNumeracionBMas.push(parseFloat(nodoRaiz.style.zIndex));
	vectorNumeracionBMas.sort(function(a,b){return a-b;});
	/*si la raiz tiene hijos debo bajar su altura para darle lugar a los nuevos nodos que nacen por la division de la raiz*/
	if(nodoRaiz.childNodes.length > 1) //la raiz tiene hijos
	{
	    	//modifico los id de todos los nodos que se encuentran en el nivel 1 y los paso al nivel 2 del arbol
			var nodoAModificar=nodoRaiz.firstChild.nextSibling;
			for(var i=0;i<=nodoRaiz.childNodes.length-2;i++)
			{
				modificarAlturaHijosRaizBMas(nodoAModificar);
				nodoAModificar=nodoAModificar.nextSibling;
			}
			/*creo el nodo izquierdo*/
			var numeroNodo="N10";
			var nuevoTop=alturaEntreNodos;
			var posIzquierda=(anchoElemento+anchoPuntero+(maxElementos*30)+((maxElementos+1)*20));
			var nuevoLeftIzquierdo=-posIzquierda;
			crearNuevoNodoBMas(numeroNodo,nuevoTop,nuevoLeftIzquierdo,"izquierdo");
			/*creo el nodo derecho*/
			numeroNodo="N11";
			nuevoTop=alturaEntreNodos;
			nuevoLeftDerecho=(anchoElemento+anchoPuntero+(maxElementos*30)+((maxElementos+1)*20));
			crearNuevoNodoBMas(numeroNodo,nuevoTop,nuevoLeftDerecho,"derecho");
			/*distribuyo los hijos de la raiz entre los dos nuevos nodos creado*/
			distribuirHijosBMas('N00','N10','N11',elementoAPromocionar);
			/*distribuyo los elementos del nodo desbordado a ambos nodos creados*/
			distribuirElementosBMas("E00","E10","E11",elementoAPromocionar);
			centrarHijosEnFuncionAPadreBMas("N10");
			centrarHijosEnFuncionAPadreBMas("N11");
			setTimeout("centrarHijosEnFuncionAPadreBMas('N00')",3500);
			setTimeout("finalizarDistribucionBMas('E00','E10','E11',elementoAPromocionar)",velocidad_transicion);	
	}else
	{
		
		/*creo el nodo izquierdo*/
		var numeroNodo="N10";
		var nuevoTop=alturaEntreNodos;
		var posIzquierda=(anchoElemento+anchoPuntero+(maxElementos*30)+((maxElementos+1)*20));
		var nuevoLeft=-posIzquierda;
		crearNuevoNodoBMas(numeroNodo,nuevoTop,nuevoLeft,"izquierdo");
		/*creo el nodo derecho*/
		numeroNodo="N11";
		nuevoTop=alturaEntreNodos;
		nuevoLeft=(anchoElemento+anchoPuntero+(maxElementos*30)+((maxElementos+1)*20));
		/*distribuyo los elementos del nodo desbordado a ambos nodos creados*/
		crearNuevoNodoBMas(numeroNodo,nuevoTop,nuevoLeft,"derecho");	
		distribuirElementosBMas("E00","E10","E11",elementoAPromocionar);
		centrarHijosEnFuncionAPadreBMas("N00");
		setTimeout("finalizarDistribucionBMas('E00','E10','E11',elementoAPromocionar)",velocidad_transicion);
		
	}
	if(vectorNumeracionBMas.length == 0)
	{
		nodoRaiz.style.zIndex=contadorNumeroNodo;
		contadorNumeroNodo++;
	}else
	{
		var rotulo=vectorNumeracionBMas.shift();
		nodoRaiz.style.zIndex=rotulo;
	}
	var mensaje="- Divisi\u00f3n de la ra\u00edz, aumento de altura";
	mostrarMensajeOperacionBMas(mensaje);
}

/*FUNCION QUE BORRA LAS LINEAS DEL ARBOL REINICIANDO EL CANVAS - MODIFICANDO EL WIDTH SE REINICIA EL CANVAS*/
function borrarEnlacesBMas()
{
	divCanvas.width=divCanvas.width;
}

/*FUNCION QUE PONE EN 2 LA ALTURA DE TODOS LOS NODOS QUE SE ENCONTRABAN EN EL NIVEL 1 - RECORDAR QUE LA ALTURA ESTA INDICADA EN EL PRIMER DIGITO DEL ID DE CADA NODO*/
function modificarAlturaHijosRaizBMas(nodo)
{
	var idNodo=nodo.id;
	var alturaActual=idNodo[1];
	var alturaIncrementada=parseInt(alturaActual)+1;
	nodo.id="N"+alturaIncrementada+idNodo.substr(2,idNodo.length-2);
	idNodo=nodo.id;
	$("#"+idNodo).find("div").each(function(i){
			var idActual=$(this).attr("id");
			var primerPos=idActual[0];
			if(primerPos=="E")
			{
				var alturaElemento=idActual[1];
				var alturaElementoIncrementada=parseInt(alturaElemento)+1;
				var valor="E"+alturaElementoIncrementada+idActual.substr(2,idActual.length-2);
				$(this).attr("id",valor);
			}else
			{
				if(primerPos=="P")
				{
					var alturaPuntero=idActual[1];
					var alturaPunteroIncrementada=parseInt(alturaPuntero)+1;
					var valor="P"+alturaPunteroIncrementada+idActual.substr(2,idActual.length-3)+idActual.substr(idActual.length-1);
					$(this).attr("id",valor);
				}else
				{
					if(primerPos=="N")
					{
						var alturaActual=idActual[1];
						var alturaIncrementada=parseInt(alturaActual)+1;
						var valor="N"+alturaIncrementada+idActual.substr(2,idActual.length-2);
						$(this).attr("id",valor);
					}else
					{
						var alturaContenido=idActual[0];
						var alturaContenidoIncrementada=parseInt(alturaContenido)+1;
						var valor=alturaContenidoIncrementada+idActual.substr(1,idActual.length-2)+idActual.substr(idActual.length-1);
						$(this).attr("id",valor);
					}
				}
			}
        })
}

/*FUNCION QUE CREA UN NUEVO DIV QUE REPRESENTA UN NUEVO NODO EN EL ARBOL*/
function crearNuevoNodoBMas(numeroNodo,nuevoTop,nuevoLeft,posicionNodo)
{
	/*me quedo con el div padre*/
	var divPadre=document.getElementById('N00');
	/*creo el div que me representa el nodo*/
	var divNuevoNodo=document.createElement('div');
	divNuevoNodo.id=numeroNodo;
	if(vectorNumeracionBMas.length == 0)
	{
			divNuevoNodo.style.zIndex=contadorNumeroNodo;//utilizo el zindex solo para guardar el numero de nodo	
			contadorNumeroNodo++;
	}else
	{
			var rotulo=vectorNumeracionBMas.shift();
			divNuevoNodo.style.zIndex=rotulo;
	}
	divNuevoNodo.style.position='absolute';
	divNuevoNodo.style.height=30;
	divNuevoNodo.style.width=anchoTotalNodo+170;;
	/*creo el div que me representa el conjunto de elmentos del nodo*/
	var divElementos=document.createElement('div');
	divElementos.id="E"+numeroNodo[1]+numeroNodo[2];
	/*creo los divs que representan los punteros y los elementos*/
	for(var x=0;x<=maxElementos-1;x++)
	{
		var divPuntero=document.createElement('div');
		divPuntero.id='P'+numeroNodo[1]+numeroNodo[2]+x;
		divPuntero.style.width=anchoPuntero;
		divPuntero.style.height=30;
		divPuntero.className='puntero';	
		divPuntero.style.cssFloat='left';
		divElementos.appendChild(divPuntero);
		var elementoNuevo=document.createElement('div');
		elementoNuevo.className="elemento";
		elementoNuevo.id=''+numeroNodo[1]+numeroNodo[2]+x;
		elementoNuevo.style.width=anchoElemento;
		elementoNuevo.style.height=25;
		elementoNuevo.style.backgroundColor=color_nodo;
		elementoNuevo.style.color=color_texto_nodo;
		elementoNuevo.style.border=borde_elemento;
		elementoNuevo.style.cssFloat='left';
		divElementos.appendChild(elementoNuevo);	
	}
	/*creo el ultimo puntero*/
	divPuntero=document.createElement('div');
	divPuntero.id='P'+numeroNodo[1]+numeroNodo[2]+x;
	divPuntero.style.width=anchoPuntero;
	divPuntero.style.height=30;
	divPuntero.className='puntero';	
	divPuntero.style.cssFloat='left';
	divElementos.appendChild(divPuntero);
	/*creo un div que indica la explicacion de la creacion del nodo*/
	var divExplicacion=document.createElement('div');
	divExplicacion.style.backgroundColor=color_explicacion_nuevo_nodo;
	divExplicacion.style.border=borde_explicacion_nuevo_nodo;
	divExplicacion.style.width=120;
	divExplicacion.appendChild(document.createTextNode("Nuevo Nodo"));
	if(posicionNodo=="izquierdo")
	{
		divExplicacion.id="explicacionNuevoNodoIzquierdo";
	}else
	{
		divExplicacion.id="explicacionNuevoNodoDerecho";
	}
	divElementos.appendChild(divExplicacion);
	divNuevoNodo.appendChild(divElementos);
	divPadre.appendChild(divNuevoNodo);
	$('#'+numeroNodo).animate({top:nuevoTop, left:nuevoLeft},1250);
	
}

/*FUNCION QUE REPARTE LOS ELEMENTOS DEL NODO CON IDNODODESNORDADO EN LOS NUEVOS NODOS CREADOS POR LA EXPLOCION. LOS NUEVOS NODOS SON LOS QUE TIENE IDNODOIZQUIERDO Y IDNODODERECHO RESPECTIVAMENTE*/
function distribuirHijosBMas(idNodoDesbordado,idNodoIzquierdo,idNodoDerecho,elementoAPromocionar)
{
	//me quedo con el nodo desbordado
	var divDesbordado=document.getElementById(idNodoDesbordado);
	//me quedo con el nodo izquierdo
	var divIzquierdo=document.getElementById(idNodoIzquierdo);
	//me quedo con el nodo derecho
	var divDerecho=document.getElementById(idNodoDerecho);
	var divParcial=divDesbordado.firstChild.nextSibling;
	/*me quedo con la cantidad de hijos del nodo desbordado*/
	var cantHijos=parseInt(divDesbordado.childNodes.length)-3;
	for(var x=1;x<=cantHijos;x++)
	{
		elemento=divParcial.firstChild.firstChild.nextSibling.firstChild.nodeValue;
		if(elemento < elementoAPromocionar)//el hijo va al nodo izquierdo
		{
			divTemporal=document.createElement('div');
			divTemporal.id='temporal';
			divIzquierdo.appendChild(divTemporal);
			divAuxiliar=divParcial.nextSibling;
			divIzquierdo.replaceChild(divParcial,divTemporal);
		}else
		{
			if(elemento >= elementoAPromocionar)
			{
				divTemporal=document.createElement('div');
				divTemporal.id='temporal';
				divDerecho.appendChild(divTemporal);
				if(divParcial.nextSibling!=undefined)
				{
					divAuxiliar=divParcial.nextSibling;
				}
				divDerecho.replaceChild(divParcial,divTemporal);
			}
		}
		divParcial=divAuxiliar;
	}
}

/*FUNCION QUE DISTRIBUYE LOS ELEMENTOS DE UN NODO A 2 NUEVOS NODOS CUYO ID LLEGA COMO PARAMETRO*/
function distribuirElementosBMas(idNodoOverFlow,idNodoIzquierdo,idNodoDerecho,elementoAPromocionar)
{
	/*me quedo con el nodo que desbordo*/
	var nodoOverFlow=document.getElementById(idNodoOverFlow);
	var desbordado=nodoOverFlow.nextSibling;
	/*me quedo con el nodo izquierdo*/
	var nodoIzquierdo=document.getElementById(idNodoIzquierdo);
	var divParcialIzquierdo=nodoIzquierdo.firstChild.nextSibling;
	/*me quedo con el nodo derecho*/
	var nodoDerecho=document.getElementById(idNodoDerecho);
	var divParcialDerecho=nodoDerecho.firstChild.nextSibling;
	var divParcial=nodoOverFlow.firstChild;
	for(var x=0;x<=nodoOverFlow.childNodes.length-1;x++)
	{
		if(divParcial.hasChildNodes())
		{
			if(divParcial.firstChild.nodeValue < elementoAPromocionar)
			{
				divParcial.style.backgroundColor=color_division_izquierda;
				divParcialIzquierdo.style.backgroundColor=color_division_izquierda;
				divParcialIzquierdo.appendChild(document.createTextNode(divParcial.firstChild.nodeValue));
				divParcialIzquierdo=divParcialIzquierdo.nextSibling.nextSibling;
			}else
			{
				if(desbordado.childNodes.length == 1)//el nodo que desbordo es intermedio
				{
					if(divParcial.firstChild.nodeValue >= elementoAPromocionar)
					{
						divParcial.style.backgroundColor=color_division_derecha;
						divParcialDerecho.style.backgroundColor=color_division_derecha;
						divParcialDerecho.appendChild(document.createTextNode(divParcial.firstChild.nodeValue));
						divParcialDerecho=divParcialDerecho.nextSibling.nextSibling;
					}
				}else
				{
					if(divParcial.firstChild.nodeValue > elementoAPromocionar)
					{
						divParcial.style.backgroundColor=color_division_derecha;
						divParcialDerecho.style.backgroundColor=color_division_derecha;
						divParcialDerecho.appendChild(document.createTextNode(divParcial.firstChild.nodeValue));
						divParcialDerecho=divParcialDerecho.nextSibling.nextSibling;
					}
				}
			}
		}
		divParcial=divParcial.nextSibling;
	}
}

/*FUNCION MUY IMPORTANTE!!!! QUE RESIBE UN NODO Y CENTRA SUS HIJOS EN FUNCION A EL. ESTA FUNCION ES UTILIZADA PARA RENDERIZAR EL ARBOL*/
function centrarHijosEnFuncionAPadreBMas(idNodoPadre)
{
	var padre=document.getElementById(idNodoPadre);
	var cantidadHijos=calcularCantidadHijosRamaBMas(padre);
	var ancho=(cantidadHijos * anchoTotalNodo)+((cantidadHijos-1)*distanciaEntreNodos);
	var medio=parseFloat(ancho / 2);
	var posicionHijoMasIzquierdo=medio*(-1);
	//me quedo con el nodo del extremo mas izquierdo del arbol
	var extremoIzquierdo=padre.firstChild.nextSibling;
	while(extremoIzquierdo.childNodes.length > 1)
	{
		extremoIzquierdo=extremoIzquierdo.firstChild.nextSibling;
	}
	var hijoIzquierdo=padre.firstChild.nextSibling;
	//me quedo con la posicion real del nodo mas extremo del arbol
	var posExtremoIzquierdo=position(extremoIzquierdo);
	var leftExtremoIzquierdo=posExtremoIzquierdo.left;
	//me quedo con la posicion real del primer hijo del padre
	var posHijoIzquierdo=positionBMas(hijoIzquierdo);
	var leftHijoIzquierdo=posHijoIzquierdo.left;
	//calculo la distancia entre ambos nodos
	var distancia=leftHijoIzquierdo-leftExtremoIzquierdo;
	//acomodo los hijos
	posicionHijoMasIzquierdo=posicionHijoMasIzquierdo+distancia+(anchoTotalNodo/2);
	hijoIzquierdo.style.left=posicionHijoMasIzquierdo;
	corrimientoADerechaBMas(hijoIzquierdo.id);
}

/*FUNCION QUE BORRA LAS EXPLICACIONES AGREGADAS EN EL EFECTO DE PARTIR RAIZ. SE FINALIZA EL PARTIR RAIZ Y SE DEJA EL ARBOL PREPARADO PARA LA PROXIMA OPERACION A REALIZAR*/
function finalizarDistribucionBMas(idNodoOverFlow,idNodoIzquierdo,idNodoDerecho,elementoAPromocionar)
{
	/*me quedo con el nodo que desbordo*/
	var nodoOverFlow=document.getElementById(idNodoOverFlow);
	/*me quedo con el nodo izquierdo*/
	var nodoIzquierdo=document.getElementById(idNodoIzquierdo);
	var divParcialIzquierdo=nodoIzquierdo.firstChild.nextSibling;
	/*me quedo con el nodo derecho*/
	var nodoDerecho=document.getElementById(idNodoDerecho);
	var divParcialDerecho=nodoDerecho.firstChild.nextSibling;
	var divParcial=nodoOverFlow.firstChild;
	for(var x=0;x<=nodoOverFlow.childNodes.length-1;x++)
	{
		if(divParcial.hasChildNodes())
		{
			if(divParcial.firstChild.nodeValue < elementoAPromocionar)
			{
				divParcial.style.backgroundColor=color_nodo;
				divParcialIzquierdo.style.backgroundColor=color_nodo;
				divParcial.removeChild(divParcial.firstChild);
				divParcialIzquierdo=divParcialIzquierdo.nextSibling.nextSibling;
			}else
			{
				if(divParcial.firstChild.nodeValue >= elementoAPromocionar)
				{
					divParcial.style.backgroundColor=color_nodo;
					divParcialDerecho.style.backgroundColor=color_nodo;
					divParcial.removeChild(divParcial.firstChild);
					divParcialDerecho=divParcialDerecho.nextSibling.nextSibling;
				}else
				{
					divParcial.removeChild(divParcial.firstChild);
					}
			}
		}
		divParcial=divParcial.nextSibling;
	}
	/*reacomodo el elemento que pasa a ser separador*/
	nodoOverFlow.firstChild.nextSibling.appendChild(document.createTextNode(elementoAPromocionar));
	/*borro los elementos de explicacion*/
	var divElementoOverFlow=document.getElementById('desborde');
	nodoOverFlow.removeChild(divElementoOverFlow);
	var divNuevoNodoIzquierdo=document.getElementById('explicacionNuevoNodoIzquierdo');
	nodoIzquierdo.removeChild(divNuevoNodoIzquierdo);
	var divNuevoNodoDerecho=document.getElementById('explicacionNuevoNodoDerecho');
	nodoDerecho.removeChild(divNuevoNodoDerecho);
	var terminoMoverParaScroll=moverArbolParaScrollBMas();
	var botonInsertar=document.getElementById("insertar");
	
}

/*FUNCION QUE ACOMODA EL ARBOL PARA QUE NO SE VAYA DE PANTALLA*/
function moverArbolParaScrollBMas()
{
	var conteiner=document.getElementById("contenedor");
	var posicionContenedor=positionBMas(conteiner);
	var limiteIzquierdoPantalla= ((posicionContenedor.left) + (anchoTotalNodo/2));
	//busco el nodo mas extremo de la rama izquierda
	var contenedor=document.getElementById("wrapperContenedor");
	var hijoIzquierdo=document.getElementById("N10");
	var idHijoExtremoIzquierdo=obtenerHijoMasIzquierdodelArbolBMas(hijoIzquierdo);
	var posicionReal = $('#'+idHijoExtremoIzquierdo).offset();
	var posicionConDezplasamiento=parseInt(posicionReal.left)+parseInt(contenedor.scrollLeft);
	if(parseInt(posicionConDezplasamiento) < limiteIzquierdoPantalla )
	{
		var movimientoArbolCompleto=(limiteIzquierdoPantalla - parseInt(posicionConDezplasamiento))+anchoElemento;
		$('#N00').animate({left:"+="+movimientoArbolCompleto+"px"},1250,function(){dibujarEnlacesBMas();});
	}else
	{
		var movimientoArbolCompleto=parseInt(posicionConDezplasamiento) - limiteIzquierdoPantalla - anchoElemento;
		$('#N00').animate({left:"-="+movimientoArbolCompleto+"px"},1250,function(){dibujarEnlacesBMas();});
	}
	return true;
}

/*FUNCION QUE DEVUELVE LA POSICION REAL DE UN ELEMENTO EN LA PANTALLA (POSICION ABSOLUTA)*/
function positionBMas(element) 
{
	if (typeof element == "string")
		element = document.getElementById(element)
	if (!element) 
		return { top:0,left:0 };
	var y = 0;
	var x = 0;
	while (element.offsetParent) 
	{
		x += element.offsetLeft;
		y += element.offsetTop;
		element = element.offsetParent;
	}
	return {top:y,left:x};
}

/*FUNCION RECURSIVA QUE OBTIENE EL NODO MAS EXTREMO IZQUIERDO DEL NODO QUE LLEGA COMO PARAMETRO*/
function obtenerHijoMasIzquierdodelArbolBMas(hijoIzquierdo)
{
	if(hijoIzquierdo.childNodes.length > 1)
	{
		id=obtenerHijoMasIzquierdodelArbolBMas(hijoIzquierdo.firstChild.nextSibling);
		return id;
	}else
	{
		return hijoIzquierdo.id;
	}
}

/*FUNCION QUE MUESTRA EN EL HISTORIAL EL MENSAJE RECIBIDO COMO PARAMETRO*/
function mostrarMensajeOperacionBMas(mensaje)
{
	var divExplicacion=document.getElementById('explicacionHistorial');
	if(divExplicacion.hasChildNodes())
	{
		var primerExplicacion=divExplicacion.firstChild;
		var parrafoNuevo=document.createElement('p');
		parrafoNuevo.appendChild(document.createTextNode(mensaje));
		divExplicacion.insertBefore(parrafoNuevo,primerExplicacion);
	}else
	{
		var parrafoNuevo=document.createElement('p');
		parrafoNuevo.appendChild(document.createTextNode(mensaje));
		divExplicacion.appendChild(parrafoNuevo);
	}
}

/*FUNCION QUE DIBUJA LOS ENLACES ENTRE LOS NODOS DEL ULTIMO NIVEL POR TRATARSE DE UN ARBOLB+ */
//function dibujarEnlaceEntreNodosUltimoNivel(divNodo,contexto,posicionContenedor)
function dibujarEnlaceEntreNodosUltimoNivel(divNodo,posicionContenedor)
{
	//me quedo con el div padre del nodo que llega como parametro
	if(divNodo.previousSibling.previousSibling==undefined)
	{
		var idNodo=divNodo.id;
		var numeroNodoLimite=parseInt(idNodo.substr(2,idNodo.length-2));
		if(numeroNodoLimite==0)
		{
			var posicionComienzoLista=position(divNodo);
			var origenComienzoX=parseFloat(posicionComienzoLista.left)-parseFloat(posicionContenedor.left)-distanciaEntreRamas;
			var origenComienzoY=parseFloat(posicionComienzoLista.top)-parseFloat(posicionContenedor.top)+15;
			contexto.moveTo(origenComienzoX,origenComienzoY);
			var destinoComienzoX=parseFloat(posicionComienzoLista.left)-parseFloat(posicionContenedor.left);
			var destinoCominezoY=parseFloat(posicionComienzoLista.top)-parseFloat(posicionContenedor.top)+15;
			contexto.lineTo(destinoComienzoX,destinoCominezoY);
			contexto.moveTo(destinoComienzoX,destinoCominezoY);
			contexto.lineTo(destinoComienzoX-5,destinoCominezoY-5);
			contexto.moveTo(destinoComienzoX,destinoCominezoY);
			contexto.lineTo(destinoComienzoX-5,destinoCominezoY+5);
			contexto.stroke();
		}
	}
	if(divNodo.nextSibling!=undefined)
	{
		var divHermanoDerecho=divNodo.nextSibling;
		var posicionOrigen=position(divNodo);
		var coordenadaOrigenX=parseFloat(posicionOrigen.left)-parseFloat(posicionContenedor.left)+anchoTotalNodo;
		var coordenadaOrigenY=parseFloat(posicionOrigen.top)-parseFloat(posicionContenedor.top)+15;
		contexto.moveTo(coordenadaOrigenX,coordenadaOrigenY);
		var posicionDestino=position(divHermanoDerecho);
		var coordenadaDestinoX=parseFloat(posicionDestino.left)-parseFloat(posicionContenedor.left);
		var coordenadaDestinoY=parseFloat(posicionDestino.top)-parseFloat(posicionContenedor.top)+15;
		contexto.lineTo(coordenadaDestinoX,coordenadaDestinoY);
		contexto.moveTo(coordenadaDestinoX,coordenadaDestinoY);
		contexto.lineTo(coordenadaDestinoX-5,coordenadaDestinoY-5);
		contexto.moveTo(coordenadaDestinoX,coordenadaDestinoY);
		contexto.lineTo(coordenadaDestinoX-5,coordenadaDestinoY+5);
		contexto.stroke();
	}else
	{
		var divPadre=divNodo.parentNode;
		var fin=false;
		while((divPadre.id != "N00")&&(fin==false))
		{
			if(divPadre.nextSibling!=undefined)//el padre tiene hermano uno las puntas de ambos
			{
			 	var divHermanoDerechoPadre=divPadre.nextSibling;
				var idHijoIzquierdoHermanoDerecho=obtenerHijoMasIzquierdodelArbolBMas(divHermanoDerechoPadre);
				var divHermanoDerecho=document.getElementById(idHijoIzquierdoHermanoDerecho);
				var posicionOrigen=position(divNodo);
				var coordenadaOrigenX=parseFloat(posicionOrigen.left)-parseFloat(posicionContenedor.left)+anchoTotalNodo;
				var coordenadaOrigenY=parseFloat(posicionOrigen.top)-parseFloat(posicionContenedor.top)+15;
				//contexto.beginPath();
				contexto.moveTo(coordenadaOrigenX,coordenadaOrigenY);
				var posicionDestino=position(divHermanoDerecho);
				var coordenadaDestinoX=parseFloat(posicionDestino.left)-parseFloat(posicionContenedor.left);
				var coordenadaDestinoY=parseFloat(posicionDestino.top)-parseFloat(posicionContenedor.top)+15;
				contexto.lineTo(coordenadaDestinoX,coordenadaDestinoY);
				contexto.moveTo(coordenadaDestinoX,coordenadaDestinoY);
				contexto.lineTo(coordenadaDestinoX-5,coordenadaDestinoY-5);
				contexto.moveTo(coordenadaDestinoX,coordenadaDestinoY);
				contexto.lineTo(coordenadaDestinoX-5,coordenadaDestinoY+5);
				contexto.stroke();
			}
			if(divPadre.parentNode.id!="N00")
			{
				divPadre=divPadre.parentNode;
			}else
			{
				fin=true;
			}
		}
		
	}
}

/*FUNCION RECURSIVA QUE OBTIENE EL NODO MAS EXTREMO IZQUIERDO DEL NODO QUE LLEGA COMO PARAMETRO*/
function obtenerHijoMasIzquierdodelArbolBMas(hijoIzquierdo)
{
	if(hijoIzquierdo.childNodes.length > 1)
	{
		id=obtenerHijoMasIzquierdodelArbol(hijoIzquierdo.firstChild.nextSibling);
		return id;
	}else
	{
		return hijoIzquierdo.id;
	}
}


/*FUNCION QUE ROTULA A LOS NODOS DEL ARBOL CON EL NUEMRO QUE LE CORRESPONDE*/
function rotularNodoBMas(divPadre,posicionContenedor)
{
	var idNodoPadre=divPadre.id;
	contexto.fillStyle= "green";
	contexto.font="bold 11px Arial";
	if(idNodoPadre=="N00")
	{
		var posicionNodo=position(divPadre);
		var coordenadaXNodo=parseFloat(posicionNodo.left)-parseFloat(posicionContenedor.left)-50;
		var coordenadaYNodo=parseFloat(posicionNodo.top)-parseFloat(posicionContenedor.top)+10;		
		contexto.fillText(" Nodo "+divPadre.style.zIndex,coordenadaXNodo,coordenadaYNodo);
	}
	var hijo=divPadre.firstChild.nextSibling;
	for(var x=1;x<=divPadre.childNodes.length-1;x++)
	{
		var posicionNodo=position(hijo);
		var coordenadaXNodo=parseFloat(posicionNodo.left)-parseFloat(posicionContenedor.left)-50;
		var coordenadaYNodo=parseFloat(posicionNodo.top)-parseFloat(posicionContenedor.top)+10;			
		contexto.fillText(" Nodo "+hijo.style.zIndex,coordenadaXNodo,coordenadaYNodo);
		if(hijo.nextSibling!=undefined)
		{
			hijo=hijo.nextSibling;
		}
	}
	
}


/*FUNCION QUE DIBUJA LAS LINEAS ENTRE LOS NODOS UTILIZANDO LA ETIQUETA CANVAS HTML5*/
//function dibujarEnlaceEntreNodosBMas(divPadre,contexto,posicionContenedor)
function dibujarEnlaceEntreNodosBMas(divPadre,posicionContenedor)
{
	if((divPadre.childNodes.length-1) <= ordenGlobal)
	{
			//me quedo con el div que representa a los elementos
			var divElementos=divPadre.firstChild;
			var puntero=divElementos.firstChild;
			var hijo=divPadre.firstChild.nextSibling;
			for(var x=1;x<=divPadre.childNodes.length-1;x++)
			{
					var posicionPuntero=positionBMas(puntero);
					var posicionHijo=positionBMas(hijo);
					//Dibujo en el contexto del canvas
					var coordenadaXPuntero=parseFloat(posicionPuntero.left)-parseFloat(posicionContenedor.left);
					var coordenadaYPuntero=parseFloat(posicionPuntero.top)-parseFloat(posicionContenedor.top)+30;
					contexto.moveTo(coordenadaXPuntero,coordenadaYPuntero);
	  				var coordenadaXHijo=parseFloat(posicionHijo.left)-parseFloat(posicionContenedor.left)+(parseFloat((anchoTotalNodo/2)));
					var coordenadaYHijo=parseFloat(posicionHijo.top)-parseFloat(posicionContenedor.top);
					contexto.lineTo(coordenadaXHijo,coordenadaYHijo);
					contexto.stroke();
					if(puntero.nextSibling != undefined)
					{
						puntero=puntero.nextSibling.nextSibling;
					}
					if(hijo.nextSibling!=undefined)
					{
						hijo=hijo.nextSibling;
					}
			}
	}else
	{
			//me quedo con el div que representa a los elementos
			var divElementos=divPadre.firstChild;
			var puntero=divElementos.firstChild;
			var hijo=divPadre.firstChild.nextSibling;
			for(var x=1;x<=divPadre.childNodes.length-2;x++)
			{
					var posicionPuntero=positionBMas(puntero);
					var posicionHijo=positionBMas(hijo);
					//Dibujo en el contexto del canvas
					var coordenadaXPuntero=parseFloat(posicionPuntero.left)-parseFloat(posicionContenedor.left);
					var coordenadaYPuntero=parseFloat(posicionPuntero.top)-parseFloat(posicionContenedor.top)+30;
					contexto.moveTo(coordenadaXPuntero,coordenadaYPuntero);
	  				var coordenadaXHijo=parseFloat(posicionHijo.left)-parseFloat(posicionContenedor.left)+parseFloat((anchoTotalNodo/2));
					var coordenadaYHijo=parseFloat(posicionHijo.top)-parseFloat(posicionContenedor.top);
					contexto.lineTo(coordenadaXHijo,coordenadaYHijo);
					contexto.stroke();
					if(puntero.nextSibling != undefined)
					{
						puntero=puntero.nextSibling.nextSibling;
					}
					if(hijo.nextSibling!=undefined)
					{
						hijo=hijo.nextSibling;
					}
			}
	}
			
}

/*FUNCION QUE DIBUJA LAS LINEAS ENTRE LOS NODOS UTILIZANDO CANVAS HTML5*/
function dibujarEnlacesBMas()
{
	divCanvas.width =divCanvas.width;
	var container=document.getElementById("contenedor");
	var posicionContenedor=position(container);
	contexto.beginPath();
	$("#contenedor").find("div").each(function(i){
			var idActual=$(this).attr("id");
			var primerPos=idActual[0];
			if(primerPos=="N")
			{
				//me quedo con el div padre
				var divPadre=document.getElementById(idActual);
				rotularNodoBMas(divPadre,posicionContenedor);
				if(divPadre.childNodes.length > 1)//el nodo tiene hijos
				{
					dibujarEnlaceEntreNodosBMas(divPadre,posicionContenedor);	
				}else
				{
					dibujarEnlaceEntreNodosUltimoNivel(divPadre,posicionContenedor);	
				}
			}
     })
	contexto.closePath();
	//habilito los botones de operaciones
	habilitarBotonesBMas();
	ejecutarProximaAnimacionBMas();
}

/*FUNCION QUE HACE EL EFECTO DE TITILACION CUANDO SE QUIERE INSERTAR UN ELEMENTO QUE YA EXISTE EN EL ARBOL*/
function marcarElementoExistenteBMas(altura,nodo,posicion){
	 var idElementoExistente=""+altura+nodo+posicion;
	 $("#"+idElementoExistente+"").effect("pulsate",{times:5},500,ejecutarProximaAnimacionBMas);
}

/*FUNCION QUE MUEVE A LA DERECHA UN NODO EN FUNCION DEL ANCHO DE SU HERMANO IZQUIERDO*/
function corrimientoADerechaBMas(idDivNuevoNodoDerecho)
{
	/*me quedo con el div a partir del cual hay que realizar el corrimiento*/
	var divLimite=document.getElementById(idDivNuevoNodoDerecho);
	var numeroNodoLimite=idDivNuevoNodoDerecho;
	numeroNodoLimite=parseInt(numeroNodoLimite.substr(2,numeroNodoLimite.length-2));
	/*me quedo con el div padre*/
	var divPadre=divLimite.parentNode;
	/*realizo el corrimiento*/
	var divACorrer=divPadre.firstChild.nextSibling;
	if(divACorrer.childNodes.length == 1)
	{
		for(var x=0;x<=divPadre.childNodes.length-2;x++)
		{
			var numeroNodoACorrer=divACorrer.id;
			numeroNodoACorrer=parseInt(numeroNodoACorrer.substr(2,numeroNodoACorrer.length-2));
			if(parseInt(numeroNodoACorrer) > parseInt(numeroNodoLimite))
			{
				var movimiento=parseInt(divACorrer.previousSibling.style.left)+anchoTotalNodo+distanciaEntreNodos;
				divACorrer.style.left=movimiento;
			}
			divACorrer=divACorrer.nextSibling;
		}
	}else
	{
		for(var x=0;x<=divPadre.childNodes.length-2;x++)
		{
			var idDivACorrer=divACorrer.id;
			var numeroNodoACorrer=parseInt(idDivACorrer.substr(2,idDivACorrer.length-2));
			if(parseInt(numeroNodoACorrer) > parseInt(numeroNodoLimite))
			{
				var movimiento=calcularMovimientoEnFuncionAHijosIzquierdos(idDivACorrer);
				divACorrer.style.left=movimiento;
			}
			divACorrer=divACorrer.nextSibling;
		}
	}
}

/*FUNCION QUE RETORNA LA CANTIDAD DE NODOS HOJAS QUE CUELGAN DEL NODO QUE LLEGA COMO PARAMETRO*/
function calcularCantidadHijosRamaBMas(rama)
{
	var cantidadHijos=0;
	var id=rama.id;
	$("#"+id).find("div").each(function(i){
			var idActual=$(this).attr("id");
			var primerPosicion=idActual[0];
			if(primerPosicion=="N")
			{
				var divParcial=document.getElementById(idActual);
				if(divParcial.childNodes.length == 1)
				{
					cantidadHijos=cantidadHijos +1;
				}
			}
        });
	return cantidadHijos;
}

function destruirArbolBMas()
{
	var contenedor=document.getElementById("contenedor");
	var raiz=document.getElementById("N00");
	var historial=document.getElementById("explicacionHistorial");
	while (historial.hasChildNodes()) 
	{
    	historial.removeChild(historial.lastChild);
	}
	contenedor.removeChild(raiz);
	borrarEnlacesBMas();
}

/*FUNCION QUE MUESTRA CUANDO SE CREAN DOS NUEVOS NODOS POR UN DESBORDE*/
function partirNodoBMas(altura,nodo,posicionAPromocionar,elementoAPromocionar,posicionPadre,vuelta)
{
	
	 borrarEnlacesBMas();
	/*me quedo con el nodo desbordado*/
	 idNodoDesbordado="E"+altura+nodo;
	/*modifico los id de los nodos que se encuentran a la altura del nodo desbordado por la creacion de los nuevos nodos*/
	divNodoDesbordado=document.getElementById(idNodoDesbordado);
	numeroNodoDesbordado=idNodoDesbordado;
	numeroNodoDesbordado=parseInt(numeroNodoDesbordado.substr(2,numeroNodoDesbordado.length-2));
	//incremento el id de todos los hermanos mayores al nodo derecho creado por la division
	incrementarIdDivsHermanosBMas(numeroNodoDesbordado,altura);
	/*me quedo con el div que engloba al nodo desbordado*/
	 divEnglobaDesbordado=divNodoDesbordado.parentNode;
	 idDivEnglobaDesbordado=divEnglobaDesbordado.id;
	 divPadreNodoDesbordado=divNodoDesbordado.parentNode.parentNode;
	/*cambio todos los id del nodo que se parte en dos y todos sus hijos*/
	divEnglobaDesbordado.id=idDivEnglobaDesbordado+"Provisorio";
	divNodoDesbordado.id=idNodoDesbordado+"Provisorio";
	divProvisorio=divNodoDesbordado.firstChild;
	for(var x=0;x<=divNodoDesbordado.childNodes.length-1;x++)
	{
		divProvisorio.id=divProvisorio.id+"Provisorio";
		divProvisorio=divProvisorio.nextSibling;
	}
	/*me quedo con el div que engloba el nodo desbordado provisorio*/
	 divEnglobaDesbordadoProvisorio=document.getElementById(idNodoDesbordado+"Provisorio");
	/*creo los dos divs que me representan la division*/
	/*creo el nodo izquierdo*/
	 numeroNodo=idNodoDesbordado;
	 ancho=((maxElementos/2)*anchoElemento) + ((maxElementos/2)*anchoPuntero)+anchoPuntero;
	 nuevoLeftIzquierdo=-ancho;
	 nuevoTop=35;
	 crearNuevoNodoDivisionBMas(numeroNodo,nuevoTop,nuevoLeftIzquierdo,"izquierdo",idNodoDesbordado+"Provisorio",idDivEnglobaDesbordado+"Provisorio",idDivEnglobaDesbordado);
	/*creo el nodo derecho*/
	 proximoNodo=nodo+1;
	 idEnglobaDesbordadoDerecho="N"+altura+proximoNodo;
	 nuevoTopDerecho=35;
	 nuevoLeftDerecho=((maxElementos/2)*anchoElemento) + ((maxElementos/2)*anchoPuntero)+anchoElemento+2*anchoPuntero;
	crearNuevoNodoDivisionBMas(numeroNodo,nuevoTopDerecho,nuevoLeftDerecho,"derecho",idNodoDesbordado+"Provisorio",idDivEnglobaDesbordado+"Provisorio",idEnglobaDesbordadoDerecho);
	
	
	/*distribuyo los hijos del nodo desbordado si tiene*/
	if(divEnglobaDesbordadoProvisorio.childNodes.length > 3)
	{
		if(altura==0)
		{
			distribuirHijosBMas(idDivEnglobaDesbordado,idNodoDesbordado,idEnglobaDesbordadoDerecho,elementoAPromocionar);
			
		}else
		{
			distribuirHijosBMas(idDivEnglobaDesbordado+"Provisorio",idDivEnglobaDesbordado,idEnglobaDesbordadoDerecho,elementoAPromocionar);
		}
	}
	
	/*distribuyo los elementos del nodo que desbordo a los nuevos nodos crados por la division*/
	 idDivEnglobaDesbordadoParametro="E"+idEnglobaDesbordadoDerecho[1]+idEnglobaDesbordadoDerecho.substr(2,idEnglobaDesbordadoDerecho.length-2);
	distribuirElementosBMas(idNodoDesbordado+"Provisorio",idNodoDesbordado,idDivEnglobaDesbordadoParametro,elementoAPromocionar);	
	/*marco el nodo que promociona*/
	 idNodoPromocion=""+altura+nodo+posicionAPromocionar+"Provisorio";
	 $("#"+idNodoPromocion+"").effect("pulsate",{times:5},700);
	/*promociono el elemento*/
	 alturaNodoPadre=parseInt(altura)-1;
	 divPadreNodo=divEnglobaDesbordado.parentNode.firstChild;
	if(divPadreNodo.lastChild.previousSibling.firstChild == undefined)//significa que el nodo a donde promociona no desborda
	{
		idDivPadreNodo=divPadreNodo.id;
		pos=idDivPadreNodo.substr(2,idDivPadreNodo.length-2);
		setTimeout("ordenarNodoBMas(alturaNodoPadre,pos,elementoAPromocionar)",5000);
	}
	/*finalizo la division y promocion*/
	 idPadreNodoDesbordado=divPadreNodoDesbordado.id;	
	 numeroNodo=nodo;
	 alturaNodo=altura;
	setTimeout("finalizarPartirNodoBMas(idDivEnglobaDesbordado+'Provisorio',idDivEnglobaDesbordado,idEnglobaDesbordadoDerecho,idPadreNodoDesbordado,numeroNodo,alturaNodo)",velocidad_transicion);
	var idNodoMensaje="N"+altura+nodo+"Provisorio";
	var nodoMensaje=document.getElementById(idNodoMensaje);
	var numeroNodoMensaje=nodoMensaje.style.zIndex;
	var mensaje="- Desborde del nodo "+numeroNodoMensaje+". Divisi\u00f3n y promoci\u00f3n del elemento "+elementoAPromocionar;
	mostrarMensajeOperacionBMas(mensaje);
}


/*FUNCION QUE INCREMENTA LOS ID DE LOS NODOS QUE SE ENCUENTRAN A LA MISMA ALTURA DEL NODO CON EL ID QUE LLEGA COMO PARAMETRO*/
function incrementarIdDivsHermanosBMas(numeroNodoDesbordado,altura)
{
	for(var j=81;j!=0;j--)
	{
		
		var idHermano="N"+altura+j;
		var divHermano=document.getElementById(idHermano);
		if(divHermano != undefined)
		{
			if(j > parseInt(numeroNodoDesbordado))
			{
				divHermano.id="N"+altura+parseInt(j+1);
				divElementos=divHermano.firstChild;
				divElementos.id="E"+altura+parseInt(j+1);
				divElemento=divElementos.firstChild;
				for(var h=0;h<=divElementos.childNodes.length-1;h++)
				{
					idElemento=divElemento.id;
					if(idElemento[0]=="P")
					{
						divElemento.id="P"+altura+parseInt(j+1)+idElemento[idElemento.length-1];
					}else
					{
						divElemento.id=""+altura+parseInt(j+1)+idElemento[idElemento.length-1];
					}
					divElemento=divElemento.nextSibling;
				}
			}
		}
	}
}

/**FUNCION QUE CREA UN NUEVO NODO POR EL EFECTO DE DESBORDE*/
function crearNuevoNodoDivisionBMas(numeroNodo,nuevoTop,nuevoLeft,posicionNodo,idNodoPosterior,idDivEnglobaProvisorio,idDivEngloba)
{
	
	/*me quedo con el nodo que engloba al nodo desbordado*/
	var divEnglobaDesbordadoProvisorio=document.getElementById(idDivEnglobaProvisorio);
	/*me quedo con el div padre*/
	var divPadre=divEnglobaDesbordadoProvisorio.parentNode;
	/*creo el div que me engloba al nodo*/
	var divEnglobaDesbordadoNuevo=document.createElement('div');
	divEnglobaDesbordadoNuevo.id=idDivEngloba;
	if(posicionNodo=="izquierdo")
	{
		divEnglobaDesbordadoNuevo.style.zIndex=divEnglobaDesbordadoProvisorio.style.zIndex;
	}else
	{
		if(vectorNumeracionBMas.length==0)
		{
			divEnglobaDesbordadoNuevo.style.zIndex=contadorNumeroNodo;
			contadorNumeroNodo++;
		}else
		{
			var rotulo=vectorNumeracionBMas.shift();
			divEnglobaDesbordadoNuevo.style.zIndex=rotulo;
		}
	}
	divEnglobaDesbordadoNuevo.style.position='absolute';
	divEnglobaDesbordadoNuevo.style.height=30;
	divEnglobaDesbordadoNuevo.style.width=anchoTotalNodo+170;
	/*creo el div que me representa el conjunto de elmentos del nodo*/
	var divElementos=document.createElement('div');
	divElementos.id="E"+idDivEngloba[1]+idDivEngloba.substr(2,idDivEngloba.length-2);
	/*creo los divs que representan los punteros y los elementos*/
	for(var x=0;x<=maxElementos-1;x++)
	{
		var divPuntero=document.createElement('div');
		divPuntero.id='P'+idDivEngloba[1]+idDivEngloba.substr(2,idDivEngloba.length-2)+x;
		divPuntero.style.width=10;
		divPuntero.style.height=30;
		divPuntero.className='puntero';	
		divPuntero.style.position='relative';
		divPuntero.style.cssFloat='left';
		divElementos.appendChild(divPuntero);
		var elementoNuevo=document.createElement('div');
		elementoNuevo.className="elemento";
		elementoNuevo.id=''+idDivEngloba[1]+idDivEngloba.substr(2,idDivEngloba.length-2)+x;
		elementoNuevo.style.width=30;
		elementoNuevo.style.height=25;
		elementoNuevo.style.backgroundColor=color_nodo;
elementoNuevo.style.color=color_texto_nodo;
		elementoNuevo.style.border=borde_elemento;
		elementoNuevo.style.position='relative';
		elementoNuevo.style.cssFloat='left';
		divElementos.appendChild(elementoNuevo);	
	}
	/*creo el ultimo puntero*/
	divPuntero=document.createElement('div');
	divPuntero.id='P'+idDivEngloba[1]+idDivEngloba.substr(2,idDivEngloba.length-2)+x;
	divPuntero.style.width=10;
	divPuntero.style.height=30;
	divPuntero.className='puntero';	
	divPuntero.style.position='relative';
	divPuntero.style.cssFloat='left';
	divElementos.appendChild(divPuntero);
	/*creo un div que indica el la explicacion de la creacion del nodo*/
	var divExplicacion=document.createElement('div');
	divExplicacion.style.backgroundColor=color_explicacion_nuevo_nodo;
	divExplicacion.style.border=borde_explicacion_nuevo_nodo;
	divExplicacion.style.width=120;
	divExplicacion.appendChild(document.createTextNode("Nuevo Nodo"));
	if(posicionNodo=="izquierdo")
	{
		divExplicacion.id="explicacionNuevoNodoIzquierdo";
	}else
	{
		divExplicacion.id="explicacionNuevoNodoDerecho";
	}
	divElementos.appendChild(divExplicacion);
	divEnglobaDesbordadoNuevo.appendChild(divElementos);
	divEnglobaDesbordadoProvisorio.appendChild(divEnglobaDesbordadoNuevo);
	$('#'+idDivEngloba).animate({top:nuevoTop, left:nuevoLeft},1250);
	
}

//FINALIZAR PARTIR NODO
function finalizarPartirNodoBMas(idDivEnglobaDesbordado,idDivNuevoNodoIzquierdo,idDivNuevoNodoDerecho,idDivPadre,numeroNodo,alturaNodo)
{
	/*me quedo con el div provisorio que engloba al nodo desbordado*/
	var divEnglobaDesbordado=document.getElementById(idDivEnglobaDesbordado);
	/*me quedo con el nuevo nodo izquierdo*/
	var nuevoNodoIzquierdo=document.getElementById(idDivNuevoNodoIzquierdo);
	/*me quedo con el nuevo nodo derecho*/
	var nuevoNodoDerecho=document.getElementById(idDivNuevoNodoDerecho);
	/*me quedo con el nodo padre del nodo desbordado*/
	var divPadreDesbordado=document.getElementById(idDivPadre);
	/*determino si el nodo desbordado es el mas izq, el mas der o intermedio*/
	var alerta=divPadreDesbordado.childNodes.length-2;
	//me quedo con la raiz del arbol
	var divRaiz=document.getElementById("N00");
	/*inserto los nodos en la posicion correspondiente*/
	var topNodoIzquierdo=parseFloat(divEnglobaDesbordado.style.top);
	var topNodoDerecho=parseFloat(divEnglobaDesbordado.style.top);
	nuevoNodoIzquierdo.style.top=topNodoIzquierdo;
	nuevoNodoDerecho.style.top=topNodoDerecho;
	divPadreDesbordado.insertBefore(nuevoNodoIzquierdo,divEnglobaDesbordado);
	divPadreDesbordado.insertBefore(nuevoNodoDerecho,divEnglobaDesbordado);
	/*elimino el nodo desbordado*/
	divPadreDesbordado.removeChild(divEnglobaDesbordado);
	if(nuevoNodoIzquierdo.childNodes.length > 1)
	{
		centrarHijosEnFuncionAPadreBMas(nuevoNodoIzquierdo.id);
		centrarHijosEnFuncionAPadreBMas(nuevoNodoDerecho.id);
	}
	//centro el arbol
	centrarArbolBMas(divPadreDesbordado);
	/*limpio las explicaciones de los nodos*/
	var divParcialIzquierdo=nuevoNodoIzquierdo.firstChild;
	var divElementoIzquierdo=divParcialIzquierdo.firstChild.nextSibling;
	var divParcialDerecho=nuevoNodoDerecho.firstChild;
	var divElementoDerecho=divParcialDerecho.firstChild.nextSibling;
	for(x=0;x<=((divParcialIzquierdo.childNodes.length-1)/2)-1;x++)
	{
			divElementoIzquierdo.style.backgroundColor=color_nodo;
			divElementoIzquierdo=divElementoIzquierdo.nextSibling.nextSibling;
	}
	for(y=0;y<=((divParcialDerecho.childNodes.length-1)/2)-1;y++)
	{
			divElementoDerecho.style.backgroundColor=color_nodo;
			divElementoDerecho=divElementoDerecho.nextSibling.nextSibling;
	}
	/*borro los elementos de explicacion*/
	divExplicacionIzquierdo=document.getElementById('explicacionNuevoNodoIzquierdo');
	divParcialIzquierdo.removeChild(divExplicacionIzquierdo);
	divExplicacionDerecho=document.getElementById('explicacionNuevoNodoDerecho');
	divParcialDerecho.removeChild(divExplicacionDerecho);
	borrarEnlacesBMas();
	setTimeout("moverArbolParaScrollBMas()",20)
}

function centrarArbolBMas(divPadre)
{
	centrarHijosEnFuncionAPadreBMas(divPadre.id);
	while(divPadre.id != "N00")
	{
		divPadre=divPadre.parentNode;
		centrarHijosEnFuncionAPadreBMas(divPadre.id);
	}
}

//**********************OPERACIONES DE BORRADO******************************************************************************

/*FUNCION QUE BORRA UN ELEMENTO DE UN NODO HOJA SIN PRODUCIR UNDERFLOW*/
function borrarElementoDeNodoHojaSinUnderBMas(altura,nodo,posicionElemento)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	if(divElementoAEliminar.nextSibling.nextSibling!=undefined)
	{
		var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
		if(divPosterior.hasChildNodes())
		{
			ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
		}
	}
	var numeroNodo=parseInt(nodo)+1;
	var mensaje="- Eliminaci\u00f3n del elemento "+elementoAEliminar;
	mostrarMensajeOperacionBMas(mensaje);
}


/*FUNCION QUE DEJA EL NODO ORDENADO LUEGO DE ELIMINAR UN ELEMENTO*/
function ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var contenedorElementos=divElementoAEliminar.parentNode;
	var divElemento=contenedorElementos.firstChild.nextSibling;
	for(var x=1;x<=maxElementos;x++)
	{
		if(divElemento.hasChildNodes())
		{
			if(parseInt(divElemento.firstChild.nodeValue) > parseInt(elementoAEliminar) )
			{
				var elemento=divElemento.firstChild.nodeValue;
				divElemento.removeChild(divElemento.lastChild);
				var divElementoAnterior=divElemento.previousSibling.previousSibling;
				divElementoAnterior.appendChild(document.createTextNode(elemento));
			}
			
		}
		if(divElemento.nextSibling!=undefined)
		{
				var divElemento=divElemento.nextSibling.nextSibling;
		}
	}
}

/*FUNCION QUE BORRA UN ELEMENTO DE UN NODO HOJA PRODUCIENDOSE UNDERFLOW Y EL HERMANO DERECHO PUEDE CEDERLE UN ELEMENTO*/
function borrarElementoDeNodoHojaConUnderAIzqBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano derecho del nodo donde se produce underflow
	var nodoHermanoDerecho=nodoElementos.nextSibling;
	var idNodoHermanoDerecho=nodoHermanoDerecho.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoDerecho=nodoHermanoDerecho.firstChild;
	//me quedo con el div del elemento del padre que pasa al nodo en underflow
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano derecho que pasa al padre
	var divElementoHermanoDerecho=contenedorElementosHermanoDerecho.firstChild.nextSibling;
	var elementoHermanoDerecho=divElementoHermanoDerecho.firstChild.nodeValue;
	var idElementoHermanoDerecho=divElementoHermanoDerecho.id;
	var alturaDivElementoHermanoDerecho=idElementoHermanoDerecho[0];
	var nodoDivElementoHermanoDerecho=idElementoHermanoDerecho.substr(1,idElementoHermanoDerecho.length-2);
	var posicionDivElementoHermanoDerecho=idElementoHermanoDerecho.substr(idElementoHermanoDerecho.length-1);
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
	if(divPosterior.hasChildNodes())
	{
		ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
	}
	$("#"+idNodoElementos+"").effect("pulsate",{times:5},700);
	$("#"+idNodoHermanoDerecho+"").effect("pulsate",{times:5},700,ejecutarProximaAnimacionBMas);
}

/*FUNCION QUE REDISTRIBUYE PORQUE UN NODO HA QUEDADO EN UNDERFLOW Y EL HERMANO DERECHO PUEDE CEDER ELEMENTOS*/
function redistribuirAIzqBMas(altura,nodo,posicionElemento,elementoIntermedioPadre,posicionNodo)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano derecho del nodo donde se produce underflow
	var nodoHermanoDerecho=nodoElementos.nextSibling;
	var idNodoHeremanoDerecho=nodoHermanoDerecho.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoDerecho=nodoHermanoDerecho.firstChild;
	//me quedo con el div del elemento del hermano derecho que pasa al nodo en underflow
	var divElementoHermanoDerecho=contenedorElementosHermanoDerecho.firstChild.nextSibling;
	var elementoHermanoDerecho=divElementoHermanoDerecho.firstChild.nodeValue;
	var idElementoHermanoDerecho=divElementoHermanoDerecho.id;
	var alturaDivElementoHermanoDerecho=idElementoHermanoDerecho[0];
	var nodoDivElementoHeramnoDerecho=idElementoHermanoDerecho.substr(1,idElementoHermanoDerecho.length-2);
	var posicionDivElementoHermanoDerecho=idElementoHermanoDerecho.substr(idElementoHermanoDerecho.length-1);
	//me quedo con el elemento siguiente al mas chico del hermano derecho que pasa al padre
	var divElementoSiguiente=divElementoHermanoDerecho.nextSibling.nextSibling;
	var elementoSiguiente=divElementoSiguiente.firstChild.nodeValue;
	//me quedo con el div del elemento divisor entre los nodos
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//borro el elemento del hermano derecho que pasa al nodo en underflow
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoHermanoDerecho,nodoDivElementoHeramnoDerecho,posicionDivElementoHermanoDerecho);
	//borro el elemento del padre
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoPadre,nodoDivElementoPadre,posicionDivElementoPadre);
	//inserto el elemento del hermano derecho en el nodo en underflow
	ordenarNodoBMas(altura,nodo,elementoHermanoDerecho);
	//inserto el elemento siguiente del hermano derecho como copia en el padre
	ordenarNodoBMas(alturaDivElementoPadre,nodoDivElementoPadre,elementoSiguiente);
	if(posicionNodo=="extremo")
	{
		var mensaje="- Redistribuci\u00f3n a izquierda."
	}else
	{
		var mensaje="- Redistribuci\u00f3n a izquierda."
	}
	mostrarMensajeOperacionBMas(mensaje);
	habilitarBotonesBMas();
}

/*FUNCION QUE DEVUELVE EL ELEMENTO DEL PADRE QUE HACE DE DIVISOR ENTRE DOS NODOS*/
function buscarDivElementoDivisorBMas(contenedor,elemento)
{
	var divActual=contenedor.firstChild.nextSibling;
	var elementoADevolver;
	for(var x=1;x<=maxElementos;x++)
	{
		if(divActual.firstChild.nodeValue == elemento)
		{
			elementoADevolver=divActual.id;
			break;
		}
		if(divActual.nextSibling!=undefined)
		{
			divActual=divActual.nextSibling.nextSibling;
		}
	}
	return elementoADevolver;
}

function borrarFusionConHermanoDerechoBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
	if(divPosterior.hasChildNodes())
	{
		ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
	}
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el contenedor de elementos de nodo donde se esta borrando
	var contenedorElementos=nodoElementos.firstChild;
	var idContenedorElementos=contenedorElementos.id;
	//me quedo con el hermano derecho del nodo donde se produce underflow
	var nodoHermanoDerecho=nodoElementos.nextSibling;
	var idNodoHermanoDerecho=nodoHermanoDerecho.id;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoDerecho=nodoHermanoDerecho.firstChild;
	var idContenedorElementosHermanoDerecho=contenedorElementosHermanoDerecho.id;
	//me quedo con el padre de los nodos que estan fusionando
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	$("#"+idContenedorElementos+"").effect("pulsate",{times:5},1000);
	$("#"+idContenedorElementosHermanoDerecho+"").effect("pulsate",{times:5},1000);
	$("#"+idDivElementoPadre+"").effect("pulsate",{times:5},1000,ejecutarProximaAnimacionBMas);
}

function fusionConHermanoDerechoBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano derecho del nodo donde se produce underflow
	var nodoHermanoDerecho=nodoElementos.nextSibling;
	var idNodoHermanoDerecho=nodoHermanoDerecho.id;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoDerecho=nodoHermanoDerecho.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el padre de los nodos que estan fusionando
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//pregunto si el nodo donde se produjo underflow tiene hijos
	if(nodoElementos.childNodes.length == 1)//no tiene hijos
	{
		
		if((padreNodos.childNodes.length==3)&&(altura==1))//el padre tiene solo dos hijos que son los que estan fusionando y estan en la altura uno
		{
			//borro el elemento del padre que era una copia
			borrarElementoDeNodoHojaSinUnderBMas(0,0,0);
			//paso los elementos de los nodos que fusionan al padre
			pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosPadre);
			pasarElementosDeNodoBMas(contenedorElementosHermanoDerecho,contenedorElementosPadre);
			//borro los enlaces
			borrarEnlacesBMas();
			//guardo el numero de nodo a borrar para reutilizarlo
			vectorNumeracionBMas.push(parseFloat(nodoHermanoDerecho.style.zIndex));
			vectorNumeracionBMas.push(parseFloat(padreNodos.style.zIndex));
			vectorNumeracionBMas.sort(function(a,b){return a-b;});
			//actualizo el numero de nodo
			padreNodos.style.zIndex=nodoElementos.style.zIndex;
			//realizo el efecto de fusion
			$('#'+idNodoElementos).animate({top:0,left:0},1250,function(){padreNodos.removeChild(nodoElementos)});
			$('#'+idNodoHermanoDerecho).animate({top:0,left:0},1250,function(){padreNodos.removeChild(nodoHermanoDerecho);var container=document.getElementById("contenedor"); posicionContenedor=position(container);rotularNodo(padreNodos,posicionContenedor);});
			var mensaje="- Fusi\u00f3n con hermano derecho. Dismimuci\u00f3n de altura."
			mostrarMensajeOperacionBMas(mensaje);
			habilitarBotonesBMas();
			
		}else//el padre tiene mas de dos hijos o es altura mayor a uno
		{
			//paso los elementos que quedaron al nodo derecho del nodo que produjo underflow
			pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoDerecho);
			borrarEnlacesBMas();
			//guardo el numero de nodo reutilizable
			vectorNumeracionBMas.push(parseFloat(nodoHermanoDerecho.style.zIndex));
			vectorNumeracionBMas.sort(function(a,b){return a-b;});
			nodoHermanoDerecho.style.zIndex=nodoElementos.style.zIndex;
			//realizo el efecto de fusion y elimino el nodo en underflow
			var movimientoAIzquierda=parseFloat(nodoElementos.style.left);
			$('#'+idNodoHermanoDerecho).animate({left:movimientoAIzquierda},1250,function()
				{	padreNodos.removeChild(nodoElementos);
					//decremento todos los id de los nodos que quedaron
					decrementarIdAHermanosPosterioresBMas(nodo,altura);
					centrarArbolBMas(padreNodos);
					setTimeout("moverArbolParaScrollBMas()",1000);
				}
			);
			var mensaje="- Fusi\u00f3n con hermano derecho."
			mostrarMensajeOperacionBMas(mensaje);
		}
	}else
	{
		if((padreNodos.childNodes.length==3)&&(altura==1))//el padre tiene solo dos hijos que son los que estan fusionando y estan en la altura uno
		{
			borrarEnlacesBMas();
			//paso los elementos que quedaron al nodo derecho del nodo que produjo underflow
			pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoDerecho);
			//paso el elemento divisor del padre al nodo derecho
			idContenedorElementosHermanoDerecho=contenedorElementosHermanoDerecho.id;
			var alturaDivDestino=idContenedorElementosHermanoDerecho[1];
			var nodoDivDestino=idContenedorElementosHermanoDerecho.substr(2,idContenedorElementosHermanoDerecho.length-2);
			ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elementoIntermedioPadre);
			//paso los hijos del nodo en underflow al hermano derecho
			var divHijo=nodoElementos.lastChild;
			for(var x=0;x<=nodoElementos.childNodes.length-1;x++)
			{
				var primerHijo=nodoHermanoDerecho.firstChild.nextSibling;
				//inserto en la primer posicion
				var divAuxiliar=divHijo.previousSibling;
				nodoHermanoDerecho.insertBefore(divHijo,primerHijo);
				divHijo=divAuxiliar;
			}
			//guardo los numeros de nodos reutilizables
			vectorNumeracionBMas.push(parseFloat(nodoHermanoDerecho.style.zIndex));
			vectorNumeracionBMas.push(parseFloat(padreNodos.style.zIndex));
			vectorNumeracionBMas.sort(function(a,b){return a-b;});
			nodoHermanoDerecho.style.zIndex=nodoElementos.style.zIndex;
			centrarHijosEnFuncionAPadreBMas(nodoHermanoDerecho.id);
			//borro el nodo en underflow
			padreNodos.removeChild(nodoElementos);
			contenedor=document.getElementById("contenedor");
			padreNodos.removeChild(nodoHermanoDerecho);
			contenedor.appendChild(nodoHermanoDerecho);
			var topNuevo=parseFloat(padreNodos.style.top);
			var leftNuevo=parseFloat(padreNodos.style.left);
			contenedor.removeChild(padreNodos);
			$('#'+idNodoHermanoDerecho).animate({top:topNuevo,left:leftNuevo},1250,function()
				{	
					decrementarIdAHermanosPosterioresBMas(nodo,altura);
					decrementarAlturaBMas(nodoHermanoDerecho);
					setTimeout("moverArbolParaScrollBMas()",1000);
				}
			);
			var mensaje="- Fusi\u00f3n con hermano derecho. Disminuci\u00f3n de altura."
			mostrarMensajeOperacionBMas(mensaje);
		}else
		{
			if((padreNodos.childNodes.length==3)&&(altura!=1))//el padre tiene solo dos hijos que son los que estan fusionando y estan en altura mayor a 1
			{
				//uno los elementos del nodo en underflow en el nodo de la derecha, en este nodo quedan todos los hijos, borro el nodo en underflow, dismuniyo en uno los id de los nodos mayores de la misma altura, pongo el nodo que unio en left 0, espero la proxima accion de la recursion 
				borrarEnlacesBMas();
				//paso los elementos que quedaron al nodo derecho del nodo que produjo underflow
				pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoDerecho);
				//paso el elemento divisor del padre al nodo derecho
				idContenedorElementosHermanoDerecho=contenedorElementosHermanoDerecho.id;
				var alturaDivDestino=idContenedorElementosHermanoDerecho[1];
				var nodoDivDestino=idContenedorElementosHermanoDerecho.substr(2,idContenedorElementosHermanoDerecho.length-2);
				ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elementoIntermedioPadre);
				//paso los hijos del nodo en underflow al hermano derecho
				var divHijo=nodoElementos.lastChild;
				for(var x=0;x<=nodoElementos.childNodes.length-1;x++)
				{
					var primerHijo=nodoHermanoDerecho.firstChild.nextSibling;
					//inserto en la primer posicion
					var divAuxiliar=divHijo.previousSibling;
					nodoHermanoDerecho.insertBefore(divHijo,primerHijo);
					divHijo=divAuxiliar;
				}
				//guardo el numero de nodo reutilizable
				vectorNumeracionBMas.push(parseFloat(nodoHermanoDerecho.style.zIndex));
				vectorNumeracionBMas.sort(function(a,b){return a-b;});
				nodoHermanoDerecho.style.zIndex=nodoElementos.style.zIndex;
				//borro el nodo en underflow
				padreNodos.removeChild(nodoElementos);
				decrementarIdAHermanosPosterioresBMas(nodo,altura);
				nodoHermanoDerecho.style.left=0;
				centrarHijosEnFuncionAPadreBMas(nodoHermanoDerecho.id);
				centrarArbolBMas(padreNodos);
				setTimeout("moverArbolParaScrollBMas()",1000);
				var mensaje="- Fusi\u00f3n con hermano derecho."
				mostrarMensajeOperacionBMas(mensaje);
			}else
			{
				//uno los elementos del nodo en underflow en el nodo de la derecha, en este nodo quedan todos los hijos, borro el nodo en underflow, dismuniyo en uno los id de los nodos mayores de la misma altura, renderizo al padre teniendo cuidado con la posicion de los hijos
				borrarEnlacesBMas();
				//paso los elementos que quedaron al nodo derecho del nodo que produjo underflow
				pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoDerecho);
				//paso el elemento divisor del padre al nodo derecho
				idContenedorElementosHermanoDerecho=contenedorElementosHermanoDerecho.id;
				var alturaDivDestino=idContenedorElementosHermanoDerecho[1];
				var nodoDivDestino=idContenedorElementosHermanoDerecho.substr(2,idContenedorElementosHermanoDerecho.length-2);
				ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elementoIntermedioPadre);
				//paso los hijos del nodo en underflow al hermano derecho
				var divHijo=nodoElementos.lastChild;
				for(var x=0;x<=nodoElementos.childNodes.length-1;x++)
				{
					var primerHijo=nodoHermanoDerecho.firstChild.nextSibling;
					//inserto en la primer posicion
					var divAuxiliar=divHijo.previousSibling;
					nodoHermanoDerecho.insertBefore(divHijo,primerHijo);
					divHijo=divAuxiliar;
				}
				//guardo el numero de nodo reutilizable
				vectorNumeracionBMas.push(parseFloat(nodoHermanoDerecho.style.zIndex));
				vectorNumeracionBMas.sort(function(a,b){return a-b;});
				nodoHermanoDerecho.style.zIndex=nodoElementos.style.zIndex;
				//borro el nodo en underflow
				padreNodos.removeChild(nodoElementos);
				decrementarIdAHermanosPosterioresBMas(nodo,altura);
				centrarHijosEnFuncionAPadreBMas(nodoHermanoDerecho.id);
				centrarArbolBMas(padreNodos);
				setTimeout("moverArbolParaScrollBMas()",1000);
				var mensaje="-Fusi\u00f3n con hermano derecho.";
				mostrarMensajeOperacionBMas(mensaje);
			}
			
		}
	}
}

function pasarElementosDeNodoBMas(divOrigen,divDestino)
{
	    var divParcial=divOrigen.firstChild;
		var idDivDestino=divDestino.id;
		var alturaDivDestino=idDivDestino[1];
		var nodoDivDestino=idDivDestino.substr(2,idDivDestino.length-2);
		for(var i=1;i < divOrigen.childNodes.length;i++)
		{
			if(divParcial.hasChildNodes())
			{
				elemento=divParcial.firstChild.nodeValue;
				ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elemento);
			}
			if(divParcial.nextSibling!=undefined)
			{
				divParcial=divParcial.nextSibling;
			}
		}
}


function decrementarIdAHermanosPosterioresBMas(numeroNodo,altura)
{
	for(var j=172;j!=0;j--)//172 es el numero maximo de nodos con orden 9 y altura 4
	{
		
		var idHermano="N"+altura+j;
		var divHermano=document.getElementById(idHermano);
		if(divHermano != undefined)
		{
			if(j > numeroNodo)
			{
					divHermano.id="N"+altura+parseInt(j-1);
					var divElementos=divHermano.firstChild;
					divElementos.id="E"+altura+parseInt(j-1);
					divElemento=divElementos.firstChild;
					for(var h=0;h<=divElementos.childNodes.length-1;h++)
					{
						var idElemento=divElemento.id;
						if(idElemento[0]=="P")
						{
							divElemento.id="P"+altura+parseInt(j-1)+idElemento[idElemento.length-1];
						}else
						{
							divElemento.id=""+altura+parseInt(j-1)+idElemento[idElemento.length-1];
						}
						divElemento=divElemento.nextSibling;
					}
			}
		}
	}
}


/*FUNCION QUE DECREMENTA LA ALTURA DEL NODO QUE LLEGA COMO PARAMETRO Y TODOS SUS HIJOS. LA ALTURA ES EL PRIMER DIGITO DEL ID DE CADA ELEMENTO QUE REPRESENTA UN NODO*/
function decrementarAlturaBMas(nodo)
{
	var idNodo=nodo.id;
	var alturaActual=idNodo[1];
	var alturaDecrementada=parseInt(alturaActual)-1;
	nodo.id="N"+alturaDecrementada+idNodo.substr(2,idNodo.length-2);
	idNodo=nodo.id;
	$("#"+idNodo).find("div").each(function(i){
			var idActual=$(this).attr("id");
			var primerPos=idActual[0];
			if(primerPos=="E")
			{
				var alturaElemento=idActual[1];
				var alturaElementoDecrementada=parseInt(alturaElemento)-1;
				var valor="E"+alturaElementoDecrementada+idActual.substr(2,idActual.length-2);
				$(this).attr("id",valor);
			}else
			{
				if(primerPos=="P")
				{
					var alturaPuntero=idActual[1];
					var alturaPunteroDecrementada=parseInt(alturaPuntero)-1;
					var valor="P"+alturaPunteroDecrementada+idActual.substr(2,idActual.length-3)+idActual.substr(idActual.length-1);
					$(this).attr("id",valor);
				}else
				{
					if(primerPos=="N")
					{
						var alturaActual=idActual[1];
						var alturaDecrementada=parseInt(alturaActual)-1;
						var valor="N"+alturaDecrementada+idActual.substr(2,idActual.length-2);
						$(this).attr("id",valor);
					}else
					{
						var alturaContenido=idActual[0];
						var alturaContenidoDecrementada=parseInt(alturaContenido)-1;
						var valor=alturaContenidoDecrementada+idActual.substr(1,idActual.length-2)+idActual.substr(idActual.length-1);
						$(this).attr("id",valor);
					}
				}
			}
        })
}

/*FUNCION QUE BORRA UN ELEMENTO PRODUCIENDOSE UNDERFLOW Y EL HERMANO DERECHO PUEDE CEDERLE UN ELEMENTO*/
function borrarElementoDeNodoIntermedioConUnderAIzqBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano derecho del nodo donde se produce underflow
	var nodoHermanoDerecho=nodoElementos.nextSibling;
	var idNodoHeremanoDerecho=nodoHermanoDerecho.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	var idContenedorElementos=contenedorElementos.id;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoDerecho=nodoHermanoDerecho.firstChild;
	var idContenedorElementosHermanoDerecho=contenedorElementosHermanoDerecho.id;
	//me quedo con el div del elemento del padre que pasa al nodo en underflow
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano derecho que pasa al padre
	var divElementoHermanoDerecho=contenedorElementosHermanoDerecho.firstChild.nextSibling;
	var elementoHermanoDerecho=divElementoHermanoDerecho.firstChild.nodeValue;
	var idElementoHermanoDerecho=divElementoHermanoDerecho.id;
	var alturaDivElementoHermanoDerecho=idElementoHermanoDerecho[0];
	var nodoDivElementoHeramnoDerecho=idElementoHermanoDerecho.substr(1,idElementoHermanoDerecho.length-2);
	var posicionDivElementoHermanoDerecho=idElementoHermanoDerecho.substr(idElementoHermanoDerecho.length-1);
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
	if(divPosterior.hasChildNodes())
	{
		ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
	}
	$("#"+idContenedorElementos+"").effect("pulsate",{times:5},700);
	$("#"+idContenedorElementosHermanoDerecho+"").effect("pulsate",{times:5},700,ejecutarProximaAnimacionBMas);
	var mensaje="- Redistribuci\u00f3n a izquierda."
	mostrarMensajeOperacionBMas(mensaje);
}

/*FUNCION QUE REDISTRIBUYE PORQUE UN NODO HA QUEDADO EN UNDERFLOW Y EL HERMANO DERECHO PUEDE CEDER ELEMENTOS. EL NODO QUE CEDE TIENE HIJOS*/
function redistribuirAIzqConHijosBMas(altura,nodo,posicionElemento,elementoIntermedioPadre,posicionNodo)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano derecho del nodo donde se produce underflow
	var nodoHermanoDerecho=nodoElementos.nextSibling;
	var idNodoHeremanoDerecho=nodoHermanoDerecho.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoDerecho=nodoHermanoDerecho.firstChild;
	//me quedo con el div del elemento del padre que pasa al nodo en underflow
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano derecho que pasa al padre
	var divElementoHermanoDerecho=contenedorElementosHermanoDerecho.firstChild.nextSibling;
	var elementoHermanoDerecho=divElementoHermanoDerecho.firstChild.nodeValue;
	var idElementoHermanoDerecho=divElementoHermanoDerecho.id;
	var alturaDivElementoHermanoDerecho=idElementoHermanoDerecho[0];
	var nodoDivElementoHeramnoDerecho=idElementoHermanoDerecho.substr(1,idElementoHermanoDerecho.length-2);
	var posicionDivElementoHermanoDerecho=idElementoHermanoDerecho.substr(idElementoHermanoDerecho.length-1);
	//borro el elemento del hermano derecho que pasa al padre
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoHermanoDerecho,nodoDivElementoHeramnoDerecho,posicionDivElementoHermanoDerecho);
	//borro el elemento del padre que pasa al nodo en underflow
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoPadre,nodoDivElementoPadre,posicionDivElementoPadre);
	//inserto el elemento del hermano derecho en el padre
	ordenarNodoBMas(alturaDivElementoPadre,nodoDivElementoPadre,elementoHermanoDerecho);
	//inserto el elemento del padre en el nodo en underflow
	ordenarNodoBMas(altura,nodo,elementoIntermedioPadre);
	//borro los enlaces
	borrarEnlacesBMas();
	//debo pasar la rama que colgaba del elemento que roto como hijo del hermano izquierdo
	//me quedo con la rama que debe rotar
	var ramaRota=nodoHermanoDerecho.firstChild.nextSibling;
	//elimino la rama del nodo que cede
	nodoHermanoDerecho.removeChild(ramaRota);
	centrarHijosEnFuncionAPadreBMas(nodoHermanoDerecho.id);
	//inserto la rama que estaba en el nodo derecho
	nodoElementos.appendChild(ramaRota);
	centrarHijosEnFuncionAPadreBMas(nodoElementos.id);
	//centro el arbol
	centrarArbolBMas(padreNodos);
	setTimeout("moverArbolParaScrollBMas()",2000);
	if(posicionNodo=="extremo")
	{	
		var mensaje="- Redistribuci\u00f3n a izquierda.";
	}else
	{
		var mensaje="Redistribuci\u00f3n a izquierda.";
	}
	mostrarMensajeOperacionBMas(mensaje);
}

/*FUNCION QUE BORRA UN ELEMENTO DE UN NODO HOJA PRODUCIENDOSE UNDERFLOW Y EL HERMANO IZQUIERDO PUEDE CEDERLE UN ELEMENTO*/
function borrarElementoDeNodoHojaConUnderADerBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano izquierdo del nodo donde se produce underflow
	var nodoHermanoIzquierdo=nodoElementos.previousSibling;
	var idNodoHermanoIzquierdo=nodoHermanoIzquierdo.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el contenedor de elementos del hermano izquierdo
	var contenedorElementosHermanoIzquierdo=nodoHermanoIzquierdo.firstChild;
	//me quedo con el div del elemento del padre que pasa al nodo en underflow
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano Izquierdo que pasa al padre
	var divElementoHermanoIzquierdo=obtenerUltimoElementoDeNodoBMas(contenedorElementosHermanoIzquierdo);
	var elementoHermanoIzquierdo=divElementoHermanoIzquierdo.firstChild.nodeValue;
	var idElementoHermanoIzquierdo=divElementoHermanoIzquierdo.id;
	var alturaDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo[0];
	var nodoDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(1,idElementoHermanoIzquierdo.length-2);
	var posicionDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(idElementoHermanoIzquierdo.length-1);
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
	if(divPosterior.hasChildNodes())
	{
		ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
	}
	$("#"+idNodoElementos+"").effect("pulsate",{times:5},700);
	$("#"+idNodoHermanoIzquierdo+"").effect("pulsate",{times:5},700,ejecutarProximaAnimacionBMas);
}

function obtenerUltimoElementoDeNodoBMas(contenedor)
{
	var divActual=contenedor.firstChild.nextSibling;
	var ultimoElemento;
	for(var x=1;x<=maxElementos;x++)
	{
		if(divActual.hasChildNodes())
		{
			ultimoElemento=divActual;
		}
		if(divActual.nextSibling!=undefined)
		{
			divActual=divActual.nextSibling.nextSibling;
		}
	}
	return ultimoElemento;
}

/*FUNCION QUE REDISTRIBUYE PORQUE UN NODO HA QUEDADO EN UNDERFLOW Y EL HERMANO IZQUIERDO PUEDE CEDER ELEMENTOS*/
function redistribuirADerBMas(altura,nodo,posicionElemento,elementoIntermedioPadre,posicionNodo)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano izquierdo del nodo donde se produce underflow
	var nodoHermanoIzquierdo=nodoElementos.previousSibling;
	var idNodoHeremanoIzquierdo=nodoHermanoIzquierdo.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoIzquierdo=nodoHermanoIzquierdo.firstChild;
	//me quedo con el div del elemento del padre
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano derecho que pasa al padre
	var divElementoHermanoIzquierdo=obtenerUltimoElementoDeNodo(contenedorElementosHermanoIzquierdo);
	var elementoHermanoIzquierdo=divElementoHermanoIzquierdo.firstChild.nodeValue;
	var idElementoHermanoIzquierdo=divElementoHermanoIzquierdo.id;
	var alturaDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo[0];
	var nodoDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(1,idElementoHermanoIzquierdo.length-2);
	var posicionDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(idElementoHermanoIzquierdo.length-1);
	//borro el elemento del hermano izquierdo que pasa al padre
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoHermanoIzquierdo,nodoDivElementoHermanoIzquierdo,posicionDivElementoHermanoIzquierdo);
	//borro el elemento del padre 
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoPadre,nodoDivElementoPadre,posicionDivElementoPadre);
	//inserto el elemento del hermano izquierdo en el padre
	ordenarNodo(alturaDivElementoPadre,nodoDivElementoPadre,elementoHermanoIzquierdo);
	//inserto el elemento del hermanoIzquierdo en el nodo en underflow
	ordenarNodo(altura,nodo,elementoHermanoIzquierdo);
	if(posicionNodo=="extremo")
	{
		var mensaje="- Redistribuci\u00f3n a derecha.";
	}else
	{
		var mensaje="- Redistribuci\u00f3n a derecha."
	}
	mostrarMensajeOperacionBMas(mensaje);
	habilitarBotonesBMas();
}

/*FUNCION QUE BORRA UN ELEMENTO PRODUCIENDOSE UNDERFLOW Y EL HERMANO IZQUIERDO PUEDE CEDERLE UN ELEMENTO*/
function borrarElementoDeNodoIntermedioConUnderADerBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano izquierdo del nodo donde se produce underflow
	var nodoHermanoIzquierdo=nodoElementos.previousSibling;
	var idNodoHeremanoIzquierdo=nodoHermanoIzquierdo.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	var idContenedorElementos=contenedorElementos.id;
	//me quedo con el contenedor de elementos del hermano izquierdo
	var contenedorElementosHermanoIzquierdo=nodoHermanoIzquierdo.firstChild;
	var idContenedorElementosHermanoIzquierdo=contenedorElementosHermanoIzquierdo.id;
	//me quedo con el div del elemento del padre que pasa al nodo en underflow
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano Izquierdo que pasa al padre
	var divElementoHermanoIzquierdo=obtenerUltimoElementoDeNodoBMas(contenedorElementosHermanoIzquierdo);
	var elementoHermanoIzquierdo=divElementoHermanoIzquierdo.firstChild.nodeValue;
	var idElementoHermanoIzquierdo=divElementoHermanoIzquierdo.id;
	var alturaDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo[0];
	var nodoDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(1,idElementoHermanoIzquierdo.length-2);
	var posicionDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(idElementoHermanoIzquierdo.length-1);
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
	if(divPosterior.hasChildNodes())
	{
		ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
	}
	$("#"+idContenedorElementos+"").effect("pulsate",{times:5},700);
	$("#"+idContenedorElementosHermanoIzquierdo+"").effect("pulsate",{times:5},700,ejecutarProximaAnimacionBMas);	
}

/*FUNCION QUE REDISTRIBUYE PORQUE UN NODO HA QUEDADO EN UNDERFLOW Y EL HERMANO IZQUIERDO PUEDE CEDER ELEMENTOS. EL NODO QUE CEDE TIENE HIJOS*/
function redistribuirADerConHijosBMas(altura,nodo,posicionElemento,elementoIntermedioPadre,posicionNodo)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano izquierdo del nodo donde se produce underflow
	var nodoHermanoIzquierdo=nodoElementos.previousSibling;
	var idNodoHeremanoIzquierdo=nodoHermanoIzquierdo.id;
	//me quedo con el padre de los nodos que estan redistribuyendo
	var contenedorElementos=divElementoAEliminar.parentNode;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//realizo la redistribucion
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoIzquierdo=nodoHermanoIzquierdo.firstChild;
	//me quedo con el div del elemento del padre que pasa al nodo en underflow
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	var alturaDivElementoPadre=idDivElementoPadre[0];
	var nodoDivElementoPadre=idDivElementoPadre.substr(1,idDivElementoPadre.length-2);
	var posicionDivElementoPadre=idDivElementoPadre.substr(idDivElementoPadre.length-1);
	//me quedo con el div del elemento del hermano izquierdo que pasa al padre
	var divElementoHermanoIzquierdo=obtenerUltimoElementoDeNodoBMas(contenedorElementosHermanoIzquierdo);
	var elementoHermanoIzquierdo=divElementoHermanoIzquierdo.firstChild.nodeValue;
	var idElementoHermanoIzquierdo=divElementoHermanoIzquierdo.id;
	var alturaDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo[0];
	var nodoDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(1,idElementoHermanoIzquierdo.length-2);
	var posicionDivElementoHermanoIzquierdo=idElementoHermanoIzquierdo.substr(idElementoHermanoIzquierdo.length-1);
	//borro el elemento del hermano izquierdo que pasa al padre
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoHermanoIzquierdo,nodoDivElementoHermanoIzquierdo,posicionDivElementoHermanoIzquierdo);
	//borro el elemento del padre que pasa al nodo en underflow
	borrarElementoDeNodoHojaSinUnderBMas(alturaDivElementoPadre,nodoDivElementoPadre,posicionDivElementoPadre);
	//inserto el elemento del hermano izquierdo en el padre
	ordenarNodoBMas(alturaDivElementoPadre,nodoDivElementoPadre,elementoHermanoIzquierdo);
	//inserto el elemento del padre en el nodo en underflow
	ordenarNodoBMas(altura,nodo,elementoIntermedioPadre);
	//borro los enlaces
	borrarEnlacesBMas();
	//debo pasar la rama que colgaba del elemento que roto como hijo del hermano izquierdo
	//me quedo con la rama que debe rotar
	var ramaRota=nodoHermanoIzquierdo.lastChild;
	//elimino la rama del nodo que cede
	nodoHermanoIzquierdo.removeChild(ramaRota);
	centrarHijosEnFuncionAPadreBMas(nodoHermanoIzquierdo.id);
	//me quedo con el primer hijo de la rama derecha
	var primerHijo=nodoElementos.firstChild.nextSibling;
	//inserto la rama que estaba en el nodo en underflow
	nodoElementos.insertBefore(ramaRota,primerHijo);
	centrarHijosEnFuncionAPadreBMas(nodoElementos.id);
	centrarArbolBMas(padreNodos);
	setTimeout("moverArbolParaScrollBMas()",1000);
	if(posicionNodo=="extremo")
	{
		var mensaje="- Redistribuci\u00f3n a derecha.";
	}else
	{
		var mensaje="Redistribuci\u00f3n a derecha.";
	}
	mostrarMensajeOperacionBMas(mensaje);
	
}

function borrarFusionConHermanoIzquierdoBMas(altura,nodo,posicionElemento,elementoIntermedioPadre)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	var elementoAEliminar=divElementoAEliminar.firstChild.nodeValue;
	divElementoAEliminar.removeChild(divElementoAEliminar.lastChild);
	//me quedo con el div siguiente al que se borro
	var divPosterior=divElementoAEliminar.nextSibling.nextSibling;
	if(divPosterior.hasChildNodes())
	{
		ordenarNodoEliminacionBMas(altura,nodo,posicionElemento,elementoAEliminar);
	}
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano izquierdo del nodo donde se produce underflow
	var nodoHermanoIzquierdo=nodoElementos.previousSibling;
	var idNodoHermanoIzquierdo=nodoHermanoIzquierdo.id;
	//me quedo con el contenedor de elementos del hermano derecho
	var contenedorElementosHermanoIzquierdo=nodoHermanoIzquierdo.firstChild;
	var idContenedorElementosHermanoIzquierdo=contenedorElementosHermanoIzquierdo.id;
	//me quedo con el padre de los nodos que estan fusionando
	var contenedorElementos=divElementoAEliminar.parentNode;
	var idContenedorElementos=contenedorElementos.id;
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	var idDivElementoPadre=buscarDivElementoDivisorBMas(contenedorElementosPadre,elementoIntermedioPadre);
	$("#"+idContenedorElementos+"").effect("pulsate",{times:5},1000);
	$("#"+idContenedorElementosHermanoIzquierdo+"").effect("pulsate",{times:5},1000);
	$("#"+idDivElementoPadre+"").effect("pulsate",{times:5},1000,ejecutarProximaAnimacionBMas);
}

function fusionConHermanoIzquierdoBMas(altura,nodo,posicionElemento,elementoIntermedioPadre,posicionNodo)
{
	var idElementoAEliminar=""+altura+nodo+posicionElemento;
	var divElementoAEliminar=document.getElementById(idElementoAEliminar);
	//me quedo con el nodo donde esta el elemento a borrar
	var nodoElementos=divElementoAEliminar.parentNode.parentNode;
	var idNodoElementos=nodoElementos.id;
	//me quedo con el hermano izquierdo del nodo donde se produce underflow
	var nodoHermanoIzquierdo=nodoElementos.previousSibling;
	var idNodoHermanoIzquierdo=nodoHermanoIzquierdo.id;
	//me quedo con el contenedor de elementos del hermano izquierdo
	var contenedorElementosHermanoIzquierdo=nodoHermanoIzquierdo.firstChild;
	//me quedo con el contenedor de elementos del nodo que borre elemento
	var contenedorElementos=nodoElementos.firstChild;
	//me quedo con el padre de los nodos que estan fusionando
	var padreNodos=contenedorElementos.parentNode.parentNode;
	//me quedo con el contenedor de elementos del padre
	var contenedorElementosPadre=padreNodos.firstChild;
	//pregunto si el nodo donde se produjo underflow tiene hijos
	if(nodoElementos.childNodes.length == 1)//no tiene hijos
	{
		
		if((padreNodos.childNodes.length==3)&&(altura==1))//el padre tiene solo dos hijos que son los que estan fusionando
		{
			//borro el elemento del padre que era una copia
			borrarElementoDeNodoHojaSinUnderBMas(0,0,0);
			//paso los elementos de los nodos que fusionan al padre
			pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosPadre);
			pasarElementosDeNodoBMas(contenedorElementosHermanoIzquierdo,contenedorElementosPadre);
			//borro los enlaces
			borrarEnlacesBMas();
			//guardo el numero de nodo a borrar para reutilizarlo
			vectorNumeracionBMas.push(parseFloat(nodoElementos.style.zIndex));
			vectorNumeracionBMas.push(parseFloat(padreNodos.style.zIndex));
			vectorNumeracionBMas.sort(function(a,b){return a-b;});
			//actualizo el numero de nodo
			padreNodos.style.zIndex=nodoHermanoIzquierdo.style.zIndex;
			//realizo el efecto de fusion
			$('#'+idNodoElementos).animate({top:0,left:0},1250,function(){padreNodos.removeChild(nodoElementos)});
			$('#'+idNodoHermanoIzquierdo).animate({top:0,left:0},1250,function(){padreNodos.removeChild(nodoHermanoIzquierdo);var container=document.getElementById("contenedor"); posicionContenedor=position(container);rotularNodo(padreNodos,posicionContenedor);});
			if(posicionNodo=="extremo")
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo. Disminuci\u00f3n de altura.";
			}else
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo. Disminuci\u00f3n de altura.";
			}
			mostrarMensajeOperacionBMas(mensaje);
			habilitarBotonesBMas();
			
		}else//el padre tiene mas de dos hijos o la altura es mayor a uno
		{
			//paso los elementos que quedaron al nodo izquierdo del nodo que produjo underflow
			pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoIzquierdo);
			borrarEnlacesBMas();
			//guardo el numero de nodo reutilizable
			vectorNumeracionBMas.push(parseFloat(nodoElementos.style.zIndex));
			vectorNumeracionBMas.sort(function(a,b){return a-b;});
			//realizo el efecto de fusion y elimino el nodo en underflow
			var movimientoAIzquierda=parseFloat(nodoHermanoIzquierdo.style.left);
			$('#'+idNodoElementos).animate({left:movimientoAIzquierda},1250,function()
				{	padreNodos.removeChild(nodoElementos);
					decrementarIdAHermanosPosterioresBMas(nodo,altura);
					centrarArbolBMas(padreNodos);
					setTimeout("moverArbolParaScrollBMas()",1000);
				}
			);
			if(posicionNodo=="extremo")
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo.";
			}else
			{
				var mensaje="-Fusi\u00f3n con hermano izquierdo.";
			}
			mostrarMensajeOperacionBMas(mensaje);
		}
	}else
	{
		if((padreNodos.childNodes.length==3)&&(altura==1))//el padre tiene solo dos hijos que son los que estan fusionando y estan en la altura uno
		{
			//tengo que pasar los elementos y los hijos a alguno de los dos y reemplazar la raiz por este nodo teniendo en cuneta los id de los divs que tienen que decrementar su altura
			borrarEnlacesBMas();
			//paso los elementos que quedaron al nodo izquierdo del nodo que produjo underflow
			pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoIzquierdo);
			//paso el elemento divisor del padre al nodo izquierdo
			idContenedorElementosHermanoIzquierdo=contenedorElementosHermanoIzquierdo.id;
			var alturaDivDestino=idContenedorElementosHermanoIzquierdo[1];
			var nodoDivDestino=idContenedorElementosHermanoIzquierdo.substr(2,idContenedorElementosHermanoIzquierdo.length-2);
			ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elementoIntermedioPadre);
			//paso los hijos del nodo en underflow al hermano izquierdo
			var divHijo=nodoElementos.firstChild.nextSibling;
			for(var x=0;x<=nodoElementos.childNodes.length-1;x++)
			{
				//inserto en la ultima posicion
				if(divHijo.nextSibling!=undefined)
				{
					var divAuxiliar=divHijo.nextSibling;
				}
				nodoHermanoIzquierdo.appendChild(divHijo);
				divHijo=divAuxiliar;
				
			}
			//guardo los numeros de nodos reutilizables
			vectorNumeracionBMas.push(parseFloat(nodoElementos.style.zIndex));
			vectorNumeracionBMas.push(parseFloat(padreNodos.style.zIndex));
			vectorNumeracionBMas.sort(function(a,b){return a-b;});
			centrarHijosEnFuncionAPadreBMas(nodoHermanoIzquierdo.id);
			//borro el nodo en underflow
			padreNodos.removeChild(nodoElementos);
			var contenedor=document.getElementById("contenedor");
			padreNodos.removeChild(nodoHermanoIzquierdo);
			contenedor.appendChild(nodoHermanoIzquierdo);
			var topNuevo=parseFloat(padreNodos.style.top);
			var leftNuevo=parseFloat(padreNodos.style.left);
			contenedor.removeChild(padreNodos);
			$('#'+idNodoHermanoIzquierdo).animate({top:topNuevo,left:leftNuevo},1250,function()
				{	
					decrementarIdAHermanosPosterioresBMas(nodo,altura);
					decrementarAlturaBMas(nodoHermanoIzquierdo);
					setTimeout("moverArbolParaScrollBMas()",1000);
				}
			);
			if(posicionNodo=="extremo")
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo. Disminuci\u00f3n de altura.";
			}else
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo. Disminuci\u00f3n de altura.";
			}
			mostrarMensajeOperacionBMas(mensaje);

		}else
		{
			if((padreNodos.childNodes.length==3)&&(altura!=1))//el padre tiene solo dos hijos que son los que estan fusionando y estan en altura mayor a 1
			{
				//uno los elementos del nodo en underflow en el nodo de la izquierda, en este nodo quedan todos los hijos, borro el nodo en underflow, dismuniyo en uno los id de los nodos mayores de la misma altura, pongo el nodo que unio en left 0, espero la proxima accion de la recursion 
				borrarEnlacesBMas();
				//paso los elementos que quedaron al nodo izquierdo del nodo que produjo underflow
				pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoIzquierdo);
				//paso el elemento divisor del padre al nodo izquierdo
				var idContenedorElementosHermanoIzquierdo=contenedorElementosHermanoIzquierdo.id;
				var alturaDivDestino=idContenedorElementosHermanoIzquierdo[1];
				var nodoDivDestino=idContenedorElementosHermanoIzquierdo.substr(2,idContenedorElementosHermanoIzquierdo.length-2);
				ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elementoIntermedioPadre);
				//paso los hijos del nodo en underflow al hermano izquierdo
				var divHijo=nodoElementos.firstChild.nextSibling;
				for(var x=0;x<=nodoElementos.childNodes.length-1;x++)
				{
					//inserto en la ultima posicion
					if(divHijo.nextSibling!=undefined)
					{
						var divAuxiliar=divHijo.nextSibling;
					}
					nodoHermanoIzquierdo.appendChild(divHijo);
					divHijo=divAuxiliar;
				
				}
				//guardo el numero de nodo reutilizable
				vectorNumeracionBMas.push(parseFloat(nodoElementos.style.zIndex));
				vectorNumeracionBMas.sort(function(a,b){return a-b;});
				//borro el nodo en underflow
				padreNodos.removeChild(nodoElementos);
				decrementarIdAHermanosPosterioresBMas(nodo,altura);
				nodoHermanoIzquierdo.style.left=0;
				centrarHijosEnFuncionAPadreBMas(nodoHermanoIzquierdo.id);
				centrarArbolBMas(padreNodos);
				setTimeout("moverArbolParaScrollBMas()",1000);
				if(posicionNodo=="extremo")
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo.";
			}else
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo.";
			}
				mostrarMensajeOperacionBMas(mensaje);
			}else
			{
				//uno los elementos del nodo en underflow en el nodo de la izquierda, en este nodo quedan todos los hijos, borro el nodo en underflow, dismuniyo en uno los id de los nodos mayores de la misma altura, renderizo al padre teniendo cuidado con la posicion de los hijos
				borrarEnlacesBMas();
				//paso los elementos que quedaron al nodo izquierdo del nodo que produjo underflow
				pasarElementosDeNodoBMas(contenedorElementos,contenedorElementosHermanoIzquierdo);
				//paso el elemento divisor del padre al nodo derecho
				var idContenedorElementosHermanoIzquierdo=contenedorElementosHermanoIzquierdo.id;
				var alturaDivDestino=idContenedorElementosHermanoIzquierdo[1];
				var nodoDivDestino=idContenedorElementosHermanoIzquierdo.substr(2,idContenedorElementosHermanoIzquierdo.length-2);
				ordenarNodoBMas(alturaDivDestino,nodoDivDestino,elementoIntermedioPadre);
				//paso los hijos del nodo en underflow al hermano izquierdo
				var divHijo=nodoElementos.firstChild.nextSibling;
				for(var x=0;x<=nodoElementos.childNodes.length-1;x++)
				{
					//inserto en la ultima posicion
					if(divHijo.nextSibling!=undefined)
					{
						var divAuxiliar=divHijo.nextSibling;
					}
					nodoHermanoIzquierdo.appendChild(divHijo);
					divHijo=divAuxiliar;
				
				}
				//guardo el numero de nodo reutilizable
				vectorNumeracionBMas.push(parseFloat(nodoElementos.style.zIndex));
				vectorNumeracionBMas.sort(function(a,b){return a-b;});
				//borro el nodo en underflow
				padreNodos.removeChild(nodoElementos);
				decrementarIdAHermanosPosterioresBMas(nodo,altura);
				centrarHijosEnFuncionAPadreBMas(nodoHermanoIzquierdo.id);
				centrarArbolBMas(padreNodos);
				setTimeout("moverArbolParaScrollBMas()",1000);
				if(posicionNodo=="extremo")
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo.";
			}else
			{
				var mensaje="- Fusi\u00f3n con hermano izquierdo.";
			}
			   mostrarMensajeOperacionBMas(mensaje);
			}
		}
	}
}


