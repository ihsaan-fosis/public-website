export function GET() {
  return new Response(`# IHSAAN

IHSAAN elevates faith-driven talent. Public site for Muslim students and young professionals across the UK and Ireland.

## Routes

- [/](/) Home
- [/about](/about) Our story
- [/gallery](/gallery) Gallery
- [/contact](/contact) Contact
- [/ticket](/ticket) Get involved

## Contact

ihsaan@fosis.org.uk
https://ihsaan.network
https://www.instagram.com/ihsaan.network/
https://linkedin.com/company/ihsaan-network/
`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
