# ATN source ownership audit and preview migration

Audit date: 22 October 2026. Root baseline 14d8c866b5ed445c0956c9b42abc2ce4913ebbdc; live source 94a6ff9f3ba87bf3dfbdcfd633cf051edfe3f722.

## Verified production provenance

allthatsnext.com still aliases dpl_7L5ac5zUMiix5dV113EfqewKrdyp (BGP repo94a6ff9). The five newest production deployments are94a6ff9 / dpl_7L5ac5zUMiix5dV113EfqewKrdyp; f498796 / dpl_Hbw47s5FXPBZ1RaEA4zKL3qJFWXR;6495cc3 / dpl_3xiU1s73Szf88ZuaJQ31DvJPy7ZU;a53167e / dpl_Ha1mTUJwt9K3tmxpM231QRKBmqoi;8ef0753 / dpl_5bmUTqXssyQFvjgnFw9YrQCLwSVD. All identify mitchbryant-git/all-thats-next-big-game-playbook. Last root-repo production:14d8c86, dpl_9GzuTTTLWWn4niUcyhCLDHnb6YcF, Refresh approved ATN logos and preserve existing header controls.

Separate BGP production is a8fe0a3 / dpl_Da1NkJJrfDxHwe8sBEV9pZecRrDS. Public HTTP verifies its product root is the 798-byte private-app shell and /app is404. Live root product page is the 24,866-byte sales page. This requires a child preview composed from released sources before root delegation can preserve behavior.

## Preservation

Original exact root checkout clean on codex/your-number-header-preview at8df4108. Preserved archive/pre-atn-source-migration-20261022 and original branch. New exact local checkout codex/restore-atn-source-preview starts at remote main14d8c86; local historical main34088d9 remains untouched. No reset, stash, master replacement or unreleased app import. Isolated BGP audit clone and child worktree live in this task workspace.

## Complete file inventory

This includes every raw Git difference, distinguishes CRLF-only differences using normalized content, and records the last path commit reachable from the exact live source. Unlisted files are identical Git blobs. Existing root pages, headers, metadata, calculators, icons and logos have no semantic differences.

