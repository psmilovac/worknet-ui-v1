import { unit1_features } from "@/global/global_vars";
import { Unit1EssentialCompsFeatures } from "./unit1_features";

// set compartments based on all the features
export function Unit1SetComps(reqBody, unit1, bus_pack) {
  // extract the key features for Comps configuration
  let essential_features = Unit1EssentialCompsFeatures(unit1);

  // merge reqBody and essential_features. "essential_features" is base, add other features from reqBody
  let reqBodyExtended = { ...essential_features };
  for (let r in reqBody) {
    reqBodyExtended[r] = reqBody[r];
  }

  // after copying essential features from the unit1 and
  // adding reqBody new features, we can now seach for the compartment
  reqBodyExtended = FindUnit1Comps(reqBodyExtended, bus_pack);

  // console.log("essential_features", essential_features);
  // console.log("reqBody", reqBody);
  // console.log("reqBodyExtended", reqBodyExtended);
  // console.log("unit1", unit1);
  // console.log("bus_pack", bus_pack);

  // from here work with reqBodyExtended
  // USE EXCEL SHEET. SEARCH THE COMPARTMENTS TO FIND THE MATCH. THIS IS YOUR MATRIX TARGET!

  return reqBodyExtended;
}

export function FindUnit1Comps(reqBody, bus_pack) {
  if (bus_pack.pack_is_brk1 && bus_pack.pack_is_brk2) {
    reqBody.comps_id = 46; // A
  }
  // BREAKER 1
  if (bus_pack.pack_is_brk1 && !bus_pack.pack_is_brk2) {
    reqBody.comps_id = 93; // E default

    if (reqBody.cpt2_id) {
      reqBody.comps_id = 47; // B
    }
    if (reqBody.pt3_id) {
      reqBody.comps_id = 48; // C
    }
    if (!reqBody.pt3_id && reqBody.pt4_id) {
      reqBody.comps_id = 49; // D
    }
  }
  // BREAKER 2
  if (!bus_pack.pack_is_brk1 && bus_pack.pack_is_brk2) {
    reqBody.comps_id = 94; // F default

    if (reqBody.cpt1_id) {
      reqBody.comps_id = 94; // B
    }

    if (reqBody.cpt3_id) {
      reqBody.comps_id = 95; // B
    }
    if (reqBody.pt1_id) {
      reqBody.comps_id = 96; // H
    }
  }
  // NO BREAKERS
  if (!bus_pack.pack_is_brk1 && !bus_pack.pack_is_brk2) {
    reqBody.comps_id = 100; // M default

    // cpt1 = true
    if (reqBody.cpt1_id) {
      if (reqBody.pt3_id) {
        reqBody.comps_id = 97; // J
      }
      if (reqBody.pt4_id) {
        reqBody.comps_id = 99; // L
      }
      if (!reqBody.pt3_id && !reqBody.pt4_id) {
        reqBody.comps_id = 100; // M
      }
    }

    // cpt2 = true
    if ((reqBody.pt1_id || reqBody.pt2_id) && reqBody.cpt2_id) {
      reqBody.comps_id = 98; // K
    }

    // cpt1 =true AND cpt2 = true
    if (reqBody.cpt1_id && reqBody.cpt2_id) {
      reqBody.comps_id = 146; // I
    }

    // cpt3 = true
    if (reqBody.cpt3_id) {
      if (!reqBody.pt3_id && reqBody.pt4_id) {
        reqBody.comps_id = 101; // N
      }
      if (!reqBody.pt3_id && !reqBody.pt4_id) {
        reqBody.comps_id = 102; // P
      }
      if (reqBody.pt3_id && reqBody.pt4_id) {
        reqBody.comps_id = 103; // Q
      }
    }
    // pt1 & pt2 = true
    if (reqBody.pt1_id && reqBody.pt2_id) {
      if (!reqBody.cpt2_id) {
        reqBody.comps_id = 104; // R
      }
      if (!reqBody.pt3_id && reqBody.pt4_id) {
        reqBody.comps_id = 105; // S
      }
      if (reqBody.pt3_id && reqBody.pt4_id) {
        reqBody.comps_id = 106; // T
      }
    }
    // empty section
    if (
      !reqBody.pt1_id &&
      !reqBody.pt2_id &&
      !reqBody.pt3_id &&
      !reqBody.pt4_id &&
      !reqBody.cpt1_id &&
      !reqBody.cpt2_id &&
      !reqBody.cpt3_id
    ) {
      reqBody.comps_id = 107; // U
    }
  }

  // ... keep writing, use excel sheet
  // you will not need pack_table_busonly if it is hard coded

  return reqBody;
}
