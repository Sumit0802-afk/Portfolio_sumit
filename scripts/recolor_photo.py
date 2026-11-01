from PIL import Image
import sys

src = sys.argv[1]
dst = sys.argv[2]

shadow = (3, 6, 12)       # near-black, matches site bg (#03060c)
highlight = (77, 163, 255)  # site accent blue (#4da3ff)

img = Image.open(src).convert('L')
w, h = img.size
out = Image.new('RGB', (w, h))
px_in = img.load()
px_out = out.load()

for y in range(h):
    for x in range(w):
        t = px_in[x, y] / 255
        r = round(shadow[0] + (highlight[0] - shadow[0]) * t)
        g = round(shadow[1] + (highlight[1] - shadow[1]) * t)
        b = round(shadow[2] + (highlight[2] - shadow[2]) * t)
        px_out[x, y] = (r, g, b)

out.save(dst, quality=92)
print('saved', dst, out.size)
