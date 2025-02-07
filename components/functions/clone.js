// function for converting
import { unit1_check_arr } from "@/global/global_vars";
import { unit1_features } from "@/global/global_vars";

export function CloneUnit1(unit1) {
  
  let clone = {};
  for (let k of unit1_features) { // {brk1:null, bus:2, comps:2, lineup1_id:58 ...}
    if (!!unit1[k]) { // {bus:2, comps:2, lineup1_id:58 }
      clone[k] = unit1[k]; // {bus_id: 2, comps_id: 12}
    }
  }
  return clone;
}


