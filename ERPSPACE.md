# Updating to a New Stable Release

## Manually

1. **Fetch updates from upstream**:
   ```
   git fetch upstream --tags
   ```

2. **Identify the new stable tag** (latest non-pre-release version):
   ```
   git tag -l 'v*' | grep -vE '(alpha|beta|rc)' | sort -V | tail -n 1
   ```
   Note this as `NEW_TAG` (e.g., `v1.8.25`). Your previous base is `OLD_TAG`
   (e.g., `v1.8.24`).

3. **Rebase your changes onto the new tag**:
   ```
   git checkout erpspace
   git rebase --onto NEW_TAG OLD_TAG erpspace
   ```
   - If conflicts occur, resolve manually (edit files, then `git add <files>`,
     `git rebase --continue`).
   - To abort: `git rebase --abort`.

4. **Commit**:
   - Commit fixes if needed: `git add . && git commit -m "Fix after rebase"`.

5. **Push to your fork**:
   ```
   git push origin erpspace --force-with-lease
   ```

6. **Update OLD_TAG**:
   - Record `NEW_TAG` as the new `OLD_TAG` for the next update.

Repeat these steps when a new stable release is available (watch the upstream
repo for notifications).

## Automation Scripts

Use the provided shell scripts to automate fetching and rebasing. Save them,
make executable (`chmod +x <script>.sh`), and run with `./<script>.sh`.

### `fetch_latest_tag.sh`

Fetches upstream tags and outputs the latest stable tag.

### `update_to_new_tag.sh`

Automates fetching and rebasing (requires `OLD_TAG` as an argument or
environment variable).

**Usage Notes**:

- Scripts do not handle conflict resolution; resolve manually as prompted.
- Backup your branch before rebasing: `git branch backup erpspace`.
- Customize tag patterns (e.g., `v*`) if upstream changes their naming.
- Test the application after rebasing to ensure functionality.
