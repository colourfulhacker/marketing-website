# Overview

This is a comprehensive Next.js-based careers and partnership portal for Cehpoint, a technology solutions company. The site showcases 10 technology services with detailed pricing and commission structures, multiple job positions with roles & responsibilities, internship options for candidates not fully ready, and a partner/consultant program with 3-hour training for same-day activation. The application features an interactive landing page with service pricing transparency, expandable job cards showing performance expectations (using soft language, not "targets"), and multiple application pathways (full-time, internship, partner program). The project emphasizes a modern, "masterpiece" design with Framer Motion animations and is production-ready for Vercel deployment.

# User Preferences

- Preferred communication style: Simple, everyday language
- Use soft language for performance expectations - avoid calling them "targets" to prevent scaring candidates
- Maintain modern gradient design with purple/pink theme
- Focus on transparency in pricing and commission structures

# System Architecture

## Frontend Architecture

**Framework Choice: Next.js 15 with TypeScript**
- Problem: Need for a modern, SEO-friendly, and performant web application with TypeScript support
- Solution: Next.js Pages Router architecture providing server-side rendering capabilities and API routes
- Rationale: Next.js offers excellent developer experience, built-in routing, and optimized production builds. The Pages Router pattern is used (not App Router), with pages defined in the `/pages` directory
- Pros: Strong TypeScript support, automatic code splitting, excellent performance, SEO-friendly
- Cons: May be overkill for simple static sites, learning curve for Next.js-specific patterns

**UI/Animation Layer: Framer Motion + Tailwind CSS 4**
- Problem: Need for smooth, professional animations and modern styling
- Solution: Framer Motion for declarative animations and Tailwind CSS 4 for utility-first styling
- Rationale: Framer Motion provides production-ready animation components with minimal configuration. Tailwind CSS 4 offers rapid development with a modern design system
- Pros: Excellent animation performance, declarative API, rapid styling development
- Cons: Bundle size considerations for Framer Motion, Tailwind requires learning utility classes

**State Management**
- Problem: Managing form state and navigation between questionnaire steps
- Solution: React hooks (useState, useEffect) for local component state
- Rationale: The application's state requirements are relatively simple, focusing on form inputs and UI state
- Pros: Simple, no external dependencies, built into React
- Cons: May need refactoring if state complexity grows significantly

## Routing and Navigation

**Client-Side Navigation**
- Problem: Transitioning between job selection and questionnaire pages
- Solution: Next.js router with query parameters for job selection (`/questionnaire?job=...`)
- Rationale: Uses Next.js's built-in routing with URL parameters to pass job context between pages
- Pros: SEO-friendly URLs, sharable links, browser history support
- Cons: State lost on page refresh (though job title is preserved in URL)

## Component Structure

**Page-Based Architecture**
- `/pages/index.tsx` - Landing page with services pricing and job position cards
- `/pages/partner-program.tsx` - Partner/consultant program with 3-hour training
- `/pages/questionnaire.tsx` - Multi-step form for application questions
- `/pages/salary-calculator.tsx` - Salary calculator based on services sold
- `/pages/confirmation.tsx` - Application confirmation page
- `/pages/privacy-policy.tsx` - Privacy policy page
- `/pages/terms.tsx` - Terms and conditions page
- `/pages/_app.tsx` - Global app wrapper with Layout component
- `/pages/api/send-whatsapp.ts` - API endpoint for WhatsApp notifications

**Data Architecture (Developer-Friendly)**
- `/data/types.ts` - TypeScript interfaces for Service and JobPosition
- `/data/services.ts` - All 10 services with pricing, commission rates, targets, and earning potential
- `/data/jobs.ts` - All 7 job positions with responsibilities, services promoted, performance expectations, and monthly goals
- Pattern: Clean separation of data from presentation for maintainability
- Pros: Easy to update services/jobs, type-safe, scalable
- Cons: None - this is best practice for data-driven applications

## Configuration

**Development Environment**
- Custom port configuration (5000) with hostname binding for Replit compatibility
- Allowed dev origins configured through REPLIT_DOMAINS environment variable
- Telemetry disabled for privacy

**Production Configuration (Vercel Deployment)**
- `vercel.json` with security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)
- `next.config.ts` with React strict mode, compression, HSTS, and image optimization
- All ESLint errors resolved for successful production builds
- Production build tested and passing (✓ Compiled successfully)

**TypeScript Configuration**
- Strict mode disabled for flexibility
- Target ES2017 for broad compatibility
- Incremental compilation enabled for faster builds

# External Dependencies

## Core Framework Dependencies

**Next.js (v15.2.3)**
- Purpose: React framework for production-grade applications
- Usage: SSR, routing, API routes, build optimization

**React (v19.0.0) & React DOM (v19.0.0)**
- Purpose: UI component library
- Usage: Component rendering and state management

## UI/Animation Libraries

**Framer Motion (v12.23.24)**
- Purpose: Production-ready animation library
- Usage: Page transitions, card animations, interactive elements
- Key Features: AnimatePresence for exit animations, motion components for smooth transitions

**Tailwind CSS (v4.0.15)**
- Purpose: Utility-first CSS framework
- Usage: Styling, responsive design, design system
- Custom CSS Variables: Defined in `globals.css` for consistent theming (primary, secondary, background, surface colors)

## Development Dependencies

**TypeScript (v5.8.2)**
- Purpose: Static type checking
- Usage: Type safety across the application

**ESLint (v9.23.0) with Next.js config**
- Purpose: Code quality and consistency
- Usage: Linting TypeScript and React code with Next.js best practices

## Font Integration

**Google Fonts (Inter)**
- Purpose: Modern, readable typography
- Usage: Primary font family loaded from Google Fonts CDN
- Implementation: Imported in `globals.css` with multiple weights (300-900)

## Hosting Environment

**Replit Platform Integration**
- Special configuration for Replit's development environment
- Custom port binding (5000) and hostname (0.0.0.0)
- Domain whitelisting through environment variables for security

## Recent Changes (November 2025)

### Services Section
- Added 10 technology services with detailed pricing ranges (₹30K to ₹50L)
- Commission rates (10-30%) and average deal sizes per service
- Monthly targets and potential monthly earnings calculator
- Complete transparency for partners/consultants

### Job Positions
- 7 positions with expandable roles & responsibilities sections
- Services promoted per role clearly defined
- Performance expectations using soft, encouraging language (not "targets")
- Monthly benchmarks that show "what success looks like"
- Dual application paths: Full-time and Internship options

### Partner/Consultant Program
- Standalone `/partner-program` page with 3-hour training program
- 4 training modules covering sales basics to commission structures
- Partner tiers (Silver, Gold, Platinum) with progressive benefits
- Same-day activation for freelancers, agents, and sales partners
- Clear earnings calculator and commission structure

### Code Quality & Deployment
- Refactored to developer-friendly structure with `data/` folder
- TypeScript types for all entities
- All ESLint errors resolved
- Production build passing for Vercel deployment
- Security headers configured in both next.config.ts and vercel.json

## Missing/Potential Integrations

The application currently lacks:
- Database integration (no user data persistence)
- Email service for application submissions (uses WhatsApp API currently)
- Authentication system (if admin panel needed)
- Analytics tracking (though telemetry is disabled)