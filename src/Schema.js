export const schema1 = {
  type: "object",
  properties: {
    testStepRunId: {
      type: "string",
    },
    runTimeValues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          runTimeValueId: {
            type: "string",
          },
          testStepRunId: {
            type: "string",
          },
          testStepRunActionId: {
            type: "string",
          },
          field: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
      },
    },
    listActionSummary: {
      type: "array",
      items: {
        type: "object",
        properties: {
          testStepRunActionId: {
            type: "string",
          },
          result: {
            type: "string",
          },
          status: {
            type: "string",
          },
          message: {
            type: "string",
          },
        },
      },
    },
    deviceName: {
      type: "object",
      properties: {
        deviceName: {
          type: "string",
        },
      },
    },
    dataDetails: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
      },
    },
    appPlatform: {
      type: "string",
    },
  },
};

export const schema2 = {
  type: "object",
  properties: {
    testStepRunId: { type: "string" },
    runTimeValues: {
      type: "array",
      items: {
        type: "object",
        properties: {
          runTimeValueId: { type: "string" },
          testStepRunId: { type: "string" },
          testStepRunActionId: { type: "string" },
          field: { type: "string" },
          value: { type: "string" },
        },
      },
    },
    listActionSummary: {
      type: "array",
      items: {
        type: "object",
        properties: {
          testStepRunActionId: { type: "string" },
          result: { type: "string" },
          status: { type: "string" },
          message: { type: "string" },
        },
      },
    },

    deviceName: {
      type: "object",
      properties: {
        deviceName: { type: "string" },
      },
    },
    dataDetails: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
    },
    appPlatform: { type: "string" },
  },
  required: [
    "testStepRunId",
    "listActionSummary",
    "runTimeValues",
    "deviceName",
    "appPlatform",
  ],
};
