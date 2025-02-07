export function Lineup1BusErrorCheck(lineup1) {
  let result = [];
  if (lineup1) {
    lineup1.unit1.sort((a, b) =>
      a.unit1_position > b.unit1_position ? 1 : -1
    );
    for (let i = 1; i < lineup1.unit1.length; i++) {
      if (lineup1.unit1[i].bus && lineup1.unit1[i - 1].bus) {
        // console.log(
        //   "right: " + i + " " + lineup1.unit1[i].bus.pack_bus_connector_right
        // );
        // console.log(
        //   "left: " +
        //     (i + 1) +
        //     " " +
        //     lineup1.unit1[i + 1].bus.pack_bus_connector_left
        // );
        if (
          lineup1.unit1[i - 1].bus.pack_bus_connector_right !=
          lineup1.unit1[i].bus.pack_bus_connector_left
        )
          result.push(i);

        if (
          lineup1.unit1[i - 1].bus.pack_bus_connector_right == "X" &&
          lineup1.unit1[i].bus.pack_bus_connector_left == "X"
        )
          result.push(i);
      }
    }
  }
  return result;
}
