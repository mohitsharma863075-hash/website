# build.py - generates the HTML/CSS-only Wedding Invitations pages (no JavaScript)
import os, urllib.parse
WA="919258895817"; MAIL="designedbymohit.in@gmail.com"
LIVE="https://wedding-invitation-demo-beta-umber.vercel.app"
def wa(t): return f"https://wa.me/{WA}?text="+urllib.parse.quote(t)
CATS=[
 dict(slug="cards",title="Wedding Cards",hi="कार्ड",wide=False,bg="linear-gradient(135deg,#7a1b30,#3a0914)",fmt="Print-ready PDF + JPG",
  blurb="Print-ready invitation cards in traditional and modern styles.",items=[
  ("Royal Maroon Card","Deep maroon card with gold foil-style borders and a Ganesh motif."),
  ("Floral Ivory Card","Soft ivory card with hand-drawn floral corners."),
  ("Gold Mandala Card","Symmetrical gold mandala frame around the couple's names."),
  ("Peacock Theme Card","Peacock feather details in teal, gold and maroon.")]),
 dict(slug="digital",title="Digital Invitations",hi="डिजिटल",wide=True,bg="linear-gradient(135deg,#8a5a12,#4a2e06)",fmt="JPG / PNG (1080x1920)",
  blurb="Vertical invitations made for WhatsApp and Instagram stories.",items=[
  ("WhatsApp Invite Classic","Single-image invite with date, venue and blessings line."),
  ("WhatsApp Invite Floral","Floral frame with space for the couple's photo."),
  ("Instagram Story Invite","Story-sized design with a clean, swipe-friendly layout."),
  ("Save the Date","Short announcement design to send before the main invite.")]),
 dict(slug="haldi",title="Haldi",hi="हल्दी",wide=False,bg="linear-gradient(135deg,#d9a21b,#b07a0c)",fmt="JPG + PDF",
  blurb="Warm turmeric tones, playful and bright.",items=[
  ("Marigold Haldi","Marigold garlands on a turmeric-yellow background."),
  ("Yellow Floral Haldi","Light yellow card with fresh floral borders."),
  ("Traditional Haldi","Classic kalash and mango-leaf motifs."),
  ("Modern Haldi","Clean layout with bold type and soft yellow shapes.")]),
 dict(slug="mehendi",title="Mehendi",hi="मेहंदी",wide=False,bg="linear-gradient(135deg,#5f7a3a,#3d5527)",fmt="JPG + PDF",
  blurb="Henna greens with delicate line work.",items=[
  ("Henna Pattern Mehendi","Intricate henna-style pattern frame."),
  ("Green Floral Mehendi","Leafy green design with gold accents."),
  ("Peacock Mehendi","Peacock henna motif on a deep green base."),
  ("Minimal Mehendi","Simple ivory card with a single henna corner.")]),
 dict(slug="sangeet",title="Sangeet",hi="संगीत",wide=False,bg="linear-gradient(135deg,#a8325a,#6e1d3a)",fmt="JPG + PDF",
  blurb="Festive, musical and full of colour.",items=[
  ("Dhol Night Sangeet","Bold colours with dhol and dancer illustrations."),
  ("Pink Gold Sangeet","Rose-pink and gold, a glamorous evening look."),
  ("Musical Notes Sangeet","Playful musical elements around the event details."),
  ("Royal Sangeet","Maroon and gold with a palace-arch frame.")]),
 dict(slug="wedding-ceremony",title="Wedding Ceremony",hi="विवाह",wide=False,bg="linear-gradient(135deg,#7a1b30,#3a0914)",fmt="JPG + PDF",
  blurb="Classic maroon and gold, rich in detail.",items=[
  ("Shubh Vivah Classic","Traditional Shubh Vivah heading with a Ganesh blessing."),
  ("Mandap Wedding","Mandap illustration with floral garlands."),
  ("Royal Palace Wedding","Palace arches and gold ornamentation."),
  ("Elegant Ivory Wedding","Refined ivory card with minimal gold lines.")]),
 dict(slug="reception",title="Reception",hi="स्वागत",wide=False,bg="linear-gradient(135deg,#2b2a3d,#14131f)",fmt="JPG + PDF",
  blurb="Evening glamour, refined and modern.",items=[
  ("Midnight Gold Reception","Dark navy with gold typography."),
  ("Champagne Reception","Soft champagne tones with a floral spray."),
  ("Art Deco Reception","Geometric art-deco lines and gold accents."),
  ("Classic Reception","Elegant serif layout with a simple border.")]),
 dict(slug="websites",title="Wedding Websites",hi="वेबसाइट",wide=False,bg="linear-gradient(135deg,#16161c,#0c0c0f)",fmt="Responsive website + shareable link",
  blurb="One shareable link with events, venue and RSVP details.",items=[
  ("Wedding Invitation Demo","A complete digital wedding invitation website, responsive on mobile, tablet and desktop.",LIVE),
  ("Floral Wedding Website","Sample slot: floral theme website. Add your project here."),
  ("Minimal Wedding Website","Sample slot: clean, minimal website. Add your project here."),
  ("Destination Wedding Website","Sample slot: travel and venue focused website. Add your project here.")]),
]
FONTS='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@500;600&display=swap" rel="stylesheet">'
def head(p,title,desc):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title} | Mohit Sharma</title>
<meta name="description" content="{desc}" />
<meta name="theme-color" content="#0c0c0f" />
<link rel="icon" type="image/png" sizes="512x512" href="{p}images/favicon.png" />
{FONTS}
<link rel="stylesheet" href="{p}style.css" />
<link rel="stylesheet" href="{p}wedding.css" />
</head>
<body data-theme="dark" class="wedding-page">
<a class="skip-link" href="#main">Skip to content</a>
<header class="w-head">
  <div class="w-head-in">
    <a class="w-logo" href="{p}index.html" aria-label="Mohit Sharma home"><img src="{p}images/logo.png" alt="Mohit Sharma Logo" /></a>
    <nav class="w-nav" aria-label="Wedding pages">
      <a href="{p}wedding-invitations.html">Wedding Invitations</a>
      <a href="{p}wedding-invitations.html#categories">Categories</a>
      <a href="{p}wedding-invitations.html#contact">Contact</a>
    </nav>
    <a class="btn btn-outline w-back" href="{p}index.html">&larr; Back to Portfolio</a>
  </div>
