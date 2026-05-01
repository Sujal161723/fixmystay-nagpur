# FixMyStay - Authentication & Image Upload Setup Guide

## ✅ Authentication System - COMPLETE

The authentication system is now fully implemented with Firebase Auth supporting three user roles:

### 🔐 User Roles

1. **Admin** - Full platform management access
2. **Hotel Owner** - Can list and manage properties
3. **User/Guest** - Can browse and book properties

### 🚀 What's Been Implemented

#### 1. Firebase Authentication
- Email/Password authentication
- Role-based access control
- User profile management
- Protected routes

#### 2. Login Page (`/auth/login`)
- Email/password login
- Password visibility toggle
- Error handling
- Loading states
- "Forgot password" link

#### 3. Signup Page (`/auth/signup`)
- Full registration form
- Role selection (Admin/Hotel Owner/User)
- Password confirmation
- Form validation
- Real-time error feedback

#### 4. Authentication Context
- Global auth state management
- User role detection
- Protected route handling
- Logout functionality

#### 5. Updated Navbar
- Shows user profile when logged in
- Role badges (Admin/Owner)
- Dropdown menu with navigation
- Logout button

#### 6. Admin Dashboard (`/admin`)
- Overview with stats
- Pending approvals management
- Property submission form
- Role-based access control

---

## 📸 Cloudinary Image Upload Setup

### Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com)
2. Click "Sign Up Free"
3. Complete registration

### Step 2: Get Your Credentials

1. Log into Cloudinary Dashboard
2. Note your **Cloud Name** (displayed on the main page)
3. Go to **Settings** → **Upload**
4. Under "Upload presets", click "Add upload preset"
5. Set:
   - **Signing Mode**: Unsigned
   - **Preset name**: `fixmystay_uploads` (or any name you prefer)
   - **Folder**: `fixmystay` (optional)
   - **Overwrite**: false
   - **Unique filename**: true
6. Click "Save"

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=fixmystay_uploads
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

### Step 4: Test Image Upload

1. Go to `/admin` (must be logged in as Admin or Hotel Owner)
2. Click "Add Property" tab
3. Scroll to "Property Images" section
4. Click to upload images
5. Images will be uploaded to Cloudinary and previews will appear

---

## 🧪 Testing the Authentication

### Create Test Accounts

1. **Admin Account**:
   - Go to `/auth/signup`
   - Fill in details
   - Select "Admin" role
   - Complete registration

2. **Hotel Owner Account**:
   - Go to `/auth/signup`
   - Fill in details
   - Select "Hotel Owner" role
   - Complete registration

3. **User Account**:
   - Go to `/auth/signup`
   - Fill in details
   - Select "Guest" role (default)
   - Complete registration

### Test Login/Logout

1. Log in with any account
2. Verify navbar shows user profile
3. Click profile to see dropdown menu
4. Test logout functionality
5. Verify navbar returns to login/signup buttons

### Test Admin Dashboard

1. Log in as Admin or Hotel Owner
2. Navigate to `/admin`
3. Test all three tabs:
   - **Overview**: View statistics
   - **Pending Approvals**: Approve/reject properties
   - **Add Property**: Submit new property with images

---

## 📁 File Structure

```
src/
├── app/
│   ├── auth/
│   │   ├── login/page.js          # Login page
│   │   └── signup/page.js         # Signup page with role selection
│   ├── admin/page.js              # Admin dashboard with property form
│   ├── api/upload/route.js        # Cloudinary upload API
│   └── layout.js                  # Root layout with AuthProvider
├── components/
│   ├── shared/Navbar.js           # Updated with auth state
│   └── ui/
│       ├── ImageUpload.js         # Cloudinary image upload component
│       └── PropertyForm.js        # Property submission form
├── contexts/
│   └── AuthContext.js             # Authentication context provider
└── lib/firebase.ts                # Firebase configuration
```

---

## 🔧 Firebase Configuration

Firebase is already configured in `src/lib/firebase.ts` with the following project:

- **Project ID**: fixmystay-ngp
- **Auth Domain**: fixmystay-ngp.firebaseapp.com

### Enable Authentication Methods in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: `fixmystay-ngp`
3. Go to **Authentication** → **Sign-in method**
4. Enable **Email/Password**
5. Save changes

---

## 🎯 Key Features

### Authentication
- ✅ Email/Password login
- ✅ Role-based access (Admin, Hotel Owner, User)
- ✅ Protected routes
- ✅ User profile management
- ✅ Logout functionality

### Image Upload
- ✅ Cloudinary integration
- ✅ Multiple image upload (up to 5)
- ✅ Image validation (size, type)
- ✅ Upload progress indicator
- ✅ Image preview with remove option
- ✅ Primary image indicator

### Admin Features
- ✅ Property statistics dashboard
- ✅ Pending approvals management
- ✅ Property submission form
- ✅ Approve/Reject functionality
- ✅ Role-based access control

---

## 🐛 Troubleshooting

### Images Not Uploading?

1. Check Cloudinary credentials in `.env.local`
2. Verify upload preset is set to "Unsigned"
3. Check browser console for errors
4. Ensure file size is under 5MB
5. Restart development server after `.env.local` changes

### Authentication Not Working?

1. Verify Firebase is properly initialized
2. Check Firebase console for authentication errors
3. Ensure Email/Password is enabled in Firebase Auth
4. Clear browser cache and cookies
5. Check browser console for errors

### Can't Access Admin Dashboard?

1. Ensure you're logged in
2. Check user role in Firebase (must be 'admin' or 'hotel_owner')
3. Verify user document exists in Firestore `users` collection
4. Check browser console for errors

---

## 📝 Next Steps

After testing, you can:

1. **Deploy to Production**:
   - Set up environment variables in Vercel/Netlify
   - Configure Firebase production settings
   - Set up Cloudinary for production

2. **Enhance Security**:
   - Add email verification
   - Implement password reset
   - Add two-factor authentication
   - Use signed Cloudinary uploads

3. **Add More Features**:
   - User profile editing
   - Property editing/deletion
   - Booking system
   - Payment integration

---

## 📞 Support

If you encounter any issues:

1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure Firebase and Cloudinary are properly configured
4. Review the code comments for guidance

---

**Setup completed successfully! 🎉**

Your authentication system is now live with:
- ✅ Firebase Email/Password Auth
- ✅ 3 User Roles (Admin, Hotel Owner, User)
- ✅ Cloudinary Image Upload
- ✅ Working Admin Dashboard
- ✅ Property Submission Form

Visit http://localhost:3000 to see your app!