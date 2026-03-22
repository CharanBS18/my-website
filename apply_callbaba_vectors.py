import re

file_path = "/Users/charanbs/Documents/my/index.html"
with open(file_path, "r") as f:
    html = f.read()

# 1. Update Google Fonts
old_fonts = r'<link href="https://fonts.googleapis.com/css2\?family=Manrope:[^"]+" rel="stylesheet" />'
new_fonts = '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet" />'
html = re.sub(old_fonts, new_fonts, html)

# 2. Update Tailwind config font families
html = html.replace("body: ['Manrope', 'sans-serif'],", "body: ['Inter', 'sans-serif'],")
html = html.replace("headline: ['Manrope', 'sans-serif']", 'headline: [\'"Playfair Display"\', \'serif\']')

# 3. Add font-headline to headers
html = html.replace('class="text-4xl', 'class="font-headline text-4xl')
html = html.replace('class="text-5xl', 'class="font-headline text-5xl')

# 4. Update body gradient in <style>
html = html.replace('body { background-color: #faf9f1;', 'body { background: linear-gradient(to bottom, #A9C9E1 0%, #F5F5F0 25%, #FAF9F1 100%);')

# 5. Replace the emojis block with the SVG vintage block
emoji_block_pattern = r'<!-- Nature Elements \(Callbaba Vibe\) -->\s*<div class="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-0">.*?</div>'
svg_block = """<!-- Nature Elements (Authentic Callbaba Vectors) -->
    <div class="pointer-events-none absolute top-0 left-0 w-full h-full overflow-hidden z-[10]">
        <!-- Top Sky Cloud -->
        <svg class="absolute top-[2%] left-[2%] opacity-100 drop-shadow-sm w-48" style="animation: float-slow 10s infinite" viewBox="0 0 200 100">
            <path d="M 50 80 Q 30 80 30 60 Q 30 40 50 40 Q 60 20 90 20 Q 120 20 130 40 Q 150 40 150 60 Q 150 80 130 80 Z" fill="#BDD1E0" />
            <path d="M 50 75 Q 35 75 35 60 Q 35 45 50 45 Q 60 25 90 25 Q 120 25 125 45 Q 145 45 145 60 Q 145 75 125 75 Z" fill="#FFF960" opacity="0.6" />
        </svg>
        
        <!-- Top Sky Bird Overlapping -->
        <svg class="absolute top-[8%] right-[8%] opacity-90 w-24 drop-shadow-md" style="animation: float-slow 7s infinite reverse" viewBox="0 0 100 100">
            <path d="M 20 60 Q 40 30 50 50 Q 80 20 90 40 Q 60 60 50 30 Q 30 80 20 60 Z" fill="#4976A4" />
        </svg>

        <!-- Overlapping Sage Leaf -->
        <svg class="absolute top-[25%] -left-[2%] opacity-90 w-32 drop-shadow-sm" style="animation: float-slow 12s infinite" viewBox="0 0 100 100">
            <path d="M 50 90 C 50 90 20 80 10 50 C 0 20 40 10 50 10 C 60 10 100 20 90 50 C 80 80 50 90 50 90 Z" fill="#8DA399" />
            <path d="M 50 90 C 50 90 30 75 25 50 C 20 25 45 15 50 15 C 55 15 80 25 75 50 C 70 75 50 90 50 90 Z" fill="#A8BEB4" />
        </svg>
        
        <!-- Mid-page Cloud Overlapping Card -->
        <svg class="absolute top-[50%] right-[3%] opacity-100 drop-shadow-md w-64" style="animation: float-slow 14s infinite reverse" viewBox="0 0 200 100">
            <path d="M 50 80 Q 30 80 30 60 Q 30 40 50 40 Q 60 20 90 20 Q 120 20 130 40 Q 150 40 150 60 Q 150 80 130 80 Z" fill="#e2dacc" />
            <path d="M 50 75 Q 35 75 35 60 Q 35 45 50 45 Q 60 25 90 25 Q 120 25 125 45 Q 145 45 145 60 Q 145 75 125 75 Z" fill="#ffffff" opacity="0.8" />
        </svg>

        <!-- Dusty Rose Bottom Leaf -->
        <svg class="absolute bottom-[5%] left-[5%] opacity-90 w-40 drop-shadow-sm" style="animation: float-slow 16s infinite" viewBox="0 0 100 100" transform="rotate(25)">
            <path d="M 50 90 C 50 90 20 80 10 50 C 0 20 40 10 50 10 C 60 10 100 20 90 50 C 80 80 50 90 50 90 Z" fill="#D2A3A9" />
            <path d="M 50 90 C 50 90 30 75 25 50 C 20 25 45 15 50 15 C 55 15 80 25 75 50 C 70 75 50 90 50 90 Z" fill="#E6BFC4" />
        </svg>
    </div>"""

html = re.sub(emoji_block_pattern, svg_block, html, flags=re.DOTALL)

with open(file_path, "w") as f:
    f.write(html)
