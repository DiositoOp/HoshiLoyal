# Hoshito Lealtad

Tarjeta de sellos web para Hoshito: registro por NFC o QR, teléfono vinculado, confirmación en caja (un sello por ticket), panel del dueño y consola del desarrollador.

Hecho con Next.js (App Router) y Postgres. Sin app nativa, sin Wallet y sin WhatsApp.

## Probarlo en tu computadora

Necesitas Node.js 20 o más reciente.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Sin configurar nada usa una base local en la carpeta `.data/` (bórrala para empezar de cero).

- Usuario inicial: `dev` / `cambia-esta-clave` (entra en `/staff/login`).
- Para simular a un cliente abre `/r/mesa-1` en una ventana de incógnito: cada ventana de incógnito es "un teléfono distinto".

## Rutas

| Ruta | Quién | Qué hace |
|---|---|---|
| `/r/<punto>` | Cliente | Destino del NFC o QR. Teléfono nuevo: formulario. Teléfono vinculado: deja la visita por confirmar. |
| `/mi-tarjeta` | Cliente | Sellos, código de la visita, premio y botón de reseña. |
| `/vincular` | Cliente | Usar la tarjeta en un teléfono nuevo con un código de caja. |
| `/staff/login` | Personal | Inicio de sesión. |
| `/caja` | Caja, dueño, dev | Confirmar o rechazar visitas, entregar premios, sello a mano, vincular teléfono. |
| `/admin` | Dueño, dev | Resumen, clientes (con descarga) y promoción. |
| `/dev` | Dev | Puntos NFC/QR, configuración, usuarios y registro de eventos. |

## Reglas del programa

- El teléfono queda vinculado al registrarse (cookie del servidor; en la base solo se guarda su hash).
- Cada visita crea una solicitud con un código de dos dígitos; el sello se suma solo cuando caja la confirma.
- Un sello por cliente al día (configurable en `/dev`). La regla "un sello por ticket" la aplica el cajero al confirmar.
- Al completar la tarjeta se reinicia a cero y se crea un premio por entregar.
- Las solicitudes sin confirmar caducan a las 3 horas.
- Un número de celular solo puede tener una tarjeta. Para usarla en otro teléfono, caja genera un código de 4 dígitos (10 minutos, un solo uso) y el teléfono anterior queda desvinculado.
- El botón de reseña en Google se muestra igual a todos los clientes desde la visita configurada; no depende de ninguna calificación ni da sellos.

## Publicarlo

1. Crea una base Postgres gratuita (Supabase o Neon) y copia su cadena de conexión.
2. Sube el proyecto a Vercel (u otro hosting de Node) con estas variables:
   - `DATABASE_URL`: la cadena de conexión.
   - `SESSION_SECRET`: texto largo y aleatorio.
   - `BOOTSTRAP_USER` y `BOOTSTRAP_PASSWORD`: tu usuario desarrollador inicial.
3. Abre el sitio una vez: las tablas y los datos iniciales se crean solos.
4. Entra a `/dev`, crea los usuarios del dueño y de caja, y pon el enlace de reseñas de Google Maps.
5. Por cada punto, graba su enlace en una etiqueta NFC (NTAG213, con una app como NFC Tools) y descarga su QR para imprimir.
6. Completa el aviso de privacidad en `app/privacidad/page.js` (tiene datos entre corchetes).

## Estructura

```
lib/schema.js    Tablas
lib/db.js        Conexión (Postgres, o base local en desarrollo) y datos iniciales
lib/rules.js     Reglas de sellos, premios y códigos
lib/device.js    Vínculo teléfono-cliente
lib/auth.js      Sesiones y roles del personal
app/             Pantallas y acciones por área: r, mi-tarjeta, vincular, caja, admin, dev, staff
```

## Pendiente conocido

- No hay límite de intentos en el inicio de sesión, el registro ni el código de vinculación. Conviene agregarlo antes de un uso intensivo.
- El número de celular no se verifica (se verificará cuando se agregue WhatsApp).
- Está preparado para un solo restaurante; las tablas ya llevan `restaurant_id` para crecer a varios.
- Si el cliente borra los datos de su navegador o usa modo incógnito, pierde el vínculo y debe pedir un código en caja.
