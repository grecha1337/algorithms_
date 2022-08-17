import { getReversingStringSteps } from "./utils";

const odd = {
  input: "123",
  expected: [
    [
      {
        character: "1",
        state: "default",
      },
      {
        character: "2",
        state: "default",
      },
      {
        character: "3",
        state: "default",
      },
    ],
    [
      {
        character: "1",
        state: "changing",
      },
      {
        character: "2",
        state: "default",
      },
      {
        character: "3",
        state: "changing",
      },
    ],
    [
      {
        character: "3",
        state: "modified",
      },
      {
        character: "2",
        state: "default",
      },
      {
        character: "1",
        state: "modified",
      },
    ],
    [
      {
        character: "3",
        state: "modified",
      },
      {
        character: "2",
        state: "changing",
      },
      {
        character: "1",
        state: "modified",
      },
    ],
    [
      {
        character: "3",
        state: "modified",
      },
      {
        character: "2",
        state: "modified",
      },
      {
        character: "1",
        state: "modified",
      },
    ],
  ],
};

const even = {
  input: "12",
  expected: [
    [
      {
        character: "1",
        state: "default",
      },
      {
        character: "2",
        state: "default",
      },
    ],
    [
      {
        character: "1",
        state: "changing",
      },
      {
        character: "2",
        state: "changing",
      },
    ],
    [
      {
        character: "2",
        state: "modified",
      },
      {
        character: "1",
        state: "modified",
      },
    ],
  ],
};

const oneSymbol = {
  input: "1",
  expected: [
    [
      {
        character: "1",
        state: "default",
      },
    ],
    [
      {
        character: "1",
        state: "changing",
      },
    ],
    [
      {
        character: "1",
        state: "modified",
      },
    ],
  ],
};

describe("Тестирование алгоритма разворота строки", () => {
  it("с чётным количеством символов.", () => {
    expect(getReversingStringSteps(even.input)).toEqual(even.expected);
  });

  it("с нечетным количеством символов.", () => {
    expect(getReversingStringSteps(odd.input)).toEqual(odd.expected);
  });

  it("с одним символом.", () => {
    expect(getReversingStringSteps(oneSymbol.input)).toEqual(oneSymbol.expected);
  });

  it("пустая строка", () => {
    expect(getReversingStringSteps()).toEqual([[]]);
  });

});
