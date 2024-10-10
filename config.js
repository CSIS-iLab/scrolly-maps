var config = {
  style: "mapbox://styles/ilabmedia/cm1qz0uqh00wg01p63as5gfip",
  accessToken:
    "pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  projection: "globe",
  inset: false,
  theme: "dark",
  use3dTerrain: false,
  auto: false,
  title:
    "Crossroad of Commerce: How the Taiwan Strait Propels the Global Economy",
  alignment: "right",
  chapters: [
    {
      /* ---------------------- chapter0 ---------------------- */
      id: "chapter0",
      alignment: "center",
      hidden: true,
      title: "",
      image: "",
      description: "",
      location: {
        center: [120.74709, 23.97749],
        zoom: 6.5,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
          {
            layer: "trade_lines",
            opacity: 0,
          },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
    },
    /* ---------------------- chapter1 ---------------------- */
    {
      id: "chapter1",
      alignment: "center",
      hidden: false,
      description:
        'Maritime trade is the <span style="color:#14E2F7;">lifeblood</span> of the global economy.',
      location: {
        center: [120.74709, 23.97749],
        zoom: 2.5,
        pitch: 0,
        bearing: 0,
        speed: 1,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "trade_lines",
          opacity: 1,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 1,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
    },
    /* ---------------------- chapter2 ---------------------- */
    {
      id: "chapter2",
      alignment: "center",
      hidden: false,
      description:
        "Each year, thousands of massive containerships and tankers ferry more than $11.5 trillion in goods and energy across the world’s oceans.",
      location: {
        center: [-92.57474, 33.38031],
        zoom: 2.5,
        pitch: 0,
        bearing: 0.0,
        speed: 1,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "trade_lines",
          opacity: 1,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 1,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
    },
    /* ---------------------- chapter3 ---------------------- */
    {
      id: "chapter3",
      alignment: "fully",
      hidden: false,
      description:
        'These vessels follow well-established routes that converge at <span style="color:#F75D55;">strategic chokepoints</span> where maritime traffic is especially vulnerable to disruption.',
      location: {
        center: [65.47443, 1.41163],
        zoom: 2.5,
        pitch: 0,
        bearing: 0,
        speed: 0.5,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "trade_lines",
          opacity: 1,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 1,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 1,
        },
      ],
    },
    /* ---------------------- chapter4 ---------------------- */
    {
      id: "chapter4",
      alignment: "fully",
      hidden: false,
      description:
        'Asia’s geography, and its centrality to global commerce, have heightened the importance of chokepoints like the Strait of Malacca and, increasingly, the <span style="color:#F75D55;">Taiwan Strait.</span>',
      location: {
        center: [120.74709, 23.97749],
        zoom: 3.5,
        pitch: 0,
        bearing: 0,
        speed: 0.5,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
    },
    /* ---------------------- chapter5 ---------------------- */
    {
      id: "chapter5",
      alignment: "fully",
      hidden: false,
      description:
        "China’s rising assertiveness has sparked fears that it may soon use force to bring Taiwan under its control.<br><br>While a major conflict over Taiwan would have catastrophic consequences for the global economy, less severe actions taken by Beijing would also destabilize trade through the Taiwan Strait.",
      location: {
        center: [120.58214, 24.01651],
        zoom: 6,
        pitch: 0,
        bearing: 0,
        speed: 0.5,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 1,
        },
      ],
    },
    /* ---------------------- chapter6 ---------------------- */
    {
      id: "chapter6",
      alignment: "fully",
      hidden: false,
      description:
        "New research from CSIS estimates that approximately $2.45 trillion worth of goods—over one-fifth of global maritime trade—transited the Taiwan Strait in 2022.<br><br>Disruptions to this trade would send shockwaves well beyond Taiwan and China, impacting key U.S. allies and broad swaths of the Global South.",
      location: {
        center: [120.74709, 23.97749],
        zoom: 3.5,
        pitch: 0,
        bearing: 0,
        speed: 0.5,
      },
      mapAnimation: "flyTo",
      rotateAnimation: false,
      onChapterEnter: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "trade_lines",
          opacity: 0,
        },
        {
          layer: "teal_lines_taiwan_red",
          opacity: 0,
        },
      ],
    },
  ],
};