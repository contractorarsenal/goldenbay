# Gemini research reconciliation

Source: "Golden Bay Builders Inc.: Comprehensive Market Research, Competitive Intelligence, and Digital Strategy Blueprint" (received 2026-10-15; the pasted copy ends inside its source list, so the final few citations were cut off, but the body was read in full). Gemini's facts are **planning input, not verified**. This document lists what the site adopts, what it deliberately does not, and what needs validation.

## 0. Critical finding: the legal entity may not be "Golden Bay Builders Inc."
The report says public records show **"Goldbay Builders Inc.", 1025 Franquette Ave, San Jose, with David Lerma Macias** (and a second person), while a *different* firm at goldenbaybuildersinc.com advertises **license #1137377** (siding, patios, decking, windows; no mention of David) and a "Golden Bay Foundation Builders" uses #1112835. My own checks, all **unconfirmed**:
- A CSLB pending-license list dated 2026-01-29 shows `GOLDBAY BUILDERS INC`, Class B, examinee DAVID LERMA MACIAS, 1025 Franquette Ave, license-number field `0`. That pattern suggests an *application in progress*, not an issued license. I could not open the PDF or find an issued record, so current status is unknown.
- goldenbaybuildersinc.com lists "Licensed #1137377" and does not name David; it is a different business.
- The client-supplied `115776` returns no match.
- The client's email is `goldbaybuilderinc@gmail.com` ("goldbay"), consistent with the spelling "Goldbay".

**Consequences:** the business name on this site ("Golden Bay Builders Inc."), its schema, domain choice and any "licensed" claim may be wrong or unlawful until David confirms his registered corporation name, DBA (if any) and a CSLB-issued license with active bond and workers' comp. In California advertising must show a valid license number. Also avoid any impression of being the other "Golden Bay Builders". Site is unchanged on this point (it still uses the supplied name, shows no license, and is noindex); **do not launch before this is resolved.**

## 1. Route comparison (28 routes)
The report's 28-page architecture matches the 28 routes built. Differences/notes:
- The report's closing Q&A counts "2 Portfolio/Project pages" and a "Main Service Area Hub" differently from its own numbered sitemap (which has one Projects page and 27 others). The built routes follow the numbered sitemap.
- Report adds Saratoga and Mountain View as adjacent markets; not built (service areas unconfirmed; see §4).
- The report wants city pages with real local projects and testimonials. We have none, so five city pages are noindex until they do.

## 2. What the research changed in the build (this commit)
| Research point | Change |
|---|---|
| Qualify leads with property status | Wizard step 2 now requires property status (own / in escrow / looking to buy); validated client- and server-side, in lead email, tested. (Stage, budget, timeline already existed; budget keeps "Not sure yet" per the original brief.) |
| ADU content gap: 750 sq ft fees, utility trenching, SB 9, permit timing | ADU guide gains: the 750 sq ft wording difference (City "less than" vs HCD "or less"), a utility-connections section (qualitative, no invented prices), an SB 9 section with HCD fact sheet link, and a review-time section that states only the 60-day state deadline. ADU service FAQ adds SB 9. |
| Pain points: change orders, ghosting | Budget guide gains "Avoiding the two most common contractor disputes" (contract checklist, CSLB-sourced) and a change-order FAQ. Framed as what to ask any contractor, not as a Golden Bay promise. |
| Permitting transparency | Guide + service pages link City resources; no timelines promised. |
| Hub-and-spoke, deep service pages, answer-first | Already built (service pages with direct answers, glance strips, guides, internal links). |

## 3. Recommendations deliberately NOT implemented (unsupported business promises or unverified claims)
- "Fixed prices. Guaranteed timelines. Zero communication blackouts." headline, "guaranteed weekly updates", "dedicated project manager", "exhaustive pre-construction audit / fixed-price guarantee": **David must confirm these are real, operated practices before any are published.** The report itself notes this requires strict operational commitment.
- "San Jose's premier general contractor"; "Licensed (CSLB #…) | Bonded | Insured" banner; Angi/HomeAdvisor/Houzz badges; "5-star Google aggregate" widget; review schema with ratings: no verified license, no review data, and self-serving review markup is restricted. Placeholders stay until real.
- ADU price/ROI figures ($300–450/sq ft, $280k–$440k, rent $1,900–$4,300, 8–15-year payback, garage conversions $150–200k, permits "up to 26 weeks", fees $3k–$10k): third-party, unverified, and the brief forbids unsupported financial-return claims.
- Client-management portal / BuilderTrend / CoConstruct claims: unconfirmed.
- "Employee-owned"-style narratives, showroom, vendor partnership logos: not applicable or unconfirmed.
- Copying competitors' structure verbatim: used as benchmark only.

## 4. Items requiring validation (kept separate)
| Claim in report | Status |
|---|---|
| Entity, license numbers (115776, #1137377, #1112835), Franquette Ave address, personnel | See §0; unverified |
| Median household income $164–168k, home value >$1.6M | Census/third-party; not published on site |
| San Jose detached ADU max 1,000 sq ft (1,200 on lots >9,000 sq ft); AB 68 / SB 9 details | Not published; verify with City/HCD (SB 9 summary cites HCD fact sheet) |
| Park/school fee exemption "<750 sq ft saves $5k–$15k" | Exemption wording verified from City/HCD; the dollar savings are not |
| Plan review up to 26 weeks; fees $3k–$10k | Unverified; not published |
| Competitor facts (showroom on Paragon Drive, employee-owned, review counts, "79 Houzz projects"…) | Unverified; not used |
| Angi/HomeAdvisor presence of Golden Bay | Ask David for profile links; then link/cite them with source attribution |
| Service cities beyond San Jose incl. Saratoga, Mountain View | Unconfirmed |

## 5. Questions for David (from the report, plus ours)
Registered corporation name and DBA; CSLB license number/classification/status; bond + insurance certificates; in-house design and permit handling vs. client-supplied architect; change-order and unforeseen-condition protocol; **which of the report's promises (fixed price, weekly updates, project manager, guarantees) are real**; willingness to publish starting budget ranges; personal trade history; project photos; Google/Angi/HomeAdvisor profile links; confirmed service cities.
