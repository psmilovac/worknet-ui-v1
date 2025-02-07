export const data = [
  {
    number: "200V-A0046299",
    title: "DI-A0111904",
    state: "Released",
    subRows: [
      {
        number: "200V-A0046392",
        title: "DI-A0111845",
        state: "Released",
        subRows: [
          { number: "200V-A0045573", title: "DI-A0108772", state: "Released" },
          { number: "200V-A0045575", title: "DI-A0104777", state: "Released" },
        ],
      },
      {
        number: "200V-A0046393",
        title: "DI-A0111846",
        state: "Released",
      },
    ],
  },
  {
    number: "200V-A0046431",
    title: "DI-A0111901",
    state: "Released",
  },
];

export const columns = [
  {
    Header: "",
    id: "expander",
    Cell: () => null,
  },
  {
    id: "col2",
    Header: "Number",
    accessor: "number",
  },
  {
    id: "col3",
    Header: "Title",
    accessor: "title",
  },
  {
    id: "col4",
    Header: "State",
    accessor: "state",
  },
];
