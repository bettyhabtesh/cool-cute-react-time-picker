import { useMemo, useState } from "react";
import {
  CuteTimePicker,
  themeList,
  type BuiltInThemeName,
  type MinuteStep,
  type PickerSize,
  type TimeFormat,
} from "../index";

export function DemoApp() {
  const [playgroundTheme, setPlaygroundTheme] =
    useState<BuiltInThemeName>("blush-bloom");
  const [playgroundTime, setPlaygroundTime] = useState("07:30");
  const [format, setFormat] = useState<TimeFormat>("12h");
  const [minuteStep, setMinuteStep] = useState<MinuteStep>(5);
  const [size, setSize] = useState<PickerSize>("md");
  const [disabled, setDisabled] = useState(false);
  const [decorations, setDecorations] = useState(true);
  const [showActions, setShowActions] = useState(true);

  const [cardTimes, setCardTimes] = useState<Record<string, string>>(() =>
    Object.fromEntries(themeList.map((t) => [t.id, "07:30"])),
  );

  const activeMeta = useMemo(
    () => themeList.find((t) => t.id === playgroundTheme),
    [playgroundTheme],
  );

  return (
    <div className="demo-page">
      <header className="demo-hero">
        <h1 className="demo-brand">Cool Cute React Time Picker</h1>
        <p className="demo-subtitle">Time picking, but make it cute.</p>
      </header>

      <section>
        <h2 className="demo-section-title">Theme gallery</h2>
        <p className="demo-section-copy">
          Eight built-in personalities. Same interaction model, wildly different vibes.
        </p>
        <div className="demo-grid">
          {themeList.map((meta) => (
            <article key={meta.id} className="demo-card">
              <div className="demo-card-header">
                <h3>{meta.name}</h3>
                <p>{meta.description}</p>
              </div>
              <CuteTimePicker
                theme={meta.id}
                value={cardTimes[meta.id]}
                onChange={(t) =>
                  setCardTimes((prev) => ({ ...prev, [meta.id]: t }))
                }
                size="sm"
                showActions={false}
                format="12h"
                minuteStep={5}
              />
              <span className="demo-time-chip">
                Selected <strong>{cardTimes[meta.id]}</strong>
              </span>
              <button
                type="button"
                className="demo-pill"
                data-active={playgroundTheme === meta.id}
                onClick={() => setPlaygroundTheme(meta.id)}
              >
                Use in playground
              </button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="demo-section-title">Try all themes</h2>
        <p className="demo-section-copy">
          Tweak format, step, size, and decorations on a live picker.
        </p>

        <div className="demo-playground">
          <div className="demo-controls">
            <div className="demo-control">
              <label>
                Theme
                <select
                  value={playgroundTheme}
                  onChange={(e) =>
                    setPlaygroundTheme(e.target.value as BuiltInThemeName)
                  }
                >
                  {themeList.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="demo-control">
              <label>
                Format
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as TimeFormat)}
                >
                  <option value="12h">12-hour</option>
                  <option value="24h">24-hour</option>
                </select>
              </label>
            </div>

            <div className="demo-control">
              <label>
                Minute step
                <select
                  value={minuteStep}
                  onChange={(e) =>
                    setMinuteStep(Number(e.target.value) as MinuteStep)
                  }
                >
                  {[1, 5, 10, 15, 30].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="demo-control">
              <label>
                Size
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as PickerSize)}
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </label>
            </div>

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={decorations}
                onChange={(e) => setDecorations(e.target.checked)}
              />
              Decorations
            </label>

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={showActions}
                onChange={(e) => setShowActions(e.target.checked)}
              />
              Show actions
            </label>

            <div className="demo-time-chip" style={{ alignSelf: "flex-start" }}>
              Current time <strong>{playgroundTime}</strong>
            </div>
            {activeMeta && (
              <p style={{ margin: 0, color: "var(--demo-muted)", fontSize: "0.9rem" }}>
                {activeMeta.description}
              </p>
            )}
          </div>

          <div className="demo-playground-main">
            <div className="demo-theme-pills">
              {themeList.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="demo-pill"
                  data-active={playgroundTheme === t.id}
                  onClick={() => setPlaygroundTheme(t.id)}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <CuteTimePicker
              theme={playgroundTheme}
              value={playgroundTime}
              onChange={setPlaygroundTime}
              format={format}
              minuteStep={minuteStep}
              size={size}
              disabled={disabled}
              decorations={decorations}
              showActions={showActions}
              onConfirm={(t) => setPlaygroundTime(t)}
              onCancel={() => undefined}
            />
          </div>
        </div>
      </section>

      <footer className="demo-footer">
        <code>npm install cool-cute-react-time-picker</code>
      </footer>
    </div>
  );
}
