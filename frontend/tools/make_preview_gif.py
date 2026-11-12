"""Genera public/preview-code.gif: código C# difuminado que sube sin parar (bucle sin cortes)."""
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = sys.argv[1]
W, H = 400, 250          # relación 16:10, como la caja de vista previa
FPS, STEP = 12, 3        # 3 px por fotograma a 12 fps = 36 px/s
LH = 21                  # alto de línea
BG = (5, 7, 6)

DIM, KW, STR = (42, 138, 42), (244, 255, 58), (184, 255, 184)


def mix(c, a):
    return tuple(round(BG[i] + (c[i] - BG[i]) * a) for i in range(3))


LINES = [
    ("using System.Linq;", KW, .8),
    ("namespace Portfolio.Quotes;", KW, .8),
    ("", DIM, 1),
    ("public sealed class QuoteService(IQuoteRepository repo)", KW, .8),
    ("{", DIM, .6),
    ("    public async Task<Quote> CreateAsync(NewQuote input)", DIM, 1),
    ("    {", DIM, .6),
    ("        var items = input.Lines", DIM, 1),
    ("            .Where(l => l.Quantity > 0)", DIM, 1),
    ("            .Select(l => new QuoteLine(l.Sku, l.Quantity))", DIM, 1),
    ("            .ToList();", DIM, 1),
    ("", DIM, 1),
    ("        var quote = new Quote(Guid.NewGuid(), items);", DIM, 1),
    ("        quote.ApplyTax(0.19m);", STR, .85),
    ("", DIM, 1),
    ("        await repo.AddAsync(quote);", DIM, 1),
    ("        return quote;", KW, .8),
    ("    }", DIM, .6),
    ("", DIM, 1),
    ("    public decimal Total(Quote q) =>", DIM, 1),
    ("        q.Lines.Sum(l => l.Price * l.Quantity);", STR, .85),
    ("}", DIM, .6),
    ("", DIM, 1),
]
BLOCK = len(LINES) * LH
assert BLOCK % STEP == 0, BLOCK

font = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 15)

# Imagen alta: el bloque de código dos veces seguidas (para el bucle)
tall = Image.new("RGB", (W, BLOCK * 2 + H), BG)
d = ImageDraw.Draw(tall)
for copy in range(2):
    for i, (text, color, alpha) in enumerate(LINES):
        d.text((16, copy * BLOCK + i * LH + 2), text, font=font, fill=mix(color, alpha))

# Desvanecido arriba y abajo (22 % cada uno)
mask = Image.new("L", (W, H), 255)
md = ImageDraw.Draw(mask)
edge = int(H * 0.22)
for y in range(edge):
    v = round(255 * y / edge)
    md.line([(0, y), (W, y)], fill=v)
    md.line([(0, H - 1 - y), (W, H - 1 - y)], fill=v)
bg_img = Image.new("RGB", (W, H), BG)

frames = []
for off in range(0, BLOCK, STEP):
    crop = tall.crop((0, off, W, off + H)).filter(ImageFilter.GaussianBlur(1.6))
    frame = Image.composite(crop, bg_img, mask)
    frames.append(frame.quantize(colors=40, dither=Image.Dither.NONE))

frames[0].save(
    OUT,
    save_all=True,
    append_images=frames[1:],
    duration=round(1000 / FPS),
    loop=0,
    optimize=True,
    disposal=1,
)
print(len(frames), "frames")
