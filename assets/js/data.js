// Single source of truth for all data shown in the deck.
// Citation numbers map to refs[] which is a copy of references.json.

window.D = {
  groupStats: [
    { value: 27.4, suffix: "B€", label: "FY-2024 Revenue", cite: "[3][5]" },
    { value: 18.5, suffix: "%",  label: "Global Yogurt Share 2025", cite: "[15]" },
    { value: 90,   suffix: "K",  label: "Employees Worldwide", cite: "[8][9]" },
    { value: 120,  suffix: "+",  label: "Countries Operating In", cite: "[8][9]" },
  ],

  segments: [
    { name: "Essential Dairy & Plant-Based", value: 13.46, color: "#00bfff", cite: "[3][7]" },
    { name: "Specialized Nutrition",         value: 8.94,  color: "#003da5", cite: "[3][7]" },
    { name: "Waters",                        value: 4.98,  color: "#0a55c8", cite: "[3][7]" },
  ],

  renewTimeline: [
    { year: "2022", title: "Renew Danone launched", desc: "Saint-Affrique unveils mid-single-digit LFL ambition", cite: "[4][6]" },
    { year: "2023", title: "Russia EDP exit", desc: "Deconsolidation; ~€1.2B accounting loss", cite: "[10][11][12]" },
    { year: "2024", title: "+4.3% LFL growth", desc: "Margin +39bps; FCF €3.0B", cite: "[3][5]" },
    { year: "2024", title: "Russia sale closed", desc: "Sold EDP Russia to Vamin R LLC, May 2024", cite: "[11]" },
    { year: "2025", title: "Akkermansia + Kate Farms", desc: "Microbiome + plant-based medical nutrition", cite: "[6]" },
    { year: "2025", title: "Three-region restructure", desc: "EMEA / APAC / Americas", cite: "[6]" },
    { year: "2025", title: "Largest B Corp food co.", desc: "First major food multinational, 200+ entities", cite: "[8][9]" },
    { year: "2026", title: "+4.5% LFL FY-2025", desc: "Another year of strong delivery", cite: "[6]" },
  ],

  egyptCities: [
    // Approximate latitude/longitude. dx/dy nudge the label off the dot to avoid collisions.
    { name: "Obour Plant", lng: 31.4670, lat: 30.2103, desc: "40,000 m² factory · 8-9 lines · ~120,000 t/year capacity", cite: "[16][17][18]", primary: true, dx: 18, dy: 5 },
    { name: "Nubariya Farm", lng: 30.0000, lat: 30.6700, desc: "~154 feddan dairy farm · among Egypt's largest", cite: "[16][17][18]", primary: true, dx: -10, dy: 5, anchor: "end" },
    { name: "Cairo", lng: 31.2357, lat: 30.0444, desc: "Greater Cairo: modern trade backbone", cite: "[20][21]", dx: -10, dy: 22, anchor: "end" },
    { name: "Alexandria", lng: 29.9187, lat: 31.2001, desc: "2nd largest market; q-commerce growth", cite: "[20][21]", dx: -10, dy: -10, anchor: "end" },
    { name: "Mansoura", lng: 31.3807, lat: 31.0364, desc: "Delta hub - cold-chain expansion target", cite: "[23][24]", dx: 14, dy: -8 },
    { name: "Tanta", lng: 30.9876, lat: 30.7865, desc: "Delta hub - cold-chain expansion target", cite: "[23][24]", dx: -10, dy: -10, anchor: "end" },
    { name: "Assiut", lng: 31.1825, lat: 27.1809, desc: "Upper Egypt hub - reach gap (Problem 5)", cite: "[23][24]", dx: 14, dy: 5 },
  ],

  egpTimeline: [
    // [date, EGP/USD]
    { d: "2022-03-21", v: 18.27 },  // 1st flotation
    { d: "2022-10-27", v: 24.40 },  // 2nd flotation
    { d: "2023-01-11", v: 27.0 },
    { d: "2023-06-01", v: 30.9 },
    { d: "2024-01-15", v: 30.9 },
    { d: "2024-03-05", v: 30.9 },
    { d: "2024-03-06", v: 49.5 },   // 3rd flotation - the crash
    { d: "2024-03-15", v: 47.0 },
    { d: "2024-06-01", v: 47.4 },
    { d: "2024-12-01", v: 50.6 },
    { d: "2025-06-01", v: 50.0 },
    { d: "2026-04-01", v: 50.5 },
  ],

  competitors: [
    { name: "Juhayna",  share: 100, label: "$293.5M (1H25)", color: "juhayna",  cite: "[32]" },
    { name: "Almarai EG (Beyti+Lamar)", share: 70, label: "Strong UHT + flavored",  color: "almarai",  cite: "[37][38]" },
    { name: "Danone Egypt",  share: 55, label: "Premium probiotic + functional",   color: "danone",   cite: "[16][17]" },
    { name: "Beyti",    share: 45, label: "100% Almarai-owned (Feb 2023)", color: "beyti",    cite: "[37]" },
    { name: "Nestlé Egypt", share: 35, label: "Infant nutrition, water",       color: "almarai",  cite: "[25]" },
  ],

  swot: {
    s: [
      { t: "Global #1 in yogurt — 18.5% share 2025", c: "[15]" },
      { t: "Iconic Activia franchise + HiPro/Oikos/Danio leadership", c: "[13][15]" },
      { t: "World's largest B Corp food company", c: "[8][9]" },
      { t: "Diversified across EDP / Specialized Nutrition / Waters", c: "[3][7]" },
      { t: "Institut Pasteur R&D heritage + Akkermansia microbiome", c: "[1][6]" },
      { t: "FY-24: €27.4B revenue · 13.0% margin · €3.0B FCF", c: "[3][5]" },
    ],
    w: [
      { t: "Premium pricing in price-sensitive emerging markets", c: "[25][33]" },
      { t: "Heavy exposure to imported milk-powder + EGP shocks", c: "[27][28]" },
      { t: "EDP +3.8% LFL trails Waters & Specialized Nutrition", c: "[3][5]" },
      { t: "Slower DTC / digital footprint vs startup challengers", c: "—" },
      { t: "Reputational drag: Russia exit + MENA boycott noise", c: "[10][39][40]" },
    ],
    o: [
      { t: "Probiotic + gut-microbiome category growth", c: "[6][15]" },
      { t: "Plant-based & high-protein dairy underpenetrated in MENA", c: "[13]" },
      { t: "E-commerce / q-commerce explosion in Egypt", c: "[20][21]" },
      { t: "Specialized Nutrition + young population in Egypt", c: "[25]" },
      { t: "Local sourcing (Gawda/Omda) cuts EGP exposure", c: "[23][24]" },
    ],
    t: [
      { t: "EGP devaluation –38% (Mar 2024) + 600bps rate hike", c: "[28][29]" },
      { t: "Juhayna scale + price-fighter SKUs + 30% price hikes", c: "[33]" },
      { t: "Sugar-content scrutiny on dairy desserts (Danette)", c: "—" },
      { t: "BDS / consumer boycotts in MENA", c: "[39][40]" },
      { t: "Climate / water-stress on Egyptian agriculture", c: "—" },
      { t: "Discount retail growth (Kazyon, BIM)", c: "[28]" },
    ],
  },

  positioning: [
    { brand: "Activia",   tag: "Probiotic",
      pos: "To health-conscious adult women seeking everyday digestive comfort, Activia is a daily probiotic yogurt that scientifically proves results in 14 days." },
    { brand: "Danio",     tag: "High-Protein",
      pos: "To active adults seeking satiety with quality, Danio is a high-protein Greek-style yogurt that delivers up to 12g protein per serving." },
    { brand: "Danonino",  tag: "Kids Growth",
      pos: "To mothers seeking fun-but-nutritious snacks for young children, Danonino is a calcium- & vitamin-enriched mini-yogurt that supports growth." },
    { brand: "Aptamil",   tag: "Infant Nutrition",
      pos: "To parents seeking the closest possible alternative to breast milk, Aptamil is scientifically formulated infant nutrition trusted by paediatricians." },
    { brand: "Danette",   tag: "Indulgence",
      pos: "To families seeking an affordable indulgence at home, Danette is a creamy chocolate or vanilla pudding that delivers café-style dessert at supermarket prices." },
    { brand: "HiPro",     tag: "Active Lifestyle",
      pos: "To gym-goers and fitness consumers seeking on-the-go protein, HiPro is a high-protein drinking yogurt that fits into any active routine." },
  ],

  problems: [
    {
      n: 1, title: "EGP Devaluation",
      diag: "Pound floated to ~EGP 50/USD in Mar 2024 (38% devaluation); food inflation peaked at 47%. Milk-powder, packaging-resin and capex costs in EGP rose sharply. Juhayna pushed list prices up to +30% as a benchmark — but Danone's premium positioning makes consumers more elasticity-sensitive.",
      diagCite: "[28][29][33]",
      sol: [
        "Place: deepen Gawda local-milk programme to raise local-content ratio and cut hard-currency exposure.",
        "Product: introduce smaller, lower-EGP-ticket packs (single-serve cups; smaller multi-packs).",
        "Price: stagger by SKU — carry burden on Danio/Activia Light, hold line on Danonino/Activia Rayeb.",
      ],
      solCite: "[23]"
    },
    {
      n: 2, title: "Juhayna's Scale & Distribution",
      diag: "Juhayna's 1H-2025 revenue +23% YoY to USD 293.5M with deeper traditional-trade reach and a value-tier portfolio that out-prices Danone in mainstream yogurt and rayeb. Danone's premium positioning works in modern trade but exposes a share gap in the much larger baqala channel.",
      diagCite: "[25][32][33]",
      sol: [
        "Place: partner with regional sub-distributors for top-tier baqala in chosen Delta + Upper Egypt cities; subsidise chiller placement.",
        "Product: launch a 'Danone fundamentals' value SKU sized for the baqala basket — a market-penetration play (Ansoff).",
        "Promotion: disproportionate ad weight for Activia + Danio in modern trade and q-commerce, where premium positioning earns its margin.",
      ],
      solCite: "—"
    },
    {
      n: 3, title: "Functional / Plant-Based Education Gap",
      diag: "Activia's gut-health and Danio's high-protein propositions need sustained shopper education in a market where plain yogurt and rayeb are habitual. Plant-based dairy (Alpro) has minimal MENA awareness vs Europe — opportunity but high marketing-spend ratio.",
      diagCite: "[13][15]",
      sol: [
        "Promotion: '14 days with Activia' digital + TV campaign reviving the original clinical claim, with paediatrician/gastroenterologist PR.",
        "Product: pilot Alpro in modern trade only (concentrated targeting) — 2 SKUs to test category economics before broadening.",
        "Place: lean on q-commerce subscription models (Breadfast) to convert trial into routine — loyalty-status segmentation.",
      ],
      solCite: "[20][21]"
    },
    {
      n: 4, title: "Sugar-Content Regulation Risk",
      diag: "Dairy desserts like Danette are under increasing parental + regulator scrutiny across MENA. Regional momentum (Saudi sugar tax, UAE labelling) signals upcoming Egyptian pressure. Per the lecture's societal-marketing orientation, long-term consumer interest must be balanced with short-term commercial appeal.",
      diagCite: "—",
      sol: [
        "Product: launch Danette Reduced-Sugar variant (line extension) and reformulate the core variant in line with global Danone reformulation.",
        "Promotion: front-load Gawda/Omda-style social PR around child nutrition (Danonino) so the brand narrative is health-positive when regulation lands.",
        "Price: hold reformulated Danette at the same shelf price as the legacy variant — accept input-cost hit to protect category trust.",
      ],
      solCite: "[23][24]"
    },
    {
      n: 5, title: "Cold-Chain Reach Beyond Cairo & Alexandria",
      diag: "Egypt's ~400,000 baqala outlets dominate FMCG by transaction count, but cold-chain limits and Juhayna's entrenched route-to-market constrain Danone beyond Cairo, Alexandria and Delta urban centres. Gawda targets the upstream side — downstream chilled distribution remains the choke-point.",
      diagCite: "[23][24]",
      sol: [
        "Place: invest in regional cold-chain hubs (Mansoura, Tanta, Assiut) — possibly co-funded with EBRD/IFC sustainability lending given B Corp credentials.",
        "Product: prioritise UHT-style or longer-shelf-life formats for upstream regions where chilled is unrealistic, complementing the chilled core.",
        "Promotion: regional advertising on Sa'idi/Delta channels + partnerships with local football clubs to localise the brand image.",
      ],
      solCite: "[8][9]"
    },
  ],

  // For STP segmentation pyramid
  pyramid: [
    { label: "Total Egyptian Dairy Consumers (heterogeneous market)", w: "100%" },
    { label: "Modern-trade urban + Delta + Alexandria", w: "70%" },
    { label: "Health-conscious / aspirational middle class", w: "45%" },
    { label: "Functional dairy users (probiotic, high-protein)", w: "25%" },
    { label: "Activia + Danio loyal buyers", w: "12%" },
  ],

  refs: [
    {"n":1,"title":"Danone — Wikipedia (Carasso 1919 Barcelona)","publisher":"Wikipedia","url":"https://en.wikipedia.org/wiki/Danone"},
    {"n":2,"title":"The history of Danone","publisher":"Danone Group","url":"https://www.danone.com/group/about-us/our-history.html"},
    {"n":3,"title":"Danone: Strong FY 2024 results","publisher":"GlobeNewswire / Danone","url":"https://www.globenewswire.com/news-release/2025/02/26/3032566/0/en/Danone-Strong-FY-2024-results-Entering-the-next-chapter-of-Renew-with-confidence.html"},
    {"n":4,"title":"Antoine de Saint-Affrique CEO Danone","publisher":"LinkedIn","url":"https://fr.linkedin.com/in/antoine-de-saint-affrique"},
    {"n":5,"title":"Strong FY 2024 results — PDF","publisher":"Danone IR","url":"https://www.danone.com/content/dam/corp/global/danonecom/investors/en-all-publications/2025/pressreleases/prdanone260225.pdf"},
    {"n":6,"title":"DANONE: 2025 — Another year of strong delivery","publisher":"GlobeNewswire / Danone","url":"https://www.globenewswire.com/news-release/2026/02/20/3241691/0/en/DANONE-2025-Another-year-of-strong-delivery.html"},
    {"n":7,"title":"Danone's volumes turn positive in 2024","publisher":"Food Business News","url":"https://www.foodbusinessnews.net/articles/27789-danones-volumes-turn-positive-in-2024"},
    {"n":8,"title":"Danone becomes the largest B Corp","publisher":"DairyReporter","url":"https://www.dairyreporter.com/Article/2025/11/25/danone-becomes-the-largest-b-corp/"},
    {"n":9,"title":"Danone achieves B Corp certification worldwide","publisher":"Danone Group","url":"https://www.danone.com/newsroom/press-releases/b-corp-full-certification.html"},
    {"n":10,"title":"Danone set for €1B hit with Russia exit","publisher":"Just-Food","url":"https://www.just-food.com/special-focus/ukraine-crisis/danone-exits-dairy-and-plant-based-russia-business/"},
    {"n":11,"title":"Completion of sale of EDP Russia (May 2024)","publisher":"GlobeNewswire / Danone","url":"https://www.globenewswire.com/news-release/2024/05/17/2884377/0/en/DANONE-Completion-by-Danone-of-the-sale-of-its-EDP-business-in-Russia.html"},
    {"n":12,"title":"#LeaveRussia: Danone closed Russia business","publisher":"Leave Russia Project","url":"https://leave-russia.org/danone"},
    {"n":13,"title":"High-protein functional dairy drives EDP Q1 2025","publisher":"DairyReporter","url":"https://www.dairyreporter.com/Article/2025/04/27/high-protein-functional-dairy-drives-edp-sales-at-danone-in-q1-2025/"},
    {"n":14,"title":"Danone takes sustainability to the next level","publisher":"Sustainability Magazine","url":"https://sustainabilitymag.com/company-reports/danone-takes-sustainability-next-level"},
    {"n":15,"title":"Yogurt Market Size & Share, Forecasts 2026-2035","publisher":"Global Market Insights","url":"https://www.gminsights.com/industry-analysis/yogurt-market"},
    {"n":16,"title":"Danone Egypt — Brands","publisher":"Danone Egypt","url":"https://www.danone.eg/our-brands.html"},
    {"n":17,"title":"Danone Egypt expands with EGP 1B+ investments","publisher":"Egypt Today","url":"https://www.egypttoday.com/Article/3/110267/Danone-Egypt-Expands-in-the-Market-with-Investments-Exceeding-One"},
    {"n":18,"title":"Danone Egypt — About Us (Obour + Nubariya)","publisher":"Danone Egypt","url":"https://www.danone.eg/about-us-new.html"},
    {"n":19,"title":"Activia Natural Yoghurt 6×100g","publisher":"Carrefour Egypt","url":"https://www.carrefouregypt.com/mafegy/en/probiotic-yoghurt/activia-natural-yoghurt100g-5-1/p/259416"},
    {"n":20,"title":"Talabat partnership with Spinneys Egypt","publisher":"Zawya / Talabat","url":"https://www.zawya.com/en/press-release/companies-news/talabat-announces-partnership-with-spinneys-jnpf99ox"},
    {"n":21,"title":"How Egypt is redefining online shopping","publisher":"Zawya","url":"https://www.zawya.com/en/economy/north-africa/how-egypt-is-redefining-online-shopping-geq8k83m"},
    {"n":22,"title":"Danone Egypt — B Corp profile","publisher":"B Lab Global","url":"https://www.bcorporation.net/en-us/find-a-b-corp/company/danone-egypt/"},
    {"n":23,"title":"Danone Egypt launches Gawda Project","publisher":"Zawya / Danone","url":"https://www.zawya.com/en/press-release/companies-news/danone-egypt-launches-gawda-project-cooling-milk-collection-trucks-to-preserve-quality-and-nutritional-value-ns4j4hag"},
    {"n":24,"title":"Bel Egypt joins Danone's Omda initiative","publisher":"Zawya / Bel Egypt","url":"https://www.zawya.com/en/press-release/companies-news/bel-egypt-joins-danone-egypts-omda-initiative-to-extend-its-rural-footprint-and-drive-meaningful-community-impact-jke60nvn"},
    {"n":25,"title":"Egypt Dairy Products & Eggs Market Forecast 2034","publisher":"IMARC Group","url":"https://www.imarcgroup.com/egypt-dairy-products-eggs-market"},
    {"n":26,"title":"Egypt — NFSA establishment","publisher":"USDA FAS","url":"https://www.fas.usda.gov/data/egypt-egypt-establishment-national-food-safety-authority"},
    {"n":27,"title":"NFSA Decision 6/2020 — Food Import Licensing","publisher":"USDA FAS","url":"https://www.fas.usda.gov/data/egypt-egypts-national-food-safety-authority-decision-no-6-2020-rules-regulating-food-import"},
    {"n":28,"title":"Egypt: Bold moves (March 2024 EGP float)","publisher":"Franklin Templeton","url":"https://www.franklinresources.com/articles/2024/emerging-markets/egypt-bold-moves"},
    {"n":29,"title":"2023-2024 Egyptian financial crisis","publisher":"Wikipedia","url":"https://en.wikipedia.org/wiki/2023%E2%80%932024_Egyptian_financial_crisis"},
    {"n":30,"title":"3rd flotation impact on social justice","publisher":"EIPR","url":"https://eipr.org/en/press/2024/03/shock-3rd-flotation-and-its-impact-social-justice"},
    {"n":31,"title":"Juhayna Investor Home","publisher":"Juhayna","url":"https://www.juhayna.com/investor-home/"},
    {"n":32,"title":"Juhayna 1H25 Earnings Release (English)","publisher":"Juhayna IR","url":"https://www.juhayna.com/app/uploads/2025/11/1755209113_669_788386_1h25earningsreleaseenglish.pdf"},
    {"n":33,"title":"Food company revenues soar (Juhayna 9M24)","publisher":"Al Manassa","url":"https://manassa.news/en/stories/23782"},
    {"n":34,"title":"PepsiCo/Almarai JV acquires Beyti (2009)","publisher":"PepsiCo press release","url":"https://www.pepsico.com/en/newsroom/press-releases/2009/pepsicoalmarai-joint-venture-international-dairy-and-juice-limited-acquires-egyptian-dairy-and-juice-company-beyti"},
    {"n":35,"title":"Beyti — About Us","publisher":"Beyti","url":"https://beyti-app.vercel.app/corporate/about-beyti"},
    {"n":36,"title":"PepsiCo/Almarai JV acquires Beyti","publisher":"Food Ingredients First","url":"https://www.foodingredientsfirst.com/news/pepsicoalmarai-joint-venture-international-dairy-and-juice-limited-acquires-beyti.html"},
    {"n":37,"title":"Almarai now owns 100% of Beyti (Feb 2023)","publisher":"Enterprise Press","url":"https://enterprise.press/stories/2023/02/23/almarai-now-owns-100-of-beyti-97678/"},
    {"n":38,"title":"Almarai takes 100% in PepsiCo JV","publisher":"Just-Food","url":"https://www.just-food.com/news/saudi-arabia-almarai-takes-100-share-in-pepsico-jv-international-dairy-and-juice-limited/"},
    {"n":39,"title":"Danone Indonesia denies Israel affiliation","publisher":"Tempo","url":"https://en.tempo.co/read/1942251/danone-indonesia-denies-affiliation-with-israel-we-support-palestinian-independence"},
    {"n":40,"title":"Why brand boycotts won't make much difference","publisher":"The Conversation","url":"https://theconversation.com/israel-why-the-brand-boycotts-probably-wont-make-much-difference-217125"},
  ]
};
