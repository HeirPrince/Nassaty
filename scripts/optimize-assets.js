import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '..', 'app', 'assets');

// Get all files in assets directory
function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            arrayOfFiles.push(filePath);
        }
    });

    return arrayOfFiles;
}

// Analyze file sizes
function analyzeAssets() {
    const files = getAllFiles(assetsDir);
    const largeFiles = [];

    files.forEach(file => {
        const stats = fs.statSync(file);
        const sizeInMB = stats.size / (1024 * 1024);
        const ext = path.extname(file).toLowerCase();

        // Flag files based on type and size
        let isLarge = false;
        let recommendedSize = '';

        if (['.jpg', '.jpeg', '.png'].includes(ext) && sizeInMB > 0.5) {
            isLarge = true;
            recommendedSize = '< 500 KB';
        } else if (ext === '.svg' && sizeInMB > 0.1) {
            isLarge = true;
            recommendedSize = '< 100 KB';
        } else if (ext === '.mp4' && sizeInMB > 3) {
            isLarge = true;
            recommendedSize = '< 3 MB';
        }

        if (isLarge) {
            largeFiles.push({
                file: path.relative(assetsDir, file),
                size: `${sizeInMB.toFixed(2)} MB`,
                recommended: recommendedSize,
                ext
            });
        }
    });

    // Sort by size
    largeFiles.sort((a, b) => {
        const sizeA = parseFloat(a.size);
        const sizeB = parseFloat(b.size);
        return sizeB - sizeA;
    });

    console.log('\n🔍 Large Asset Files Found:\n');
    console.log('File'.padEnd(50), 'Current Size'.padEnd(15), 'Recommended');
    console.log('-'.repeat(80));

    largeFiles.forEach(({ file, size, recommended }) => {
        console.log(file.padEnd(50), size.padEnd(15), recommended);
    });

    console.log('\n📊 Summary:');
    console.log(`Total large files: ${largeFiles.length}`);
    console.log('\n💡 Recommendations:');
    console.log('1. Use WebP format for images (better compression)');
    console.log('2. Compress SVG files using SVGO');
    console.log('3. Resize images to actual display dimensions');
    console.log('4. Use responsive images with srcSet');
    console.log('5. Implement lazy loading (already done in Image component)');
    console.log('\n🛠️  To optimize:');
    console.log('   - JPG/PNG: Use tools like ImageOptim, TinyPNG, or Sharp');
    console.log('   - SVG: Use SVGO or SVG-Optimizer');
    console.log('   - Convert to WebP: Use cwebp or online converters\n');
}

analyzeAssets();
