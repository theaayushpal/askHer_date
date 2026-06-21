# Image Assets for AskHer

Place the following files here after converting from JPEG to WebP:

| Filename      | Source       | Used On             |
|---------------|-------------|---------------------|
| simp.webp     | simp.jpeg   | Page 1 (hero)       |
| simp_2.webp   | simp_2.jpeg | Page 2 + Page 7     |
| simp_3.webp   | simp_3.jpeg | Page 3 reveal + Page 5 |

## How to Convert (macOS/Linux)
```bash
# Using cwebp (install via Homebrew: brew install webp)
cwebp -q 85 simp.jpeg   -o simp.webp
cwebp -q 85 simp_2.jpeg -o simp_2.webp
cwebp -q 85 simp_3.jpeg -o simp_3.webp
```

## In each page, find the comment:
  REPLACE WITH: <img src="/images/simp.webp" ... />
and swap out the placeholder div.
