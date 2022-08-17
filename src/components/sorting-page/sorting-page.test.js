import { bubbleSortSteps, OrderBy, selectionSortStep } from "./utils";

const select = {
  inputASC: [3, 2, 1],
  expectedASC: [
    [
      {
        value: 3,
        state: "default",
      },
      {
        value: 2,
        state: "default",
      },
      {
        value: 1,
        state: "default",
      },
    ],
    [
      {
        value: 3,
        state: "changing",
      },
      {
        value: 2,
        state: "changing",
      },
      {
        value: 1,
        state: "default",
      },
    ],
    [
      {
        value: 3,
        state: "changing",
      },
      {
        value: 2,
        state: "default",
      },
      {
        value: 1,
        state: "changing",
      },
    ],
    [
      {
        value: 1,
        state: "modified",
      },
      {
        value: 2,
        state: "changing",
      },
      {
        value: 3,
        state: "changing",
      },
    ],
    [
      {
        value: 1,
        state: "modified",
      },
      {
        value: 2,
        state: "modified",
      },
      {
        value: 3,
        state: "modified",
      },
    ],
  ],
  inputDESC: [1, 2, 3],
  expectedDESC: [
    [
      {
        value: 1,
        state: "default",
      },
      {
        value: 2,
        state: "default",
      },
      {
        value: 3,
        state: "default",
      },
    ],
    [
      {
        value: 1,
        state: "changing",
      },
      {
        value: 2,
        state: "changing",
      },
      {
        value: 3,
        state: "default",
      },
    ],
    [
      {
        value: 1,
        state: "changing",
      },
      {
        value: 2,
        state: "default",
      },
      {
        value: 3,
        state: "changing",
      },
    ],
    [
      {
        value: 3,
        state: "modified",
      },
      {
        value: 2,
        state: "changing",
      },
      {
        value: 1,
        state: "changing",
      },
    ],
    [
      {
        value: 3,
        state: "modified",
      },
      {
        value: 2,
        state: "modified",
      },
      {
        value: 1,
        state: "modified",
      },
    ],
  ],
  inputOneElement: [1],
  expectedOneElement: [
    [
      {
        value: 1,
        state: "default",
      },
    ],
    [
      {
        value: 1,
        state: "changing",
      },
    ],
    [
      {
        value: 1,
        state: "modified",
      },
    ],
  ],
};

const bubble = {
  inputASC: [87, 47, 56],
  expectedASC: [
    [
      {
        value: 87,
        state: "default",
      },
      {
        value: 47,
        state: "default",
      },
      {
        value: 56,
        state: "default",
      },
    ],
    [
      {
        value: 47,
        state: "changing",
      },
      {
        value: 87,
        state: "changing",
      },
      {
        value: 56,
        state: "default",
      },
    ],
    [
      {
        value: 47,
        state: "default",
      },
      {
        value: 56,
        state: "changing",
      },
      {
        value: 87,
        state: "changing",
      },
    ],
    [
      {
        value: 47,
        state: "changing",
      },
      {
        value: 56,
        state: "changing",
      },
      {
        value: 87,
        state: "modified",
      },
    ],
    [
      {
        value: 47,
        state: "modified",
      },
      {
        value: 56,
        state: "modified",
      },
      {
        value: 87,
        state: "modified",
      },
    ],
  ],
  inputDESC: [77, 7, 63],
  expectedDESC: [
    [
      {
        value: 77,
        state: "default",
      },
      {
        value: 7,
        state: "default",
      },
      {
        value: 63,
        state: "default",
      },
    ],
    [
      {
        value: 77,
        state: "changing",
      },
      {
        value: 7,
        state: "changing",
      },
      {
        value: 63,
        state: "default",
      },
    ],
    [
      {
        value: 77,
        state: "default",
      },
      {
        value: 63,
        state: "changing",
      },
      {
        value: 7,
        state: "changing",
      },
    ],
    [
      {
        value: 77,
        state: "changing",
      },
      {
        value: 63,
        state: "changing",
      },
      {
        value: 7,
        state: "modified",
      },
    ],
    [
      {
        value: 77,
        state: "modified",
      },
      {
        value: 63,
        state: "modified",
      },
      {
        value: 7,
        state: "modified",
      },
    ],
  ],
  inputOneElement: [1],
  expectedOneElement: [
    [
      {
        value: 1,
        state: "default",
      },
    ],
    [
      {
        value: 1,
        state: "changing",
      },
    ],
    [
      {
        value: 1,
        state: "modified",
      },
    ],
  ],
};

describe("Тестирование алгоритмов сортировки выбором и пузырьком", () => {
  it("пустой массив выбор", () => {
    expect(selectionSortStep([], OrderBy.ASC)).toEqual([[]]);
  });

  it("сортировка выбором по возрастанию", () => {
    expect(selectionSortStep(select.inputASC, OrderBy.ASC)).toEqual(
      select.expectedASC
    );
  });

  it("сортировка выбором по убыванию", () => {
    expect(selectionSortStep(select.inputDESC, OrderBy.DESC)).toEqual(
      select.expectedDESC
    );
  });

  it("сортировка выбором массив из одного элемента", () => {
    expect(selectionSortStep(select.inputOneElement, OrderBy.DESC)).toEqual(
      select.expectedOneElement
    );
  });

  it("пустой массив пузырек", () => {
    expect(bubbleSortSteps([], OrderBy.ASC)).toEqual([[]]);
  });

  it("сортировка пузырьком по возрастанию", () => {
    expect(bubbleSortSteps(bubble.inputASC, OrderBy.ASC)).toEqual(
      bubble.expectedASC
    );
  });

  it("сортировка пузырьком по убыванию", () => {
    expect(bubbleSortSteps(bubble.inputDESC, OrderBy.DESC)).toEqual(
      bubble.expectedDESC
    );
  });

  it("сортировка пузырьком массив из одного элемента", () => {
    expect(bubbleSortSteps(bubble.inputOneElement, OrderBy.DESC)).toEqual(
      bubble.expectedOneElement
    );
  });
});
