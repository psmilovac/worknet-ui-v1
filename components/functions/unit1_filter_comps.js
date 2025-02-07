// filter available compartments based on all the features
// feat = featuresEssential, bus_id, brk1_id, etc. aka reqBody
// comps = comps_only_pack_table, filtered pack_table based on the category for comps only
// bus = bus_pack, bus bar asm of the unit1
export function Unit1FilterComps(feat, comps, bus) {
  // find if unit1 features are empty or not, eg. bus_id:null, brk_id:null..
  let features_are_empty = true;
  for (let key in feat) {
    if (feat[key]) {
      features_are_empty = false;
      break;
    }
  }

  const bus_name = bus?.pack_name[0];
  // console.log("bus_name", bus_name)

  // console.log("comps:", comps);
  // console.log("feat:", feat);
  // console.log("bus:", bus);

  let result = comps;

  // Prevent the busbar (single line) with the cable1 entry, interfere with the CPT3
  if (!bus?.pack_is_cpt3) {
    // console.log("here");
    comps = result.filter((comp) => comp.pack_is_cpt3 !== true);
  }

  if (!features_are_empty && bus) {
    // BREAKER 1 & BREAKER 2
    if (bus.pack_is_brk1 && bus.pack_is_brk2) {
      result = comps.filter((comp) => comp.pack_is_brk1 && comp.pack_is_brk2);
    }

    // BREAKER 1
    if (bus.pack_is_brk1 && !bus.pack_is_brk2) {
      result = comps.filter(
        (comp) => comp.pack_is_brk1 && (!comp.pack_is_brk2 || comp.pack_is_brk2)
      );
    }

    // BREAKER 2
    if (!bus.pack_is_brk1 && bus.pack_is_brk2) {
      result = comps.filter(
        (comp) => comp.pack_is_brk2 && (!comp.pack_is_brk1 || comp.pack_is_brk1)
      );
    }

    if (feat.cpt1_id) {
      result = result.filter((comp) => comp.pack_is_cpt1); // F1 and F2
      if (feat.cpt1_connection <= 2) {
        result = result.filter(
          (comp) => comp.pack_is_cpt1_comp_up_connect === true
        );
      }

      if (feat.cpt1_connection > 2 && feat.cpt1_connection <= 8) {
        result = result.filter(
          (comp) => comp.pack_is_cpt1_comp_up_connect != true
        );
      }
    }

    if (feat.cpt2_id) {
      result = result.filter((comp) => comp.pack_is_cpt2); // B1 and B2
      if (feat.cpt2_connection <= 2) {
        result = result.filter(
          (comp) => comp.pack_is_cpt2_comp_up_connect != true
        );
      }

      if (feat.cpt2_connection > 2 && feat.cpt2_connection <= 8) {
        result = result.filter(
          (comp) => comp.pack_is_cpt2_comp_up_connect == true
        );
      }
    }

    // CPT1 and CPT2
    // if (feat.cpt1_id && feat.cpt2_id) {
    //   result = comps.filter((comp) => comp.pack_is_cpt1 && comp.pack_is_cpt2); // I1, I2, I3
    // if (feat.cpt1_connection <= 2 && feat.cpt2_connection <= 2)
    //   {
    //   result = result.filter((comp) => comp.pack_variation === 1); // I1, pack_variation:1, ID:146,
    // }

    // if (feat.cpt1_connection > 2 && feat.cpt2_connection > 2) {
    //   result = result.filter((comp) => comp.pack_variation === 4); // I2, pack_variation:2, ID:153
    // }

    // if (feat.cpt1_connection <= 2 && feat.cpt2_connection > 2) {
    //   result = result.filter((comp) => comp.pack_variation === 3); // I3, pack_variation:1, ID:154
    // }

    // if (feat.cpt1_connection > 2 && feat.cpt2_connection <= 2) {
    //   result = result.filter((comp) => comp.pack_variation === 2); // I3, pack_variation:1, ID:155
    // }

    if (feat.cpt3_id) {
      result = result.filter((comp) => comp.pack_is_cpt3);
    }

    if (feat.pt1_id || feat.pt2_id) {
      result = result.filter((comp) => comp.pack_is_pt1);
    }

    if (feat.pt3_id) {
      result = result.filter((comp) => comp.pack_is_pt3);
    }

    if (feat.pt4_id) {
      result = result.filter((comp) => comp.pack_is_pt4);
    }
  }
  // console.log("result", result)
  return result;
}
