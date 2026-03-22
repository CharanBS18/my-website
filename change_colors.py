import re

file_path = "/Users/charanbs/Documents/my/index.html"

with open(file_path, "r") as f:
    content = f.read()

replacements = {
    # Primaries (Cyan -> Crimson/Rose)
    r"(?i)#4cd7f6": "#FF3366",   # Lighter Crimson
    r"(?i)#06b6d4": "#FF0044",   # Deep Crimson
    r"rgba\(\s*76\s*,\s*215\s*,\s*246": "rgba(255, 51, 102",
    r"rgba\(\s*6\s*,\s*182\s*,\s*212": "rgba(255, 0, 68",
    
    # Secondaries (Purple -> Amber/Gold)
    r"(?i)#ddb7ff": "#FFCC66",   # Warm Gold
    r"(?i)#6f00be": "#FF9933",   # Amber
    r"(?i)#a855f7": "#FF6600",   # Deep Orange
    r"rgba\(\s*221\s*,\s*183\s*,\s*255": "rgba(255, 204, 102",
    r"rgba\(\s*168\s*,\s*85\s*,\s*247": "rgba(255, 102, 0",
    
    # Backgrounds (Neutral Black/Gray -> Warm Red-Black)
    r"(?i)#0a0a0a": "#0c0506",
    r"(?i)#0e0e0e": "#100708",
    r"(?i)#131313": "#140a0b",
    r"(?i)#1c1b1b": "#1a0d0e",
    r"(?i)#201f1f": "#1f1011",
    r"(?i)#2a2a2a": "#241315",
    r"(?i)#353534": "#2d181b",
    r"(?i)#3a3939": "#361c20",
    
    # Special tailwind arbitrary values like bg-[#xxx]
    r"bg-\[\#0A0A0A\]": "bg-[#0c0506]",
    r"to-\[\#0A0A0A\]": "to-[#0c0506]",
}

for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content)

# Change loading text gradient
content = content.replace("linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))", "linear-gradient(135deg, #FF3366, #FF9933)")

# Also modify text-cyan-300 and text-cyan-400
content = content.replace("text-cyan-400", "text-rose-400")
content = content.replace("text-cyan-300", "text-rose-300")
content = content.replace("bg-cyan-400", "bg-rose-400")

with open(file_path, "w") as f:
    f.write(content)

print("Colors updated to Crimson/Amber.")
