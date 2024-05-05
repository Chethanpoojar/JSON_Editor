export const json_object = {
  testStepRunId: "704a965b-1663-45fa-b252-658987ab244b",
  runTimeValues: [
    {
      runTimeValueId: "f60e6e9d-09a9-4dd3-8d14-a00875c9605f",
      testStepRunId: "704a965b-1663-45fa-b252-658987ab244b",
      testStepRunActionId: "4b4c61f1-a602-4510-9eb1-a19fd5f77dd6",
      field: "sameaddress",
      value: "some address of user",
    },
  ],
  listActionSummary: [
    {
      testStepRunActionId: "9c0e955b-bbad-4a37-8549-3a367a1ff98b",
      result: "PASS",
      status: "COMPLETED",
      message: "Value fetched successfully",
    },
    {
      testStepRunActionId: "4b4c61f1-a602-4510-9eb1-a19fd5f77dd6",
      result: "PASS",
      status: "COMPLETED",
      message: "Value fetched successfully",
    },
  ],
  deviceName: {
    deviceName: "135509",
  },
  dataDetails: {
    name: "testData",
  },
  appPlatform: "android",
};

export const fruit = [
  {
    val: 0,
    label: "Apple",
  },
  {
    val: 1,
    label: "Orange",
    items: [
      { parentVal: 1, val: 7, label: "sub item 1" },
      { parentVal: 1, val: 8, label: "sub item 2" },
    ],
  },
  {
    val: 2,
    label: "Grape",
    items: [
      { parentVal: 2, val: 5, label: "sub item 3" },
      { parentVal: 2, val: 6, label: "sub item 4" },
    ],
  },
  {
    val: 3,
    label: "Pomegranate",
    items: [
      { parentVal: 3, val: 9, label: "sub item 5" },
      { parentVal: 3, val: 10, label: "sub item 6" },
    ],
  },
  {
    val: 4,
    label: "Strawberry",
  },
];
