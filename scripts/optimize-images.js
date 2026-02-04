/**
 * Image Optimization Script
 * 
 * This script helps convert images to modern formats (WebP/AVIF) for better performance.
 * Run this script to optimize all images in the public/static directory.
 * 
 * Usage: node scripts/optimize-images.js
 * 
 * Note: Requires sharp package. Install with: npm install --save-dev sharp
 */

import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import sharp from 'sharp';

const INPUT_DIR = './public/static';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const QUALITY = {
    webp: 85,
    avif: 80,
    jpeg: 85,
};

async function getImageFiles(dir) {
    const files = [];
    const entries = await readdir(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stats = await stat(fullPath);

        if (stats.isDirectory()) {
            files.push(...(await getImageFiles(fullPath)));
        } else if (SUPPORTED_FORMATS.includes(extname(entry).toLowerCase())) {
            files.push(fullPath);
        }
    }

    return files;
}

async function optimizeImage(inputPath) {
    const ext = extname(inputPath);
    const name = basename(inputPath, ext);
    const dir = inputPath.substring(0, inputPath.lastIndexOf('/'));

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`Optimizing: ${inputPath}`);
        console.log(`  Original: ${metadata.format} ${metadata.width}x${metadata.height}`);

        // Generate WebP version
        const webpPath = join(dir, `${name}.webp`);
        await image
            .clone()
            .webp({ quality: QUALITY.webp, effort: 6 })
            .toFile(webpPath);
        console.log(`  ✓ Created WebP: ${webpPath}`);

        // Generate AVIF version (smaller but slower to encode)
        const avifPath = join(dir, `${name}.avif`);
        await image
            .clone()
            .avif({ quality: QUALITY.avif, effort: 6 })
            .toFile(avifPath);
        console.log(`  ✓ Created AVIF: ${avifPath}`);

        // Optimize original format
        if (ext === '.jpg' || ext === '.jpeg') {
            const optimizedPath = join(dir, `${name}-optimized${ext}`);
            await image
                .clone()
                .jpeg({ quality: QUALITY.jpeg, progressive: true, mozjpeg: true })
                .toFile(optimizedPath);
            console.log(`  ✓ Optimized JPEG: ${optimizedPath}`);
        } else if (ext === '.png') {
            const optimizedPath = join(dir, `${name}-optimized${ext}`);
            await image
                .clone()
                .png({ quality: 85, compressionLevel: 9, effort: 10 })
                .toFile(optimizedPath);
            console.log(`  ✓ Optimized PNG: ${optimizedPath}`);
        }

        console.log('');
    } catch (error) {
        console.error(`  ✗ Error optimizing ${inputPath}:`, error.message);
    }
}

async function main() {
    console.log('🖼️  Image Optimization Script\n');
    console.log(`Scanning directory: ${INPUT_DIR}\n`);

    try {
        const imageFiles = await getImageFiles(INPUT_DIR);
        console.log(`Found ${imageFiles.length} images to optimize\n`);

        for (const file of imageFiles) {
            await optimizeImage(file);
        }

        console.log('✅ Image optimization complete!');
        console.log('\nNext steps:');
        console.log('1. Review the optimized images');
        console.log('2. Update your code to use <picture> elements with multiple formats');
        console.log('3. Delete original images if satisfied with optimized versions');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();
