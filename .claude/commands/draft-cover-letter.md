Draft a tailored cover letter for a job.

Usage: /draft-cover-letter <job-url-or-paste-jd>

Steps:
1. Read `job-search/profile.md` for my background, elevator pitch, and standard answers.
2. If a URL is given: use Playwright to open it and extract the full job description and company info. Otherwise use the pasted text.
3. Research the company briefly (what they do, recent news, mission) to personalize the letter.
4. Draft a cover letter that:
   - Opens with a specific hook about the company or role (not generic "I am excited to apply...")
   - Connects 2–3 of my strongest relevant experiences directly to their stated requirements
   - Addresses any explicit asks in the JD (e.g. "we want someone who can own X")
   - Closes with a clear call to action
   - Stays under 350 words
   - Matches a professional but not stiff tone
5. Show me the draft and ask: "Any changes before I use this?" — iterate until approved.
6. Once approved, save it as `job-search/cover-letters/<company>-<role>.md`.
