# Browser Frame Component - Design Specification

## Overview
This document provides detailed sizing, spacing, and design specifications for the browser frame component used in the project summary section.

---

## Component Structure

### 1. Browser Frame Container (`.browserFrame`)
**Dimensions:**
- **Max Width:** 800px
- **Width:** 100% (responsive, constrained by max-width)
- **Aspect Ratio:** Calculated from content (16:10 ratio for content area)

**Styling:**
- **Border Radius:** 8px (`--spaceS`)
- **Background:** `var(--surfaceLight)` (semi-transparent white overlay)
- **Border:** 1px solid `rgba(255, 255, 255, 0.1)`
- **Overflow:** hidden

**Shadows (Layered):**
1. **Primary Shadow:** `0 50px 100px rgba(0, 0, 0, 0.35)`
2. **Secondary Shadow:** `0 20px 40px rgba(0, 0, 0, 0.25)`
3. **Tertiary Shadow:** `0 10px 20px rgba(0, 0, 0, 0.2)`

**3D Transform (Desktop):**
- **Perspective:** 1000px
- **Rotate Y:** -5deg
- **Rotate X:** 2deg
- **Translate Y:** 0px (40px on initial load, animates to 0)

**Hover State:**
- **Transform:** `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.02)`

---

### 2. Browser Header (`.browserHeader`)
**Dimensions (from DOM):**
- **Width:** 508px (at rendered size)
- **Height:** 36px
- **Position:** Top of browser frame

**Styling:**
- **Display:** Flex
- **Align Items:** Center
- **Gap:** 8px (between traffic lights)
- **Padding:** 12px 16px (top/bottom: 12px, left/right: 16px)
- **Background:** `rgba(255, 255, 255, 0.05)` (5% white overlay)
- **Border Bottom:** 1px solid `rgba(255, 255, 255, 0.05)`

**Calculated Dimensions:**
- **Content Width:** 508px - 32px (16px × 2 padding) = 476px
- **Content Height:** 36px - 24px (12px × 2 padding) = 12px

---

### 3. Traffic Lights (`.trafficLight`)
**Dimensions:**
- **Width:** 10px
- **Height:** 10px
- **Border Radius:** 50% (perfect circle)
- **Gap Between:** 8px

**Colors:**
1. **Red (Close):** `#ff5f56`
2. **Yellow (Minimize):** `#ffbd2e`
3. **Green (Maximize):** `#27c93f`

**Total Width Calculation:**
- 3 circles × 10px = 30px
- 2 gaps × 8px = 16px
- **Total:** 46px

---

### 4. Browser Content Area (`.browserContent`)
**Dimensions (from DOM):**
- **Width:** 656px
- **Height:** 410px
- **Aspect Ratio:** 16:10 (1.6:1)

**Styling:**
- **Position:** Relative
- **Width:** 100%
- **Background:** `var(--background)` (theme-dependent)
- **Overflow:** hidden

**Image Styling:**
- **Width:** 100%
- **Height:** 100%
- **Object Fit:** cover

**Calculated Dimensions:**
- If width = 656px, height should be: 656px ÷ 1.6 = 410px ✓ (matches DOM)

---

## Calculated Proportions

### Full Browser Frame Dimensions
Based on rendered sizes:
- **Frame Width:** ~656px (content width, frame may be slightly wider)
- **Header Height:** 36px
- **Content Height:** 410px
- **Total Height:** 36px + 410px = **446px**

### Aspect Ratio Breakdown
- **Content Area:** 16:10 (1.6:1)
- **Header to Content Ratio:** 36:410 ≈ 1:11.4

---

## Spacing System Reference

From the design tokens:
- `--spaceXS`: 4px
- `--spaceS`: 8px (border radius, gaps)
- `--spaceM`: 16px (header horizontal padding)
- `--spaceL`: 24px
- `--spaceXL`: 32px
- `--space2XL`: 48px
- `--space3XL`: 64px

---

## Color Specifications

### Dark Theme
- **Background:** `oklch(17.76% 0 0)` (dark gray)
- **Surface Light:** `oklch(21.78% 0 0)` (slightly lighter gray)
- **Text:** White with varying opacity

### Light Theme
- **Background:** `oklch(96.12% 0 0)` (near white)
- **Surface Light:** White
- **Text:** Black with varying opacity

### Browser Header
- **Background:** `rgba(255, 255, 255, 0.05)` (5% white overlay)
- **Border:** `rgba(255, 255, 255, 0.05)` (5% white overlay)

---

## Shadows Breakdown

