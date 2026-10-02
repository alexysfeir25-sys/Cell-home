# Cell Home Renewals

Tracker for Cell Home's Netflix and Shahid customers, stock accounts, reminders, pending payments and balance. It runs on GitHub Pages, keeps its data in Firebase, and can be installed on a phone like an app.

**Never upload `cell-home-backup.json` to this repository.** GitHub Pages sites are public, and that file holds customer names and account passwords.

## Files

| File | What it is |
|---|---|
| `index.html` | The app |
| `firebase-config.js` | Your Firebase settings (paste them in once) |
| `firestore.rules` | Security rules to paste into Firebase (only your account can read the data) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Make the app installable and let it open offline |

## Setup

### 1. Create the Firebase project
1. Go to https://console.firebase.google.com and sign in with alexysfeir25@gmail.com.
2. **Create a project**, name it `cell-home`, and turn off Google Analytics.
3. Go to **Build → Authentication → Get started**. Enable **Google**, then enable **Email/Password**.
4. Go to **Build → Firestore Database → Create database**. Choose a location near Lebanon (for example `eur3 (europe)`) and **production mode**.
5. Open the **Rules** tab, replace everything with the contents of `firestore.rules`, and click **Publish**.
6. Go to **Project settings** (gear icon) → **Your apps** → the web icon `</>`. Name it `cell-home` and register it without Hosting.
7. Copy the values from the `firebaseConfig` block it shows into `firebase-config.js`.

### 2. Put it on GitHub Pages
1. On GitHub, create a new **public** repository named `cell-home`.
2. Click **Add file → Upload files**, drag in every file and the `icons` folder, and click **Commit changes**.
3. Go to **Settings → Pages**. Under Branch, choose `main` and `/ (root)`, then click **Save**.
4. After a minute the site is live at `https://YOUR-USERNAME.github.io/cell-home/`.

### 3. Allow the website in Firebase
In Firebase, go to **Authentication → Settings → Authorized domains → Add domain** and enter `YOUR-USERNAME.github.io`.

### 4. Load your data
1. Open the site and tap **Continue with Google**.
2. On the Customers page, click **Restore backup** and choose `cell-home-backup.json`.

### 5. Install on your phone
- **iPhone:** open the site in Safari, tap Share, then **Add to Home Screen**.
- **Android:** open the site in Chrome, tap ⋮, then **Install app** (or **Add to Home screen**).

Sign in with the same Google account on every device so they share the same data.

## Updating the app later
Upload the new `index.html` to the repository (same name, it replaces the old one). Your data stays in Firebase and isn't affected.
