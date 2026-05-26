# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e4]:
    - heading "Authentication Required" [level=1] [ref=e6]
    - generic [ref=e7]:
      - generic [ref=e9]:
        - textbox "Enter visitor password" [active] [ref=e10]:
          - /placeholder: Visitor password
        - button "Unlock" [ref=e11] [cursor=pointer]
      - generic [ref=e12]:
        - separator [ref=e13]
        - generic [ref=e14]: OR
      - link "Log in with Vercel" [ref=e16] [cursor=pointer]:
        - /url: https://vercel.com/sso-api?url=https%3A%2F%2Fopti-inte.icf.com%2F&nonce=adbe25478a3c07c5296105f15485d2f8a86216dceece925ab49cd24001f4b7de
        - img [ref=e17]
        - text: Log in with Vercel
  - link "Vercel Authentication" [ref=e20] [cursor=pointer]:
    - /url: https://vercel.com/security?utm_source=protection
```