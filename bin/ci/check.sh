#!/usr/bin/env bash
# Repository checks, run locally or in CI:  bin/ci/check.sh
set -eu
set -o pipefail

REPO_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_DIR"
fail() { echo "FAIL: $*" >&2; exit 1; }
step() { echo "== $*"; }
SCRIPTS="bin/ci/*.sh plugins/*/skills/*/scripts/*.sh"

step "shell scripts parse"
for f in $SCRIPTS; do bash -n "$f" || fail "$f does not parse"; done
if command -v shellcheck >/dev/null 2>&1; then
  step "shellcheck"
  # shellcheck disable=SC2086
  shellcheck -x -S warning $SCRIPTS
else
  echo "   shellcheck not installed; skipped"
fi

step "JSON parses"
find . -name '*.json' -not -path './.git/*' | while IFS= read -r f; do
  jq -e . "$f" >/dev/null || fail "$f is not valid JSON"
done

step "skill frontmatter"
if ! out="$(python3 bin/ci/check_skills.py plugins/*/skills)"; then
  printf '%s\n' "$out" | grep FAIL; fail "skill frontmatter"
fi

step "portability and privacy guards"
if grep -rnE '/(Users|home)/[A-Za-z]' --exclude-dir=.git --exclude=.git . ; then fail "absolute home paths"; fi
if grep -rnE 'CLAUDE_PLUGIN_ROOT|~/\.claude/(skills|writing)|x86_64-linux' plugins ; then fail "non-portable paths in plugins/"; fi
if [ -n "$(find plugins -type d -name exemplars)" ]; then fail "exemplar notes must not ship in plugins/"; fi

step "quote guard"
python3 bin/ci/quotes.py plugins/econ-research || fail "quotes too long or too many in plugins/econ-research"

step "scaffold: no overwrite, literal names, conventions once"
T="$(mktemp -d)"
SC="plugins/econ-research/skills/setup-project/scripts/scaffold.sh"
bash "$SC" "$T/p" 'A/B & C \ test' >/dev/null
[ "$(head -1 "$T/p/CLAUDE.md")" = '# A/B & C \ test' ] || fail "project name not substituted literally"
echo "edited" > "$T/p/docs/backlog.md"
bash "$SC" "$T/p" --conventions >/dev/null
bash "$SC" "$T/p" --conventions >/dev/null
[ "$(cat "$T/p/docs/backlog.md")" = "edited" ] || fail "scaffold overwrote an existing file"
[ "$(grep -c 'econ-research:conventions' "$T/p/CLAUDE.md")" -eq 2 ] || fail "conventions block appended more than once"
if grep -rq '{{' "$T/p"; then fail "unfilled placeholders"; fi

step "toy example carries the shipped conventions block"
python3 - <<'PY' || fail "examples/toy-project/CLAUDE.md conventions block differs from setup-project/assets/conventions.md"
import pathlib, re, sys
toy = pathlib.Path("examples/toy-project/CLAUDE.md").read_text(encoding="utf-8")
copy = pathlib.Path("plugins/econ-research/skills/setup-project/assets/conventions.md").read_text(encoding="utf-8")
m = re.search(r"<!-- econ-research:conventions -->.*?<!-- /econ-research:conventions -->\n", toy, re.S)
sys.exit(0 if m and m.group(0) == copy else 1)
PY

if command -v claude >/dev/null 2>&1; then
  step "plugin manifests"
  claude plugin validate . | grep -q 'Validation passed' || fail "claude plugin validate"
fi

echo "All checks passed."
