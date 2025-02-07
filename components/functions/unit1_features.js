// use global var to get the list of the features.
import { unit1_features } from "@/global/global_vars";
import { unit1_features_essential } from "@/global/global_vars";

// extract all the features from the unit1
export function Unit1FeaturesAll(unit1) {
  let features = {};
  for (let feat in unit1_features) {
    features[unit1_features[feat]] = unit1[unit1_features[feat]];
  }
  return features;
}


// NOT IN USE
// capture all the essential features from the unit1
// on a top of that we will stick reqBody features later 
// and search for suitabel Compartment.  
export function Unit1EssentialCompsFeatures(unit1) {
  let features = {};
  for (let feat in unit1_features_essential) {
    features[unit1_features_essential[feat]] = unit1[unit1_features_essential[feat]];
  }
  return features;
}

// example:
//
// { brk1_designation:null
// brk1_id:null
// brk2_designation:null
// brk2_id:null
// bus_id:6
// category_id:null
// comps_id:46
// cpt1_id:null
// ... }
