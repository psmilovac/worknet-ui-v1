import { Unit1FeaturesAll } from "./unit1_features";
import { Unit1FilterComps } from "./unit1_filter_comps";


// set compartments based on all the features
export function Unit1PickComps(reqBody, unit1, bus_pack, comps_pack_table) {
  // extract the key features for Comps configuration
  let features = Unit1FeaturesAll(unit1);
  // console.log("unit1: ", unit1);
  // console.log("reqBody on entry: ", reqBody);
  // console.log("features on entry: ", features);

  // merge reqBody and features. "features" is base, add other features from reqBody
  let reqBodyExtended = { ...features };
  for (let r in reqBody) {
    reqBodyExtended[r] = reqBody[r];
  }

  // console.log("reqBodyExtended on entry 2: ", reqBodyExtended);

  let unit1_filtered_comps = Unit1FilterComps(
    reqBodyExtended,
    comps_pack_table,
    bus_pack
  );
  
  // console.log("unit1_filtered_comps:", unit1_filtered_comps);
  // console.log("reqBodyExtended before: ", reqBodyExtended);

  // select the comps with the smallest LV compartment
  let comp_pick = unit1_filtered_comps[0];
  if (unit1_filtered_comps.length > 1) {
    // reqBodyExtended.comps_id = unit1_filtered_comps[0].pack_id;
    // find Large LV compartment, if not Medium, if not the fist in row
    // console.log("more than one comp", unit1_filtered_comps);
    for (let key in unit1_filtered_comps) {
      if (unit1_filtered_comps[key].pack_is_lv3) {
        comp_pick = unit1_filtered_comps[key];
      } else if (unit1_filtered_comps[key].pack_is_lv2) {
        comp_pick = unit1_filtered_comps[key];
      }
    }
  }

  // Edge case, when pt3 and pr4 are selected

  //TODO needs fallback value
  reqBodyExtended.comps_id = null;
  if (comp_pick) {
    reqBodyExtended.comps_id = comp_pick.pack_id;
  }
  // console.log("comp_pick", comp_pick.pack_id)
  // console.log("reqBodyExtended", reqBodyExtended)

  // after copying essential features from the unit1 and
  // adding reqBody new features, we can now seach for the compartment
  // reqBodyExtended = FindUnit1Comps(reqBodyExtended, bus_pack);

  // console.log("features", features);
  // console.log("reqBody", reqBody);
  // console.log("reqBodyExtended old:", reqBodyExtended);
  // console.log("unit1", unit1);
  // console.log("bus_pack", bus_pack);

  // from here work with reqBodyExtended
  // USE EXCEL SHEET. SEARCH THE COMPARTMENTS TO FIND THE MATCH. THIS IS YOUR MATRIX TARGET!

  return reqBodyExtended;
}