| File | Raw status | Content/behavior and disposition | Last live-source path commit |
|---|---|---|---|
| .claude/settings.local.json | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| .eslintrc.json | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| .gitignore | M | BGP export omits root ignore rules. Not migrated; preserve root protection. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| AGENTS.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| DEPLOYMENT.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| DESIGN-GUIDE.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| HANDOFF.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| PROJECT-OVERVIEW.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| QUICKSTART.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| README.md | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| app/HomepageHero.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/about/page.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/baby-shower/layout.js | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/baby-shower/layout.tsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/baby-shower/page.js | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/big-game-playbook/BigGamePlaybookSalesPage.jsx | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/LegacyPrivateEntry.jsx | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/StandardBGPProductHero.jsx | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/app/private-entry.mjs | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/app/route.js | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/canonical-entry.css | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/hero-depth.mjs | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/page.jsx | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/big-game-playbook/review.module.css | A | BGP-owned public sales/private-entry implementation. Preserved in separate child preview from live94a6ff9; excluded from root. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| app/globals.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/layout.tsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/life-after-school/page.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/manifest.ts | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/not-found.tsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/page.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/robots.js | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/sitemap.js | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/your-number/DreamLifeCalculator.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/your-number/DreamLifeCalculatorClient.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/your-number/YourNumberConsole.tsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/your-number/heroDepth.ts | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| app/your-number/page.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/ArticlePage.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/ArticlePage.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/HeaderPageLinks.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/HeaderPageLinks.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/BigGamePlaybookSection.jsx | A | New live BGP promotional section, corrected scene, private-preview copy, dialog button and noscript link. Migrated byte-for-byte. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| components/homepage/BigGamePlaybookSection.module.css | A | Scene composition, responsive artwork/copy, yellow button, focus/reduced-motion rules. Migrated. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| components/homepage/HeroConsole.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/HeroConsole.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/HomepageScrollMotion.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/ModuleBay.jsx | M | BGP presentation/dialog, promotional section before module grid, invited-access note, 350ms opening-gesture guard, motion filtering and data-preview-module. Migrated. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| components/homepage/ModuleBay.module.css | M | BGP dialog copy flex layout/gap. Migrated. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| components/homepage/SiteEnding.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/SiteEnding.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/WhyATN.jsx | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/WhyATN.module.css | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/useCartridgeSound.js | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| components/homepage/useModuleInsertion.js | M | Disabled-motion static sizing and asset-fallback handling. Migrated. | 6495cc3 Match BGP module viewer to native ATN console layers |
| config/brand.js | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| config/module-framing.js | M | BGP bounds, canvas, registration and cartridge travel. Migrated. | 6495cc3 Match BGP module viewer to native ATN console layers |
| config/module-motion.js | M | BGP native-camera layers, occlusion geometry, fallback and existing Tuesday Type base reuse. Migrated. | 6495cc3 Match BGP module viewer to native ATN console layers |
| config/modules.js | M | BGP private-preview state, live-tone status, approved cartridge and settled image, launch href. Migrated. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| lib/cartridge-click.mjs | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| lib/cartridge-media.mjs | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| lib/format.ts | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| lib/tax.ts | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| lib/theme.ts | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| mitch-brand-design.skill | D | Root-only repository guidance/tooling removed from BGP export; preserve root file. |  |
| next-env.d.ts | A | Generated Next type declaration only; not a runtime difference. Keep root generated file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| next.config.mjs | M | Live adds BGP origin, eight legacy-section redirects, API proxy to Growth Lab, child wildcard. Root migration delegates all BGP paths to child; child retains redirects/API proxy. Root retains existing products and legacy calculator redirect. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| package-lock.json | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| package.json | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| postcss.config.mjs | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| public/assets/bgp-entry/all-thats-next-lockup-web-v1.png | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| public/assets/bgp-entry/bgp-console-mask.svg | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| public/assets/bgp-entry/fonts/anybody-latin.woff2 | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| public/assets/bgp-entry/fonts/archivo-black-latin.woff2 | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| public/assets/bgp-entry/fonts/instrument-sans-latin.woff2 | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| public/assets/bgp-entry/growth-lab-console-mask.svg | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | f498796 Publish reviewed whole-life BGP sales page with honest coming-soon state |
| public/assets/bgp-homepage-background-art-atn.png | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| public/assets/cartridges/standalone-big-game-playbook-atn-v2.png | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| public/assets/console/mb01-front-hero-mask-v1.svg | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| public/assets/motion/big-game/base.png | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| public/assets/motion/big-game/cartridge.svg | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| public/assets/motion/big-game/native-camera-v2/cartridge.png | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| public/assets/motion/big-game/native-camera-v2/screen.png | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| public/assets/motion/big-game/native-camera-v2/settled.png | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| public/assets/motion/big-game/screen.svg | A | Additive live homepage BGP artwork/cartridge/motion asset. Exact Git blob migrated; no new master substitution. | a53167e Add approved Big Game Playbook scene and real cartridge launch |
| public/assets/motion/hero/mb01-v2-review-mask.svg | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |
| public/assets/whole-life-menu-v1/login-depth-static.png | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| public/assets/whole-life-menu-v1/login-depth.svg | A | BGP public-page logo/font/mask or embedded depth hero asset. Exact live bytes preserved in child preview; root delegates legacy asset URL. | 94a6ff9 Unify BGP BUILD assets and restore crisp mobile screen lettering |
| tsconfig.json | M | Line endings only. No content/runtime change; retain root file. | 8ef0753 deploy: exact-live ATN source with reviewed BGP module and routing |

## Routing and security contract