</header>
<main id="main">
'''
def foot(p):
    return f'''</main>
<footer class="footer">
  <div class="section-inner footer-grid">
    <div class="footer-brand">
      <span class="footer-logo">MOHIT SHARMA</span>
      <p>Graphic Designer &amp; Web Designer</p>
      <p class="footer-tagline">Creative Designs. Modern Websites. Powerful Visuals.</p>
    </div>
    <nav class="footer-links" aria-label="Footer">
      <a href="{p}index.html#home">Home</a>
      <a href="{p}wedding-invitations.html">Wedding Invitations</a>
      <a href="{p}index.html#work">Work</a>
      <a href="{p}index.html#contact">Contact</a>
    </nav>
    <div class="footer-socials">
      <a href="https://wa.me/{WA}" target="_blank" rel="noopener">WhatsApp</a>
      <a href="mailto:{MAIL}">Email</a>
      <a href="https://www.instagram.com/mohit_sharma9897/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.linkedin.com/in/mohit-sharma-66b065419/" target="_blank" rel="noopener">LinkedIn</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Mohit Sharma. All Rights Reserved.</p>
    <a href="{p}index.html">Back to Portfolio</a>
  </div>
</footer>
</body>
</html>
'''
INV='''<div class="w-inv" aria-hidden="true">
  <small class="hindi">॥ श्री गणेशाय नमः ॥</small>
  <b>Aarav</b><i>weds</i><b>Ananya</b>
  <hr />
  <small>SAVE THE DATE</small>
