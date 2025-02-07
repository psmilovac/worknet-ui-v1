export function Dollar(amount) {
  let string_in_dollars = ""
  if (amount > 0){ 
    string_in_dollars = amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
  } else {
    string_in_dollars="$0"
  }
  return string_in_dollars;
}
