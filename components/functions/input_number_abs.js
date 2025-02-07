export function InputNumberAbs() {
  var input = document.getElementsByTagName("input")[0];
  var val = input.value;
  val = val.replace(/^0+|[^\d.]/g, "");
  input.value = val;
  return input.value;
}
