// Copies client originals to src/assets/projects/ with descriptive names. Originals are never modified.
// - EXIF orientation is applied (all current files are already orientation 1).
// - Only manifest `crop` rows are trimmed (stray black pixel rows). No resize, sharpening or colour changes.
// - Files without a crop are byte-copied (no recompression). Responsive AVIF/WebP/JPEG derivatives are produced at build time by <ProjectImage>.
import sharp from 'sharp';
import { readFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(root + 'assets-src/manifest.json', 'utf8'));
mkdirSync(root + 'src/assets/projects', { recursive: true });
for (const { id, name, crop } of manifest.images) {
  const src = `${root}assets-src/originals/${id}.jpg`, dest = `${root}src/assets/projects/${name}.jpg`;
  const meta = await sharp(src).metadata();
  if (!crop && (meta.orientation ?? 1) === 1) { copyFileSync(src, dest); console.log('copy', name, meta.width + 'x' + meta.height); continue; }
  const top = crop?.top ?? 0, bottom = crop?.bottom ?? 0;
  const img = sharp(src).rotate();
  const m = await img.clone().metadata();
  await img.extract({ left: 0, top, width: m.width, height: m.height - top - bottom }).jpeg({ quality: 95, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(dest);
  console.log('crop', name, `${m.width}x${m.height - top - bottom}`, crop ?? '(orientation fix)');
}
