program punto2;

const
    //M = 43;

type
    alumnos = record
        dni: integer;
        nom: String;
        ape: String;
        legajo: integer;
        anio: integer;
    end;

    tNodo = record
        cantDatos: integer; //Cantidad de claves
        datos: array [1..M-1] of integer; //Corresponde a un DNI alumno //Claves
        enlaces: array [1..M-1] of integer; //Enlace a los registros del archivo de datos
        hijos: array[1..M] of integer;
    end;

    arcAlumnos = file of alumnos;
    arbolB = file of tNodo;


{Inciso B.
Hallar valor de M con la fórmula -> N = (M-1) * A + D * B + C
Donde:
    𝑁 = 512 (tamaño del nodo)

    𝐴 = 4 bytespor cada clave: 4 (DNI)

    𝐵 = 4 bytes → cada puntero a hijo

    𝐶 = 4 bytes → campo cantDatos

-> Solución:
N = (M-1) * A + (M-1) * A + M * B + C
512 = (M-1) * 4 + (M-1) * 4 + M * 4 + 4
512 = 4M - 4 + 4M - 4 + 4M + 4
512 = 12M - 4
512 + 4 = 12M
516/12 = M
43 = M --> Orden del árbol

Cantidad máxima de claves por nodo M-1 = 43-1 = 42 CLAVES
    -> DNI + enlace a archivo de datos



Inciso C.
Si el orden del arbol B es mayor significa que habrá
más claves por nodo. Ventajas:
    → El árbol crece más "horizontalmente"
    → Menos niveles
    → Menos accesos a disco.

Desventajas:
    → Más trabajo por nodo: Si el nodo tiene muchas
      claves (por ejemplo, 100 o más), hacer búsquedas
      secuenciales o binaria dentro del nodo puede volverse
      más costoso.

Inciso D.
 Se busca en el árbol la clave con DNI 12345678, aprovechando el criterio de orden,
 moviéndonos a la izquierda si es menor o igual, y en caso contrario, a la derecha.
 Una vez hallada la clave, uso el NRR guardado en el enlace para buscar el registro
 en el archivo de datos.

Inciso E.
Si se deseara buscar un alumno por su numero de legajo se deberia realizar una búsqueda
secuencial hasta encontrar el alumno con el legajo solicitado. No tendría sentido en este caso,
usar el índice que organiza el acceso al archivo de alumnos por DNI. Para brindar acceso indizado
al archivo de alumnos por número de legajos, lo más conveniente sería armar un nuevo árbol B pero
con criterio de orden en base al legajo.

Inciso F.
 Idem mótivo que INCISO E.

}