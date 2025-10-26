# Sistema de Tethering Profesional con Extracción EXIF

Sistema de visualización en tiempo real de fotografías con extracción automática de metadatos EXIF, diseñado para fotógrafos profesionales que necesitan revisar sus capturas al instante.

---

## Tabla de Contenidos

- [¿Qué es el Tethering?](#qué-es-el-tethering)
- [¿Para qué sirve este sistema?](#para-qué-sirve-este-sistema)
- [Características principales](#características-principales)
- [Casos de uso reales](#casos-de-uso-reales)
- [Requisitos del sistema](#requisitos-del-sistema)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Arquitectura del sistema](#arquitectura-del-sistema)
- [Metadatos EXIF soportados](#metadatos-exif-soportados)
- [Formatos soportados](#formatos-soportados)
- [API](#api)
- [Personalización](#personalización)

---

## ¿Qué es el Tethering?

El tethering fotográfico es una técnica profesional que consiste en conectar una cámara a un ordenador para visualizar las fotografías en una pantalla grande inmediatamente después de capturarlas.

### Ventajas del Tethering

- **Revisión inmediata**: Ver las fotos en una pantalla grande sin revisar la pequeña pantalla LCD de la cámara
- **Control de calidad**: Detectar problemas de enfoque, exposición o composición al instante
- **Colaboración con clientes**: El cliente puede ver el resultado en tiempo real durante la sesión
- **Trabajo en equipo**: Todo el equipo puede revisar las capturas simultáneamente
- **Respaldo automático**: Las fotos se guardan automáticamente en el ordenador
- **Análisis técnico**: Acceso inmediato a todos los parámetros EXIF de captura

---

## ¿Para qué sirve este sistema?

Este sistema convierte cualquier navegador web en una pantalla de visualización profesional para tethering fotográfico.

### Sesiones de estudio

Ideal para fotografía de producto, moda o retrato en estudio. El fotógrafo y el cliente pueden revisar cada toma al instante en una pantalla grande, permitiendo ajustes inmediatos en iluminación, composición o dirección del modelo.

### Pantalla externa o proyector

Conecta un segundo monitor, televisión o proyector para que todo el equipo (director de arte, estilista, maquillador, cliente) visualice las capturas en tiempo real sin interrumpir el flujo de trabajo del fotógrafo.

### Visualización remota multiplataforma

Accede desde cualquier dispositivo en la misma red local (tablet, smartphone, otro ordenador) para revisar las fotografías desde cualquier ubicación del set fotográfico.

### Análisis técnico detallado

Revisa instantáneamente los parámetros de captura (ISO, apertura, velocidad de obturación, distancia focal) sin necesidad de revisar los menús de la cámara, permitiendo ajustes técnicos precisos.

### Presentaciones y portafolios en vivo

Muestra tu trabajo a clientes potenciales mientras capturas, demostrando tu proceso creativo y capacidad técnica en tiempo real.

---

## Características principales

### Detección automática de archivos

El sistema monitorea una carpeta compartida y detecta automáticamente cuando se añade una nueva imagen, procesándola inmediatamente sin intervención manual.

### Extracción completa de metadatos EXIF

Extrae y muestra todos los metadatos relevantes de cada fotografía:

- Información de la cámara (marca, modelo, lente utilizada)
- Parámetros de exposición (ISO, apertura, velocidad de obturación, compensación)
- Información de la lente (distancia focal, equivalente en 35mm)
- Configuración de color (balance de blancos, espacio de color, saturación)
- Estado del flash (si se disparó y en qué modo)
- Fecha y hora exacta de captura
- Dimensiones y resolución de la imagen
- Coordenadas GPS (si están disponibles)

### Visualización en tiempo real

Utiliza WebSockets para actualizar la interfaz instantáneamente cuando llega una nueva fotografía, sin necesidad de recargar la página.

### Verificación de integridad de archivos

Implementa un sistema de verificación que espera hasta que el archivo esté completamente transferido antes de procesarlo, evitando errores de lectura en archivos parcialmente copiados.

### Interfaz responsive y adaptable

El diseño se adapta automáticamente al tamaño de la pantalla y orientación del dispositivo, funcionando perfectamente en monitores grandes, tablets o smartphones.

### Sistema de caché inteligente

Utiliza parámetros de timestamp en las URLs de las imágenes para evitar problemas de caché del navegador y garantizar que siempre se muestre la imagen más reciente.

### Logos de marcas automáticos

Reconoce automáticamente la marca de la cámara y muestra su logo oficial, añadiendo un toque profesional a la interfaz.

---

## Casos de uso reales

### Fotografía de moda y editorial

Durante una sesión de moda, el director de arte necesita validar que el estilismo, maquillaje y poses estén correctos antes de continuar. El sistema permite que todo el equipo revise las capturas en un monitor de 32 pulgadas, tomando decisiones informadas sin interrumpir el ritmo de la sesión.

### Fotografía de producto comercial

Un fotógrafo de producto trabaja con un cliente que necesita aprobar cada toma. Usando este sistema con un proyector, el cliente ve las fotos en una pared a 2 metros, aprueba la composición e iluminación, y el fotógrafo continúa sin perder tiempo.

### Fotografía arquitectónica y de interiores

En localizaciones con luz natural variable, el fotógrafo necesita verificar constantemente los parámetros de exposición. El sistema muestra los datos EXIF de cada captura, permitiendo ajustes precisos de ISO, apertura y velocidad según cambien las condiciones de luz.

### Sesiones de retrato corporativo

Durante una jornada de retratos corporativos para una empresa, múltiples personas del departamento de RRHH necesitan validar que los retratos cumplan con la imagen corporativa. El sistema permite que varios revisores accedan simultáneamente desde diferentes dispositivos.

### Workshops y enseñanza de fotografía

Un instructor de fotografía utiliza el sistema con un proyector para que todos los estudiantes vean en tiempo real cómo los cambios en los parámetros de la cámara afectan al resultado final, convirtiendo la demostración en una experiencia educativa interactiva.

---

## Requisitos del sistema

### Software necesario

- Node.js versión 14.0.0 o superior
- NPM (incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

### Hardware recomendado

- Procesador: Intel Core i5 o equivalente (mínimo)
- RAM: 4GB (mínimo), 8GB o más (recomendado)
- Almacenamiento: 100MB para el sistema, más espacio para las fotografías
- Red: Conexión Ethernet o WiFi estable para visualización remota

### Sistema operativo

Compatible con:
- Windows 10/11
- macOS 10.14 (Mojave) o superior
- Linux (Ubuntu 18.04+, Fedora, Debian)

---

## Instalación

### Paso 1: Clonar o descargar el repositorio

```bash
git clone https://github.com/tu-usuario/tethering-system.git
cd tethering-system
```

### Paso 2: Instalar dependencias

```bash
npm install
```

Esto instalará automáticamente:
- express (servidor web)
- socket.io (comunicación en tiempo real)
- chokidar (monitoreo de archivos)
- exifreader (extracción de metadatos)

### Paso 3: Configurar las fuentes tipográficas

Coloca los archivos de fuentes en la carpeta `public/`:

```
public/
├── Aqum.ttf
├── Friend-Bold.otf
├── Friend-Light.otf
└── Friend-Regular.otf
```

Estas fuentes son necesarias para el diseño de la interfaz. Si no las tienes, el sistema funcionará con fuentes del sistema pero con un aspecto diferente.

### Paso 4: Verificar la instalación

```bash
node server.js
```

Deberías ver en la consola:

```
Servidor ejecutándose en http://localhost:3000
Monitoreando carpeta: /ruta/a/shared-folder
Extracción EXIF activada
```

---

## Configuración

### Cambiar el puerto del servidor

Por defecto el sistema usa el puerto 3000. Para cambiarlo:

**En Windows:**
```cmd
set PORT=8080 && node server.js
```

**En macOS/Linux:**
```bash
PORT=8080 node server.js
```

O edita directamente en `server.js`:

```javascript
const PORT = 8080; // Cambia aquí el puerto
```

### Cambiar la carpeta compartida

Por defecto, el sistema monitorea la carpeta `shared-folder` en el directorio del proyecto. Para cambiarla:

```javascript
const SHARED_FOLDER = path.join(__dirname, 'mi-carpeta-personalizada');
```

O usa una ruta absoluta:

```javascript
const SHARED_FOLDER = '/Users/tu-usuario/Fotografias/Tethering';
```

### Configurar tu cámara

El sistema funciona con cualquier método de transferencia de archivos:

#### Opción 1: WiFi de la cámara

1. Activa el WiFi en tu cámara
2. Configura la transferencia automática a la carpeta compartida
3. Cada foto capturada se transferirá automáticamente

Marcas compatibles: Canon (EOS Utility), Nikon (SnapBridge), Sony (Imaging Edge Mobile), Panasonic (Image App)

#### Opción 2: Cable USB con software nativo

1. Conecta la cámara por USB
2. Configura el software nativo (Canon EOS Utility, Nikon Camera Control Pro, etc.)
3. Establece como carpeta de destino la carpeta compartida del sistema

#### Opción 3: Tarjeta SD con transferencia automática

1. Usa un lector de tarjetas con WiFi (Eye-Fi, Toshiba FlashAir)
2. Configura la transferencia automática a la carpeta compartida
3. Las fotos se copiarán automáticamente al escribirse en la tarjeta

---

## Uso

### Inicio básico

1. Inicia el servidor:

```bash
node server.js
```

2. Abre tu navegador y accede a:

```
http://localhost:3000
```

3. Configura tu cámara para transferir archivos a la carpeta `shared-folder`

4. Captura una fotografía

5. La imagen aparecerá automáticamente en el navegador con todos sus metadatos EXIF

### Acceso desde otros dispositivos

Para acceder desde otros dispositivos en la misma red:

1. Averigua tu dirección IP local:

**Windows:**
```cmd
ipconfig
```
Busca "Dirección IPv4"

**macOS/Linux:**
```bash
ifconfig
```
Busca "inet" (normalmente algo como 192.168.1.X)

2. Desde otro dispositivo, accede a:

```
http://TU-IP-LOCAL:3000
```

Ejemplo: `http://192.168.1.105:3000`

### Múltiples pantallas simultáneas

Puedes abrir el sistema en múltiples navegadores o dispositivos al mismo tiempo. Todos se actualizarán simultáneamente cuando llegue una nueva fotografía.

Casos de uso:
- Monitor principal para el fotógrafo
- Tablet para el cliente
- Proyector para todo el equipo
- Smartphone del director de arte

---

## Arquitectura del sistema

### Componentes principales

#### 1. Servidor Node.js (server.js)

Servidor HTTP basado en Express que:
- Sirve los archivos estáticos (HTML, CSS, fuentes)
- Proporciona acceso a las imágenes de la carpeta compartida
- Gestiona las conexiones WebSocket
- Monitorea cambios en el sistema de archivos
- Extrae metadatos EXIF de las imágenes

#### 2. Monitor de archivos (Chokidar)

Sistema que observa la carpeta compartida y detecta:
- Nuevos archivos añadidos
- Cambios en archivos existentes (durante la transferencia)
- Completitud de los archivos transferidos

#### 3. Extractor EXIF (ExifReader)

Librería que lee el encabezado EXIF de las imágenes y extrae:
- Metadatos de la cámara y lente
- Parámetros de exposición completos
- Información de color y procesado
- Datos de ubicación GPS
- Timestamps precisos

#### 4. Servidor WebSocket (Socket.io)

Sistema de comunicación bidireccional en tiempo real que:
- Notifica a todos los clientes conectados cuando hay una nueva imagen
- Envía los metadatos EXIF junto con la imagen
- Mantiene la conexión activa con reconexión automática

#### 5. Cliente web (HTML/JavaScript)

Interfaz responsive que:
- Se conecta al servidor vía WebSocket
- Precarga las imágenes antes de mostrarlas
- Formatea y muestra los metadatos EXIF
- Se adapta automáticamente al tamaño de pantalla
- Muestra indicadores de carga y estado de conexión

### Flujo de trabajo del sistema

```
1. Cámara captura foto
        ↓
2. Archivo se transfiere a shared-folder
        ↓
3. Chokidar detecta nuevo archivo
        ↓
4. Sistema verifica completitud del archivo
        ↓
5. ExifReader extrae metadatos
        ↓
6. Socket.io envía datos a todos los clientes
        ↓
7. Clientes precargan y muestran la imagen
        ↓
8. Interfaz muestra imagen + metadatos EXIF
```

### Diagrama de red

```
                    ┌─────────────────┐
                    │   Cámara WiFi   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Ordenador     │
                    │   (Servidor)    │
                    │   Node.js:3000  │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Red Local     │
                    │   WiFi/Ethernet │
                    └────┬─────┬──────┘
                         │     │
              ┌──────────▼─┐ ┌─▼──────────┐
              │  Monitor   │ │   Tablet   │
              │  Principal │ │   Cliente  │
              └────────────┘ └────────────┘
```

---

## Metadatos EXIF soportados

### Información de la cámara

- **Make**: Fabricante de la cámara (Canon, Nikon, Sony, etc.)
- **Model**: Modelo específico (EOS R5, D850, A7III, etc.)
- **LensModel**: Lente utilizada (EF 24-70mm f/2.8L, etc.)
- **LensInfo**: Información adicional de la lente

### Parámetros de exposición

- **ISOSpeedRatings**: Sensibilidad ISO (100, 200, 400, etc.)
- **FNumber**: Apertura del diafragma (f/2.8, f/5.6, etc.)
- **ExposureTime**: Velocidad de obturación (1/250, 2", etc.)
- **ExposureMode**: Modo de exposición (Manual, Automático, Prioridad)
- **ExposureCompensation**: Compensación de exposición en EV (+1.0, -0.5, etc.)

### Información de la lente

- **FocalLength**: Distancia focal utilizada (50mm, 85mm, etc.)
- **FocalLengthIn35mmFilm**: Equivalente en formato 35mm
- **MaxApertureValue**: Apertura máxima de la lente

### Balance de blancos y color

- **WhiteBalance**: Balance de blancos (Auto, Daylight, Cloudy, etc.)
- **ColorSpace**: Espacio de color (sRGB, Adobe RGB)
- **Saturation**: Nivel de saturación (Normal, High, Low)
- **Contrast**: Nivel de contraste
- **Sharpness**: Nivel de nitidez aplicado

### Información del flash

- **Flash**: Si el flash se disparó y cómo
- **FlashMode**: Modo del flash utilizado

### Fecha y hora

- **DateTimeOriginal**: Fecha y hora exacta de captura
- **DateTimeDigitized**: Fecha y hora de digitalización
- **DateTime**: Fecha y hora de última modificación

### Dimensiones

- **ImageWidth**: Ancho de la imagen en píxeles
- **ImageHeight**: Alto de la imagen en píxeles
- **XResolution**: Resolución horizontal (DPI)
- **YResolution**: Resolución vertical (DPI)
- **Orientation**: Orientación de la imagen

### Datos GPS (si están disponibles)

- **GPSLatitude**: Latitud de la captura
- **GPSLongitude**: Longitud de la captura
- **GPSAltitude**: Altitud sobre el nivel del mar

### Software y procesado

- **Software**: Software de la cámara o de procesado utilizado
- **ProcessingSoftware**: Software adicional de procesado

---

## Formatos soportados

### Formatos JPEG

- .jpg
- .jpeg

Extracción EXIF: Completa y confiable

### Formatos PNG

- .png

Extracción EXIF: Limitada (PNG almacena menos metadatos)

### Formatos TIFF

- .tiff
- .tif

Extracción EXIF: Completa

### Formatos RAW

- .cr2 (Canon RAW)
- .cr3 (Canon RAW nuevo formato)
- .nef (Nikon RAW)
- .arw (Sony RAW)
- .dng (Adobe Digital Negative)
- .orf (Olympus RAW)
- .raf (Fujifilm RAW)
- .rw2 (Panasonic RAW)

Extracción EXIF: Completa, incluye datos específicos del formato RAW

**Nota**: Los archivos RAW se muestran como miniatura o vista previa embebida. Para visualización completa de RAW, se recomienda configurar la cámara para guardar RAW + JPEG.

---

## API

### Endpoint: Obtener EXIF de una imagen

```
GET /api/exif/:filename
```

Retorna los metadatos EXIF completos de una imagen específica en formato JSON.

**Parámetros:**
- `filename`: Nombre del archivo (debe existir en la carpeta compartida)

**Ejemplo de petición:**

```bash
curl http://localhost:3000/api/exif/IMG_1234.jpg
```

**Ejemplo de respuesta:**

```json
{
  "filename": "IMG_1234.jpg",
  "camera": {
    "make": "Canon",
    "model": "EOS R5",
    "lens": "RF 24-70mm F2.8 L IS USM"
  },
  "exposure": {
    "iso": "400",
    "aperture": "f/2.8",
    "shutterSpeed": "1/250",
    "exposureMode": "Manual",
    "exposureCompensation": "0"
  },
  "lens": {
    "focalLength": "50mm",
    "focalLength35mm": "50mm",
    "maxAperture": "f/2.8"
  },
  "color": {
    "whiteBalance": "Daylight",
    "colorSpace": "sRGB",
    "saturation": "Normal",
    "contrast": "Normal",
    "sharpness": "Normal"
  },
  "flash": {
    "fired": "No",
    "mode": "Off"
  },
  "datetime": {
    "original": "2024:10:26 15:30:45",
    "digitized": "2024:10:26 15:30:45"
  },
  "dimensions": {
    "width": 8192,
    "height": 5464,
    "resolution": 300,
    "orientation": "Normal"
  },
  "software": "Adobe Lightroom Classic 12.0",
  "gps": null
}
```

**Códigos de respuesta:**

- `200`: Éxito - Retorna JSON con metadatos
- `404`: Archivo no encontrado
- `500`: Error al procesar el archivo

---

## Personalización

### Modificar el diseño visual

#### Cambiar colores

Edita el archivo `public/index.html` en la sección `<style>`:

```css
body {
    background: #eee; /* Color de fondo */
    color: #323232; /* Color del texto */
}

.top-text {
    background: #ffffff; /* Fondo del header */
    color: #323232; /* Texto del header */
}
```

#### Cambiar fuentes

Sustituye las fuentes en la carpeta `public/` y actualiza las referencias en CSS:

```css
@font-face {
    font-family: mi-fuente-personalizada;
    src: url("./MiFuente.ttf") format("truetype");
}

.texttitl {
    font-family: mi-fuente-personalizada, sans-serif;
}
```

#### Modificar el layout

El layout usa Flexbox para adaptarse. Puedes modificar la distribución editando las clases CSS de los contenedores principales.

### Añadir metadatos adicionales

Para mostrar metadatos EXIF adicionales, edita la función `updateCameraInfo()` en el HTML:

```javascript
function updateCameraInfo(metadata) {
    // Añadir compensación de exposición
    if (metadata.exposure.exposureCompensation) {
        const evElement = document.getElementById('exposure-comp');
        evElement.textContent = `${metadata.exposure.exposureCompensation} EV`;
    }
    
    // Añadir modo de medición
    if (metadata.meteringMode) {
        const meteringElement = document.getElementById('metering');
        meteringElement.textContent = metadata.meteringMode;
    }
}
```

### Cambiar el tiempo de verificación de archivos

Para ajustar cuánto espera el sistema antes de procesar un archivo nuevo:

En `server.js`, localiza la función `isFileComplete`:

```javascript
function isFileComplete(filePath, callback) {
    const initialSize = fs.statSync(filePath).size;
    
    setTimeout(() => {
        const newSize = fs.statSync(filePath).size;
        callback(initialSize === newSize && newSize > 0);
    }, 1000); // Cambiar 1000ms (1 segundo) según necesites
}
```

Valores recomendados:
- Conexión USB rápida: 500ms
- WiFi estable: 1000ms (predeterminado)
- WiFi lento o archivos grandes: 2000ms o más

### Añadir logos personalizados

En el HTML, localiza el objeto `cameraLogos` y añade nuevas marcas:

```javascript
const cameraLogos = {
    'Canon': 'https://url-del-logo-canon.svg',
    'Nikon': 'https://url-del-logo-nikon.svg',
    'Mi Marca': 'https://url-de-mi-logo-personalizado.svg'
};
```