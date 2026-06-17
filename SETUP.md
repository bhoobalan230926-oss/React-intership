# 🚀 Career Connect - Setup Guide

Complete guide to set up, run, and deploy Career Connect.

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)
- **Git**: For version control (optional)
- **Browser**: Modern browser (Chrome, Firefox, Safari, Edge)

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:5173`

### 4. Login
Use demo credentials:
- Email: `demo@example.com`
- Password: `password`

## Available Scripts

### Development
```bash
npm run dev
```
- Starts Vite dev server with HMR
- Hot module replacement enabled
- Recommended for development

### Build
```bash
npm run build
```
- Creates optimized production build
- Outputs to `dist/` folder
- Minified CSS and JavaScript

### Preview
```bash
npm run preview
```
- Preview production build locally
- Useful for testing before deployment

### Lint
```bash
npm run lint
```
- Check code quality
- Uses ESLint configuration

## Project Setup

### 1. Folder Structure
```
react-internship-2026/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Page components
│   ├── context/         # Context API
│   ├── hooks/           # Custom hooks
│   ├── routes/          # Route protection
│   ├── utils/           # Utility functions
│   ├── data/            # Static data (jobs.json)
│   ├── assets/          # Images and icons
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/              # Static assets
├── dist/                # Production build (after npm run build)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── eslint.config.js
```

### 2. Configuration Files

#### tailwind.config.js
```javascript
- Tailwind CSS configuration
- Custom colors and animations
- Dark mode setup
```

#### postcss.config.js
```javascript
- PostCSS plugins configuration
- Tailwind CSS plugin included
- Autoprefixer for vendor prefixes
```

#### vite.config.js
```javascript
- Vite build configuration
- React plugin enabled
- Development server settings
```

#### package.json
```json
- Project metadata
- Dependencies list
- Scripts definitions
```

## Dependencies

### Runtime Dependencies
```
react@^19.2.6
react-dom@^19.2.6
react-router-dom@^6.x
axios@^1.x
react-hook-form@^7.x
react-toastify@^10.x
framer-motion@^10.x
react-icons@^4.x
```

### Dev Dependencies
```
@vitejs/plugin-react@^6.x
vite@^8.x
tailwindcss@^3.x
postcss@^8.x
autoprefixer@^10.x
@tailwindcss/postcss
```

## Environment Setup

### 1. Create .env file (Optional)
```bash
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Career Connect
```

### 2. Environment Variables
Currently using localStorage for state management. No backend required.

## Running the Application

### Development Mode
```bash
npm run dev
```
- Access at `http://localhost:5173`
- Hot reload enabled
- Development tools available

### Production Build
```bash
npm run build
npm run preview
```
- Optimized bundle
- Minified assets
- Ready for deployment

## Testing the Application

### 1. Landing Page
- [ ] View features and benefits
- [ ] Click "Get Started"
- [ ] Click "Sign In"

### 2. Registration
- [ ] Fill registration form
- [ ] Upload profile picture
- [ ] Submit form
- [ ] Verify redirect to dashboard

### 3. Login
- [ ] Enter demo credentials
- [ ] Test remember me option
- [ ] Verify dashboard access

### 4. Dashboard
- [ ] View statistics
- [ ] See featured jobs
- [ ] Browse by role categories
- [ ] Verify responsive design

### 5. Jobs Page
- [ ] Search for jobs
- [ ] Apply filters
- [ ] Test pagination
- [ ] Click job details

### 6. Job Details
- [ ] View full job info
- [ ] Save/bookmark job
- [ ] Share job
- [ ] Test apply button

### 7. Saved Jobs
- [ ] View bookmarked jobs
- [ ] Remove jobs
- [ ] Verify counter update

### 8. Companies
- [ ] Browse companies
- [ ] Search companies
- [ ] Visit company websites

### 9. Profile
- [ ] View user info
- [ ] Test theme toggle
- [ ] Logout

### 10. Responsive Design
- [ ] Test on mobile (375px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1920px)

## Deployment

### Vercel Deployment
1. Push code to GitHub
2. Go to vercel.com and sign up
3. Import project
4. Configure build settings
5. Deploy

### Netlify Deployment
1. Push code to GitHub
2. Go to netlify.com and sign up
3. New site from Git
4. Select repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Deploy

### Other Platforms
Works on any static hosting:
- AWS S3 + CloudFront
- Google Firebase Hosting
- GitHub Pages (with router config)
- Azure Static Web Apps

## Troubleshooting

### Issue: "Module not found"
**Solution**: Run `npm install` and verify node_modules exists

### Issue: "Cannot find tailwindcss"
**Solution**: 
```bash
npm install -D tailwindcss postcss autoprefixer
npm install -D @tailwindcss/postcss
```

### Issue: Port 5173 already in use
**Solution**: Use different port
```bash
npm run dev -- --port 3000
```

### Issue: Dark mode not working
**Solution**: Check localStorage for `career_connect_theme` key

### Issue: Saved jobs disappearing
**Solution**: Check localStorage quota and browser settings

### Issue: Search not working
**Solution**: Verify jobs data is loaded in JobContext

## Performance Tips

### 1. Optimize Images
- Use optimized image formats
- Consider lazy loading
- Use CDN for images

### 2. Code Splitting
- Already configured with Vite
- Dynamic imports for routes

### 3. Caching
- Service worker for PWA
- Browser caching headers

### 4. Minification
- Enabled by default in production build
- CSS and JS minified

## Development Workflow

### 1. Feature Development
```bash
git checkout -b feature/new-feature
npm run dev
# Make changes
npm run lint
npm run build
```

### 2. Testing
- Manual testing in browser
- Test all user flows
- Test on multiple devices

### 3. Commit
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

### 4. Deployment
- Merge to main branch
- Trigger deployment
- Verify live environment

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | Latest  |
| Firefox | Latest  |
| Safari  | Latest  |
| Edge    | Latest  |

## Performance Metrics

- **Build Time**: ~1.5s
- **Bundle Size**: ~510KB
- **Gzipped Size**: ~152KB
- **Lighthouse Score**: 95+

## Security

- HTTPS only recommended
- No sensitive data in code
- LocalStorage used safely
- Input validation implemented

## Documentation

- See `README.md` for features overview
- See component files for inline documentation
- See utility functions for helper documentation

## Support & Resources

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind Docs**: https://tailwindcss.com
- **React Router**: https://reactrouter.com

## Next Steps

1. ✅ Install and run the project
2. ✅ Test all features
3. ✅ Customize branding (optional)
4. ✅ Connect to real API (optional)
5. ✅ Deploy to production

---

**Happy coding! 🎉**
