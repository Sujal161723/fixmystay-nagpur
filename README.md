# FixMyStay - Premium Property & Stay Platform

![FixMyStay](https://img.shields.io/badge/FixMyStay-Production%20Ready-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-Enabled-ffca28?logo=firebase)

## 🏠 About FixMyStay

FixMyStay (fixmystay.in) is a premium property & stay platform focused on Nagpur, providing users with a comprehensive solution for:

- **Hotels & Resorts** - Daily bookings with instant confirmation
- **PG Stays** - Monthly rental accommodations
- **Rooms** - Long-term rental options
- **Real Estate** - Property rentals and sales

## ✨ Features

### 🎨 Design System
- **Soft Outlines** - Subtle borders for a clean, modern look
- **Glassmorphism Lite** - Frosted glass effects without heavy shadows
- **Mobile-First** - Native app-like experience on mobile browsers
- **Rounded-2xl** - Consistent soft rounded corners throughout

### 🔐 Role-Based Access Control (RBAC)
- **Staff** - Super Admin access to manage users, listings, and bookings
- **Vendor** - Property owners who can list and manage properties (requires KYC)
- **User** - Regular users who can browse, search, book, and send inquiries

### 📊 Dashboard System
- **Staff Dashboard** - Manage inquiries, bookings, property approvals, and vendor KYC
- **Vendor Dashboard** - OYO-style property management with stats and inquiries
- **User Dashboard** - Booking history, inquiries, wishlist, and profile settings

### 🏘️ Core Functionalities
- **Hybrid System**:
  - **Inquiry System** for PG/Flats/Sales (stores in 'inquiries' collection)
  - **Booking System** for Hotels/Resorts with date picker (stores in 'bookings' collection)
- **Location-Based Search** - Default city: Nagpur with area filters
- **KYC Verification** - Mandatory for vendors before listing properties

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sujal161723/fixmystay-nagpur.git
   cd fixmystay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure Firebase**
   
   Edit `.env.local` with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
fixmystay/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/page.js       # Login page
│   │   │   └── signup/page.js      # Signup with role selection
│   │   ├── dashboard/
│   │   │   ├── page.js             # User dashboard
│   │   │   ├── staff/page.js       # Staff admin panel
│   │   │   └── vendor/
│   │   │       ├── page.js         # Vendor property management
│   │   │       └── kyc/page.js     # KYC verification
│   │   ├── terms/page.js           # Terms & Conditions
│   │   ├── privacy/page.js         # Privacy Policy
│   │   ├── refund-policy/page.js   # Refund Policy
│   │   ├── partner/page.js         # Partner with FMS
│   │   ├── admin/page.js           # Legacy admin (redirects to staff)
│   │   ├── layout.js               # Root layout with providers
│   │   └── page.js                 # Homepage
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navbar.js           # Navigation with mobile menu
│   │   │   └── Footer.js           # Footer with all links
│   │   ├── listings/
│   │   │   ├── PropertyCard.jsx    # Property card component
│   │   │   ├── PropertyGrid.jsx    # Property grid layout
│   │   │   └── PropertyFilters.jsx # Search filters
│   │   └── ui/
│   │       ├── ImageUpload.js      # Cloudinary upload
│   │       └── PropertyForm.js     # Property submission form
│   ├── contexts/
│   │   └── AuthContext.js          # Authentication provider
│   ├── hooks/
│   │   └── useProperties.js        # Property data hooks
│   ├── lib/
│   │   └── firebase.ts             # Firebase configuration
│   ├── models/
│   │   └── property.js             # Property data model
│   └── styles/
│       └── globals.css             # Global styles with Tailwind v4
├── public/
├── .env.example
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Email/Password authentication
3. Create Firestore database
4. Copy your configuration to `.env.local`

### Firestore Collections

| Collection | Description |
|------------|-------------|
| `users` | User profiles with role and KYC status |
| `properties` | Property listings with status |
| `bookings` | Hotel/resort bookings |
| `inquiries` | PG/flat/real-estate inquiries |
| `wishlists` | User saved properties |

## 📱 Mobile Responsiveness

The platform is designed mobile-first with:
- Bottom navigation on mobile devices
- Slide-out menus for navigation
- Touch-friendly buttons and inputs
- Optimized images with Next.js Image

## 🛡️ Security Features

- Firebase Authentication with email verification
- Role-based access control
- KYC verification for vendors
- Secure API routes
- Environment variable protection

## 📄 Legal Pages

- [Terms & Conditions](/terms)
- [Privacy Policy](/privacy)
- [Refund Policy](/refund-policy)
- [Partner with FMS](/partner)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@fixmystay.in or join our Slack channel.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by the FixMyStay Team