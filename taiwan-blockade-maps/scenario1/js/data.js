// import * as d3Fetch from "d3-fetch"

const URL =
  "https://docs.google.com/spreadsheets/d/1RHzDVb4LWnj3SR_R4VTthBrVAvfiTpWn3Eahi9_rpw8/pub?gid=0&single=true&output=csv"

export default function getData() {
  const dataPromise = d3.csv(URL).then((res) => {
    console.log(res)
    const data = res.map((row) => {
      console.log(row.id)
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
            layer: "bombers",
            opacity: parseInt(row.bombers_en)
          },
          {
            layer: "air-patrol-path",
            opacity: parseInt(row.air_patrol_path_en),
          },
          {
            layer: "china-coast-guard-glow",
            opacity: parseInt(row.china_coast_guard_glow_en),
          },
          {
            layer: "china-coast-guard-dot",
            opacity: parseInt(row.china_coast_guard_dot_en),
          },
          {
            layer: "pla-glow",
            opacity: parseInt(row.pla_glow_en),
          },
          {
            layer: "pla-dot",
            opacity: parseInt(row.pla_dot_en),
          },
          {
            layer: "military-naval-base",
            opacity: parseInt(row.military_naval_base_en),
          },
          {
            layer: "military-airbase",
            opacity: parseInt(row.military_airbase_en),
          },
          {
            layer: "civilian-port",
            opacity: parseInt(row.civilian_port_en),
          },
          {
            layer: "civilian-airport",
            opacity: parseInt(row.civilian_airport_en),
          },
          {
            layer: "energy-terminal",
            opacity: parseInt(row.energy_terminal_en),
          },
          {
            layer: "taiwan-mine-areas-inactive",
            opacity: parseInt(row.taiwan_mine_areas_inactive_en),
          },
          {
            layer: "taiwan-mine-areas-active",
            opacity: parseInt(row.taiwan_mine_areas_active_en),
          },
          {
            layer: "blockade-zone-polygon",
            opacity: parseInt(row.blockade_zone_polygon_en),
          },
          {
            layer: "exercise-zones",
            opacity: parseInt(row.exercise_zones_en),
          },
          {
            layer: "carrier-strike-group-5",
            opacity: parseInt(row.carrier_strike_group_5_en),
          },
          {
            layer: "carrier-strike-group-4",
            opacity: parseInt(row.carrier_strike_group_4_en),
          },
          {
            layer: "carrier-strike-group-3",
            opacity: parseInt(row.carrier_strike_group_3_en),
          },
          {
            layer: "carrier-strike-group-2",
            opacity: parseInt(row.carrier_strike_group_2_en),
          },
          {
            layer: "carrier-strike-group-1",
            opacity: parseInt(row.carrier_strike_group_1_en),
          },
          {
            layer: "carrier-dot",
            opacity: parseInt(row.carrier_dot_en),
          },
          {
            layer: "carrier-glow",
            opacity: parseInt(row.carrier_glow_en),
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
            layer: "PLA_ship1",
            opacity: parseInt(row.pla_ship1_en),
          },
          {
            layer: "PLA_ship2",
            opacity: parseInt(row.pla_ship2_en),
          },
          {
            layer: "PLA_ship3",
            opacity: parseInt(row.pla_ship3_en),
          },
          {
            layer: "missile-brigade",
            opacity: parseInt(row.missile_brigade_en),
          },
          {
            layer: "pla-coastal-and-air-defense",
            opacity: parseInt(row.pla_coastal_and_air_defense_en),
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
            layer: "taiwan-cables", 
            opacity: parseInt(row.taiwan_cables_en)
          },
          { 
            layer: "exercise-zone-fill",
            opacity: parseInt(row.exercise_zone_fill_en)
          },
          {
            layer: "taiwan-sea-labels",
            opacity: parseInt(row.taiwan_sea_labels_en)
          },
          {
            layer: "pla-dot-special",
            opacity: parseInt(row.pla_dot_special_en)
          },
          {
            layer: "pla-glow-special",
            opacity: parseInt(row.pla_glow_special_en)
          },
          {
            layer: "suao-label",
            opacity: parseInt(row.suao_label_en)
          }
        ],
        onChapterExit: [
          { 
            layer: "bombers",
            opacity: parseInt(row.bombers_ex)
          },
          {
            layer: "air-patrol-path",
            opacity: parseInt(row.air_patrol_path_en),
          },
          {
            layer: "china-coast-guard-glow",
            opacity: parseInt(row.china_coast_guard_glow_ex),
          },
          {
            layer: "china-coast-guard-dot",
            opacity: parseInt(row.china_coast_guard_dot_ex),
          },
          {
            layer: "pla-glow",
            opacity: parseInt(row.pla_glow_ex),
          },
          {
            layer: "pla-dot",
            opacity: parseInt(row.pla_dot_ex),
          },
          {
            layer: "military-naval-base",
            opacity: parseInt(row.military_naval_base_ex),
          },
          {
            layer: "military-airbase",
            opacity: parseInt(row.military_airbase_ex),
          },
          {
            layer: "civilian-port",
            opacity: parseInt(row.civilian_port_ex),
          },
          {
            layer: "civilian-airport",
            opacity: parseInt(row.civilian_airport_ex),
          },
          {
            layer: "energy-terminal",
            opacity: parseInt(row.energy_terminal_ex),
          },
          {
            layer: "taiwan-mine-areas-inactive",
            opacity: parseInt(row.taiwan_mine_areas_inactive_ex),
          },
          {
            layer: "taiwan-mine-areas-active",
            opacity: parseInt(row.taiwan_mine_areas_active_ex),
          },
          {
            layer: "blockade-zone-polygon",
            opacity: parseInt(row.blockade_zone_polygon_ex),
          },
          {
            layer: "exercise-zones",
            opacity: parseInt(row.exercise_zones_ex),
          },
          {
            layer: "carrier-strike-group-5",
            opacity: parseInt(row.carrier_strike_group_5_ex),
          },
          {
            layer: "carrier-strike-group-4",
            opacity: parseInt(row.carrier_strike_group_4_ex),
          },
          {
            layer: "carrier-strike-group-3",
            opacity: parseInt(row.carrier_strike_group_3_ex),
          },
          {
            layer: "carrier-strike-group-2",
            opacity: parseInt(row.carrier_strike_group_2_ex),
          },
          {
            layer: "carrier-strike-group-1",
            opacity: parseInt(row.carrier_strike_group_1_ex),
          },
          { 
            layer: "carrier-dot",
            opacity: parseInt(row.carrier_dot_ex) 
          },
          {
            layer: "carrier-glow",
            opacity: parseInt(row.carrier_glow_ex),
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
            layer: "PLA_ship1",
            opacity: parseInt(row.pla_ship1_ex),
          },
          {
            layer: "PLA_ship2",
            opacity: parseInt(row.pla_ship2_ex),
          },
          {
            layer: "PLA_ship3",
            opacity: parseInt(row.pla_ship3_ex),
          },
          {
            layer: "missile-brigade",
            opacity: parseInt(row.missile_brigade_ex),
          },
          {
            layer: "pla-coastal-and-air-defense",
            opacity: parseInt(row.pla_coastal_and_air_defense_ex),
          },
          { layer: "hualien-label", 
            opacity: parseInt(row.hualien_label_ex) 
          },
          {
            layer: "kaohsiung-label",
            opacity: parseInt(row.kaohsiung_label_ex),
          },
          { layer: "keelung-label", 
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
          { layer: "taichung-label", 
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
            layer: "taiwan-cables", 
            opacity: parseInt(row.taiwan_cables_ex)
          },
          {
            layer: "exercise-zone-fill",
            opacity: parseInt(row.exercise_zone_fill_ex)
          },
          {
            layer: "taiwan-sea-labels",
            opacity: parseInt(row.taiwan_sea_labels_ex)
          },
          {
            layer: "pla-dot-special",
            opacity: parseInt(row.pla_dot_special_ex)
          },
          {
            layer: "pla-glow-special",
            opacity: parseInt(row.pla_glow_special_ex)
          },
          {
            layer: "suao-label",
            opacity: parseInt(row.suao_label_ex)
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
