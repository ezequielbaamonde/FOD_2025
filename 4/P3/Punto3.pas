program arbolesB+;
//INCISO C.
const
    M = .. //Orden del arbol
type
    alumno = record
        nombre: string;
        apellido: string;
        dni: integer;
        legajo: integer;
        anioIngreso: integer;
    end;

    lista = ^nodo; //Enlace adicional que apunta al sig nodo hoja
    TArchivoDatos = file of alumno;

    nodo = record
        cant_claves: integer;
        claves: array[1..M-1] of longint;
        enlaces: array[1..M-1] of integer;
        hijos: array[1..M] of integer;
        sig: lista;
        //sig: integer;
    end;
    
    arbolB = file of nodo;
var
    archivoDatos: TArchivoDatos;
    archivoIndice: arbolB;

{INCISO A.
 Los elementos (Claves) en un arbol B+ se organizan en un conjunto
 de grupos de registros ordenados por claves en forma secuencial,
 junto con un conjunto de índices que proporciona acceso rapido a los
 registros.
 En los nodos internos encontraremos copias de los valores eficientes ubi-
  cados en los nodos hoja del árbol.
  
INCISO B.
 La característica distintiva de un NODO HOJA de un arbol b+ es que
 estos almacenan los valores/claves eficientes del árbol y un enlace
 adicional que apunta al siguiente nodo hoja en orden ascendente.


INCISO D.
 El proceso de busqueda de un alumno con un DNI haciendo uso del árbol B+, consiste en aprovechar el criterio de orden y los 
 separadores de los nodos internos, hasta encontrar el dato en una hoja. La diferencia con respecto a un árbol B, es que la búsqueda
 siempre termina en un nodo hoja (terminal), y no en los nodos internos, al ser copias.

}
