{
OverFlow --> Surge cuando se inserta un elemento a un nodo y este se encuentra lleno

Underflow --> Surge cuando se realiza una baja pero el nodo tiene menor cantidad de claves que el mínimo(Un nodo debe tener minimo 1 elemento)

Redistribución --> Posible solución tras UNDERFLOW.
    -> Puede trasladarse llaves/claves de un nodo adyacente hermano (en caso que este tenga suficientes elementos)

Fusión o Concatenación --> Si un nodo adyacente hermano está al mínimo (no le sobra ningún elemento) no se puede redistribuir,
                           se concatena con un nodo adyacente disminuyendo el # de nodos (y en algunos casos la altura del árbol)

}