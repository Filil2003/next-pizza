#!/usr/bin/env bash

# Validate commit header according to Conventional Commits
# More info: https://www.conventionalcommits.org

COMMIT_MSG_FILE="$1"
HEADLINE=$(head -n1 "$COMMIT_MSG_FILE")

# Check Conventional Commits pattern
PATTERN='^(feat|fix|chore|docs|style|refactor|perf|test|build)(\([a-zA-Z0-9_-]+\))?!?: .+'
if ! [[ "$HEADLINE" =~ $PATTERN ]]; then
  echo "Commit message does not follow Conventional Commits format."
  echo "Check https://www.conventionalcommits.org"
  exit 1
fi

# Check headline length
MAX_LENGTH=72
if [ ${#HEADLINE} -gt $MAX_LENGTH ]; then
  echo "Commit message header is too long (${#HEADLINE} chars, max $MAX_LENGTH)."
  exit 1
fi
