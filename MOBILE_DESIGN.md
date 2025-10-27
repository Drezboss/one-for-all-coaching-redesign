# Mobile-First Coaching Website Design

## Overview

This implementation creates a mobile-first responsive design for the "One For All Coaching" website that matches the provided design image. The design features a clean, minimalist layout with a focus on mobile usability.

## Design Features

### Mobile-First Approach
- **Responsive Grid Layout**: Uses CSS Grid with `lg:grid-cols-2` to create a two-column layout on larger screens
- **Mobile Menu**: Hamburger menu that appears on mobile devices with smooth transitions
- **Touch-Friendly**: All interactive elements meet the minimum 44px touch target size
- **iOS Zoom Prevention**: Form inputs use 16px font size to prevent unwanted zooming

### Layout Structure

#### Left Column (Mobile View)
1. **Header**: "One For All" branding with hamburger menu
2. **Hero Section**: Profile picture placeholder and main call-to-action
3. **About Me Section**: Coach information and credentials
4. **Contact Form**: Name, email, and message fields with clean styling
5. **Contact Info**: Phone, email, and location details

#### Right Column (Desktop View)
1. **About Me Section**: Duplicate with centered layout
2. **Sessions Section**: Three service types with icons and descriptions
3. **Footer**: Navigation links

### Key Components

#### Mobile Menu
```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
```
- Sticky header with hamburger menu
- Smooth slide-down animation
- Links to About, Services, and Contact pages

#### Contact Form
```tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});
```
- Controlled form inputs with validation
- Clean underline styling
- Form submission handling

#### Responsive Design
- **Mobile**: Single column layout with stacked sections
- **Tablet**: Improved spacing and typography
- **Desktop**: Two-column layout with side-by-side content

### CSS Classes

#### Mobile-First Utilities
- `.mobile-card`: Consistent card styling with responsive padding
- `.mobile-form-input`: Clean form input styling with bottom borders
- `.mobile-menu`: Mobile menu container with proper shadows

#### Responsive Breakpoints
- `sm:` (640px+): Small tablets and up
- `lg:` (1024px+): Desktop and up

### Color Scheme
- **Background**: Light gray (`bg-gray-50`)
- **Cards**: White with subtle shadows
- **Text**: Dark gray for readability
- **Accents**: Gray for buttons and interactive elements

### Typography
- **Headings**: Bold with responsive sizing (`text-lg sm:text-xl`)
- **Body Text**: Regular weight with good line height
- **Mobile**: Slightly larger text for better readability

## Implementation Details

### File Structure
```
client/src/pages/home.tsx          # Main mobile-first home page
client/src/index.css               # Mobile-specific CSS improvements
```

### Key Features
1. **Sticky Header**: Navigation stays at top on scroll
2. **Form Validation**: Required fields with proper error handling
3. **Smooth Transitions**: Hover effects and state changes
4. **Accessibility**: Proper ARIA labels and keyboard navigation
5. **Performance**: Optimized for mobile devices

### Browser Support
- Modern browsers with CSS Grid support
- Mobile Safari and Chrome
- Responsive design works on all screen sizes

## Usage

1. **Development**: Run `npm run dev` to start the development server
2. **Mobile Testing**: Use browser dev tools to test mobile viewport
3. **Responsive Testing**: Test across different screen sizes
4. **Form Testing**: Submit the contact form to see validation

## Customization

### Content Updates
- Update coach information in `shared/content.ts`
- Modify contact details in the site configuration
- Add new services to the sessions section

### Styling Changes
- Modify CSS variables in `index.css` for color changes
- Update mobile breakpoints in Tailwind config
- Adjust spacing and typography as needed

### Adding Features
- Extend the mobile menu with additional pages
- Add more form fields to the contact form
- Implement actual form submission functionality
- Add image upload for profile pictures

## Mobile Optimization Tips

1. **Touch Targets**: All buttons and links are at least 44px
2. **Font Sizes**: 16px minimum to prevent iOS zoom
3. **Spacing**: Adequate padding for thumb navigation
4. **Performance**: Optimized images and minimal JavaScript
5. **Loading**: Fast initial page load for mobile networks