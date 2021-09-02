## BTC BACKEND - GEEKSHUBS ACADEMY 🚀
### RETO FINAL: E-COMMERCE

- Funcionalidad: API REST
- Tecnologías:
    - NodeJS
    - Express
    - Mongoose
    - Git

- Descripción: Para el proyecto final del Bootcamp de Backend Express he representado una tienda de segunda mano ambiendada en la Tierra Media: **La Tienda Media**.

<img src="/capturas/1.png" alt="vista general La Tienda Media">

##FEATURE 1: GESTIÓN DE USUARIO

● Endpoint de Login: `/login`

<img src="/capturas/3.png" alt="endpoint login">

● Endpoint de Registro: `/register`

<img src="/capturas/2.png" alt="endpoint registro">

● Endpoint de Perfil (Datos de Usuario): `/:id (PUT)`  and `/:id (DELETE)` 

<img src="/capturas/4.png" alt="endpoint perfil">


##FEATURE 2: GESTIÓN DE PRODUCTO

● Endpoints añadir, eliminar, modificar producto (vendedor):

- Añadir nuevo procucto: `products/add`
<img src="/capturas/5.png" alt="endpoint nuevo producto">

- Eliminar: `products/:id (PUT)` 
<img src="/capturas/6.png" alt="endpoint eliminar producto">

- Modificar: `products/:id (DELETE)` 
<img src="/capturas/7.png" alt="endpoint modificar producto">


● Endpoint muestra all products: `/products`

<img src="/capturas/1.png" alt="vista general La Tienda Media">

● Endpoints productos filtro (precio, título...):

- Título: `/products/search?title=anillo`
- Más caros: `/products/order?order=caro`
- Más baratos: `/products/order?order=barato`
<img src="/capturas/pony.png" alt="pony">



##FEATURE 3: GESTIÓN DE COMPRAS

● Endpoint de añadir compra: `/compras (POST)`
<img src="/capturas/COMPRAR.png" alt="COMPRAR">

● Endpoint muestra todas las compras: `/compras (GET)`
<img src="/capturas/COMPRAS.png" alt="COMPRAS">

● Endpoint eliminar compra: `/:id (DELETE)`

## ¡Hasta pronto Geeks! 🚀
