# Thumblify Frontend

AI-powered YouTube thumbnail generator built with React, TypeScript, and Tailwind CSS. Create stunning, professional thumbnails with customizable styles, color schemes, and aspect ratios.

## 🌟 Features

- 🎨 **AI-Powered Generation** - Create unique thumbnails using advanced AI models
- 🖼️ **Multiple Styles** - Choose from Bold & Graphic, Tech/Futuristic, Minimalist, Photorealistic, and Illustrated styles
- 🌈 **Color Schemes** - 8+ color scheme options (Vibrant, Sunset, Forest, Neon, Purple, Monochrome, Ocean, Pastel)
- 📐 **Flexible Aspect Ratios** - Support for 16:9, 9:16, 1:1, and 4:3 ratios
- 👤 **User Authentication** - Secure login and registration system
- 📚 **Generation History** - Keep track of all your created thumbnails
- 🎯 **YouTube Preview** - See how your thumbnail looks on YouTube
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✨ **Smooth Animations** - Enhanced UX with Motion and Lenis smooth scrolling

## 🛠️ Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM
- **Animations:** Motion (Framer Motion fork)
- **Smooth Scrolling:** Lenis
- **HTTP Client:** Axios
- **UI Components:** Lucide React (icons)
- **Notifications:** React Hot Toast
- **Marquee Effects:** React Fast Marquee

## 📁 Project Structure

```
src/
├── assets/
│   ├── assets.ts              # Type definitions and constants
│   └── prompts-for-backend.txt
├── components/
│   ├── AspectRatioSelector.tsx    # Aspect ratio picker
│   ├── ColorSchemeSelector.tsx    # Color scheme selector
│   ├── Footer.tsx                 # Footer component
│   ├── LenisScroll.tsx           # Smooth scroll wrapper
│   ├── Login.tsx                 # Login/Register modal
│   ├── Navbar.tsx                # Navigation bar
│   ├── PreviewPanel.tsx          # Thumbnail preview
│   ├── SectionTitle.tsx          # Section headers
│   ├── SoftBackdrop.tsx          # Background blur effect
│   ├── StyleSelector.tsx         # Style picker
│   ├── TestimonialCard.tsx       # Testimonial display
│   └── TiltImage.tsx             # 3D tilt effect
├── configs/
│   └── api.ts                    # Axios configuration
├── context/
│   └── AuthContext.tsx           # Authentication state
├── data/
│   ├── features.tsx              # Features data
│   ├── footer.ts                 # Footer links
│   ├── pricing.ts                # Pricing plans
│   └── testimonial.ts            # Testimonials data
├── pages/
│   ├── Generate.tsx              # Thumbnail generation page
│   ├── HomePage.tsx              # Landing page
│   ├── MyGeneration.tsx          # User's thumbnail history
│   └── YtPreview.tsx             # YouTube preview page
├── sections/
│   ├── ContactSection.tsx        # Contact form section
│   ├── CTASection.tsx            # Call-to-action section
│   ├── FeaturesSection.tsx       # Features showcase
│   ├── HeroSection.tsx           # Hero section
│   ├── PricingSection.tsx        # Pricing table
│   └── TestimonialSection.tsx    # Customer testimonials
├── App.tsx                       # Main app component
├── main.tsx                      # App entry point
├── globals.css                   # Global styles
└── types.ts                      # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see [backend README](../Thumblify%20backend/backend/README.md))

### Installation

1. **Clone the repository**
   ```bash
   cd Thumblify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

   For production:
   ```env
   VITE_BASE_URL=https://your-backend-api.vercel.app
   ```

### Running the Application

#### Development Mode
```bash
npm run dev
```

The application will start on `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

#### Lint Code
```bash
npm run lint
```

## 🌐 Available Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with features and pricing |
| `/generate` | Create new thumbnails |
| `/generate/:id` | Edit existing thumbnail |
| `/my-generation` | View generation history |
| `/preview` | Preview thumbnail on YouTube layout |
| `/login` | Login/Register modal |

## 🎨 Key Features Explained

### Authentication
- Session-based authentication with cookie management
- Login and registration forms
- Protected routes for authenticated users
- AuthContext for global auth state

### Thumbnail Generation
1. Enter video title or topic
2. Add optional additional information
3. Select aspect ratio (16:9, 9:16, 1:1, 4:3)
4. Choose thumbnail style
5. Pick color scheme
6. Generate AI-powered thumbnail
7. Download or preview on YouTube

### Style Options
- **Bold & Graphic** - Eye-catching with vibrant colors
- **Tech/Futuristic** - Modern with digital elements
- **Minimalist** - Clean and simple design
- **Photorealistic** - Natural and realistic
- **Illustrated** - Custom digital art style

### Color Schemes
- Vibrant, Sunset, Forest, Neon, Purple, Monochrome, Ocean, Pastel

## 🔧 Configuration

### API Configuration
The API base URL is configured in [src/configs/api.ts](src/configs/api.ts):
```typescript
baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000'
withCredentials: true // Enables cookie-based authentication
```

### Tailwind CSS
Using Tailwind CSS 4 with Vite plugin for optimal performance.

### ESLint
ESLint configured with React-specific rules for code quality.

## 📦 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Add `VITE_BASE_URL` in Vercel dashboard
   - Point to your backend API URL

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Other Platforms

The app can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

Just build the project and deploy the `dist` folder.

## 🎯 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_BASE_URL` | Backend API URL | ✅ | `http://localhost:3000` |

## 🔒 Security Features

- CORS-enabled API requests
- Secure cookie-based sessions
- Protected routes for authenticated users
- Input validation and sanitization

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## 🎨 Custom Components

### LenisScroll
Provides smooth scrolling experience across the application.

### SoftBackdrop
Creates beautiful backdrop blur effects for modals and overlays.

### TiltImage
Adds interactive 3D tilt effects to images.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- None at the moment

## 📞 Support

For issues or questions, please open an issue in the repository.

## 🙏 Acknowledgments

- Hugging Face for AI models
- Cloudinary for image hosting
- Tailwind CSS for styling system
- React team for the amazing framework
