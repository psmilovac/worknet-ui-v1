// feed unit1, output nested amount on the unit level
import { unit1_check_arr } from "@/global/global_vars"; //elements containing pack values, subject to pricing

export function PackPrice(pack) {
  let total = 0;
  if (pack.item_pack) {
    for (let item_pack of pack.item_pack) {
      total = total + item_pack.item_pack_quantity * item_pack.item.item_price;
    }
    return total;
  }
}

export function Unit1Price(unit1) {
  let total = 0;
  // console.log(unit1);
  for (let key in unit1) {
    let value = unit1[key];
    if (value) {
      for (let check_item of unit1_check_arr) {
        //check only items listed in teh check array
        if (key === check_item) {
          for (let item_pack of unit1[key].item_pack) {
            total =
              total + item_pack.item_pack_quantity * item_pack.item.item_price;
          }
        }
      }
    }
  }
  return total;
}

export function Lineup1Price(lineup1) {
  let total = 0;
  if (lineup1.unit1) {
    for (let unit of lineup1.unit1) {
      if (unit && Unit1Price(unit)) {
        total = total + Unit1Price(unit);
      }
    }
  }
  return total;
}

export function QuotePrice(quote) {
  let total = 0;
  for (let lineup1 of quote.lineup1) {
    if (lineup1 && Lineup1Price(lineup1)) {
      total = total + Lineup1Price(lineup1);
    }
  }
  return total;
}

// itemized bill of material
export function FlatBom1PriceFunction(flatBom1){
  if (flatBom1){
    let total = 0
     for (let item of flatBom1){
      total =  total + item.price_total 
    }     
    return total
  }
}

// total price per lineup1
export function FlatBom2PriceFunction(flatBom2){
  if (flatBom2){
    let total = 0
     for (let pack_price of flatBom2){
      total =  total + pack_price.total 
    }     
    return total
  }
}


// total price per lineup1 sorted by unit1
export function FlatBom3PriceFunction(flatBom3, unit1_id){
  if (flatBom3){
    let total = 0
    for (let pack of flatBom3){
       if (pack.unit1_id == unit1_id){
        total =  total + pack.total
      }     
    }
    return total
    // return unit1_id
  }
}

export function FlatBom4PriceFunction(flatBom4){
  if (flatBom4){
    let total = 0
     for (let item of flatBom4){
      total =  total + item.price_total 
    }     
    return total
  }
}