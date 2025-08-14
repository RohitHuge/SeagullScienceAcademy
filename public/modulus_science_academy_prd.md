
# Product Requirements Document (PRD) — Modulus Science Academy Website

## 1. Brand Color Palette (Purple Base)
```json
{
  "primary": "#6B21A8",
  "primary-light": "#A855F7",
  "primary-dark": "#4C1D95",
  "accent": "#9333EA",
  "background": "#F9FAFB",
  "text-primary": "#111827",
  "text-secondary": "#374151"
}
```

**Mapping Usage:**
- **Primary** → Buttons, CTA backgrounds, headings.
- **Primary-light** → Hover states, subtle accents.
- **Primary-dark** → Footer, dark sections.
- **Accent** → Highlights, microinteractions.
- **Background** → Page background.
- **Text-primary** → Main headings, body text.
- **Text-secondary** → Captions, muted text.

---

## 2. Coaching Details

### Contact Information
```json
{
  "phone": ["+91 93267 89602", "+91 89768 53337"],
  "email": "modulusscienceacademy@gmail.com",
  "address": "Shop no. 10, Shivam Apartment, Near Railway Station, Badlapur (E)",
  "website": "www.modulusscienceacademy.in"
}
```

### Mentors List
```json
{
  "mentors": [
    {"name": "Prof. XYZ", "specialization": "Physics"},
    {"name": "Prof. ABC", "specialization": "Chemistry"},
    {"name": "Prof. PQR", "specialization": "Biology"},
    {"name": "Prof. LMN", "specialization": "Mathematics"}
  ]
}
```

### Courses Offered
```json
{
  "courses": [
    {"name": "NEET", "duration": "1 & 2 years", "target": "Medical entrance"},
    {"name": "JEE", "duration": "1 & 2 years", "target": "Engineering entrance"},
    {"name": "MHT-CET", "duration": "1 & 2 years", "target": "State engineering & pharmacy entrance"},
    {"name": "Foundation Courses", "target": "8th, 9th, 10th (Science & Maths)"},
    {"name": "SSC Board Preparation", "target": "10th Board Exams"}
  ]
}
```

---

## 3. Website Page List & Structure
```json
{
  "pages": [
    "Home",
    "About Us",
    "Courses",
    "Results",
    "Gallery",
    "Contact Us",
    "Apply Now (Redirects to Courses)",
    "Privacy Policy / Terms"
  ]
}
```

---

## 4. Additional UI/UX Requirements
```json
{
  "requirements": {
    "tab-friendly": true,
    "loaders": "For processes that take time",
    "error-toast": "Error & success notifications",
    "microinteractions": "Final stage confirmations",
    "responsive": true
  }
}
```

---

**Note:** Contact details & courses are taken from the provided pamphlets/banners, not from the existing website.
