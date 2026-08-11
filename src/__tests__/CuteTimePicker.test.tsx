import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { CuteTimePicker } from "../components/CuteTimePicker";

function ControlledHarness({
  initial = "07:30",
  onChange,
}: {
  initial?: string;
  onChange?: (t: string) => void;
}) {
  const [time, setTime] = useState(initial);
  return (
    <CuteTimePicker
      value={time}
      onChange={(t) => {
        setTime(t);
        onChange?.(t);
      }}
      theme="latte-glow"
      decorations={false}
      showActions
      onCancel={() => undefined}
    />
  );
}

describe("CuteTimePicker", () => {
  it("renders controlled value", () => {
    render(
      <CuteTimePicker
        value="14:15"
        theme="latte-glow"
        format="24h"
        decorations={false}
        showActions={false}
      />,
    );
    expect(
      screen.getByLabelText(/Hour 14\. Click to type/i),
    ).toHaveTextContent("14");
    expect(
      screen.getByLabelText(/Minute 15\. Click to type/i),
    ).toHaveTextContent("15");
    expect(screen.getByRole("button", { name: "Hour 14" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("supports uncontrolled defaultValue", () => {
    render(
      <CuteTimePicker
        defaultValue="09:45"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );
    expect(screen.getByLabelText(/Hour 09/i)).toHaveTextContent("09");
    expect(screen.getByLabelText(/Minute 45/i)).toHaveTextContent("45");
  });

  it("toggles AM/PM", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ControlledHarness initial="07:30" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "PM" }));
    expect(onChange).toHaveBeenCalledWith("19:30");
  });

  it("switches selection mode from time display", async () => {
    const user = userEvent.setup();
    render(
      <CuteTimePicker
        defaultValue="07:30"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );

    await user.click(screen.getByLabelText(/Minute 30/i));
    expect(screen.getByLabelText(/Minute selection clock/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/Hour 07/i));
    expect(screen.getByLabelText(/Hour selection clock/i)).toBeInTheDocument();
  });

  it("lets users type hour and minute values", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<ControlledHarness initial="07:30" onChange={onChange} />);

    await user.click(screen.getByLabelText(/Minute 30/i));
    const minuteInput = screen.getByLabelText(/Type Minute 30/i);
    await user.clear(minuteInput);
    await user.type(minuteInput, "07{Enter}");
    expect(onChange).toHaveBeenCalledWith("07:07");

    await user.click(screen.getByLabelText(/Hour 07/i));
    const hourInput = screen.getByLabelText(/Type Hour 07/i);
    await user.clear(hourInput);
    await user.type(hourInput, "09{Enter}");
    expect(onChange).toHaveBeenCalledWith("09:07");
  });

  it("calls onConfirm with current time", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <CuteTimePicker
        defaultValue="08:00"
        theme="latte-glow"
        decorations={false}
        onConfirm={onConfirm}
        onCancel={() => undefined}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(onConfirm).toHaveBeenCalledWith("08:00");
  });

  it("hides AM/PM in 24h mode", () => {
    render(
      <CuteTimePicker
        value="19:30"
        format="24h"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );
    expect(screen.queryByRole("button", { name: "AM" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "PM" })).not.toBeInTheDocument();
  });

  it("renders dual-ring hours in 24h mode", () => {
    render(
      <CuteTimePicker
        value="00:00"
        format="24h"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );
    expect(screen.getByRole("button", { name: "Hour 12" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hour 00" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hour 13" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hour 23" })).toBeInTheDocument();
  });

  it("selects an inner-ring hour in 24h mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <CuteTimePicker
        value="08:00"
        onChange={onChange}
        format="24h"
        theme="latte-glow"
        decorations={false}
        showActions={false}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Hour 15" }));
    expect(onChange).toHaveBeenCalledWith("15:00");
  });

  it("opens the full picker from the compact selector", async () => {
    const user = userEvent.setup();
    render(
      <CuteTimePicker
        defaultValue="12:00"
        selector
        theme="gilded-noir"
        decorations={false}
        showActions
        onCancel={() => undefined}
      />,
    );

    expect(screen.queryByLabelText(/Hour selection clock/i)).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /Selected time 12:00 PM/i }),
    );
    expect(screen.getByLabelText(/Hour selection clock/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.queryByLabelText(/Hour selection clock/i)).not.toBeInTheDocument();
  });
});
