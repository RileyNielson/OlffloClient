const items = [
  {
    key: "1",
    id: 1,
    title: "Main",
    successors: ["2", "4"],
    subItems: [
      {
        key: "6",
        id: 6,
        title: "Step A",
      },
      {
        key: "7",
        id: 7,
        title: "Step B",
      },
      {
        key: "8",
        title: "Step C",
      },
      {
        key: "9",
        title: "Step D",
      },
    ],
  },
  {
    key: "2",
    id: 2,
    title: "Step 2",
    successors: ["3"],
    subItems: []
  },
  {
    key: "3",
    id: 3,
    title: "Step 3",
    successors: ["4"],
    subItems: []
  },
  {
    key: "4",
    id: 4,
    title: "Step 4",
    successors: ["5"],
    subItems: []
  },
  {
    key: "5",
    id: 5,
    title: "Step 5",
    successors: [],
    subItems: []
  },
];

export default items;
