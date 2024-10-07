// import * as d3Fetch from "d3-fetch"

const URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSfo2bN8Ez8JXo-AIfaNt9t0KG3iOElCfeQtq-B39uXcUcb2EMGaSYNZeXu1E_g_JBsFhXVUoev_YiQ/pub?gid=0&single=true&output=csv"

export default function getData() {
  const dataPromise = d3.csv(URL).then((res) => {
    const data = res.map((row) => {
      return {
        id: row.chapter_id,
        alignment: row.alignment,
        description: row.description,
        center_long: row.center_longitude,
        center_lat: row.center_latitude,
        zoom: row.zoom,
        zoom_mobile: row.zoom_mobile,
        center_long_mobile: row.center_longitude_mobile,
        center_lat_mobile: row.center_latitude_mobile,
        speed: row.speed,
        onChapterEnter: [
          {
            layer: "civilian-port", 
            opacity: parseInt(row.civilian_port_en)
          },
          {
            layer: "energy-terminal",
            opacity: parseInt(row.energy_terminal_en),
          },
          {
            layer: "blockade-zone-polygon",
            opacity: parseInt(row.blockade_zone_polygon_en),
          },
          {
            layer: "taiwan-territorial-sea-outline",
            opacity: parseInt(row.taiwan_territorial_sea_outline_en),
          },
          {
            layer: "taiwan-contiguous-zone-fill",
            opacity: parseInt(row.taiwan_contiguous_zone_fill_en),
          },
          {
            layer: "taiwan-contiguous-zone-outline",
            opacity: parseInt(row.taiwan_contiguous_zone_outline_en),
          },
          {
            layer: "hualien-label",
            opacity: parseInt(row.hualien_label_en),
          },
          {
            layer: "kaohsiung-label",
            opacity: parseInt(row.kaohsiung_label_en)
          },
          {
            layer: "keelung-label",
            opacity: parseInt(row.keelung_label_en)
          },
          {
            layer: "mailiao-label",
            opacity: parseInt(row.mailiao_label_en)
          },
          {
            layer: "port-of-taipei-label",
            opacity: parseInt(row.port_of_taipei_label_en)
          },
          {
            layer: "taichung-label",
            opacity: parseInt(row.taichung_label_en)
          },
          {
            layer: "key-port-inner-dot",
            opacity: parseInt(row.key_port_inner_dot_en)
          },
          {
            layer: "key-port-outer-dot",
            opacity: parseInt(row.key_port_outer_dot_en)
          },
          {
            layer: "us-japan-bases",
            opacity: parseInt(row.us_japan_bases_en)
          }
        ],
        onChapterExit: [
          {
            layer: "civilian-port", 
            opacity: parseInt(row.civilian_port_ex)
          },
          {
            layer: "energy-terminal",
            opacity: parseInt(row.energy_terminal_ex),
          },
          {
            layer: "blockade-zone-polygon",
            opacity: parseInt(row.blockade_zone_polygon_ex),
          },
          {
            layer: "taiwan-territorial-sea-outline",
            opacity: parseInt(row.taiwan_territorial_sea_outline_ex),
          },
          {
            layer: "taiwan-contiguous-zone-fill",
            opacity: parseInt(row.taiwan_contiguous_zone_fill_ex),
          },
          {
            layer: "taiwan-contiguous-zone-outline",
            opacity: parseInt(row.taiwan_contiguous_zone_outline_ex),
          },
          {
            layer: "hualien-label",
            opacity: parseInt(row.hualien_label_ex),
          },
          {
            layer: "kaohsiung-label",
            opacity: parseInt(row.kaohsiung_label_ex)
          },
          {
            layer: "keelung-label",
            opacity: parseInt(row.keelung_label_ex)
          },
          {
            layer: "mailiao-label",
            opacity: parseInt(row.mailiao_label_ex)
          },
          {
            layer: "port-of-taipei-label",
            opacity: parseInt(row.port_of_taipei_label_ex)
          },
          {
            layer: "taichung-label",
            opacity: parseInt(row.taichung_label_ex)
          },
          {
            layer: "key-port-inner-dot",
            opacity: parseInt(row.key_port_inner_dot_ex)
          },
          {
            layer: "key-port-outer-dot",
            opacity: parseInt(row.key_port_outer_dot_ex)
          },
          {
            layer: "us-japan-bases",
            opacity: parseInt(row.us_japan_bases_ex)
          }
        ],
      }
    })

    console.log("data", data)
    return {
      data,
    }
  })
  return dataPromise
}