</div>'''
def img(c,i): return f"images/wedding/{c['slug']}/{c['slug']}-{i+1:02d}.jpg"
def w(path,s):
    os.makedirs(os.path.dirname(path) or '.',exist_ok=True); open(path,'w',encoding='utf-8').write(s)
# ---------- category + detail pages ----------
def chips(cur):
    return '<nav class="w-chips" aria-label="Categories">'+''.join(f'<a href="{c["slug"]}.html"{" class=\"on\"" if c["slug"]==cur else ""}>{c["title"]}</a>' for c in CATS)+'</nav>'
for c in CATS:
    n=len(c["items"]); did=lambda i:f'{c["slug"]}-{i+1:02d}.html'
    tiles=''.join(f'<a class="w-tile" href="{did(i)}" style="--img:url(\'../{img(c,i)}\')" aria-label="Open {it[0]}"><span>{it[0]}</span></a>' for i,it in enumerate(c["items"]))
    s=head("../",f'{c["title"]} Invitations',c["blurb"])+f'''  <section class="w-phero" style="--cat-bg:{c["bg"]}">
    <div class="section-inner">
      <p class="section-tag">Wedding Invitations</p>
      <h1>{c["title"]}</h1>
      <p class="w-lead">{c["blurb"]}</p>
    </div>
  </section>
  <section class="w-section">
    <div class="section-inner">
      {chips(c["slug"])}
      <div class="w-gal{" wide" if c["wide"] else ""}">{tiles}</div>
      <p class="w-hint">Open a design to see its details. Want something different? <a href="{wa("Hi Mohit, I want a custom "+c["title"]+" design.")}" target="_blank" rel="noopener">Ask for a custom design on WhatsApp</a>.</p>
    </div>
  </section>
'''+foot("../")
    w(f'wedding/{c["slug"]}.html',s)
    for i,it in enumerate(c["items"]):
        live=it[2] if len(it)>2 else None
        specs=[("Category",c["title"]),("Format",c["fmt"]),("Languages","Hindi, English or both"),("Delivery","Usually 2-5 days")]
        sp=''.join(f'<li><b>{a}</b><span>{b}</span></li>' for a,b in specs)
        order=wa(f'Hi Mohit, I like "{it[0]}" from {c["title"]}. I want something similar for my wedding.')
        btns=(f'<a class="btn btn-solid" href="{live}" target="_blank" rel="noopener noreferrer">View Live Website</a>' if live else '')+f'<a class="btn {"btn-outline" if live else "btn-solid"}" href="{order}" target="_blank" rel="noopener">Order Something Like This</a>'
        s=head("../",f'{it[0]} - {c["title"]}',it[1])+f'''  <section class="w-section">
    <div class="section-inner">
      <nav class="w-crumbs" aria-label="Breadcrumb"><a href="../wedding-invitations.html">Wedding Invitations</a> / <a href="{c["slug"]}.html">{c["title"]}</a> / <span>{it[0]}</span></nav>
      <div class="w-detail">
        <div class="w-view{" wide" if c["wide"] else ""}" style="--img:url('../{img(c,i)}')" role="img" aria-label="{it[0]}"></div>
        <div>
          <h1>{it[0]}</h1>
          <p class="w-dd">{it[1]}</p>
          <ul class="w-spec">{sp}</ul>
          <div class="w-actions">{btns}</div>
          <div class="w-pn"><a href="{did((i-1)%n)}">&larr; Previous design</a><a href="{c["slug"]}.html">All {c["title"]}</a><a href="{did((i+1)%n)}">Next design &rarr;</a></div>
        </div>
      </div>
    </div>
  </section>
'''+foot("../")
        w(f'wedding/{did(i)}',s)
# ---------- hub page ----------
cards=''.join(f'''        <a class="w-cat" href="wedding/{c["slug"]}.html" style="--cat-bg:{c["bg"]}">
          <span class="w-cat-top hindi">{c["hi"]}</span>
          <span class="w-cat-body"><h3>{c["title"]}</h3><p>{c["blurb"]}</p><em class="w-more">{len(c["items"])} designs &rarr;</em></span>
        </a>
