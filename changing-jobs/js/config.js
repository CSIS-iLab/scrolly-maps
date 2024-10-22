var config = {
  style: "mapbox://styles/ilabmedia/ck5d1k9mp06931irt49gkf2zb",
  accessToken:
    "pk.eyJ1IjoiaWxhYm1lZGlhIiwiYSI6ImNpbHYycXZ2bTAxajZ1c2tzdWU1b3gydnYifQ.AHxl8pPZsjsqoz95-604nw",
  showMarkers: false,
  alignment: "left",
  theme: "dark",
  title: "The Landscape of Economic Change: 1990-2018",
  subtitle: "",
  byline:
    "Produced by CSIS iDeas Lab and the CSIS Trade Commission on Affirming American Leadership",
  logo: "https://res.cloudinary.com/csisideaslab/image/upload/c_scale,w_300/v1579120733/trade-commission/AALC_Trade_Commission_logo_RGB_Black_-_Vertical.jpg",
  footer:
    "Source: Data from Bureau of Labor Statistics | Special Thanks: Mapbox Community Team",
  chapters: [
    {
      id: "states1990",
      alignment: "left",
      title: "The Decline in Manufacturing Employment",
      subtitle: "The Nationwide View in 1990",
      image: "",
      description: `The U.S. economy has undergone significant changes in the last 30 years. One of the most notable trends has been the decline in manufacturing employment. In 1990, about 17.7 million people in the United States were employed in manufacturing. The map on the right shows the makeup of employment on a state-level in 1990.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 3.5,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "frame0_states_1990",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame0_states_1990",
          opacity: 0,
        },
      ],
    },
    {
      id: "states2018",
      alignment: "left",
      subtitle: "The Nationwide View in 2018",
      image: "",
      description: `By 2018, the United States had shed 5 million manufacturing jobs across the country. The sector now employs 12.7 million Americans. Although manufacturing employment has risen since an all-time low in 2010, the overall makeup of the U.S. economy has changed. Manufacturing occupations now make up a smaller percentage of overall employment in states across the country.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 3.5,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "frame0_states_2018",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame0_states_2018",
          opacity: 0,
        },
      ],
    },
    {
      id: "counties200",
      alignment: "left",
      title: "Locating Production in 1990",
      subtitle: "The Top 200",
      image: "",
      description: `These are the 200 counties that in 1990 held the highest concentration of manufacturing workers in the United States as compared to the average county and employed at least ten thousand manufacturing workers.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 3.5,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "counties-200-trade-sheet1-dn6e4s",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "counties-200-trade-sheet1-dn6e4s",
          opacity: 0,
        },
      ],
    },
    {
      id: "counties100",
      alignment: "left",
      title: "",
      subtitle: "The Top 100",
      image: "",
      description: `Of that subset, CSIS studied the 100 counties most exposed to the shifting economy. Roughly 2.4 million Americans worked in manufacturing in these 100 counties in 1990, accounting for 15 percent of the 17.7 million manufacturing workers in the United States.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 4.0,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "satellite",
          opacity: 0,
        },
        {
          layer: "frame1_Overview",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame1_Overview",
          opacity: 0,
        },
      ],
    },
    {
      id: "counties100b",
      alignment: "left",
      title: "",
      subtitle: "The Midwest and Piedmont Plateau",
      image: "",
      description: `Most of those counties are concentrated around the Great Lakes in the Industrial Midwest and the Piedmont, which stretches from New York to Alabama between the Blue Ridge Mountains to the west and Atlantic Seaboard fall line to the east.`,
      location: {
        center: [-83.265937, 37.870455],
        zoom: 5.13,
        pitch: 22.5,
        bearing: -26.92,
        // speed: 0.05
      },
      onChapterEnter: [
        {
          layer: "frame1_Overview",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame1_Overview",
          opacity: 0,
        },
      ],
    },
    {
      id: "manuDecline3",
      alignment: "left",
      title: `Manufacturing's Decline`,
      subtitle: "From 1990…",
      image: "",
      description: `Over the past three decades, most of these counties have experienced a decline in manufacturing jobs as a percent of total jobs.`,
      location: {
        center: [-83.06627, 35.627624],
        zoom: 6,
        pitch: 60,
        bearing: -19.72,
      },
      onChapterEnter: [
        {
          layer: "counties_1990_manuB",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "counties_1990_manuB",
          opacity: 0,
        },
      ],
    },
    {
      id: "manuDecline4",
      alignment: "left",
      title: ``,
      subtitle: "…To 2018",
      image: "",
      description: `From 1990 to 2018, the counties that experienced largest declines in manufacturing as a percent of total employment are especially concentrated in the Piedmont South, which was home to low-skill, labor intensive manufacturing.`,
      location: {
        center: [-83.06627, 35.627624],
        zoom: 6,
        pitch: 60,
        bearing: -19.72,
      },
      onChapterEnter: [
        {
          layer: "counties_2018_manuB",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "counties_2018_manuB",
          opacity: 0,
        },
      ],
    },
    {
      id: "services5",
      alignment: "left",
      title: "Overall Job Growth Despite Manufacturing Loss",
      subtitle: "The New Economy Fills In",
      image: "",
      description: `Of the 100 counties where manufacturing was most concentrated in 1990, these 61 had both an increase in overall employment and a decline in manufacturing employment compared to other jobs. The growing services economy drove job gains in these counties.`,
      location: {
        center: [-83.677347, 37.62944],
        zoom: 5.23,
        pitch: 52.0,
        bearing: 13.88,
      },
      onChapterEnter: [
        {
          layer: "frame_5a",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_5a",
          opacity: 0,
        },
      ],
    },
    {
      id: "services6",
      alignment: "left",
      title: "Overall Loss",
      subtitle: "Manufacturing and Total Employment Decline",
      image:
        "https://res.cloudinary.com/csisideaslab/image/upload/v1578599748/trade-commission/bethlehem-steel-factory.jpg",
      description: `Meanwhile, 27 counties had overall negative job growth between 1990 and 2018. All but one experienced a decline in manufacturing jobs as a percent of all jobs.`,
      location: {
        center: [-83.677347, 37.62944],
        zoom: 5.23,
        pitch: 52.0,
        bearing: 13.88,
      },
      onChapterEnter: [
        {
          layer: "frame_5b",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_5b",
          opacity: 0,
        },
      ],
    },
    {
      id: "inDepth7",
      alignment: "left",
      title: "In Depth: A Decline in Southern Manufacturing",
      subtitle: "The Piedmont South",
      image: "",
      description: `One hard-hit region is the Piedmont South, particularly North Carolina. This region was traditionally home to a heavy concentration of textile and furniture manufacturers. In 1990, more than a quarter of North Carolina’s workforce was in manufacturing. By 2010 that had dropped to just over 11 percent, with production shifting to cheaper labor abroad.`,
      location: {
        center: [-82.15448, 34.74736],
        zoom: 6.72,
        pitch: 2.0,
        bearing: 0.0,
        // speed: 0.02
      },
      onChapterEnter: [
        {
          layer: "frame_7",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_7",
          opacity: 0,
        },
      ],
    },
    {
      id: "inDepth8",
      alignment: "left",
      title: "",
      subtitle: "Cliffside Mill, Rutherford Co, NC",
      image: "",
      description: `In 1899, the foundation was laid for Cliffside Mill in Rutherford County, NC. The mill sustained textile manufacturing jobs for over a century until it succumbed to pressure from global competition in 2005. The mill was ultimately demolished. Like Cliffside, many other mills across the Piedmont South have shut down in the past 30 years. `,
      location: {
        center: [-81.769179, 35.236806],
        zoom: 16,
        pitch: 41,
        bearing: 22.4,
        // speed: 0.02
      },
      onChapterEnter: [
        {
          layer: "satellite",
          opacity: 0,
        },

        {
          layer: "satellite",
          opacity: 1,
        },
        {
          layer: "rutherford",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "satellite",
          opacity: 0,
        },
        {
          layer: "rutherford",
          opacity: 0,
        },
      ],
    },
    {
      id: "inDepth9",
      alignment: "left",
      title: "",
      subtitle: "Surry County, NC",
      image:
        "https://res.cloudinary.com/csisideaslab/image/upload/v1578600550/trade-commission/worker-checks-panel.jpg",
      description: `Of the 100 counties, Surry County, NC was hit hardest, losing nearly 74 percent of its manufacturing jobs since 1990. Manufacturing employment has slightly rebounded since 2011 but is unlikely to return to previous levels, in part due to automation.`,
      location: {
        center: [-80.638729, 36.357558],
        zoom: 8.16,
        pitch: 41.0,
        bearing: 16.3,
        // speed: 0.02
      },
      onChapterEnter: [
        {
          layer: "frame_6b",
          opacity: 1,
        },
        {
          layer: "frame_6b_label",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_6b",
          opacity: 0,
        },
        {
          layer: "frame_6b_label",
          opacity: 0,
        },
      ],
    },
    {
      id: "inDepth10",
      alignment: "left",
      title: "In-Depth: The Great Lakes Region",
      subtitle: "The Industrial Heartland Falters",
      image: "",
      description: `The former industrial heartland surrounding the Great Lakes is also hurting. Unlike in rural North Carolina, the manufacturing job loss is centered around larger cities like Flint, MI, Rochester, NY, and Youngstown, OH.`,
      location: {
        center: [-83.85935, 43.08401],
        zoom: 5.81,
        pitch: 0.0,
        bearing: 0.0,
        // speed: 0.02
      },
      onChapterEnter: [
        {
          layer: "frame_7",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_7",
          opacity: 0,
        },
      ],
    },
    {
      id: "inDepth11",
      alignment: "left",
      title: "",
      subtitle: `Buick City, Genesee County, MI`,
      image: "",
      description: `Flint lost over 36,500 manufacturing jobs between 1990 and 2018, almost 75 percent of the manufacturing jobs that existed in 1990. Today, Flint has half of the population it did in 1960 and Genessee County’s population peaked in 1980. The birthplace of General Motors, the company employed over 80,000 in the Flint region in 1978. By 1990 GM employed 23,000 workers near Flint, and currently employs just 7,000.`,
      location: {
        center: [-83.685, 43.038],
        zoom: 16.3,
        pitch: 50.0,
        bearing: 0,
        // speed: 0.02
      },
      onChapterEnter: [
        {
          layer: "satellite",
          opacity: 0,
        },
        {
          layer: "buick",
          opacity: 1,
        },

        {
          layer: "satellite",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "satellite",
          opacity: 0,
        },
        {
          layer: "buick",
          opacity: 0,
        },
      ],
    },
    {
      id: "inDepth12",
      alignment: "left",
      title: "",
      subtitle: "Monroe County, NY",
      image:
        "https://res.cloudinary.com/csisideaslab/image/upload/c_scale,w_4000/v1579104570/trade-commission/Skyline_Rochester.jpg",
      description: `Home to Rochester, this county suffered as its flagship employers like Kodak and Xerox declined. Monroe County lost over 70,500 manufacturing jobs, nearly 65 percent of its manufacturing workforce in 1990. With major research universities and affordable housing, some hope that the region can reinvent itself as an innovation hub.`,
      location: {
        center: [-77.57209, 43.19292],
        zoom: 8.07,
        pitch: 55.0,
        bearing: 41.6,
      },
      onChapterEnter: [
        {
          layer: "monroe",
          opacity: 1,
        },
        {
          layer: "monroe_label",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "monroe",
          opacity: 0,
        },
        {
          layer: "monroe_label",
          opacity: 0,
        },
      ],
    },
    {
      id: "jobs13",
      alignment: "left",
      title: "Jobs Lost, Jobs Gained",
      subtitle: "The New Economy",
      image:
        "https://res.cloudinary.com/csisideaslab/image/upload/v1578603350/trade-commission/service-industries.jpg",
      description: `Meanwhile, these 73 counties had growth in overall employment between 1990 and 2018, despite most counties losing manufacturing jobs. In many of these counties, job growth was driven by services-providing industries.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 4.0,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "frame_9",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_9",
          opacity: 0,
        },
      ],
    },
    {
      id: "brightSpots14",
      alignment: "left",
      title: "Manufacturing Bright Spots",
      subtitle: "Midwest Success",
      image: "",
      description: `Twelve of those counties had both overall employment growth and an increase in manufacturing jobs as a percent of all jobs. Ten of those counties are situated in the Midwest. Some counties, like Marathon County, WI or Shelby County, OH, manufacture a diverse range of products. Others, like Elkhart County, IN, dominate production of a single item, which in Elkhart's case is RVs.`,
      location: {
        center: [-86.962814, 42.775003],
        zoom: 6.06,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "frame_10",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_10",
          opacity: 0,
        },
      ],
    },
    {
      id: "snohomish",
      alignment: "left",
      title: "",
      subtitle: "Snohomish County, WA",
      image: "",
      description: `The aerospace industry contributes the most to Snohomish County’s economic success, employing 46 percent of its manufacturing workers, with over 30,000 working for Boeing alone at their Everett Factory. The largest building in the world, Boeing produces the 747, 767, 777, and 787 models here. Boeing and its suppliers have undergirded the county’s economy for decades.`,
      location: {
        center: [-122.2786, 47.91688],
        zoom: 14.0,
        pitch: 60.0,
        bearing: -28.8,
      },
      onChapterEnter: [
        {
          layer: "satellite",
          opacity: 0,
        },

        {
          layer: "satellite",
          opacity: 1,
        },

        {
          layer: "boeing2",
          opacity: 1,
        },
        {
          layer: "us_states",
          opacity: 0,
        },
      ],
      onChapterExit: [
        {
          layer: "satellite",
          opacity: 0,
        },
        {
          layer: "boeing2",
          opacity: 0,
        },
        {
          layer: "us_states",
          opacity: 1,
        },
      ],
    },
    {
      id: "blank",
      location: {
        center: [-98.82517, 41.0],
        zoom: 4.2,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "manuLoss1",
      alignment: "left",
      title: "30 Years of Manufacturing Loss",
      subtitle: "The Concentrated Impact",
      image: "",
      description: `Nearly 725,000 manufacturing jobs disappeared in these 100 counties from 1990 to 2018. While some counties have seen net growth in manufacturing employment and others have seen a slight rebound, most of manufacturing jobs have yet to return and likely never will. Despite the loss of millions of manufacturing jobs, manufacturing production in the U.S. is actually up. According to government data, the manufacturing sector produces roughly 30% more today than it did in 1990, all while employing fewer workers.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 4.2,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "frame_11",
          opacity: 1,
        },
        {
          layer: "frame_11b",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "frame_11",
          opacity: 0,
        },
        {
          layer: "frame_11b",
          opacity: 0,
        },
      ],
    },
    {
      id: "growth",
      alignment: "left",
      title: "30 Years of Services Growth",
      subtitle: "The Road Ahead",
      image: "",
      description: `Overall, U.S. jobs increased by roughly 30 percent. Services jobs have especially grown across the country. In 1990, services-providing jobs accounted for 78 percent of all jobs in the U.S. By 2018, they accounted for 86 percent. While the roughly 32.5 million new services jobs make up for the lost manufacturing jobs on a pure job-to-job basis, we’ve seen some parts of the country have had a harder time transitioning away from manufacturing than others. What to do about these workers and communities left behind is one of the most pressing questions business leaders and policymakers at all levels of government will face in the years ahead.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 3.5,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "us_states_final",
          opacity: 1,
        },
      ],
      onChapterExit: [
        {
          layer: "us_states_final",
          opacity: 0,
        },
      ],
    },
    {
      id: "roadAhead",
      alignment: "left",
      title: "Taking Stock",
      subtitle: "Trends and Challenges",
      image: "",
      description: "",
      list1: `Manufacturing makes up a declining share of the U.S. economy and U.S. employment because of productivity growth.`,
      list2: `Services have filled in, generating more new jobs than lost manufacturing jobs and accounting for a growing share of the U.S. economy and employment.`,
      list3: `However, for many counties and communities across the United States, the transition from a manufacturing economy to a services-driven economy has proven difficult.`,
      list4: `How to help these communities transition to the modern economy is one of the most pressing questions business leaders and policymakers at all levels of government will face in the years ahead.`,
      location: {
        center: [-98.82517, 41.0],
        zoom: 3.5,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [],
      onChapterExit: [],
    },
    {
      id: "close",
      location: {
        center: [-98.82517, 41.0],
        zoom: 3.5,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [],
      onChapterExit: [],
    },
  ],
};
