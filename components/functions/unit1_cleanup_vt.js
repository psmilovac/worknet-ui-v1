import {
  clean_brk1,
  clean_brk2,
  clean_cpt1,
  clean_cpt2,
  clean_cpt3,
  clean_cpt1_fuse,
  clean_cpt2_fuse,
  clean_cpt3_fuse,
} from "./unit1_cleanup_vars";

// here passing only set of four pt ids.
export default function Unit1CleanupVT(pt_set) {
  let reqBody = {};

  //    ---------------- PT 1, PT 2 ----------------

  // bus that accept the pts usually can accept cpt. clear cpt feature and any potential breaker value
  if (pt_set.pt1_id || pt_set.pt2_id) {
    if (pt_set.pt3_id || pt_set.pt4_id) {
      reqBody = {
        ...pt_set,
        ...clean_brk1,
        ...clean_brk2,
        ...clean_cpt1,
        ...clean_cpt2,
        ...clean_cpt3,
        ...clean_cpt1_fuse,
        ...clean_cpt2_fuse,
        ...clean_cpt3_fuse,
      };
    } else {
      reqBody = {
        ...pt_set,
        ...clean_brk1,
        ...clean_cpt1,
        ...clean_cpt3,
        ...clean_cpt1_fuse,
        ...clean_cpt3_fuse,
      }; // brk1 not needed but just in case
    }
  } else {
    if (pt_set.pt3_id || pt_set.pt4_id) {
      reqBody = { ...pt_set, ...clean_brk2, ...clean_cpt2, ...clean_cpt2_fuse }; // brk2 not needed but just in case
    }
  }
  return reqBody;
}