The component uses a three-layer shadow system for depth:

1. **Outer Shadow (Largest):**
   - Offset: 0px, 50px
   - Blur: 100px
   - Spread: 0px
   - Color: `rgba(0, 0, 0, 0.35)`

2. **Middle Shadow:**
   - Offset: 0px, 20px
   - Blur: 40px
   - Spread: 0px
   - Color: `rgba(0, 0, 0, 0.25)`

3. **Inner Shadow (Closest):**
   - Offset: 0px, 10px
   - Blur: 20px
   - Spread: 0px
   - Color: `rgba(0, 0, 0, 0.2)`

---

## 3D Transform Details

### Initial State (Desktop)
```
perspective: 1000px
rotateY: -5deg (slight left rotation)
rotateX: 2deg (slight upward tilt)
translateY: 40px (slightly below final position)
opacity: 0
```

### Visible State (Desktop)
```
perspective: 1000px
rotateY: -5deg
rotateX: 2deg
translateY: 0px
opacity: 1
```

### Hover State (Desktop)
```
perspective: 1000px
rotateY: 0deg (straight on)
rotateX: 0deg (flat)
scale: 1.02 (slight zoom)
```

### Tablet/Mobile
- No 3D transforms
- Simple translateY animation
- Hover removes transform entirely

---

## Design Recommendations for Figma/Affinity

### Frame Setup
1. **Create Frame:** 800px × 446px (or use 656px × 446px for tighter fit)
2. **Border Radius:** 8px on all corners
3. **Background:** Use a semi-transparent white layer (5% opacity) over your base color

### Header Section
1. **Height:** 36px
2. **Padding:** 12px top/bottom, 16px left/right
3. **Background:** 5% white overlay
4. **Border:** 1px bottom border, 5% white opacity

### Traffic Lights
1. **Size:** 10px × 10px circles
2. **Spacing:** 8px between each
3. **Position:** Left-aligned within header padding
4. **Colors:** 
   - Red: `#ff5f56`
   - Yellow: `#ffbd2e`
   - Green: `#27c93f`

### Content Area
1. **Aspect Ratio:** Lock to 16:10
2. **Width:** 100% of frame (or 656px)
3. **Height:** Auto-calculated from aspect ratio (410px at 656px width)

### Shadows
Apply three shadow layers:
1. **Layer 1:** X: 0, Y: 50, Blur: 100, Spread: 0, Opacity: 35%
2. **Layer 2:** X: 0, Y: 20, Blur: 40, Spread: 0, Opacity: 25%
3. **Layer 3:** X: 0, Y: 10, Blur: 20, Spread: 0, Opacity: 20%

### Optional 3D Effect
- Apply a slight rotation: -5° on Y-axis, 2° on X-axis
- Use perspective: 1000px
- Note: This is primarily for web implementation; design tools may have limited 3D support

---

## Responsive Breakpoints

- **Desktop:** Up to 2080px
- **Laptop:** Up to 1680px
- **Tablet:** Up to 1040px
- **Mobile:** Up to 696px

At tablet and below, the 3D transforms are removed for better performance and usability.

---

## Key Measurements Summary

| Element | Width | Height | Notes |
|---------|-------|--------|-------|
| Browser Frame | 800px (max) | ~446px | Responsive width |
| Browser Header | 100% | 36px | Full width of frame |
| Traffic Light | 10px | 10px | Each circle |
| Traffic Lights Total | 46px | 10px | 3 circles + 2 gaps |
| Browser Content | 656px | 410px | 16:10 aspect ratio |
| Header Padding | 16px (L/R) | 12px (T/B) | Internal spacing |
| Border Radius | 8px | 8px | All corners |

---

## Animation Details

**Transition Properties:**
- **Transform:** 0.6s with `cubic-bezier(0.4, 0.0, 0.2, 1)`
- **Opacity:** 1s with `cubic-bezier(0.4, 0.0, 0.2, 1)`

**Easing Function:**
- `cubic-bezier(0.4, 0.0, 0.2, 1)` - Fast out, slow in

---

## Export Specifications

For design assets:
- **Format:** PNG or SVG
- **Resolution:** 2x for retina displays
- **Background:** Transparent (if exporting header/content separately)
- **Color Space:** sRGB

---

## Notes

1. The component is designed to showcase project screenshots in a realistic browser window
2. The 3D transform adds depth and visual interest on desktop
3. The layered shadows create a floating effect
4. Traffic lights are macOS-style browser controls
5. The aspect ratio ensures consistent image display across different screen sizes

