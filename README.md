### 1. Listado de reglas

Una pantalla con todas las reglas existentes. De cada una se ve el nombre, si está activa o no, y se puede **activar/desactivar desde el listado** sin entrar a editarla.

_____

Se construirá pantalla que liste reglas, primero estatica

Se instalará React Router  para mostrar la primera pantalla 

Se instalá tailwind css para uso de tailwind components 

Se usará tailwind components para la UI para la contrucción de pantallas comenzando con la lista de reglas

____

Necesito ajustar  componente de tabla, me esta limitando entregar valor  de acuerdo al requerimiento

Necesito definir objeto/arreglo de operadores 
Y los disparadores necesito guardarlos en un objeto 

Antes de meter logica para no entorpecer desarrollo necesito afinar componente visual porque sino me voy a retrasar más tiempo del necesario

Necesito poner en la interfaz los pasos que deacuerdo al requerimiento son tres 

Comienzo de nuevo interfaz porque sino el tiempo se va a consumir 

La interfaz/tabla debe de tener nombre disparador y si es activa

Para optimizar interfaz desde el inicio guardaré en un useState las reglas con nombre unico 
a fin de rendezirarlos en una tabla

Se escribirá por motivos didacticos el código en español  y la forma de manejarla será  con un objeto que tenga el ID de la regla , su disparador,  y si esta activa o no con una bandera bolleana

Las reglas  serán 

Bienvenida
Confirmar pago
Ticket pendiente

su disparador  seŕa 

Cliente creado
Pago Recibido
Ticket sin respuesta 

los id 1,2,3

los ejemplos son ficticios 

Validar en ticket pendiente el valor bolleano a partir de la prueba 

necesito crear el evento que cambie su estado pero primero necesito renderizar en la tabla, usaré forEach o map para renderizar considero que el map es mejor porque crea un arreglo nuevo y no se opera sobre el mismo

usaré el valor de reglas que será el que renderizaré 

usaré un input check a fin de validar si es activa o no la regla 

Los estilos serán directos sin la libreria a fin de optimizar tiempo de ejercicio 

Teniendo un estilo light  es necesario priorizar logica particularmente la funcion que cambie el estado de la regla 

Se usara el cambio  dentro del useState  pero pendiente validar si es la mejor opción

Validar actualizacion de estado 

____

Se continua con el resto de la logica para añadir valor es necesario añadir 

Necesito añadir un sector de cada disparador
Ademas necesito tener condiciones dinamicas con el campo el operador y su valor
Las acciones de emial, sms y webhook



-----

Reglas claras 

Se crea regla ejemplo 

