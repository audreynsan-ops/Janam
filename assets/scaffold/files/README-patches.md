# How to apply patches to downloaded modules

The `patches/` folder is ignored by Git because its contents are copied there 
automatically from dependency packages during Composer operations. This keeps
generated patch files out of version control.

If you need to add a custom patch manually, force it to be tracked by Git, for
example:

```shell
git add -f patches/<your-patch-file>.diff
```

To add a patch to drupal module foobar insert the patches section in the extra 
section of composer.json:

```json
"extra": {
    "patches": {
        "drupal/foobar": {
          "Patch description": "URL or local path to patch"
        }
    }
}
```
