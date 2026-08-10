#!/usr/bin/env python3
"""Make logo background transparent — remove white/near-white pixels."""
from PIL import Image
import sys

src = "/home/z/my-project/public/logo.png"
img = Image.open(src).convert("RGBA")
pixels = img.load()
w, h = img.size
threshold = 240  # pixels brighter than this (R,G,B all > threshold) become transparent

changed = 0
for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if r >= threshold and g >= threshold and b >= threshold:
            # Make fully transparent (preserve edge anti-aliasing by partial alpha)
            # Use feathering: pixels close to threshold get partial alpha
            min_val = min(r, g, b)
            if min_val >= 250:
                pixels[x, y] = (r, g, b, 0)
            else:
                # Feather edge: alpha proportional to how dark the pixel is
                alpha = int(255 * (1 - (min_val - threshold) / (250 - threshold)))
                alpha = max(0, min(255, alpha))
                pixels[x, y] = (r, g, b, alpha)
            changed += 1

img.save(src, "PNG")
print(f"Processed {w}x{h} — {changed} pixels made transparent")
