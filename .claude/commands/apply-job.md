Apply to a job using the Playwright MCP browser.

Usage: /apply-job <job-url>

Steps:
1. Read `job-search/profile.md` to load my personal info, standard answers, and resume path.
2. Open the job URL in Playwright and read the full job description.
3. Show me a brief summary: company, role, key requirements, application method (portal/email/LinkedIn Easy Apply).
4. Ask for confirmation: "Ready to apply to [Role] at [Company]? (yes/no)" — STOP and wait.
5. Once I confirm:
   a. If LinkedIn Easy Apply: click Easy Apply, fill all fields using my profile, upload resume from the path in profile.md, review each page with me before submitting.
   b. If company portal (Greenhouse/Lever/Ashby): navigate the form, fill fields using my profile data. For free-text questions, draft tailored answers using the job description + my profile. Show me each answer before typing it.
   c. If email application: draft a tailored cover letter (see /draft-cover-letter), show it to me, then use Gmail to send after my approval.
6. At any CAPTCHA or unusual step: pause and tell me "Manual step needed: [describe what to do]".
7. After successful submission: update `job-search/applications.md` — change the row's status from `approved` to `applied` and add today's date.

Important: Never submit a form without my explicit final confirmation. Show me the filled form before hitting submit.
