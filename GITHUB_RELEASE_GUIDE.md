# 📋 GitHub Release Creation Guide — v1.0.0

## Steps to Create Release on GitHub.com

### Step 1: Navigate to Releases Page

1. Go to your GitHub repository: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI
2. Click on the **"Releases"** link in the right sidebar
   - Or go directly to: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/releases

### Step 2: Create New Release

1. Click the **"Create a new release"** button (green button on the releases page)
2. Or click **"Draft a new release"** if there are existing releases

### Step 3: Select Tag

1. In the **"Choose a tag"** dropdown, select **`v1.0.0`**
   - This is the tag we already created and pushed to GitHub
   - If you don't see it, click **"Create new tag"** and enter `v1.0.0`

### Step 4: Fill in Release Details

#### Release Title

```
ShopWave v1.0.0 — Full-Stack E-Commerce Platform (Initial Release)
```

#### Release Description

1. Click in the text area below the title
2. Copy the full content from [RELEASE_NOTES_v1.0.0.md](./RELEASE_NOTES_v1.0.0.md)
3. Paste it into the description field
4. Or manually type the key highlights from that file

**Quick Summary** (if you prefer to write your own):

```markdown
🎉 Welcome to ShopWave v1.0.0 — The first stable release!

## ✨ Major Features

- Complete e-commerce storefront with product discovery
- Powerful admin dashboard with analytics
- Full shopping cart and checkout flow
- User authentication with email verification
- Enterprise-grade security with JWT & Bcrypt
- RESTful API with all CRUD operations
- Responsive glassmorphic design
- CI/CD pipeline with GitHub Actions

## 🛠️ Tech Stack

- Frontend: Angular 22 + RxJS
- Backend: Express 5 + Node.js 22
- Database: MongoDB + Mongoose
- Security: JWT + Bcrypt
- Media: Cloudinary CDN

See [CHANGELOG.md](./CHANGELOG.md) for complete details.
```

### Step 5: Add Release Artifacts

Click **"Attach binaries..."** to add artifacts:

#### Frontend Build Artifact

1. Locate the file: `Frontend/dist/frontend/`
2. Create a ZIP archive: `shopwave-frontend-v1.0.0.zip`
3. Upload the ZIP file
4. Add description: "Frontend production build - Angular 22"

#### Source Code Archive

1. This is automatically included by GitHub
2. GitHub will create: `Source code (zip)` and `Source code (tar.gz)`

#### (Optional) Backend Setup Guide

1. Create a file: `INSTALLATION_GUIDE.md`
2. Include detailed setup steps
3. Upload as artifact

### Step 6: Release Options

- **✅ This is a pre-release**: Leave UNCHECKED (this is a stable release)
- **✅ Set as the latest release**: Leave CHECKED
- **✅ Create a discussion for this release**: Optional

### Step 7: Publish Release

1. Click the **"Publish release"** button (green)
2. GitHub will process and publish the release
3. Release will be visible at: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/releases/tag/v1.0.0

---

## 📦 How to Create Frontend Build Archive

If you need to create the ZIP file for upload:

### Windows (PowerShell)

```powershell
cd Frontend/dist
Compress-Archive -Path frontend -DestinationPath "../shopwave-frontend-v1.0.0.zip"
```

### Mac/Linux

```bash
cd Frontend/dist
zip -r ../shopwave-frontend-v1.0.0.zip frontend/
```

---

## ✅ Release Checklist

Before publishing, verify:

- [x] **Git Tag Created**: `v1.0.0` pushed to GitHub ✓
- [x] **CHANGELOG.md**: Added and committed ✓
- [x] **Frontend Build**: Completed successfully ✓
- [x] **Release Notes**: Ready in RELEASE_NOTES_v1.0.0.md ✓
- [ ] **Artifacts Ready**: Frontend build ZIP (optional but recommended)
- [ ] **Documentation**: README, API docs available ✓
- [ ] **Tests Passing**: CI/CD checks passed ✓

---

## 📝 What Happens After Publishing

1. **GitHub creates release page** with your notes and artifacts
2. **Release becomes discoverable** on the Releases page
3. **Notification sent** to watchers of the repository
4. **Downloadable archives** created automatically
5. **Can be referenced** in discussions, PRs, and documentation

---

## 🔗 Useful Links

- **Your Repository**: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI
- **Releases Page**: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/releases
- **New Release Form**: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/releases/new
- **Tag View**: https://github.com/Steven-Amin02/Ecommerce-MEAN-Stack-NTI/releases/tag/v1.0.0

---

## 💡 Tips

1. **GitHub Flavored Markdown**: You can use GFM in the release description
2. **Link to Files**: Use relative links like `[README](./README.md)` or full GitHub URLs
3. **Code Blocks**: Use triple backticks ` ```language ``` `
4. **Emojis**: Add visual interest with emojis (🚀, ✨, 🐛, etc.)
5. **Preview Before Publish**: Use "Preview" tab to check formatting
6. **Edit After Publishing**: You can edit the release after publishing

---

## 🎯 Alternative: Using GitHub CLI

If you have GitHub CLI installed (`gh`), you can create the release from terminal:

```bash
gh release create v1.0.0 \
  --title "ShopWave v1.0.0 — Full-Stack E-Commerce Platform" \
  --notes-file RELEASE_NOTES_v1.0.0.md \
  Frontend/dist/frontend.zip
```

Or automatically from CHANGELOG:

```bash
gh release create v1.0.0 --generate-notes
```

---

## ❓ Need Help?

- **GitHub Release Docs**: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
- **GitHub CLI Docs**: https://cli.github.com/manual/gh_release_create
- **Semantic Versioning**: https://semver.org/

---

**Your v1.0.0 release is ready! 🚀**
