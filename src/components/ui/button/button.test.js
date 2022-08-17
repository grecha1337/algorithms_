import { Button } from "./button";
import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("Тестирование кнопки", () => {
  it("кнопка с текстом", () => {
    const button = renderer.create(<Button text="text" />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("кнопка без текстом", () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("заблокированной кнопки", () => {
    const button = renderer.create(<Button disabled={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("кнопки с индикацией загрузки.", () => {
    const button = renderer.create(<Button isLoader={true} />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it("корректность вызова колбека при клике на кнопку", () => {
    const mockFn = jest.fn();
    render(<Button data-testid="button" onClick={mockFn} />);
    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(mockFn).toHaveBeenCalled();
  });
});
