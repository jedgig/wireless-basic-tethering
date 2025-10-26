const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const ExifReader = require('exifreader');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const SHARED_FOLDER = path.join(__dirname, 'shared-folder/20251026');

if (!fs.existsSync(SHARED_FOLDER)) {
    fs.mkdirSync(SHARED_FOLDER, { recursive: true });
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/shared', express.static(SHARED_FOLDER));

const filesInTransfer = new Set();

function isFileComplete(filePath, callback) {
    try {
        const initialSize = fs.statSync(filePath).size;
        
        setTimeout(() => {
            try {
                const newSize = fs.statSync(filePath).size;
                callback(initialSize === newSize && newSize > 0);
            } catch (error) {
                callback(false);
            }
        }, 1000);
    } catch (error) {
        callback(false);
    }
}

async function extractExifMetadata(filePath) {
    const filename = path.basename(filePath);
    
    try {
        const fileBuffer = fs.readFileSync(filePath);
        
        const tags = ExifReader.load(fileBuffer);
        
        const getTagValue = (tag) => {
            if (!tag) return null;
            if (tag.description) return tag.description;
            if (tag.value !== undefined) return tag.value;
            return null;
        };
        
        const metadata = {
            filename: filename,
            
            camera: {
                make: getTagValue(tags.Make) || 'Desconocido',
                model: getTagValue(tags.Model) || 'Desconocido',
                lens: getTagValue(tags.LensModel) || getTagValue(tags.LensInfo) || '--'
            },
            
            exposure: {
                iso: getTagValue(tags.ISOSpeedRatings) || getTagValue(tags.ISO) || 'Auto',
                aperture: tags.FNumber ? `${getTagValue(tags.FNumber)}` : '--',
                shutterSpeed: getTagValue(tags.ExposureTime) || '--',
                exposureMode: getTagValue(tags.ExposureMode) || 'Auto',
                exposureCompensation: getTagValue(tags.ExposureCompensation) || '0'
            },
            
            lens: {
                focalLength: tags.FocalLength ? `${getTagValue(tags.FocalLength)}` : '--',
                focalLength35mm: tags.FocalLengthIn35mmFilm ? `${getTagValue(tags.FocalLengthIn35mmFilm)}mm` : null,
                maxAperture: getTagValue(tags.MaxApertureValue) || null
            },
            
            color: {
                whiteBalance: getTagValue(tags.WhiteBalance) || 'Auto',
                colorSpace: getTagValue(tags.ColorSpace) || 'sRGB',
                saturation: getTagValue(tags.Saturation) || 'Normal',
                contrast: getTagValue(tags.Contrast) || 'Normal',
                sharpness: getTagValue(tags.Sharpness) || 'Normal'
            },
            
            flash: {
                fired: getTagValue(tags.Flash) || 'No',
                mode: getTagValue(tags.FlashMode) || '--'
            },
            
            datetime: {
                original: getTagValue(tags.DateTimeOriginal) || getTagValue(tags.DateTime) || 'Desconocido',
                digitized: getTagValue(tags.DateTimeDigitized) || null
            },
            
            dimensions: {
                width: getTagValue(tags.ImageWidth) || getTagValue(tags['Image Width']) || null,
                height: getTagValue(tags.ImageHeight) || getTagValue(tags['Image Height']) || null,
                resolution: getTagValue(tags.XResolution) || null,
                orientation: getTagValue(tags.Orientation) || 'Normal'
            },
            
            software: getTagValue(tags.Software) || null,
            
            gps: null
        };
        
        if (tags.GPSLatitude && tags.GPSLongitude) {
            metadata.gps = {
                latitude: getTagValue(tags.GPSLatitude),
                longitude: getTagValue(tags.GPSLongitude),
                altitude: getTagValue(tags.GPSAltitude) || null
            };
        }
        
        return metadata;
        
    } catch (error) {
        console.error(`Error extrayendo EXIF de ${filename}:`, error.message);
        
        return extractMetadataFromFilename(filename);
    }
}

function extractMetadataFromFilename(filename) {
    const metadata = {
        filename: filename,
        camera: { make: 'Desconocido', model: 'Desconocido', lens: '--' },
        exposure: {
            iso: 'Auto',
            aperture: '--',
            shutterSpeed: '--',
            exposureMode: 'Auto',
            exposureCompensation: '0'
        },
        lens: { focalLength: '--', focalLength35mm: null, maxAperture: null },
        color: {
            whiteBalance: 'Auto',
            colorSpace: 'sRGB',
            saturation: 'Normal',
            contrast: 'Normal',
            sharpness: 'Normal'
        },
        flash: { fired: 'No', mode: '--' },
        datetime: { original: new Date().toISOString(), digitized: null },
        dimensions: { width: null, height: null, resolution: null, orientation: 'Normal' },
        software: null,
        gps: null
    };
    
    const isoMatch = filename.match(/ISO[_-]?(\d+)/i);
    const apertureMatch = filename.match(/[Ff][_-]?(\d+\.?\d*)/);
    const shutterMatch = filename.match(/(\d+(?:\.\d+)?s|\d+\/\d+)/i);
    const focalMatch = filename.match(/(\d+)mm/i);
    
    if (isoMatch) metadata.exposure.iso = isoMatch[1];
    if (apertureMatch) metadata.exposure.aperture = `${apertureMatch[1]}`;
    if (shutterMatch) metadata.exposure.shutterSpeed = shutterMatch[1];
    if (focalMatch) metadata.lens.focalLength = `${focalMatch[1]}mm`;
    
    return metadata;
}

const watcher = chokidar.watch(SHARED_FOLDER, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});

watcher
    .on('add', async (filePath) => {
        const filename = path.basename(filePath);
        const ext = path.extname(filename).toLowerCase();
        
        if (['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.cr2', '.nef', '.dng', '.arw'].includes(ext)) {
            console.log(`Nuevo archivo detectado: ${filename}`);
            
            filesInTransfer.add(filename);
            
            const checkFileComplete = async () => {
                isFileComplete(filePath, async (isComplete) => {
                    if (isComplete) {
                        filesInTransfer.delete(filename);
                        
                        console.log(`Extrayendo EXIF de: ${filename}`);
                        const metadata = await extractExifMetadata(filePath);
                        
                        console.log(`Archivo completo con EXIF: ${filename}`);
                        console.log(`Cámara: ${metadata.camera.make} ${metadata.camera.model}`);
                        console.log(`ISO: ${metadata.exposure.iso}, Apertura: ${metadata.exposure.aperture}, Velocidad: ${metadata.exposure.shutterSpeed}`);
                        
                        io.emit('new-image', {
                            filename: filename,
                            timestamp: new Date().toISOString(),
                            metadata: metadata,
                            imageUrl: `/shared/${filename}?t=${Date.now()}`
                        });
                    } else {
                        setTimeout(checkFileComplete, 500);
                    }
                });
            };
            
            checkFileComplete();
        }
    })
    .on('change', (filePath) => {
        const filename = path.basename(filePath);
        if (filesInTransfer.has(filename)) {
            console.log(`Archivo en transferencia: ${filename} (${fs.statSync(filePath).size} bytes)`);
        }
    });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/exif/:filename', async (req, res) => {
    try {
        const filePath = path.join(SHARED_FOLDER, req.params.filename);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Archivo no encontrado' });
        }
        
        const metadata = await extractExifMetadata(filePath);
        res.json(metadata);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');
    
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`Monitoreando carpeta: ${SHARED_FOLDER}`);
    console.log(`Extracción EXIF activada`);
});