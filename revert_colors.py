import re

file_path = "/Users/charanbs/Documents/my/index.html"

with open(file_path, "r") as f:
    content = f.read()

replacements = {
    # Primaries
    r"(?i)#FF3366": "#4cd7f6",
    r"(?i)#FF0044": "#06b6d4",
    r"rgba\(\s*255\s*,\s*51\s*,\s*102": "rgba(76, 215, 246",
    r"rgba\(\s*255\s*,\s*0\s*,\s*68": "rgba(6, 182, 212",
    
    # Secondaries
    r"(?i)#FFCC66": "#ddb7ff",
    r"(?i)#FF9933": "#6f00be",
    r"(?i)#FF6600": "#a855f7",
    r"rgba\(\s*255\s*,\s*204\s*,\s*102": "rgba(221, 183, 255",
    r"rgba\(\s*255\s*,\s*153\s*,\s*51": "rgba(168, 85, 247",
    
    # Backgrounds
    r"(?i)#0c0506": "#0a0a0a",
    r"(?i)#100708": "#0e0e0e",
    r"(?i)#140a0b": "#131313",
    r"(?i)#1a0d0e": "#1c1b1b",
    r"(?i)#1f1011": "#201f1f",
    r"(?i)#241315": "#2a2a2a",
    r"(?i)#2d181b": "#353534",
    r"(?i)#361c20": "#3a3939",
    
    r"bg-\[\#0c0506\]": "bg-[#0A0A0A]",
    r"to-\[\#0c0506\]": "to-[#0A0A0A]",
    r"bg-\[\#0C0506\]": "bg-[#0A0A0A]",
    r"to-\[\#0C0506\]": "to-[#0A0A0A]",
}

for pattern, replacement in replacements.items():
    content = re.sub(pattern, replacement, content)

# Change loading text gradient
content = content.replace("linear-gradient(135deg, #FF3366, #FF9933)", "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))")

# Also modify text-cyan-300 and text-cyan-400
content = content.replace("text-rose-400", "text-cyan-400")
content = content.replace("text-rose-300", "text-cyan-300")
content = content.replace("bg-rose-400", "bg-cyan-400")

with open(file_path, "w") as f:
    f.write(content)

print("Colors reverted to original Cyan/Purple.")
