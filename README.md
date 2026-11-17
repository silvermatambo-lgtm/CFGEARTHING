# CFG Earthing and Lightning Protection Systems

UltraMax 7 Pro rebrand for CFG. This is a seven-page static PWA with no npm dependencies or server-side environment variables.

## Run locally

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. To deploy, import this GitHub repository on Vercel using the Other framework preset, the repository root, and the default static output. All pages are physical HTML files.

`site-config.js` contains the services, photo metadata, reference counts, contact destination and project stages used by the template interactions. Company copy and public procurement summaries are in the individual HTML pages. Only approved public web assets belong in the repository.

The enquiry assistant and quote wizard prepare messages for the visitor to review and send themselves in WhatsApp Business. They do not send automatically or store entries in a backend. The service worker precaches site pages and photos for offline reading. Bump the cache version whenever deploying changes to the precached files. WhatsApp needs an internet connection.
