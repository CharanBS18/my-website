import re

original_file = "/Users/charanbs/Documents/my/index.html"
stitch_file = "/Users/charanbs/.gemini/antigravity/brain/0c851290-365b-4a15-843f-9281b1a692ad/stitch-portfolio.html"

with open(original_file, 'r') as f:
    orig = f.read()

with open(stitch_file, 'r') as f:
    stitch = f.read()

# Extract loading screen css
css_match = re.search(r'(/\* Animated Background \*/.*?)/\*\s*Navigation\s*\*/', orig, re.DOTALL)
css = css_match.group(1) if css_match else ""

# Ensure we get the .loading-screen .hidden rule correctly if needed, but original js handles display='none'.
# Wait, the original css used .loading-screen.hidden { opacity: 0; visibility: hidden; }
if ".loading-screen.hidden" not in css and css_match:
    pass

# Extract loading screen html
html_match = re.search(r'(<!-- Animated Background -->.*?)\s*<!-- Navigation -->', orig, re.DOTALL)
html_part = html_match.group(1) if html_match else ""

# Insert CSS into stitch head
if css:
    stitch = stitch.replace("</style>", css + "</style>")

# Insert HTML into stitch body
if html_part:
    stitch = stitch.replace('<body class="font-body selection:bg-primary/30 selection:text-primary">', 
        '<body class="font-body selection:bg-primary/30 selection:text-primary">\n' + html_part)

# Add load hide logic
js = """
<script>
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('loadingScreen');
            if (loader) {
                loader.classList.add('hidden');
                // or inline styles
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
            }
        }, 3000);
    });
</script>
</body>
"""
stitch = stitch.replace('</body>', js)

# Text replacements
stitch = stitch.replace('ELARA <br/>\n<span class="text-gradient-primary">VANCE</span>', 'CHARAN <br/>\n<span class="text-gradient-primary">BS</span>')
stitch = stitch.replace('ELARA VANCE', 'CHARAN BS')
stitch = stitch.replace('ARCHITECT.DEV', 'CHARAN.BS')
stitch = stitch.replace('hello@architect.dev', 'charan@example.com')
stitch = stitch.replace('https://lh3.googleusercontent.com/aida-public/AB6AXuAWB1YuTNj_lI_tW1sDtxBtG9sr0Fd0RMdhYMm4UGevUb0IkKIasfYu7pbFfLkQAcTveu1u-J6jMgxt7_SQrTaad0Hxk2FWJHuyHiKvOHpq30mYB2GYPl8oe9YIkYWBCR4N1CJvKJYiZPZdnGNHa7nHuRg_Lly1NP1K2BTdz390iO560JCUfgYx24tEG-AKDonilmnyrUZ5vqIJhK1LB0PvDG55vQIMrTsBCXR-N28gpHtF3nq2Adv6HqpgX4rLetaawF9vtBBjqr_Z', 'char.png')

# Job Title and skills
stitch = stitch.replace('Architecting digital ecosystems with surgical precision. Senior Full-stack Developer &amp; UI Strategist crafting the high-end future of the web.', 'AI-Driven Applications &middot; Design-Focused &middot; Data-Aware. Building the future, one line of code at a time.')
stitch = stitch.replace('Elara Vance', 'Charan BS')

with open("/Users/charanbs/Documents/my/index.html", "w") as f:
    f.write(stitch)
print("Merge complete")
