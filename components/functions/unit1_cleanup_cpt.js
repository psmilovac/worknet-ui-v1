import {
  clean_brk1,
  clean_brk2,
  clean_pt1,
  clean_pt2,
  clean_pt3,
  clean_pt4,
  clean_pt1_fuse,
  clean_pt2_fuse,
  clean_pt3_fuse,
  clean_pt4_fuse,
} from "./unit1_cleanup_vars";

// here passing only set of four pt ids.
export default function Unit1CleanupCPT(cpt_set) {
  let reqBody = {};

  //    ---------------- PT 1, PT 2 ----------------

  // bus that accept the pts usually can accept cpt. clear cpt feature and any potential breaker value
  if (cpt_set.cpt1_id || cpt_set.cpt3_id) {
    if (cpt_set.cpt2_id) {
      reqBody = {
        ...cpt_set,
        ...clean_brk1,
        ...clean_brk2,
        ...clean_pt1,
        ...clean_pt2,
        ...clean_pt3,
        ...clean_pt4,
        ...clean_pt1_fuse,
        ...clean_pt2_fuse,
        ...clean_pt3_fuse,
        ...clean_pt4_fuse,
      };
    } else {
      reqBody = {
        ...cpt_set,
        ...clean_brk1,
        ...clean_pt1,
        ...clean_pt2,
        ...clean_pt1_fuse,
        ...clean_pt2_fuse,
      };
    }
  } else {
    if (cpt_set.cpt2_id) {
      reqBody = {
        ...cpt_set,
        ...clean_brk2,
        ...clean_pt3,
        ...clean_pt4,
        ...clean_pt3_fuse,
        ...clean_pt4_fuse,
      };
    }
  }

  return reqBody;
}
