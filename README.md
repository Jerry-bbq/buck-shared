# utils

## add file

```bash
cd packages && mkdir ** && cd ** && mkdir src && pnpm init
touch README.md
```

## publish

```bash
pnpm run build
pnpm run changeset
pnpm run version
pnpm run publish
```