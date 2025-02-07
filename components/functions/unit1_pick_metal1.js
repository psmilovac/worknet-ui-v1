export default function Unit1PickMetal1(reqBody, unit1, metal1_table) {
  // console.log("reqBody", reqBody);
  // console.log("unit1", unit1);
  // console.log("metal1_table", metal1_table);

  let result = { ...reqBody };
  result.metal1_id = null;

  // METAL Kits
  const A = 195;
  const B = 196;
  const C = 197;
  const D = 198;
  const E = 199;
  const F = 200;
  const G = 201;
  const H = 202;
  const I = 203;
  const J = 204;
  const K = 205;

  // A bus
  if (reqBody?.bus_id === 1 || reqBody?.bus_id === 2 || reqBody?.bus_id === 3) {
    result.metal1_id = A; // A metal
  }

  // B bus
  if (reqBody?.bus_id === 4 || reqBody?.bus_id === 5 || reqBody?.bus_id === 6) {
    result.metal1_id = B; // B metal
  }

  // C bus
  if (reqBody?.bus_id === 7 || reqBody?.bus_id === 8 || reqBody?.bus_id === 9) {
    result.metal1_id = C; // C metal
  }

  // D bus
  if (reqBody?.bus_id === 10 || reqBody?.bus_id === 11) {
    result.metal1_id = C; // C metal
  }

  // E bus
  if (reqBody?.bus_id === 12 || reqBody?.bus_id === 13) {
    result.metal1_id = B; // B metal
  }

  // F bus
  if (reqBody?.bus_id === 14 || reqBody?.bus_id === 15) {
    result.metal1_id = A;
  }

  // G bus
  if (reqBody?.bus_id === 16 || reqBody?.bus_id === 17) {
    result.metal1_id = A;
  }

  // H bus
  if (
    reqBody?.bus_id === 18 ||
    reqBody?.bus_id === 19 ||
    reqBody?.bus_id === 20
  ) {
    result.metal1_id = D;
  }

  // I bus
  if (reqBody?.bus_id === 116 || reqBody?.bus_id === 117) {
    result.metal1_id = D;
  }

  // J bus
  if (
    reqBody?.bus_id === 21 ||
    reqBody?.bus_id === 22 ||
    reqBody?.bus_id === 23
  ) {
    result.metal1_id = D;
  }

  // K bus
  if (
    reqBody?.bus_id === 24 ||
    reqBody?.bus_id === 25 ||
    reqBody?.bus_id === 26 ||
    reqBody?.bus_id === 123 ||
    reqBody?.bus_id === 124 ||
    reqBody?.bus_id === 125
  ) {
    result.metal1_id = E;
  }

  // L bus
  if (
    reqBody?.bus_id === 26 ||
    reqBody?.bus_id === 27 ||
    reqBody?.bus_id === 120 ||
    reqBody?.bus_id === 126 ||
    reqBody?.bus_id === 127
  ) {
    result.metal1_id = G;
  }

  // M bus, when CPT3 is present add horizontal plate
  if (
    reqBody?.bus_id === 28 ||
    reqBody?.bus_id === 29 ||
    reqBody?.bus_id === 30
  ) {
    result.metal1_id = D;
    if (unit1.comps?.pack_is_cpt3 === true) {
      result.metal1_id = C;
    }
  }

  // N bus
  if (
    reqBody?.bus_id === 31 ||
    reqBody?.bus_id === 32 ||
    reqBody?.bus_id === 33
  ) {
    result.metal1_id = D;
  }

  // O bus, when CPT3 is present add horizontal plate
  if (reqBody?.bus_id === 118 || reqBody?.bus_id === 119) {
    result.metal1_id = D;
    if (unit1.comps?.pack_is_cpt3 === true) {
      result.metal1_id = C;
    }
  }

  // P bus
  if (
    reqBody?.bus_id === 34 ||
    reqBody?.bus_id === 35 ||
    reqBody?.bus_id === 121
  ) {
    result.metal1_id = J;
  }

  // Q bus
  if (
    reqBody?.bus_id === 36 ||
    reqBody?.bus_id === 37 ||
    reqBody?.bus_id === 122
  ) {
    result.metal1_id = H;
  }

  // R bus
  if (reqBody?.bus_id === 38 || reqBody?.bus_id === 39) {
    result.metal1_id = E;
  }

  // S bus
  if (reqBody?.bus_id === 40 || reqBody?.bus_id === 41) {
    result.metal1_id = H;
  }

  // T bus
  if (
    reqBody?.bus_id === 42 ||
    reqBody?.bus_id === 43 ||
    reqBody?.bus_id === 44
  ) {
    result.metal1_id = D;
  }

  // U bus, when CPT3 is present add horizontal plate
  if (
    reqBody?.bus_id === 45 ||
    reqBody?.bus_id === 108 ||
    reqBody?.bus_id === 109
  ) {
    result.metal1_id = D;
    if (unit1.comps?.pack_is_cpt3 === true) {
      result.metal1_id = C;
    }
  }

  // V bus, when CPT3 is present add horizontal plate
  if (reqBody?.bus_id === 110) {
    result.metal1_id = D;
    if (unit1.comps?.pack_is_cpt3 === true) {
      result.metal1_id = C;
    }
  }

  // Y bus
  if (
    reqBody?.bus_id === 160 ||
    reqBody?.bus_id === 161 ||
    reqBody?.bus_id === 162
  ) {
    result.metal1_id = K;
  }

  // Z bus
  if (
    reqBody?.bus_id === 163 ||
    reqBody?.bus_id === 164 ||
    reqBody?.bus_id === 165
  ) {
    result.metal1_id = K;
  }

  // console.log("pick metal result", result);
  return result;
}
