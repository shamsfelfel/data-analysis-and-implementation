#!/usr/bin/env python3
"""Generate the PWA icon set.

One mark, drawn at every size the manifest asks for: a rounded slate
tile with two nested brackets and a dot, in the course's accent blue on
a natural dark ground. The maskable variant keeps the glyph inside the
safe circle so Android can crop it to any shape without clipping.
"""
from PIL import Image, ImageDraw

BG = (31, 44, 62)        # deep slate, matches the dark theme surface
FG = (122, 170, 255)     # accent blue, legible on the slate
DOT = (226, 200, 142)    # warm sand, the one spot of contrast

SIZES = [(192, "icons/icon-192.png", False),
         (512, "icons/icon-512.png", False),
         (512, "icons/icon-maskable-512.png", True),
         (180, "icons/apple-touch-icon.png", False)]


def draw(size, maskable):
    # 4x supersampling, then downscale: cheap antialiasing for the arcs
    s = size * 4
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        d.rectangle([0, 0, s, s], fill=BG)
        scale = 0.58          # keep the glyph inside the safe circle
    else:
        r = int(s * 0.22)
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=r, fill=BG)
        scale = 0.74

    cx = cy = s / 2
    w = s * scale                     # glyph box width
    lw = max(2, int(s * 0.055))       # stroke weight

    # two chevrons opening outward, like < >, with the object between
    for sign in (-1, 1):
        apex = cx + sign * w * 0.42      # the point, furthest from centre
        arm = cx + sign * w * 0.14       # where both arms end, nearest it
        d.line([(arm, cy - w * 0.30), (apex, cy), (arm, cy + w * 0.30)],
               fill=FG, width=lw, joint="curve")

    # the object in the middle
    rad = w * 0.085
    d.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=DOT)

    return img.resize((size, size), Image.LANCZOS)


def main():
    for size, path, maskable in SIZES:
        draw(size, maskable).save(path, "PNG", optimize=True)
        print("wrote %s (%dx%d)" % (path, size, size))


if __name__ == "__main__":
    main()
