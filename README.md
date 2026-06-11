# Trabajo de Integracion

Pasos de hoyyyyy
1. Elegir idea - check!
2. Pensar entidades - check!
3. Armar esquema - check!
4. Crear el repositorio - check!
5. Clonarlo - check!
6. Copiar lo que mando Manu Bilbo - check!
7. Hacerlo andar
8. Limpiarlo / Adecuarlo a nuestra idea


Idea 1: divertida pero trillada
prode mundial

Idea 2: simplona
placard
remeras, pantalones, outfits, eventos

Idea 3: divertida y medio volada
simular sociedades
pais
x grupos etarios
natalidad
mortalidad
un boton pasar un año
guerra - entre 2 paises 
baby boom - aumenta la natalidad por x cantidad de años

## Idea
### Simulacion de sociedades
Vamos a simular el paso del tiempo en un conjunto de sociedades.
Las sociedades tienen 3 grupos etarios
- jovenes
- adultos
- ancianos
Cada año esos grupos etarios cambian, nacen nuevos jovenes, jovenes pasan a adultos, adultos a ancianos, ancianos fallecen.
Tambien fallecen jovenes y adultos.

A su vez, dentro de cada sociedad hay eventos que modifican las condiciones de ciertos períodos.
Por ejemplo:
- una guerra, afecta al pais 1 y al pais 2, por 5 años con una mayor mortalidad de adultos.
- mejora sanitaria, afecta al pais 3, por 10 años con menor mortalidad en ancianos.
- baby boom, aumenta la natalidad de en jovenes

## Entidades
sociedad
- id
- nombre

1,Argentina

grupo_etario
- id
- nombre
- sociedad_id
- natalidad_base
- mortalidad_base

1,jovenes,1,0.10,0.05
2,adultos,1,0.15,0.08
3,ancianos,1,0.20,0.15
4,jovenes,2,0.10,0.05
5,adultos,2,0.15,0.08
6,ancianos,2,0.20,0.15

registro_historico
- id
- sociedad_id
- grupo_etario_id
- cantidad
- anio

1,1,2000000,2026
1,2,5000000,2026
1,3,3000000,2026
1,1,2500000,2027
1,2,5450000,2027
1,3,3300000,2027
1,1,1800000,2028
1,2,5450000,2028
1,3,3300000,2028

evento
- id
- nombre
- grupo_etario_id
- anio_desde
- anio_hasta
- natalidad
- mortalidad

hambruna,1,2027,2028,0,0.5