''' for c in CATS)
hub=head("","Wedding Invitation Designs & Digital Wedding Websites","Beautiful Wedding Invitations & Premium Digital Wedding Websites by Mohit Sharma.")+f'''  <section class="w-hero">
    <div class="section-inner">
      <div>
        <p class="section-tag">Wedding Invitations</p>
        <h1>Wedding invitation designs and websites</h1>
        <p class="w-lead">Beautiful Wedding Invitations &amp; Premium Digital Wedding Websites. Cards for print, invitations for WhatsApp, and a full website for the big day.</p>
        <div class="w-actions">
          <a class="btn btn-solid" href="#categories">Browse Categories</a>
          <a class="btn btn-outline" href="#contact">Get Your Invitation Designed</a>
        </div>
      </div>
      <div class="w-hero-card">
        {INV}
      </div>
    </div>
  </section>

  <section class="w-section" id="categories">
    <div class="section-inner">
      <p class="section-tag">Categories</p>
      <h2 class="section-heading">Pick a ceremony or format</h2>
      <div class="w-catgrid">
{cards}      </div>
    </div>
  </section>

  <section class="w-section w-alt" id="websites">
    <div class="section-inner">
      <p class="section-tag">Featured Website</p>
      <h2 class="section-heading">A wedding, as a website</h2>
      <div class="w-feature">
        <div class="w-browser" aria-hidden="true">
          <div class="w-bar"><i></i><i></i><i></i></div>
          <div class="w-shot">Wedding Invitation Demo</div>
        </div>
        <div>
          <h3>Wedding Invitation Demo Website</h3>
          <p class="w-dd">A complete digital wedding invitation website in a royal maroon and gold theme. It works on mobile, tablet and desktop, and opens from one shareable link.</p>
          <div class="w-actions">
            <a class="btn btn-solid" href="{LIVE}" target="_blank" rel="noopener noreferrer">View Live Website</a>
            <a class="btn btn-outline" href="wedding/websites.html">All wedding websites</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="w-section" id="contact">
    <div class="section-inner">
      <p class="section-tag">Get in touch</p>
      <h2 class="section-heading">Get your invitation designed</h2>
      <p class="w-lead">Share your wedding date and what you need. I will reply with ideas and pricing.</p>
      <div class="contact-socials">
        <a class="social-btn" href="{wa("Hi Mohit, I want a wedding invitation design.")}" target="_blank" rel="noopener"><span>WhatsApp</span></a>
        <a class="social-btn" href="mailto:{MAIL}?subject=Wedding%20Invitation%20Enquiry"><span>Email</span></a>
      </div>
    </div>
  </section>
'''+foot("")
w('wedding-invitations.html',hub)
# ---------- snippets for index.html ----------
chiplist=''.join(f'\n        <li><a href="wedding/{c["slug"]}.html" data-cursor="VIEW">{c["title"]}</a></li>' for c in CATS)
w('index-additions.html',f'''<!-- ============================================================
     index.html में सिर्फ़ ये 4 जोड़ने हैं। पुराना कोड नहीं हटाना है।
     ============================================================ -->

<!-- (1) <head> में, <link rel="stylesheet" href="style.css" /> के ठीक बाद -->
<link rel="stylesheet" href="wedding.css" />


<!-- (2) NAVBAR में, <a href="#work" ...>Work</a> के बाद -->
<a href="wedding-invitations.html" class="nav-link" data-cursor="OPEN">Wedding Invitations</a>


<!-- (3) GRAPHIC DESIGN WORLD सेक्शन के बाद और
         <!-- ============ PORTFOLIO / WORK ============ --> से ठीक पहले -->
<!-- ============ WEDDING INVITATIONS ============ -->
<section class="world world-wedding" id="wedding" data-cursor-section="WEDDING">
  <div class="section-inner ww-grid">
    <div class="ww-copy">
      <p class="section-tag">Wedding Invitations</p>
      <h2 class="section-heading">Invitations made for the big day</h2>
      <p class="world-sub">Beautiful Wedding Invitations &amp; Premium Digital Wedding Websites</p>
      <ul class="ww-chips">{chiplist}
      </ul>
      <a href="wedding-invitations.html" class="btn btn-solid" data-cursor="EXPLORE">Explore Wedding Invitations</a>
    </div>
    <a class="ww-preview" href="wedding-invitations.html" data-cursor="VIEW" aria-label="Explore Wedding Invitations">
      {INV}
    </a>
  </div>
</section>


<!-- (4) FOOTER में <nav class="footer-links"> के अंदर, Work के बाद -->
<a href="wedding-invitations.html">Wedding Invitations</a>
''')
