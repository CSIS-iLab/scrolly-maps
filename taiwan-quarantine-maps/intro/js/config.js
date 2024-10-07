const config = {
  style: "mapbox://styles/ilabmedia/clwv5vs6e062901nxhrpl1wiv",
  accessToken:
    "pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  showMarkers: true,
  inset: false,
  theme: "dark",
  use3dTerrain: false, //set true for enabling 3D maps.
  chapters: [
    /* ---------------------- chapter1 ---------------------- */
    {
      id: "chapter1",
      alignment: "centered",
      hidden: false,
      description: `<h1 id="ch1title">How China Could<span style='color: #f7d768'> Quarantine </span>Taiwan</h1><hr style='border: 1px solid #f7d768;'><p id='ch1subtitle'><i>Part 1 of a ChinaPower Series</i></p><p id='ch1authors'>By Bonny Lin, Brian Hart, Matthew P. Funaiole, Samantha Lu, and Truly Tinsley</p><p id="ch1date">June 5, 2024</p>`,
      location: {
        center: [120.95099, 23.51142],
        zoom: 7.09,
        pitch: 0.0,
        bearing: 0.0,
        speed: 0.2,
      },
      onChapterEnter: [
        {layer: "hrs2-taiwan-key-locations copy 5", opacity: 0},
        {layer: "hrs2-taiwan-key-locations copy 4", opacity: 0},
        {layer: "hrs2-taiwan-key-locations copy 3", opacity: 0},
        {layer: "Kaohsiung", opacity: 0},
        {layer: "Kaohsiung-Inner-Dot", opacity: 0},
        {layer: "Kaohsiung-Outer-Dot", opacity: 0},
      ],
      onChapterExit: [
        {layer: "hrs2-taiwan-key-locations copy 5", opacity: 1},
        {layer: "hrs2-taiwan-key-locations copy 4", opacity: 1},
        {layer: "hrs2-taiwan-key-locations copy 3", opacity: 1},
        {layer: "Kaohsiung", opacity: 0},
        {layer: "Kaohsiung-Inner-Dot", opacity: 0},
        {layer: "Kaohsiung-Outer-Dot", opacity: 0},
      ],
    },
    /* ---------------------- chapter2 ---------------------- */
    {
      id: "chapter2",
      alignment: "right",
      hidden: false,
      description: `<p>China has significantly increased pressure on Taiwan in recent years. Its military ships and aircraft now operate around Taiwan on a near-daily basis, stoking fears that tensions could erupt into outright conflict. </p>
      <p>Much of the world’s attention has focused on the threat of a Chinese invasion, but Beijing has many options besides an invasion to coerce, punish, or annex Taiwan.</p>`,
      location: {
        center: [120.95099, 23.51142],
        zoom: 6.7,
        pitch: 0.0,
        bearing: 0.0,
        speed: 0.2,
      },
      onChapterEnter: [
        {layer: "hrs2-taiwan-key-locations copy 5", opacity: 1},
        {layer: "hrs2-taiwan-key-locations copy 4", opacity: 1},
        {layer: "hrs2-taiwan-key-locations copy 3", opacity: 1},
        {layer: "Kaohsiung", opacity: 0},
        {layer: "Kaohsiung-Inner-Dot", opacity: 0},
        {layer: "Kaohsiung-Outer-Dot", opacity: 0},
      ],
      onChapterExit: [],
    },
    /* ---------------------- chapter3 ---------------------- */
    {
      id: "chapter3",
      alignment: "right",
      hidden: false,
      description: `<p>One major step China could take is a “gray zone” quarantine led not by the military but by the coast guard and other law enforcement forces.</p>
      <p>Rather than sealing off the island, a quarantine would aim to demonstrate China’s ability to exert control over Taiwan.</p>`,
      location: {
        center: [120.95099, 23.51142],
        zoom: 6.7,
        pitch: 0.0,
        bearing: 0.0,
        speed: 0.2,
      },
      onChapterEnter: [],
      onChapterExit: [],
    },
    /* ---------------------- chapter4 ---------------------- */
    {
      id: "chapter4",
      alignment: "right",
      hidden: false,
      description: `<p>China does not even need to entirely surround the island to impose a quarantine.</p>`,
      location: {
        center: [120.95099, 23.51142],
        zoom: 6.7,
        pitch: 0.0,
        bearing: 0.0,
        speed: 0.15,
      },
      onChapterEnter: [
        {layer: "hrs2-taiwan-key-locations copy 5", opacity: 1},
        {layer: "hrs2-taiwan-key-locations copy 4", opacity: 1},
        {layer: "hrs2-taiwan-key-locations copy 3", opacity: 1},
        {layer: "Kaohsiung", opacity: 0},
        {layer: "Kaohsiung-Inner-Dot", opacity: 0},
        {layer: "Kaohsiung-Outer-Dot", opacity: 0},
      ],
      onChapterExit: [        
      ],
    },
    /* ---------------------- chapter5 ---------------------- */
    {
      id: "chapter5",
      alignment: "right",
      hidden: false,
      description: `<p>In a limited maritime quarantine scenario, Chinese forces could target just one or two key ports, which would still pose a major challenge to Taiwan.</p>`,
      location: {
        center: [120.82656, 22.74073],
        zoom: 7.92,
        pitch: 0.0,
        bearing: 0.0,
        speed: 0.25,
      },
      onChapterEnter: [        {layer: "Kaohsiung", opacity: 1},
      {layer: "Kaohsiung-Inner-Dot", opacity: 1},
      {layer: "Kaohsiung-Outer-Dot", opacity: 1},],
      onChapterExit: [],
    },
    /* ---------------------- chapter6 ---------------------- */
    {
      id: "chapter6",
      alignment: "centered",
      hidden: false,
      description: `<p>Little attention has been paid to the possibility of such scenarios, but in the short term, a quarantine is more likely than an invasion or a military blockade. It also would generate greater uncertainty in terms of how Taiwan and the international community can effectively respond.</p>`,
      location: {
        center: [120.95099, 23.51142],
        zoom: 7.09,
        pitch: 0.0,
        bearing: 0.0,
        speed: 0.2,
      },
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
}

export default config;
