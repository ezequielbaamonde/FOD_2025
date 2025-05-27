program UNLP;
const
    M = 8;
type
    alumnos = record
        nom: String;
        ape: String;
        dni: integer;
        legajo: integer;
        anio: integer;
    end;

    tNodo = record
        cant_datos: integer; //Dim Log
        datos: array[1..M-1] of alumnos; //Elementos que contendrá el nodo, minimo 1
        hijos: array[1..M] of integer;
    end;

    arbolB = file of tNodo;

var ab: arbolB; reg: alumnos;

BEGIN
    //CÓDIGO
END.

{Inciso B.
Hallar valor de M con la fórmula -> N = (M-1) * A + M * B + C
    - N es el tamaño del NODO (En bytes). En este caso N es 512 bytes
    - A es el tamaño de un registro (En bytes). En este caso 64 bytes
    - B es el tamaño de cada enlace a un hijo. En este caso 4 bytes
    - C es el tamaño que ocupa el campo referido a la cantidad de claves.

Solución:
    512 = (M-1) * 64 + M * 4 + 4
    512 = 64M - 64 + 4M + 4
    512 = 68M - 60
    512 + 60 = 68M
    572 = 68M
    572 / 68 = M
    8 = M

Inciso C.
El valor de M a la hora de organizar el archivo con toda la
información de alumnos en un arbol B impactá en el momento
de ver la cantidad de datos e hijos que pueda llegar a tener.
 En este caso, el ARBOL B tendrá (1..8-1) = 7 datos y 8 HIJOS

Inciso D.
El dato que seleccionaria como clave de identificación para or-
ganizar los elementos (alumnos) en el arbol B seria su LEGAJO.
Pero, también hay más opciones, como por ejemplo el DNI, ya que
son claves únivocas y primarias.

Inciso E.
 -> Peor Caso: N Lecturas, N es la áltura del árbol
 -> Mejor Caso: 1 Lectura (Está en la raíz)

Inciso F.
 -> Se debe recorrer todo el arbol hasta encontrar el alumno.
}