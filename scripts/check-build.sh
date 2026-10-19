#!/usr/bin/env bash
# Checks the built pages against public/sitemap.xml (plan T10). Run it after
# `npm run build`. A missing page, title, description, canonical or h1 fails
# the run. Until the media pass a missing og:image or JSON-LD block is only a
# warning; the media pass (plan TM) sets MEDIA_READY=1 to make them fail too.
MEDIA_READY=0

set -uo pipefail
cd "$(dirname "$0")/.."
site="https://www.cedcantong.site"
out="build/client"
pages=0 fails=0 warns=0

fail() { echo "FAIL $1: $2"; fails=$((fails + 1)); }
media() {
  if [ "$MEDIA_READY" = 1 ]; then fail "$1" "$2"; else echo "WARN $1: $2"; warns=$((warns + 1)); fi
}
count() { grep -o "$1" "$2" | wc -l | tr -d ' '; }

# Each sitemap URL: "/" is index.html, "/book/" is book/index.html.
for url in $(grep -o '<loc>[^<]*</loc>' public/sitemap.xml | sed 's|</*loc>||g'); do
  pages=$((pages + 1))
  path="${url#"$site"}"
  file="$out${path}index.html"
  if [ ! -f "$file" ]; then fail "$path" "no $file"; continue; fi
  [ "$(count '<title>' "$file")" = 1 ] || fail "$path" "not exactly one <title>"
  grep -q '<meta name="description" content="[^"]' "$file" || fail "$path" "no meta description"
  canonical=$(grep -o '<link rel="canonical" href="[^"]*"' "$file" | sed 's/.*href="//; s/"$//' | tr '\n' ' ')
  [ "$canonical" = "$url " ] || fail "$path" "canonical is '$canonical', not one '$url'"
  [ "$(count '<h1[ >]' "$file")" = 1 ] || fail "$path" "not exactly one <h1>"
  grep -q '<meta property="og:image" content="https://' "$file" || media "$path" "no og:image"
  grep -q '<script type="application/ld+json">' "$file" || media "$path" "no JSON-LD"
done

# Each built page is in the sitemap too (a new case study needs its line; README).
for file in $(cd "$out" && find . -name index.html | sed 's|^\./||'); do
  grep -q "<loc>$site/${file%index.html}</loc>" public/sitemap.xml || fail "/${file%index.html}" "not in public/sitemap.xml"
done

if [ "$fails" -gt 0 ]; then echo "FAILED: $fails misses"; exit 1; fi
if [ "$warns" -gt 0 ]; then echo "OK: $pages pages ($warns warnings)"; else echo "OK: $pages pages"; fi
