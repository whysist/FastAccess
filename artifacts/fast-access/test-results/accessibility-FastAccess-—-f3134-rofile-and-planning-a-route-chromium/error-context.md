# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: accessibility.spec.ts >> FastAccess — automated accessibility scan >> home page has zero axe violations after selecting a profile and planning a route
- Location: e2e\accessibility.spec.ts:27:7

# Error details

```
Error: [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
  affected: p, #profiles-heading, #route-heading, label[for="from-select"], label[for="to-select"], .gap-1\.5.tracking-wide.text-xs:nth-child(3) > span:nth-child(2), .items-end.flex:nth-child(1) > .text-center.w-28 > .mt-0\.5.tracking-wide.text-\[10px\], .items-end.flex:nth-child(2) > .text-center.w-28 > .mt-0\.5.tracking-wide.text-\[10px\], .items-end.flex:nth-child(3) > .text-center.w-28 > .mt-0\.5.tracking-wide.text-\[10px\], .items-end.flex:nth-child(4) > .text-center.w-28 > .mt-0\.5.tracking-wide.text-\[10px\], .flex:nth-child(1) > .text-center.w-28.text-fa-ink\/50, .flex:nth-child(2) > .text-center.w-28.text-fa-ink\/50, .flex:nth-child(2) > .text-center.w-28.text-fa-ink\/50 > .text-fa-ink\/30.ml-1.text-\[10px\], .flex:nth-child(3) > .text-center.w-28.text-fa-ink\/50, .flex:nth-child(3) > .text-center.w-28.text-fa-ink\/50 > .text-fa-ink\/30.ml-1.text-\[10px\], .flex:nth-child(4) > .text-center.w-28.text-fa-ink\/50, .flex:nth-child(4) > .text-center.w-28.text-fa-ink\/50 > .text-fa-ink\/30.ml-1.text-\[10px\], #narration-heading, li:nth-child(1) > .select-none.pt-0\.5.w-6, li:nth-child(2) > .select-none.pt-0\.5.w-6, span[aria-label="80 metres"], li:nth-child(3) > .select-none.pt-0\.5.w-6, li:nth-child(3) > .pt-0\.5.text-fa-ink\/50[aria-label="35 metres"], li:nth-child(4) > .select-none.pt-0\.5.w-6, li:nth-child(4) > .pt-0\.5.text-fa-ink\/50[aria-label="35 metres"], #timeline-heading, label[for="minute-input"], .w-10.tracking-widest.text-\[10px\], .tracking-widest.flex-1.text-\[10px\], .text-right.tracking-widest.w-20, .w-10.text-fa-ink\/50.font-mono, #quiet-heading, .justify-between.py-4:nth-child(1) > .gap-3.items-start.flex > div:nth-child(2) > .mt-1.text-fa-ink\/50.text-xs, .justify-between.py-4:nth-child(1) > .text-right.flex-shrink-0 > .mt-0\.5.text-\[10px\].text-fa-ink\/40, .justify-between.py-4:nth-child(2) > .gap-3.items-start.flex > div:nth-child(2) > .mt-1.text-fa-ink\/50.text-xs, .justify-between.py-4:nth-child(2) > .text-right.flex-shrink-0 > .mt-0\.5.text-\[10px\].text-fa-ink\/40, .justify-between.py-4:nth-child(3) > .gap-3.items-start.flex > div:nth-child(2) > .mt-1.text-fa-ink\/50.text-xs, .justify-between.py-4:nth-child(3) > .text-right.flex-shrink-0 > .mt-0\.5.text-\[10px\].text-fa-ink\/40, #query-heading

expect(received).toEqual(expected) // deep equality

- Expected  -    1
+ Received  + 1406

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<p class=\"mt-1 text-xs font-bold tracking-[0.25em] uppercase text-fa-ink/50\">Stadium Navigation Companion</p>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "p",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h2 id=\"profiles-heading\" class=\"text-[11px] font-bold tracking-[0.2em] uppercase text-fa-ink/40 mb-5\">Select Access Profiles</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#profiles-heading",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h2 id=\"route-heading\" class=\"text-[11px] font-bold tracking-[0.2em] uppercase text-fa-ink/40 mb-5\">Plan Route</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#route-heading",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<label for=\"from-select\" class=\"block text-[10px] font-bold uppercase tracking-widest text-fa-ink/40 mb-1.5\">From</label>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"from-select\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<label for=\"to-select\" class=\"block text-[10px] font-bold uppercase tracking-widest text-fa-ink/40 mb-1.5\">To</label>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"to-select\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.14,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#c77d22",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.14 (foreground color: #c77d22, background color: #fafaf9, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.14 (foreground color: #c77d22, background color: #fafaf9, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span style=\"color: rgb(199, 125, 34);\">Elevator</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".gap-1\\.5.tracking-wide.text-xs:nth-child(3) > span:nth-child(2)",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.55,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#a1a2a3",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 uppercase tracking-wide mt-0.5\">gate</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".items-end.flex:nth-child(1) > .text-center.w-28 > .mt-0\\.5.tracking-wide.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.55,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#a1a2a3",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 uppercase tracking-wide mt-0.5\">junction</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".items-end.flex:nth-child(2) > .text-center.w-28 > .mt-0\\.5.tracking-wide.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.55,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#a1a2a3",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 uppercase tracking-wide mt-0.5\">elevator</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".items-end.flex:nth-child(3) > .text-center.w-28 > .mt-0\\.5.tracking-wide.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 2.55,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#a1a2a3",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.55 (foreground color: #a1a2a3, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 uppercase tracking-wide mt-0.5\">section</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".items-end.flex:nth-child(4) > .text-center.w-28 > .mt-0\\.5.tracking-wide.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.41,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8b8d",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"w-28 text-center font-mono text-[11px] text-fa-ink/50\">0m</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(1) > .text-center.w-28.text-fa-ink\\/50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.41,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8b8d",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"w-28 text-center font-mono text-[11px] text-fa-ink/50\">80m<span class=\"text-[10px] text-fa-ink/30 ml-1\">(+80)</span></div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(2) > .text-center.w-28.text-fa-ink\\/50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 1.96,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#b9b9ba",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.96 (foreground color: #b9b9ba, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.96 (foreground color: #b9b9ba, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[10px] text-fa-ink/30 ml-1\">(+80)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(2) > .text-center.w-28.text-fa-ink\\/50 > .text-fa-ink\\/30.ml-1.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.41,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8b8d",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"w-28 text-center font-mono text-[11px] text-fa-ink/50\">115m<span class=\"text-[10px] text-fa-ink/30 ml-1\">(+35)</span></div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(3) > .text-center.w-28.text-fa-ink\\/50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 1.96,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#b9b9ba",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.96 (foreground color: #b9b9ba, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.96 (foreground color: #b9b9ba, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[10px] text-fa-ink/30 ml-1\">(+35)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(3) > .text-center.w-28.text-fa-ink\\/50 > .text-fa-ink\\/30.ml-1.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.41,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#8a8b8d",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.41 (foreground color: #8a8b8d, background color: #ffffff, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"w-28 text-center font-mono text-[11px] text-fa-ink/50\">150m<span class=\"text-[10px] text-fa-ink/30 ml-1\">(+35)</span></div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(4) > .text-center.w-28.text-fa-ink\\/50",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 1.96,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#b9b9ba",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 1.96 (foreground color: #b9b9ba, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"overflow-x-auto border border-fa-border bg-white p-6\">",
+                 "target": Array [
+                   ".overflow-x-auto",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 1.96 (foreground color: #b9b9ba, background color: #ffffff, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[10px] text-fa-ink/30 ml-1\">(+35)</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".flex:nth-child(4) > .text-center.w-28.text-fa-ink\\/50 > .text-fa-ink\\/30.ml-1.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h3 id=\"narration-heading\" class=\"text-xs font-bold tracking-[0.2em] uppercase text-fa-ink/50 mb-4\">Step-by-step directions</h3>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#narration-heading",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/40 w-6 flex-shrink-0 pt-0.5 select-none\" aria-hidden=\"true\">01</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(1) > .select-none.pt-0\\.5.w-6",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/40 w-6 flex-shrink-0 pt-0.5 select-none\" aria-hidden=\"true\">02</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(2) > .select-none.pt-0\\.5.w-6",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/50 flex-shrink-0 pt-0.5\" aria-label=\"80 metres\">80m</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "span[aria-label=\"80 metres\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/40 w-6 flex-shrink-0 pt-0.5 select-none\" aria-hidden=\"true\">03</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(3) > .select-none.pt-0\\.5.w-6",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/50 flex-shrink-0 pt-0.5\" aria-label=\"35 metres\">35m</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(3) > .pt-0\\.5.text-fa-ink\\/50[aria-label=\"35 metres\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/40 w-6 flex-shrink-0 pt-0.5 select-none\" aria-hidden=\"true\">04</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(4) > .select-none.pt-0\\.5.w-6",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 8.3pt (11px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[11px] text-fa-ink/50 flex-shrink-0 pt-0.5\" aria-label=\"35 metres\">35m</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(4) > .pt-0\\.5.text-fa-ink\\/50[aria-label=\"35 metres\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h2 id=\"timeline-heading\" class=\"text-[11px] font-bold tracking-[0.2em] uppercase text-fa-ink/40 mb-5\">Sensory Timeline (Next 30 min)</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#timeline-heading",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<label for=\"minute-input\" class=\"block text-[10px] font-bold uppercase tracking-widest text-fa-ink/40 mb-1.5\">Match Minute</label>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "label[for=\"minute-input\"]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#efefee",
+               "contrastRatio": 2.48,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#979999",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.48 (foreground color: #979999, background color: #efefee, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"flex items-center gap-4 px-4 py-2 bg-fa-ink/5 border-b border-fa-border\">",
+                 "target": Array [
+                   ".py-2",
+                 ],
+               },
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.48 (foreground color: #979999, background color: #efefee, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-[10px] font-bold uppercase tracking-widest text-fa-ink/40 w-10\">Min</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".w-10.tracking-widest.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#efefee",
+               "contrastRatio": 2.48,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#979999",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.48 (foreground color: #979999, background color: #efefee, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"flex items-center gap-4 px-4 py-2 bg-fa-ink/5 border-b border-fa-border\">",
+                 "target": Array [
+                   ".py-2",
+                 ],
+               },
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.48 (foreground color: #979999, background color: #efefee, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[10px] font-bold uppercase tracking-widest text-fa-ink/40 flex-1\">Event</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".tracking-widest.flex-1.text-\\[10px\\]",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#efefee",
+               "contrastRatio": 2.48,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#979999",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.48 (foreground color: #979999, background color: #efefee, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<div class=\"flex items-center gap-4 px-4 py-2 bg-fa-ink/5 border-b border-fa-border\">",
+                 "target": Array [
+                   ".py-2",
+                 ],
+               },
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.48 (foreground color: #979999, background color: #efefee, font size: 7.5pt (10px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"text-[10px] font-bold uppercase tracking-widest text-fa-ink/40 w-20 text-right\">Intensity</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".text-right.tracking-widest.w-20",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "10.5pt (14px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 10.5pt (14px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 10.5pt (14px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"font-mono text-sm font-bold w-10 flex-shrink-0 text-fa-ink/50\" aria-hidden=\"true\">23</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".w-10.text-fa-ink\\/50.font-mono",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h2 id=\"quiet-heading\" class=\"text-[11px] font-bold tracking-[0.2em] uppercase text-fa-ink/40 mb-5\">Nearest Quiet Zones</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#quiet-heading",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-xs text-fa-ink/50 mt-1\">Low noise · Steady lighting</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".justify-between.py-4:nth-child(1) > .gap-3.items-start.flex > div:nth-child(2) > .mt-1.text-fa-ink\\/50.text-xs",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 mt-0.5\">step-free</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".justify-between.py-4:nth-child(1) > .text-right.flex-shrink-0 > .mt-0\\.5.text-\\[10px\\].text-fa-ink\\/40",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-xs text-fa-ink/50 mt-1\">Low noise · Steady lighting</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".justify-between.py-4:nth-child(2) > .gap-3.items-start.flex > div:nth-child(2) > .mt-1.text-fa-ink\\/50.text-xs",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 mt-0.5\">step-free</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".justify-between.py-4:nth-child(2) > .text-right.flex-shrink-0 > .mt-0\\.5.text-\\[10px\\].text-fa-ink\\/40",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 3.36,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#87898a",
+               "fontSize": "9.0pt (12px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.36 (foreground color: #87898a, background color: #fafaf9, font size: 9.0pt (12px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-xs text-fa-ink/50 mt-1\">Low noise · Steady lighting</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".justify-between.py-4:nth-child(3) > .gap-3.items-start.flex > div:nth-child(2) > .mt-1.text-fa-ink\\/50.text-xs",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "7.5pt (10px)",
+               "fontWeight": "normal",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 7.5pt (10px), font weight: normal). Expected contrast ratio of 4.5:1",
+         "html": "<div class=\"text-[10px] text-fa-ink/40 mt-0.5\">step-free</div>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           ".justify-between.py-4:nth-child(3) > .text-right.flex-shrink-0 > .mt-0\\.5.text-\\[10px\\].text-fa-ink\\/40",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#fafaf9",
+               "contrastRatio": 2.53,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#9e9fa0",
+               "fontSize": "8.3pt (11px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<main class=\"min-h-screen bg-fa-bg\">",
+                 "target": Array [
+                   "main",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 2.53 (foreground color: #9e9fa0, background color: #fafaf9, font size: 8.3pt (11px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<h2 id=\"query-heading\" class=\"text-[11px] font-bold tracking-[0.2em] uppercase text-fa-ink/40 mb-5\">Ask a Question</h2>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "#query-heading",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - heading "FastAccess" [level=1] [ref=e5]
        - paragraph [ref=e6]: Stadium Navigation Companion
      - generic [ref=e8]:
        - region "Select Access Profiles" [ref=e9]:
          - heading "Select Access Profiles" [level=2] [ref=e10]
          - group "Select access profiles" [ref=e11]:
            - button "Wheelchair Excludes stairs-only routes" [pressed] [ref=e12] [cursor=pointer]:
              - img [ref=e14]
              - img [ref=e21]
              - generic [ref=e23]: Wheelchair
              - generic [ref=e24]: Excludes stairs-only routes
            - button "Low Vision Avoids flashing lighting" [pressed] [ref=e25] [cursor=pointer]:
              - img [ref=e27]
              - img [ref=e32]
              - generic [ref=e34]: Low Vision
              - generic [ref=e35]: Avoids flashing lighting
            - button "Deaf No audio cue dependency" [ref=e36] [cursor=pointer]:
              - img [ref=e38]
              - generic [ref=e43]: Deaf
              - generic [ref=e44]: No audio cue dependency
            - button "Sensory Sensitive Avoids high-noise and flashing routes" [ref=e45] [cursor=pointer]:
              - img [ref=e47]
              - generic [ref=e51]: Sensory Sensitive
              - generic [ref=e52]: Avoids high-noise and flashing routes
        - region "Plan Route" [ref=e54]:
          - heading "Plan Route" [level=2] [ref=e55]
          - generic [ref=e56]:
            - generic [ref=e57]:
              - generic [ref=e58]: From
              - combobox "From" [ref=e59]:
                - option "North Gate" [selected]
                - option "South Gate"
                - option "East Gate"
                - option "West Gate"
                - option "Concourse A"
                - option "Concourse B"
                - option "Section 101"
                - option "Section 102"
                - option "Section 103"
                - option "Section 104"
                - option "Section 105"
                - option "Section 106"
                - option "Section 107"
                - option "Section 108"
                - option "Ramp 1 (West)"
                - option "Ramp 2 (East)"
                - option "Elevator 1 (West)"
                - option "Elevator 2 (East)"
                - option "Quiet Room A"
                - option "Quiet Room B"
                - option "Sensory-Friendly Viewing Area"
                - option "Accessible Restroom (West)"
                - option "Accessible Restroom (East)"
                - option "Service Animal Relief Area"
                - option "Guest Services"
                - option "First Aid"
            - generic [ref=e60]:
              - generic [ref=e61]: To
              - combobox "To" [ref=e62]:
                - option "North Gate"
                - option "South Gate"
                - option "East Gate"
                - option "West Gate"
                - option "Concourse A"
                - option "Concourse B"
                - option "Section 101"
                - option "Section 102"
                - option "Section 103"
                - option "Section 104" [selected]
                - option "Section 105"
                - option "Section 106"
                - option "Section 107"
                - option "Section 108"
                - option "Ramp 1 (West)"
                - option "Ramp 2 (East)"
                - option "Elevator 1 (West)"
                - option "Elevator 2 (East)"
                - option "Quiet Room A"
                - option "Quiet Room B"
                - option "Sensory-Friendly Viewing Area"
                - option "Accessible Restroom (West)"
                - option "Accessible Restroom (East)"
                - option "Service Animal Relief Area"
                - option "Guest Services"
                - option "First Aid"
            - button "Plan Route" [ref=e64] [cursor=pointer]
          - generic "Route map" [ref=e65]:
            - generic "Access type legend" [ref=e66]:
              - generic [ref=e69]: Level
              - generic [ref=e72]: Ramp
              - generic [ref=e75]: Elevator
              - generic [ref=e78]: Stairs
            - generic [ref=e80]:
              - generic [ref=e81]:
                - generic [ref=e83]:
                  - generic [ref=e84]: North Gate
                  - generic [ref=e85]: gate
                - generic [ref=e87]:
                  - generic [ref=e88]: Concourse A
                  - generic [ref=e89]: junction
                - generic [ref=e91]:
                  - generic [ref=e92]: Elevator 1 (West)
                  - generic [ref=e93]: elevator
                - generic [ref=e95]:
                  - generic [ref=e96]: Section 104
                  - generic [ref=e97]: section
              - generic [ref=e98]:
                - generic [ref=e101]: ▶
                - generic [ref=e105]: ●
                - generic [ref=e109]: ⊡
                - generic [ref=e113]: ■
              - generic [ref=e114]:
                - generic [ref=e116]: 0m
                - generic [ref=e119]:
                  - text: 80m
                  - generic [ref=e120]: (+80)
                - generic [ref=e123]:
                  - text: 115m
                  - generic [ref=e124]: (+35)
                - generic [ref=e127]:
                  - text: 150m
                  - generic [ref=e128]: (+35)
            - generic [ref=e129]:
              - generic [ref=e130]:
                - generic [ref=e131]: 150m
                - text: total distance
              - generic [ref=e132]: 4waypoints
              - generic [ref=e133]: Routed for wheelchair, low-vision
          - region "Step-by-step directions" [ref=e134]:
            - heading "Step-by-step directions" [level=3] [ref=e135]
            - list "Turn-by-turn directions" [ref=e136]:
              - listitem [ref=e137]:
                - generic [ref=e138]: "01"
                - generic [ref=e139]: Start at North Gate.
              - listitem [ref=e140]:
                - generic [ref=e141]: "02"
                - generic [ref=e142]: Walk (level, step-free) 80m to Concourse A.
                - generic "80 metres" [ref=e143]: 80m
              - listitem [ref=e144]:
                - generic [ref=e145]: "03"
                - generic [ref=e146]: Walk (level, step-free) 35m to Elevator 1 (West).
                - generic "35 metres" [ref=e147]: 35m
              - listitem [ref=e148]:
                - generic [ref=e149]: "04"
                - generic [ref=e150]: Take the elevator 35m to Section 104 — you have arrived.
                - generic "35 metres" [ref=e151]: 35m
        - generic [ref=e153]:
          - region "Sensory Timeline (Next 30 min)" [ref=e154]:
            - heading "Sensory Timeline (Next 30 min)" [level=2] [ref=e155]
            - generic [ref=e156]:
              - generic [ref=e157]: Match Minute
              - spinbutton "Current match minute" [ref=e158]: "0"
            - list "Upcoming sensory events" [ref=e159]:
              - generic [ref=e160]:
                - generic [ref=e161]: Min
                - generic [ref=e162]: Event
                - generic [ref=e163]: Intensity
              - 'listitem "Minute 0: Kickoff Pyrotechnics, high intensity" [ref=e164]':
                - generic [ref=e165]: "00"
                - generic [ref=e166]:
                  - img [ref=e168]
                  - generic [ref=e171]: Kickoff Pyrotechnics
                  - generic [ref=e172]: Now
                - generic [ref=e174]: high
              - 'listitem "Minute 23: Goal Celebration — Home, high intensity" [ref=e179]':
                - generic [ref=e180]: "23"
                - generic [ref=e181]:
                  - img [ref=e183]
                  - generic [ref=e186]: Goal Celebration — Home
                - generic [ref=e188]: high
          - region "Nearest Quiet Zones" [ref=e193]:
            - heading "Nearest Quiet Zones" [level=2] [ref=e194]
            - list "Nearest quiet zones and sensory-friendly areas" [ref=e195]:
              - listitem [ref=e196]:
                - generic [ref=e200]:
                  - generic [ref=e201]: Quiet Room A
                  - generic [ref=e202]: Quiet Room
                  - generic [ref=e203]: Low noise · Steady lighting
                - generic [ref=e204]:
                  - generic [ref=e205]: ~130m
                  - generic [ref=e206]: step-free
              - listitem [ref=e207]:
                - generic [ref=e211]:
                  - generic [ref=e212]: Sensory-Friendly Viewing Area
                  - generic [ref=e213]: Sensory-Friendly Viewing
                  - generic [ref=e214]: Low noise · Steady lighting
                - generic [ref=e215]:
                  - generic [ref=e216]: ~150m
                  - generic [ref=e217]: step-free
              - listitem [ref=e218]:
                - generic [ref=e222]:
                  - generic [ref=e223]: Quiet Room B
                  - generic [ref=e224]: Quiet Room
                  - generic [ref=e225]: Low noise · Steady lighting
                - generic [ref=e226]:
                  - generic [ref=e227]: ~255m
                  - generic [ref=e228]: step-free
        - region "Ask a Question" [ref=e230]:
          - heading "Ask a Question" [level=2] [ref=e231]
          - generic [ref=e233]:
            - generic [ref=e234]: Ask about accessibility features, quiet zones, routes, or sensory events.
            - generic [ref=e235]:
              - textbox "Question input" [ref=e236]:
                - /placeholder: e.g. Which gate has the shortest step-free route to Section 103?
              - button "Ask" [disabled] [ref=e237]
  - alert [ref=e238]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | 
  4  | function formatViolations(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']): string {
  5  |   if (violations.length === 0) return 'none';
  6  |   return violations
  7  |     .map(
  8  |       (v) =>
  9  |         `[${v.impact ?? 'unknown'}] ${v.id}: ${v.help}\n  affected: ${v.nodes
  10 |           .map((n) => n.target.join(' '))
  11 |           .join(', ')}`,
  12 |     )
  13 |     .join('\n\n');
  14 | }
  15 | 
  16 | test.describe('FastAccess — automated accessibility scan', () => {
  17 |   test('home page has zero axe violations on initial load', async ({ page }) => {
  18 |     await page.goto('/');
  19 |     await page.waitForLoadState('networkidle');
  20 | 
  21 |     const results = await new AxeBuilder({ page }).analyze();
  22 |     // Printed on failure via the custom message, instead of dumping axe's
  23 |     // full verbose result object into an unreadable toEqual() diff.
  24 |     expect(results.violations, formatViolations(results.violations)).toEqual([]);
  25 |   });
  26 | 
  27 |   test('home page has zero axe violations after selecting a profile and planning a route', async ({ page }) => {
  28 |     await page.goto('/');
  29 |     await page.getByRole('button', { name: /low vision/i }).click();
  30 |     await page.getByRole('button', { name: /plan route/i }).click();
  31 |     await page.waitForLoadState('networkidle');
  32 | 
  33 |     const results = await new AxeBuilder({ page }).analyze();
> 34 |     expect(results.violations, formatViolations(results.violations)).toEqual([]);
     |                                                                      ^ Error: [serious] color-contrast: Elements must meet minimum color contrast ratio thresholds
  35 |   });
  36 | });
```