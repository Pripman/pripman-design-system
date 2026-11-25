# Agent notes

## Version bump on every change

This package is published to npm, so **every change to the design system must be accompanied by a version bump**. Remember this each time you change something:

- Update `version` in `package.json` **and** the two matching `version` fields at the top of `package-lock.json`.
- Follow semver: patch for fixes, minor for new components/features (while on 0.x), major for breaking changes.
