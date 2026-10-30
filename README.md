# Avathar AI Academy — Official Website

> **Learn • Build • Grow**  
> Real Skills. Real Projects. A Brighter Future.

A premium, futuristic, fully responsive static website for **Avathar AI Academy** — a technology education and internship academy based in Karur, Tamil Nadu.

---

## 🌐 Live Preview & Deployment

This website is designed for **GitHub Pages** deployment (free static hosting). No server-side framework is required.

### Quick Local Preview

1. Open a terminal and navigate to the project directory:
   ```
   cd avathar-ai-academy
   ```

2. Start any static file server. For example, with Python:
   ```
   python -m http.server 8080
   ```

3. Open your browser to `http://localhost:8080`

### Deploy to GitHub Pages

1. Create a new GitHub repository (e.g., `avathar-ai-academy`).
2. Push all project files to the repository's `main` branch.
3. Go to **Settings → Pages** in the repository.
4. Set Source to **Deploy from a branch** → select `main` → folder `/ (root)`.
5. Save. Your site will be live at `https://<your-username>.github.io/avathar-ai-academy/`.

> **Note:** All navigation links use relative paths (e.g., `courses.html`) so they work both locally and on GitHub Pages without any build step.

---

## 📁 Project Structure

```
avathar-ai-academy/
├── index.html              # Homepage — Hero, Courses, Internships, Why Us, CTA
├── about.html              # About Us
├── courses.html            # 8 Course Categories + Course Enquiry Form
├── internships.html        # 7 Internship Domains + Application Form
├── why-choose-us.html      # Why Choose Avathar AI Academy
├── contact.html            # Contact Info + Enquiry Form + WhatsApp
├── privacy.html            # Privacy Policy
├── terms.html              # Terms and Conditions
│
├── assets/
│   ├── css/
│   │   ├── style.css       # Core design tokens, typography, grid, buttons
│   │   ├── components.css  # Navbar, hero, cards, forms, chatbot, footer
│   │   └── animations.css  # Scroll animations, keyframes, reduced-motion
│   ├── images/
│   │   ├── logo.svg        # Full brand logo (SVG)
│   │   ├── logo-icon.svg   # Icon-only mark
│   │   └── favicon.svg     # Browser tab favicon
│   └── js/
│       ├── config.js       # Brand data, courses, internships, WhatsApp helper
│       ├── hero-canvas.js  # Interactive neural-network canvas animation
│       ├── chatbot.js      # Floating FAQ chatbot with knowledge base
│       ├── forms.js        # Form validation, Formspree/WhatsApp submission
│       └── main.js         # Navigation, scroll effects, modals, back-to-top
│
└── README.md               # This file
```

---

## ✅ Feature Checklist

| Feature | Status |
|---|---|
| Official uploaded logo (high-res & transparent) | ✅ Working |
| Full-screen animated hero with neural canvas | ✅ Working |
| Responsive sticky navbar with mobile hamburger | ✅ Working |
| 8 Course category cards with enquiry links | ✅ Working |
| 7 Internship domain cards with Apply Now | ✅ Working |
| Course enquiry form with validation | ✅ Working |
| Internship application form with domain preselect | ✅ Working |
| Floating AI FAQ chatbot | ✅ Working |
| WhatsApp click-to-chat links (9751205260) | ✅ Working |
| Online & Offline training modes section | ✅ Working |
| Why Choose Us — 6 pillars | ✅ Working |
| About Us page | ✅ Working |
| Contact page with phone, address, maps link | ✅ Working |
| Privacy Policy page | ✅ Working |
| Terms and Conditions page | ✅ Working |
| Footer with full links and verified contact | ✅ Working |
| Back-to-top button | ✅ Working |
| Scroll-triggered animations | ✅ Working |
| Reduced-motion accessibility | ✅ Working |
| SEO meta tags on every page | ✅ Working |
| SVG favicon | ✅ Working |
| GitHub Pages compatibility | ✅ Ready |
| Form backend (Formspree) | ⚙️ Requires configuration |

---

## ⚙️ Form Backend Configuration

Forms currently validate all fields client-side and offer a **WhatsApp dispatch** fallback. To enable direct email receipt:

1. Create a free account at [Formspree.io](https://formspree.io/).
2. Create a form and copy your endpoint URL.
3. Open `assets/js/config.js` and set:
   ```js
   formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
   ```
4. Both the Course Enquiry and Internship Application forms will then submit directly to your Formspree inbox.

---

## 🔒 Brand Compliance

- ✅ Only confirmed contact details are displayed (Phone: 9751205260, Address: 31, Velammal Layout, Karur)
- ✅ No email address displayed (not yet provided)
- ✅ No invented fees, durations, or placement statistics
- ✅ No guaranteed employment or certification claims
- ✅ No mention of TEVVO anywhere
- ✅ No fabricated social media profiles

---

## 📱 Responsive Design

The website is fully responsive across:
- Desktop (1200px+)
- Tablet (768px – 1024px)
- Mobile (320px – 767px)

---

## 🎨 Design System

| Token | Value |
|---|---|
| Deep Navy Blue | `#07152F` |
| Dark Background | `#030712` |
| Royal Blue | `#0759C7` |
| Electric Cyan | `#00BFFF` |
| Premium Gold | `#F5C451` |
| White | `#FFFFFF` |
| Muted Text | `#B8C7E0` |
| Heading Font | Space Grotesk |
| Body Font | Plus Jakarta Sans |

---

© 2026 Avathar AI Academy. All rights reserved.
