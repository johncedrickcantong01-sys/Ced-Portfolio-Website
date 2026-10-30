#!/usr/bin/env bash
# Checks the built pages against public/sitemap.xml (plan T10). Run it after
# `npm run build`. A missing page, title, description, canonical, h1 or
# og:image fails the run, and so does a home page without JSON-LD (/book has
# none, per the Schema row in Design; plan TM).

set -uo pipefail
cd "$(dirname "$0")/.."
site="https://work.cedcantong.site"
out="build/client"
pages=0 fails=0

fail() { echo "FAIL $1: $2"; fails=$((fails + 1)); }
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
  grep -q '<meta property="og:image" content="https://' "$file" || fail "$path" "no og:image"
  if [ "$path" = / ]; then
    grep -q '<script type="application/ld+json">' "$file" || fail "$path" "no JSON-LD"
  fi
done

# Each built page is in the sitemap too (a new case study needs its line; README).
for file in $(cd "$out" && find . -name index.html | sed 's|^\./||'); do
  grep -q "<loc>$site/${file%index.html}</loc>" public/sitemap.xml || fail "/${file%index.html}" "not in public/sitemap.xml"
done

if [ "$fails" -gt 0 ]; then echo "FAILED: $fails misses"; exit 1; fi
echo "OK: $pages pages"
