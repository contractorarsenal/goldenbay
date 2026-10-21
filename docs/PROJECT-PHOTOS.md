# Project photography: sources, grouping and open questions

## Source and processing
- 16 unique client-supplied images, downloaded from the GitHub attachment URLs in the brief on 2026-10-15 (all returned HTTP 200, `image/jpeg`). **No downloads failed.** Hashes confirm no duplicates among the 16 URLs.
- Technical nature: every file is 1320 px wide × 2256-2333 px tall, 144 dpi, EXIF orientation 1: **portrait stills captured from phone/video playback**, not original camera files. No interface chrome (status bar, buttons, captions) is present; only 2-4 stray black pixel rows on three files were trimmed (`fbb67174` bottom 4 px, `21f18e44` bottom 4 px, `447d805f` top 3 px).
- **Originals are untouched** in `assets-src/originals/<id>.jpg` (6.8 MB). `assets-src/manifest.json` maps each to its descriptive, processed copy in `src/assets/projects/` (7.4 MB); `node scripts/process-images.mjs` regenerates them. Files without a crop are byte-copied (no recompression). No sharpening, color change, AI editing or upscaling.
- At build time `<ProjectImage>` generates AVIF + WebP + JPEG at 480/768/1100 px and the native 1320 px (never larger). Nothing is hot-linked from GitHub (`npm run verify` fails if a GitHub-hosted image URL appears in any page).
- **Quality limits:** the sources are soft, compressed video frames. They hold up at card sizes and as a half-width hero panel, but would look poor full-bleed at 1920 px. Replace them with original camera photos when possible (ideally ≥ 2400 px on the long edge).

## Grouping (resolved by looking at the images; the brief's own lists overlapped and contradicted)
| Project (title) | Files (original id prefix → processed name) | State shown | Grouping certain? |
|---|---|---|---|
| Patio Construction | `17e05a17` patio-paver-court-wood-fence-01 · `9943b010` patio-paver-entry-walkway-02 | finished | Yes: same front yard/fence |
| Paver Installation | `d1c2bd96` pavers-large-format-patio-01 · `aa373208` pavers-stepping-stones-turf-02 · `fbb67174` pavers-stepping-stone-path-03 | 2 of 3 show work in progress | Client labeled as pavers |
| Pool House & Outdoor Living Area | `cbb92c52` pool-deck-pavers-01 · `4fe3eaef` pool-outdoor-paver-courtyard-02 · `550e4c95` pool-outdoor-paver-courtyard-03 | **all three in progress** | No |
| Bathroom Remodel: Blue Tile & Soaking Tub | `178f6d5a` · `233880fe` · `978a2b3d` | finished | Visual match (teal tile, tub) |
| Bathroom Remodel: Stone Shower & Terracotta Floor | `21f18e44` · `ecc4087f` · `447d805f` | finished | Visual match (stacked stone, hex floor) |
| Bathroom Remodel: Floating Vanity & Glass Shower | `a73176d2` | near completion | Single photo |
| Kitchen Remodel | `943452da` | near completion | Yes |

The seven bathroom photos were **not** assumed to be one property: they show **three different bathrooms**. They are presented as three separate gallery entries (descriptive titles that name only visible features), not as case studies. All carry `groupingConfirmed: false`.

## Contradictions and corrections to the brief
- The brief's pool section listed `d1c2bd96` and `fbb67174` (also labeled pavers) and `447d805f` (a bathroom); by inspection those belong with pavers/bathroom. The pool group is the three photos above. `80b0-9d1721482d11` is just the tail of `550e4c95…`; `2268-placeholder` was not used.
- **"Finished" vs what the photos show:** the client called the pool house/pool patio and pavers "finished", but the pool, courtyard and several paver photos clearly show paving still being laid, stacked pavers, base sand and tools. They are captioned "taken during installation" and the project cards carry that note. The photo of the tan building does not clearly show a pool house; the title "Pool House & Outdoor Living Area" is the client's and is kept, but **should be confirmed**.

## Questions for the client
1. Finished-state photos for Paver Installation and Pool House & Outdoor Living Area (and a clear view of the pool house).
2. Are the three blue-tile photos one bathroom? the three stone-shower/terracotta photos one bathroom? Are any of these the same home as the kitchen or the reviews?
3. Locations the homeowners will allow us to publish; scope/materials; dates.
4. Original camera files (not screenshots). Before/after pairs if they exist.
5. Whether **Outdoor Living / Patios & Pavers** should become a standalone service (see recommendation below).

## Service recommendation (not implemented as a service)
Patios, pavers and pool surrounds now account for 3 of the 7 project entries but are not one of the five core services on the owner's business card. **Proposal for approval:** an "Outdoor Living: Patios & Pavers" service page, only if David confirms it is work he wants to be hired for, and ideally after finished photos exist. Until then these appear only as portfolio work with **no service link and no claim that patio/paver work is part of the core services.**

## Which image is used where
Hero: `bathroom-blue-tile-soaking-tub-01`, chosen over the kitchen and patio images for visible tile craftsmanship, rich teal/wood/pattern color that sits well on charcoal and gold, and a portrait frame that fits the right-hand hero panel (mobile: 1:1 crop). Homepage featured mosaic: kitchen, stone-shower bathroom, patio, pool deck, pavers. Kitchen & Bath service tile: kitchen + stone-shower photos. Projects page: all 16 across the 7 entries.