Root owns / and its homepage module assets. Child owns /big-game-playbook, descendants, /big-game-playbook-static/_next chunks, /assets/bgp-entry and /assets/whole-life-menu-v1 legacy sales assets. Existing HECS, Growth Lab, Tuesday Type rewrites remain unchanged. Child keeps private API /big-game-playbook/api pointed at the existing Growth Lab backend; moving that backend requires a separate reviewed release and is not part of this parity migration. No generic /api or /_next rewrite is added.

Sales-to-private navigation remains /big-game-playbook/app. Legacy section paths redirect307 to /app#section in child. Next default trailing slash canonicalisation remains308. Query strings pass through rewrites and redirects. Private entry retains Cache-Control:no-store and X-Robots-Tag:noindex,nofollow. Existing browser relative assets resolve to /big-game-playbook/* through its base href. Existing auth/cookie contracts stay at same public origin and backend; no account/session writes are performed. Authenticated save/login must be owner-tested separately.

Both projects retain existing SSO protection. Owner Chrome session verified the root homepage and root /big-game-playbook sales page through existing Vercel login. Unauthenticated callers encounter SSO as expected; no access-setting change is needed for owner comparison. Production root must not be released before child production supports sales plus /app. Git automatic deployment is disabled in preview branch files only; no production project or domain settings changed. Guards verify repo slug, linked project and VERCEL_PROJECT_ID for root/child.

## Verification receipt and remaining blocker

Root preview READY: https://mitch-bryant-project-d095cr1tl-mitchs-projects-fc4b2216.vercel.app (dpl_7SXytX8qpjCf6eKJa8JzEvKexjQE, root repo8875f49, target null = preview).
Child preview READY: https://all-thats-next-big-game-playbook-2mapksshk.vercel.app/big-game-playbook (dpl_FPEssHs4Mp3US5iVPDjFBA7VAmWD, BGP repo596c83e, target null = preview).

Both local builds pass. Root lint passes with one existing img warning; child lint passes with two existing img warnings. Browser review at390 and1440px, reduced motion: homepage live/local titles and H1 match; root homepage, Your Number and routed BGP sales page have no horizontal overflow, broken decoded images or page errors. BGP dialog opens and exposes correct private-preview note and /big-game-playbook launch link. Task evidence: C:/Users/mitch/Documents/Codex/2026-10-22/task/evidence/browser-results.json and PNGs.

Local root-to-child HTTP checks: sales, private app, CSS, app.mjs and Your Number200; private app no-store and noindex,nofollow. /picture?audit=1 redirects307 to /app?audit=1#picture; trailing slash308 preserves query; legacy calculator308 preserves query. Favicon, Apple icon, manifest, robots, sitemap, HECS, Tuesday Type and Growth Lab all200. Wrong-project build guard rejects BGP project ID when run from root.

Root Vercel Git link independently verified to mitch-bryant-project, repo ID1157611690, production branch main. The issue was cross-repository deployment provenance, not the configured Git link. Automatic Git deployment disabled in both new preview branch files. Existing production branch/config untouched.

Owner browser verification supersedes the earlier CLI access diagnosis: the existing Chrome Vercel login opens root preview homepage and /big-game-playbook successfully while staying on the root preview origin. No new credentials, protection exception or Trusted Sources change is needed. Existing private APIs remain on Growth Lab as before. Authenticated login/save and cookie return flow have not been exercised because this audit performs no account or data writes.

CLI access check unexpectedly generated one root automation bypass token at timestamp1792669014918. It was immediately revoked by exact creation timestamp/scope, and absence verified. SSO remains all_except_custom_domains; production still dpl_7L5ac5zUMiix5dV113EfqewKrdyp. No bypass remains from this operation. Do not use vercel curl here without inspecting its automatic token-generation behavior.

Initial API preview attempt rejected literal target preview; approval review then rejected omitted target as ambiguous. Official Vercel API reference establishes omitted target=preview and null response=preview; retry with that new evidence was approved and both deployments returned null. https://vercel.com/docs/rest-api/deployments/create-a-new-deployment

