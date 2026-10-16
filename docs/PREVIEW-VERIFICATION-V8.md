# Preview verification: V8 deployment (Phase 1 evidence)

Written for: the developer and the owner. Records what the live Cloudflare preview serves, compared with the source build.

## Result

The live preview serves the V8 build. The "old boxed services" retrieval reported earlier cannot be reproduced now. The most likely cause is a cached copy at the edge location used by that retrieval. That cannot be confirmed from here.

One real stale-content problem exists: the five removed city URLs still return 200 from an edge cache entry. See section 5.

## 1. Deployment identity

| Item | Value |
| --- | --- |
| Feature branch | `feature/full-site-build` at `ba5d1c5` (documentation commit) |
| Site source commit | `4ff64ce` (Sitewide design V8) |
| Preview branch | `cf-preview` at `143cb63`, commit message "Preview build of feature/full-site-build@4ff64ce (noindex, generated; do not edit)" |
| Cloudflare Pages check on `143cb63` | success (run `117095812331`) |
| Production | not touched. `main` at `01c21e8` |

## 2. Source compared with live HTML

- Live `https://cf-preview.goldbay-1oh.pages.dev/` compared byte for byte with `index.html` on `origin/cf-preview`: identical (MD5 `173f2964b6431a78fbd134ba3f6a5324`).
- All 30 live routes compared against their files on `origin/cf-preview`: **0 mismatches**.
- The live homepage contains the V8 markers: `sv-list` (ruled services), `rv-cards` (three review cards), `class="cb"` (charcoal CTA band), and the "Ready to get your project started?" headline. It contains no `hp-svc-grid` or `hp-work` boxed-services layout.

## 3. Hashed CSS and JavaScript

- Live stylesheet: `/_astro/Base.C73wmNyG.css`, MD5 `e62353eb38a1780cbb744d92a7b394d3`.
- Local build of the same commit: the same filename and the same MD5.
- The stylesheet contains the V8 rules (`.sv-list`, `.rv-cards`, `.cb`).
- Inline scripts are generated from the same source and are included in the byte comparison above.

## 4. Normal and cache-bypassing requests

- Normal request, homepage: `cache-control: public, max-age=0, must-revalidate`. Content is current.
- Cache-bypass request (`?cb=<timestamp>`) for `/service-areas/campbell/`: HTTP 404, `cache-control: no-store`. This is the correct response for a removed page.

## 5. Stale edge-cache entries

| URL | Plain request | Cache bypass | Edge entry |
| --- | --- | --- | --- |
| `/service-areas/campbell/` | 200 (old city page) | 404 | `cf-cache-status: HIT`, age about 4,550 s, `cache-control: public, s-maxage=604800` |
| `/service-areas/cupertino/` | 200 (old) | not tested | HIT, age about 4,550 s |
| `/service-areas/los-gatos/` | 200 (old) | not tested | HIT |
| `/service-areas/santa-clara/` | 200 (old) | not tested | HIT |
| `/service-areas/sunnyvale/` | 200 (old) | not tested | HIT |

These five entries were cached from the earlier deployment. The branch no longer contains the files, and the deployment returns 404 for the same paths. The entries expire on their own within the `s-maxage` window (seven days maximum). Purging them needs the Cloudflare dashboard, which is outside this task. These paths are noindex and no longer linked from the site.

Nothing in the repository sets a long cache lifetime for HTML: `public/_headers` sets only security headers, the noindex header for `*.pages.dev`, and `/_astro/*` immutable caching. The `s-maxage` value comes from the Pages platform's handling of those responses, not from site configuration.

## 6. Reliable build marker

The preview build now sets `PUBLIC_BUILD_ID` to the source commit SHA, and the base layout emits `<meta name="gb-build" content="…">` only when that variable is set. Production builds do not set it, so the tag is absent there. The SHA is already public on the branch and contains no secrets. After publication, `curl` of any preview page should show `gb-build` equal to the commit in section 1.

## 7. What was not changed

- No production cache was purged. No DNS was changed. `main` was not merged.
- No preview-only cache header was added. An HTML `Cache-Control` rule in `public/_headers` would also reach production when merged, so it needs a separate decision.
