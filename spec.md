# Kashike

## Current State
The About page is inline in App.tsx as a simple route component with minimal text content and basic styling. No founder image, no gallery section. Colors make text hard to read.

## Requested Changes (Diff)

### Add
- Full About Us content about Kashike Brand, founded by Anjana Singh
- Founder section with photo (`/assets/uploads/whatsapp_image_2026-01-23_at_11.07.23_am-removebg-preview-019d2e16-9797-70bb-9a96-d78f158a52fd-3.png`)
- Image gallery section titled something like 'Our Journey' with 7 photos from stalls/prizes/famous meetings
- Better color contrast so text is clearly readable on dark background

### Modify
- About route in App.tsx: extract to `src/frontend/src/pages/About.tsx` component
- Improve color coding: use white/light gold for headings, light grey for body text on dark backgrounds

### Remove
- Old minimal about page inline content

## Implementation Plan
1. Create `src/frontend/src/pages/About.tsx` with:
   - Hero banner: 'About Us – Kashike Brand' with gold/white text on dark bg
   - Brand story text section with proper contrast
   - Values section (Quality First, Customer Focus, Innovation, Integrity) as cards
   - Founder section: photo on one side, name/title/bio on other
   - Mission statement
   - Tagline: 'Kashike Brand – Driven by Vision, Defined by Quality'
   - Image gallery grid with all 7 event/prize photos with captions
2. Update App.tsx to import and use About component
3. All text must be white or light gold on dark backgrounds for visibility

Gallery images (all in /assets/uploads/):
- whatsapp_image_2026-01-23_at_9.27.39_am-019d2e16-969d-76b0-b6ac-63afb40b4d2a-1.jpeg (award ceremony - 2nd Runner Up)
- image_18-019d2e16-96c0-70f6-9a06-27d4b5eaef17-2.png (stall inauguration)
- whatsapp_image_2026-01-23_at_9.27.40_am-019d2e16-986f-7528-909c-2f54c0d8241c-4.jpeg (Swadeshi Utsav stall)
- 34e4cee2-ef4b-4af8-8ea0-3d822e93415a-019d2e16-98b0-7719-9292-ce3710623dc5-5.jpg (Ministry of Food Processing stall)
- whatsapp_image_2026-01-23_at_9.23.24_am-019d2e16-9922-73da-93d5-cc0a19b2b8b9-6.jpeg (meeting international visitors)
- image_19-019d2e16-9a11-735a-8d01-b8fb8e7e93a1-7.png (certificate award)
- image_20-019d2e16-9b20-748a-b955-f687eba76717-8.png (Kashike logo - can be used as gallery banner or skip)
