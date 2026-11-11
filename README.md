# 💀 AETERUM INK TATTOO • ESTUDIO PROFESIONAL

Sitio web oficial, catálogo interactivo y gestor de citas multi-canal (WhatsApp, Correo y Llamadas telefónicas) desarrollado con base y fidelidad estética al diseño gótico / dark art de **Aeterum Ink Tattoo**.

---

## 🖤 Características Principales

### 1. 🎨 Estética & Diseño Fiel
- **Tipografía Gótica y Romana:** Combinación de fuentes de alta gama (`Cinzel Decorative`, `Cinzel`, `Cormorant Garamond` y `Montserrat`).
- **Acabado Metálico / Cromo Oscuro:** Efectos de relieve metálico plateado en títulos y emblemas.
- **Emblema de Cruz Gótica:** Extraído y optimizado en alta resolución con resplandor plateado.
- **Atmósfera Dark Art:** Fondos oscuros de piedra/humo, iluminación dramática y texturas renacentistas.
- **Secciones idénticas al flyer:**
  - *Navbar* con enlaces de navegación rápida y botón de Cita.
  - *Hero* con el modelo tatuado, cruz ornamental, slogan ("TU HISTORIA, EN TU PIEL") y subtítulo ("Arte eterno. Diseño sin límites.").
  - *Barra de Atributos:* Diseños Personalizados, Estilos Variados, Atención Profesional, Higiene Garantizada.
  - *Nuestro Trabajo:* 5 piezas destacadas idénticas a la imagen (Ángel de piedra, Polilla de la muerte, Rosa botánica, Calavera mística y Cruz gótica).
  - *¿Por qué elegir Aeterum?:* Composición de 3 columnas con cruz central flotante y atributos clave.
  - *Lo que dicen nuestros clientes:* Testimonios con foto circular, estrellas doradas y opción interactiva para dejar reseñas.
  - *Guía de Cuidados:* Consejos paso a paso para el proceso de curación de la piel.
  - *Footer de Contacto:* Redes sociales (Instagram, TikTok, Facebook), WhatsApp directo (+52 779 172 8192), ubicación en Tizayuca, Hgo. y botón de cita.

---

### 2. 📅 Gestor de Citas Multi-Canal

Al pulsar en cualquier botón de **"Agendar Cita"**:
- **🟢 Vía WhatsApp:**
  - El cliente ingresa su nombre, teléfono, zona del cuerpo, medida en cm, descripción y fecha tentativa.
  - Al dar clic, se registra la cita en el sistema y se abre **WhatsApp automáticamente** con un mensaje profesional ya redactado con todos los detalles.
- **✉️ Vía Correo Electrónico:**
  - Genera automáticamente un enlace `mailto:` con asunto y cuerpo formal dirigido a `contacto@aeterumtattoos.com` listo para enviar.
- **📞 Vía Llamada Telefónica:**
  - Botón de un solo toque (`tel:+527791728192`) para llamar al estudio directamente o solicitar una llamada de vuelta.

---

### 3. 🖼️ Catálogo Interactivo & Lightbox

- Botón **"Ver más trabajos"** que abre el catálogo completo con filtros:
  - *Todos*, *Realismo*, *Black & Grey*, *Dark Fantasy*, *Ornamental*, *Letras & Flash*.
  - Buscador en tiempo real por palabra clave.
  - Al seleccionar cualquier pieza, se despliega una ventana de detalle con fotografía ampliada, zona sugerida, sesiones estimadas y botones directos para:
    - *"Cotizar esta pieza por WhatsApp"* (prepara el mensaje con el nombre y estilo de esa pieza).
    - *"Agendar Cita para esta pieza"*.

---

### 4. 🛡️ Panel de Administración de Citas

En la barra de navegación superior hay un botón discreto llamado **`Gestor`** (con indicador de citas pendientes). Al hacer clic:
1. **Control de Citas:**
   - Lista todas las solicitudes recibidas por WhatsApp, correo y llamadas.
   - Cambiar estado con un clic: `🟡 Pendiente`, `🟢 Confirmada`, `⚪ Completada`, `🔴 Cancelada`.
   - Botón directo de **WhatsApp para responderle al cliente** con un mensaje de confirmación pre-armado.
   - Botón directo de **Llamar al cliente**.
2. **Exportar Base de Datos:**
   - Botón **"Exportar Excel / CSV"** para descargar el registro completo de clientes y citas.
3. **Registrar Citas Manuales:**
   - Formulario para anotar clientes que llegan en persona o llaman por teléfono.
4. **Configuración del Estudio:**
   - Permite cambiar en cualquier momento el número de WhatsApp, el teléfono de llamadas, el correo electrónico y la dirección sin tocar el código. Los cambios se guardan localmente en el navegador.

---

## 🚀 Cómo Iniciar el Proyecto

1. Abrir una terminal en la carpeta del proyecto:
   ```bash
   cd "/home/dayron-rj/Documentos/Proyectos Personales/AETERUM-INK-TATTO"
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en tu navegador la dirección indicada (usualmente `http://localhost:3000` o `http://localhost:5173`).

4. Para compilar una versión de producción lista para subir a cualquier hosting (Vercel, Netlify, etc.):
   ```bash
   npm run build
   ```
   Los archivos listos para producción quedarán en la carpeta `dist/`.
