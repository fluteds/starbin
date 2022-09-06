# Starbin

A hastebin-compatible paste site running on Cloudflare Pages.

Forked from https://github.com/LostLuma/starbin

Changes made:
- Added phonetic ID generation from haste-server
- Migrated from Workers to Pages

To deploy: 

- Fork repo
- Deploy as a new Pages project using the `static` directory
- Map a KV namespace called `STORAGE`
  
It's that simple. 🎉

All static assets are copied from the original [haste-server](https://github.com/seejohnrun/haste-server).