No production deployment, promotion, domain assignment, main push, Supabase mutation, paid AI call or unreleased app/artwork import occurred. Owner preview comparison is accessible through the existing Vercel browser login. Before any eventual production release, child production must first gain the reviewed sales+/app route contract; current child production still serves only the private app at its product root.


## Consumer parity repair (preview only)

Child branch182becd restores pinned pg8.23.1 and exposes the released worker as a Next Node route at /api/internal/consume with force-dynamic and maxDuration60. New files: app/api/internal/consume/route.js, server/next-consumer-route.mjs, tests/consumer-preview.test.mjs, CONSUMER-PREVIEW-PARITY.md. Original production consumer, configuration, role/capability checks, diagnostics and all server security sources remain unchanged from a8fe0a3. No new runtime credentials or settings.

Six synthetic tests pass, including fake-pool/offline-adapter completion and rejection/body-bound/configuration checks. Local emitted route GET503 consumer_disabled with no-store. Build trace includes pg and the consumer function. Preview environment has no runtime/database bindings; production-only key metadata inspected without decryption. No live capability or private job dispatched. Authenticated login/save and live worker integration remain deliberately untested.

Repaired child preview: https://all-thats-next-big-game-playbook-9j3w68gs7.vercel.app (dpl_D9UCAWir8hfefEKxPL98pSHnmEQg). Root preview config now pins this immutable repaired child, rather than596c83e. Root homepage code and exact live visual assets are unchanged.

Production consumer unauthenticated GET independently verified404 consumer_route_not_found with no-store (read-only, no capability). Local functions-config-manifest explicitly records /api/internal/consume maxDuration60. Root and child lint/build pass after repair; existing image warnings only.

## Approved migration-only production release,22October2026

Owner changed the stopping condition: release repository ownership/routing now, explicitly defer synthetic QA login/save/reload/logout and real authored offline worker checks until tomorrow because account recovery is unavailable. This supersedes earlier preview-only/no-production status statements for the release operation; it does not claim those functional tests passed. No Supabase auth reset, secret/security change, SQL, newer280-test enhancements,77-file product follow-up, image or animation is included.

Both vercel.json files now use exact preview-branch deployment exclusions, preserving normal main automatic deployments. Root production BIG_GAME_PLAYBOOK_ORIGIN actual value verified as https://all-thats-next-big-game-playbook.vercel.app. Root main ancestry/diff checks pass; local checkout remains on codex/restore-atn-source-preview.

Fresh pre-release rollback points, verified live: root dpl_7L5ac5zUMiix5dV113EfqewKrdyp /94a6ff9f3ba87bf3dfbdcfd633cf051edfe3f722; child dpl_Da1NkJJrfDxHwe8sBEV9pZecRrDS /a8fe0a3605f05ec91573cf21fe9edb29d54643d2. Child is released first from beae614 in its own project; old root compatibility must pass immediately before root main push. If child breaks old root, roll child back and leave root unchanged. After both releases, roll root back first then child if required.

Current old root API namespace directly targets Growth Lab, not BGP. Source/effective origin and public HTTP config corroborate this: root/config200 matches GL/config200; BGP old production same config404. Candidate preserves this existing API backend. Exact old-root source built against new child plus signed-out synthetic API backend;25 compatibility cases passed again immediately pre-release. Covers private GET/HEAD cache/robots, JS/CSS/logo bytes, queries, nested API guards, local-only PUT/POST rejection,405methods,403origin,308trailing slash and eight307legacy redirects. No live private job was dispatched. Production smoke uses GET/HEAD only.

Production deployment and final alias results are recorded in the separate task release receipt after completion, rather than claiming success in advance. Retained production bindings BGP_RUNTIME_ENABLED and BGP_CONSUMER_DATABASE_URL are not changed or copied into previews.
