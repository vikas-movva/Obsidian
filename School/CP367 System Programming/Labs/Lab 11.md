```bash
# On 'master' branch, make conflicting changes
echo "Conflict start" > conflict.txt
git add conflict.txt
git commit -m "Add conflict on master"

# Switch to 'new-branch' and make conflicting changes
git checkout new-branch
echo "Conflict from new-branch" > conflict.txt
git add conflict.txt
git commit -m "Add conflict on new-branch"

# Switch back to 'master' and attempt to merge 'new-branch'
git checkout master
git merge new-branch
# This will result in a conflict.

# Resolve the conflict by editing 'conflict.txt', then add and commit it
git add conflict.txt
git commit -m "Resolve merge conflict"

```