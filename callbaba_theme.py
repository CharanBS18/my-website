import re

file_path = "/Users/charanbs/Documents/my/index.html"
with open(file_path, "r") as f:
    html = f.read()

# 1. HTML tag
html = html.replace('<html class="dark" lang="en">', '<html lang="en">')

# 2. CSS variables and colors in config
replacements = {
    r'"#0a0a0a"': '"#faf9f1"',
    r'"#131313"': '"#ffffff"',
    r'"#0e0e0e"': '"#ffffff"',
    r'"#1c1b1b"': '"#ffffff"',
    r'"#201f1f"': '"#fdfbf4"',
    r'"#2a2a2a"': '"#f5f4eb"',
    r'"#353534"': '"#eae9df"',
    r'"#e5e2e1"': '"#313035"',
    r'"#bcc9cd"': '"#66646b"',
    r'"#4cd7f6"': '"#4976a4"',
    r'"#06b6d4"': '"#a0c8ff"',
    r'"#003640"': '"#ffffff"',
    r'"#ddb7ff"': '"#a9ccff"',
    r'"#6f00be"': '"#d6e2ea"',
    r'"#869397"': '"#d1cfc4"',
    r'"#3d494c"': '"#e6e4d9"',
}

for k, v in replacements.items():
    html = re.sub(k, v, html, flags=re.IGNORECASE)

# 3. CSS blocks in <style>
html = html.replace('background-color: #0A0A0A;', 'background-color: #faf9f1;')
html = html.replace('color: #E5E2E1;', 'color: #313035;')
html = html.replace('rgba(53, 53, 52, 0.4)', 'rgba(255, 255, 255, 0.7)')
html = html.replace('rgba(76, 215, 246, 0.15)', 'rgba(160, 200, 255, 0.4)')
html = html.replace('rgba(221, 183, 255, 0.1)', 'rgba(214, 226, 234, 0.4)')
html = html.replace('#4CD7F6', '#4976a4')
html = html.replace('#06B6D4', '#a0c8ff')

html = html.replace('background: var(--darker);', 'background: #faf9f1;')
html = html.replace('color: var(--gray);', 'color: #66646b;')

# Loading screen text
html = html.replace('linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))', 'linear-gradient(135deg, #4976a4, #a0c8ff)')


# 4. Tailwind classes for Light Mode
html = html.replace('border-white/5', 'border-black/5')
html = html.replace('border-white/10', 'border-black/5')
html = html.replace('border-white/15', 'border-black/5')
html = html.replace('bg-white/5', 'bg-black/5')
html = html.replace('text-neutral-100', 'text-neutral-900')
html = html.replace('text-neutral-200', 'text-neutral-800')
html = html.replace('text-neutral-400', 'text-neutral-600')
html = html.replace('text-neutral-500', 'text-neutral-600')
html = html.replace('text-cyan-400', 'text-[#4976a4]')
html = html.replace('text-cyan-300', 'text-[#a0c8ff]')
html = html.replace('bg-neutral-950/40', 'bg-white/70')
html = html.replace('bg-neutral-950', 'bg-[#f4f2e6]')
html = html.replace('bg-[#0A0A0A]', 'bg-[#faf9f1]')
html = html.replace('from-[#1c1b1b]', 'from-[#ffffff]')
html = html.replace('to-black', 'to-[#faf9f1]')
html = html.replace('shadow-[0_10px_30px_rgba(0,0,0,0.5)]', 'shadow-[0_10px_30px_rgba(0,0,0,0.05)]')
html = html.replace('shadow-[0px_10px_30px_rgba(6,182,212,0.15)]', 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]')
html = html.replace('mix-blend-overlay', 'mix-blend-multiply')
html = html.replace('shadow-inner', 'shadow-sm')
html = html.replace('hover:border-white/5', 'hover:border-black/10')
html = html.replace('border border-transparent', 'border border-black/5')

# Specific GitHub Stats
html = re.sub(r'bg_color=1C1B1B', 'bg_color=faf9f1', html)
html = re.sub(r'title_color=06B6D4', 'title_color=4976a4', html)
html = re.sub(r'text_color=E5E2E1', 'text_color=313035', html)
html = re.sub(r'icon_color=A855F7', 'icon_color=4976a4', html)
html = re.sub(r'theme=dark', 'theme=default', html)
html = re.sub(r'background=1C1B1B', 'background=faf9f1', html)
html = re.sub(r'stroke=06B6D4', 'stroke=4976a4', html)
html = re.sub(r'ring=06B6D4', 'ring=a0c8ff', html)
html = re.sub(r'fire=A855F7', 'fire=4976a4', html)
html = re.sub(r'currStreakNum=E5E2E1', 'currStreakNum=313035', html)
html = re.sub(r'currStreakLabel=06B6D4', 'currStreakLabel=4976a4', html)
html = re.sub(r'sideNums=E5E2E1', 'sideNums=313035', html)
html = re.sub(r'sideLabels=06B6D4', 'sideLabels=66646b', html)
html = re.sub(r'dates=bcc9cd', 'dates=66646b', html)

# ghchart color
html = html.replace('06B6D4/CharanBS18', '4976a4/CharanBS18')
html = html.replace('invert-[.85] hue-rotate-[170deg] contrast-[1.2]', 'opacity-90')

# Inline styles replacements
html = html.replace('bg-[#06B6D4]/30', 'bg-[#a0c8ff]/30')
html = html.replace('text-[#06B6D4]', 'text-[#4976a4]')
html = html.replace('bg-[#06B6D4]/5', 'bg-[#a0c8ff]/20')

# Make portrait not inverted/grayscale since light mode is friendly
html = html.replace('grayscale contrast-125 opacity-80', 'opacity-90 saturate-150')

with open(file_path, "w") as f:
    f.write(html)
