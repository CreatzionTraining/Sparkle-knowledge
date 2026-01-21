# 🔧 Setup Instructions for Cloudinary

## ⚠️ IMPORTANT: You need to add your Cloudinary credentials!

The error you're seeing (`Must supply api_key`) means the Cloudinary environment variables are not set.

### Step 1: Get Your Cloudinary Credentials

1. Go to [Cloudinary Console](https://console.cloudinary.com/)
2. Log in to your account (or create a free account)
3. On the Dashboard, you'll see:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Step 2: Update the `.env.local` File

Open the `.env.local` file in the root directory and replace the placeholder values:

```env
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

### Step 3: Restart the Development Server

After updating the `.env.local` file:

1. Stop the server (Ctrl+C in terminal)
2. Run `npm run dev` again
3. The Cloudinary integration should now work!

### ✅ What This Fixes:

- ✅ Blog post storage in Cloudinary
- ✅ News items storage in Cloudinary  
- ✅ Image uploads for blog posts
- ✅ Image library/gallery

---

## 📰 News Management Features

### What's New:

1. **Badge Dropdown** - 11 predefined badges + "Other" option
2. **Icon Selector** - Visual icons with emojis (9 options)
3. **12 Color Themes** - More gradient options
4. **Live Preview** - See how your news will look
5. **No Link Field** - Simplified (automatically uses #)
6. **Better Labels** - Clear, easy-to-understand field names

### How to Use:

1. Go to `/admin/news`
2. Click "Create News"
3. Select a badge category
4. Write your headline
5. Choose an icon
6. Pick a color theme
7. See the preview
8. Click "Publish News"

Your news will appear in the scrolling news bar on the homepage!

---

## 🎨 Available Options:

### Badge Categories:
- New Batch
- Achievement
- Admissions Open
- Free Webinar
- Limited Offer
- Success Story
- Announcement
- Event
- Workshop
- Scholarship
- Other (custom text)

### Icons:
- 🎓 Graduation
- 🏆 Trophy
- ✈️ Plane
- 📅 Calendar
- ✨ Sparkles
- ⭐ Star
- 📣 Megaphone
- 🔔 Bell
- 🎁 Gift

### Color Themes (12 total):
- Orange-Red
- Green-Teal
- Blue-Purple
- Purple-Pink
- Cyan-Blue
- Amber-Orange
- Pink-Rose
- Indigo-Blue
- Violet-Purple
- Lime-Green
- Yellow-Amber
- Teal-Cyan
