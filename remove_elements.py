import re

file_path = "/Users/charanbs/Documents/my/index.html"
with open(file_path, "r") as f:
    html = f.read()

# Pattern to remove the nature elements div entirely
pattern = r'<!-- Nature Elements \(Authentic Callbaba Vectors\) -->\s*<div class="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-\[10\]">.*?</div>'

html = re.sub(pattern, '', html, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(html)
