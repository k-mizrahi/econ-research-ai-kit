#!/usr/bin/env bash
# Copy the research-workflow starter files into a project. Never overwrites anything.
#   scaffold.sh <project dir> [project name] [--conventions]
# --conventions appends the estimation/process conventions block to CLAUDE.md
# (skipped if the block is already there).
set -eu

ASSETS="$(cd "$(dirname "$0")/../assets" && pwd)"
TARGET=""; NAME=""; CONVENTIONS=0
for arg in "$@"; do
  case "$arg" in
    --conventions) CONVENTIONS=1 ;;
    *) if [ -z "$TARGET" ]; then TARGET="$arg"; elif [ -z "$NAME" ]; then NAME="$arg"; fi ;;
  esac
done
if [ -z "$TARGET" ]; then echo "usage: scaffold.sh <project dir> [project name] [--conventions]" >&2; exit 2; fi
mkdir -p "$TARGET"
TARGET="$(cd "$TARGET" && pwd)"
if [ -z "$NAME" ]; then NAME="$(basename "$TARGET")"; fi
TODAY="$(date +%Y-%m-%d)"

# place <asset> <destination relative to the project>: copy with {{PROJECT_NAME}} and
# {{DATE}} filled in (literal replacement, safe for any characters in the name).
place() {
  src="$ASSETS/$1"; dst="$TARGET/$2"
  if [ -e "$dst" ]; then echo "  keep   $2 (exists)"; return 0; fi
  mkdir -p "$(dirname "$dst")"
  PROJECT_NAME="$NAME" TODAY="$TODAY" awk '
    function rep(s, pat, val,   out, i) {
      out = ""
      while ((i = index(s, pat)) > 0) { out = out substr(s, 1, i - 1) val; s = substr(s, i + length(pat)) }
      return out s
    }
    { print rep(rep($0, "{{PROJECT_NAME}}", ENVIRON["PROJECT_NAME"]), "{{DATE}}", ENVIRON["TODAY"]) }
  ' "$src" > "$dst"
  echo "  create $2"
}

place CLAUDE.md.tmpl CLAUDE.md
place rules/plans.md .claude/rules/plans.md
place skill-bindings.md .claude/rules/skill-bindings.md
place key-decisions.md docs/key-decisions.md
place results-log.md docs/results-log.md
place dropped-analyses.md docs/dropped-analyses.md
place backlog.md docs/backlog.md
for dir in plans handoffs; do
  if [ -d "$TARGET/$dir" ]; then
    echo "  keep   $dir/ (exists)"
  else
    mkdir -p "$TARGET/$dir"; touch "$TARGET/$dir/.gitkeep"; echo "  create $dir/"
  fi
done

if [ "$CONVENTIONS" -eq 1 ]; then
  if grep -q 'econ-research:conventions' "$TARGET/CLAUDE.md" 2>/dev/null; then
    echo "  keep   conventions block (already in CLAUDE.md)"
  else
    { printf '\n'; cat "$ASSETS/conventions.md"; } >> "$TARGET/CLAUDE.md"
    echo "  append conventions block to CLAUDE.md"
  fi
fi
