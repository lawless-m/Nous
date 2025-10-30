# GitHub Actions Workflows

This project uses GitHub Actions to automatically build TypeScript and deploy to GitHub Pages.

## Workflows

### 1. Build TypeScript (`build-typescript.yml`)

**Triggers:**
- Push to `main`, `3d`, or any `claude/**` branch
- When files in `src/`, `package.json`, or `tsconfig.json` change
- Pull requests to `main` or `3d`

**What it does:**
1. Checks out the repository
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Runs `npm run build` to compile TypeScript
5. Commits the built `dist/` files back to the branch (with `[skip ci]` to prevent loops)
6. Pushes the changes

**Benefits:**
- No need to run `npm run build` locally
- Ensures `dist/` is always up-to-date
- Works on any branch, including Claude Code session branches
- Pull requests are validated but changes aren't committed

**Note:** The commit message includes `[skip ci]` to prevent infinite loops of builds triggering builds.

### 2. Deploy to GitHub Pages (`deploy-pages.yml`)

**Triggers:**
- Push to `main` branch
- Manual trigger via workflow_dispatch

**What it does:**
1. Checks out the repository
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Runs `npm run build` to compile TypeScript
5. Uploads the entire directory as a Pages artifact
6. Deploys to GitHub Pages

**Setup Required:**

1. Go to your repository: https://github.com/[username]/Nous/settings/pages
2. Under **Source**, select "GitHub Actions"
3. Save

After the first push to `main`, your app will be live at:
`https://[username].github.io/Nous/`

## Workflow Permissions

Both workflows use standard `GITHUB_TOKEN` permissions:
- `build-typescript.yml`: Needs write access to push commits
- `deploy-pages.yml`: Needs Pages write permission to deploy

No additional secrets required!

## Development Workflow

### Working on a Feature Branch

1. Create/checkout your branch:
   ```bash
   git checkout -b my-feature
   ```

2. Edit TypeScript files in `src/`:
   ```bash
   vim src/logo-interpreter.ts
   ```

3. Commit and push:
   ```bash
   git add src/
   git commit -m "Add new feature"
   git push origin my-feature
   ```

4. GitHub Actions automatically builds and commits `dist/`:
   - Wait ~1-2 minutes for the workflow
   - Pull the latest changes:
   ```bash
   git pull
   ```

5. Your `dist/` folder is now updated!

### Merging to Main

When you merge to `main`:
1. TypeScript is built
2. Changes are committed to `main`
3. GitHub Pages deployment triggers
4. Your live site updates

## Disabling Auto-Build (if needed)

If you prefer to build locally and don't want GitHub Actions to auto-commit:

1. Comment out or delete the "Commit built files" and "Push changes" steps in `build-typescript.yml`
2. Or delete the workflow file entirely
3. Make sure to commit your `dist/` files manually

## Monitoring Workflows

View workflow runs:
- https://github.com/[username]/Nous/actions

Each run shows:
- Build logs
- Success/failure status
- Deployment URLs (for Pages workflow)

## Troubleshooting

### Build fails with "npm ci can run only with an existing package-lock.json"
- Solution: Commit `package-lock.json` to the repository

### Changes not appearing after push
- Check the Actions tab for workflow status
- Make sure the workflow completed successfully
- Pull the latest changes: `git pull`

### GitHub Pages 404 error
- Ensure Pages is enabled in repository settings
- Check that `index.html` is in the root directory
- Verify the workflow completed successfully

### Permission denied on push
- Ensure the repository allows GitHub Actions to create commits
- Go to Settings → Actions → General → Workflow permissions
- Select "Read and write permissions"
