import { useMemo, useState } from "react";
import {
  CuteTimePicker,
  themeList,
  type BuiltInThemeName,
  type ClockHandStyle,
  type MinuteStep,
  type PickerSize,
  type TimeFormat,
} from "../index";

type HandStyleOption = "theme" | ClockHandStyle;

export function DemoApp() {
  const [playgroundTheme, setPlaygroundTheme] =
    useState<BuiltInThemeName>("blush-bloom");
  const [playgroundTime, setPlaygroundTime] = useState("07:30");
  const [format, setFormat] = useState<TimeFormat>("12h");
  const [minuteStep, setMinuteStep] = useState<MinuteStep>(5);
  const [size, setSize] = useState<PickerSize>("md");
  const [handStyle, setHandStyle] = useState<HandStyleOption>("theme");
  const [disabled, setDisabled] = useState(false);
  const [decorations, setDecorations] = useState(true);
  const [showActions, setShowActions] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [title, setTitle] = useState("Select Time");
  const [cancelLabel, setCancelLabel] = useState("Cancel");
  const [confirmLabel, setConfirmLabel] = useState("Done");
  const [showSeconds, setShowSeconds] = useState(false);
  const [secondsStep, setSecondsStep] = useState(1);
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [lastEvent, setLastEvent] = useState<string>("—");

  const [cardTimes, setCardTimes] = useState<Record<string, string>>(() =>
    Object.fromEntries(themeList.map((t) => [t.id, "07:30"])),
  );

  const activeMeta = useMemo(
    () => themeList.find((t) => t.id === playgroundTheme),
    [playgroundTheme],
  );

  const resolvedHandStyle =
    handStyle === "theme" ? undefined : handStyle;

  return (
    <div className="demo-page">
      <header className="demo-hero">
        <h1 className="demo-brand">Cool Cute React Time Picker</h1>
        <p className="demo-subtitle">Time picking, but make it cute.</p>
      </header>

      <section>
        <h2 className="demo-section-title">Theme gallery</h2>
        <p className="demo-section-copy">
          Twelve built-in personalities. Same interaction model, wildly different vibes.
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
        <h2 className="demo-section-title">Interactive playground</h2>
        <p className="demo-section-copy">
          Try every public prop live — theme, hand style, format, labels, range,
          seconds, and more.
        </p>

        <div className="demo-playground">
          <div className="demo-controls">
            <p className="demo-control-group">Appearance</p>

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
                Hand style
                <select
                  value={handStyle}
                  onChange={(e) =>
                    setHandStyle(e.target.value as HandStyleOption)
                  }
                >
                  <option value="theme">Theme default</option>
                  <option value="round">Round</option>
                  <option value="pointer">Pointer (arrow)</option>
                  <option value="line">Line</option>
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
                checked={decorations}
                onChange={(e) => setDecorations(e.target.checked)}
              />
              Decorations
            </label>

            <p className="demo-control-group">Time behavior</p>

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

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={showSeconds}
                onChange={(e) => setShowSeconds(e.target.checked)}
              />
              Show seconds
            </label>

            {showSeconds && (
              <div className="demo-control">
                <label>
                  Seconds step
                  <select
                    value={secondsStep}
                    onChange={(e) => setSecondsStep(Number(e.target.value))}
                  >
                    {[1, 5, 10, 15, 30].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            <div className="demo-control">
              <label>
                Min time
                <input
                  type="text"
                  value={minTime}
                  placeholder="e.g. 09:00"
                  onChange={(e) => setMinTime(e.target.value)}
                />
              </label>
            </div>

            <div className="demo-control">
              <label>
                Max time
                <input
                  type="text"
                  value={maxTime}
                  placeholder="e.g. 17:00"
                  onChange={(e) => setMaxTime(e.target.value)}
                />
              </label>
            </div>

            <p className="demo-control-group">Chrome &amp; labels</p>

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={showTitle}
                onChange={(e) => setShowTitle(e.target.checked)}
              />
              Show title
            </label>

            {showTitle && (
              <div className="demo-control">
                <label>
                  Title
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
              </div>
            )}

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={showActions}
                onChange={(e) => setShowActions(e.target.checked)}
              />
              Show actions
            </label>

            {showActions && (
              <>
                <div className="demo-control">
                  <label>
                    Cancel label
                    <input
                      type="text"
                      value={cancelLabel}
                      onChange={(e) => setCancelLabel(e.target.value)}
                    />
                  </label>
                </div>
                <div className="demo-control">
                  <label>
                    Confirm label
                    <input
                      type="text"
                      value={confirmLabel}
                      onChange={(e) => setConfirmLabel(e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}

            <label className="demo-control demo-check">
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>

            <div className="demo-time-chip" style={{ alignSelf: "flex-start" }}>
              Current time <strong>{playgroundTime}</strong>
            </div>
            <div className="demo-time-chip" style={{ alignSelf: "flex-start" }}>
              Last event <strong>{lastEvent}</strong>
            </div>
            {activeMeta && (
              <p className="demo-meta-note">{activeMeta.description}</p>
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
              onChange={(t) => {
                setPlaygroundTime(t);
                setLastEvent(`onChange → ${t}`);
              }}
              format={format}
              minuteStep={minuteStep}
              size={size}
              handStyle={resolvedHandStyle}
              disabled={disabled}
              decorations={decorations}
              showActions={showActions}
              showTitle={showTitle}
              title={title}
              cancelLabel={cancelLabel}
              confirmLabel={confirmLabel}
              showSeconds={showSeconds}
              secondsStep={secondsStep}
              minTime={minTime || undefined}
              maxTime={maxTime || undefined}
              onConfirm={(t) => {
                setPlaygroundTime(t);
                setLastEvent(`onConfirm → ${t}`);
              }}
              onCancel={() => setLastEvent("onCancel")}
            />
          </div>
        </div>
      </section>

      <footer className="demo-footer">
        <code>npm install cool-cute-react-time-picker</code>
        <span aria-hidden="true"> · </span>
        <a href="/showcase.html">Hand styles showcase</a>
      </footer>
    </div>
  );
}
