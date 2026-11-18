import {memo, useId, useRef, useState} from "react";
import {Label} from "@rixl/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@rixl/ui/select";
import {Switch} from "@rixl/ui/switch";
import {Tabs, TabsList, TabsTrigger} from "@rixl/ui/tabs";
import {showcases} from "../showcases/registry";
import {CopyButton} from "./copy-button";
import {CodePreview} from "./code-preview";
import type {Control, ControlValue, Example, Showcase} from "../showcases/registry";

export const Detail = memo(function Detail({showcase}: {showcase: Showcase}) {
  const {examples} = showcase;

  const jumpTarget = useRef<HTMLElement>(null);
  const sorted = [...showcases].sort((a, b) => a.title.localeCompare(b.title));
  const index = sorted.findIndex((item) => item.path === showcase.path);
  const previous = sorted[index - 1];
  const next = sorted[index + 1];

  return (
    <div className="docs-detail-layout">
      <div className="min-w-0">
        <div className="docs-page-heading">
          <h1 tabIndex={-1}>{showcase.title}</h1>
          {showcase.description ? <p>{showcase.description}</p> : null}
        </div>
        <div className="docs-import">
          <code>@rixl/ui/{showcase.path}</code>
          <CopyButton text={`@rixl/ui/${showcase.path}`} label="Copy import path" />
        </div>
        {examples.length > 1 ? (
          <div className="docs-example-picker">
            <Select
              value={null}
              onOpenChange={(open) => {
                if (open) jumpTarget.current = null;
              }}
              onValueChange={(id: string | null) => {
                jumpTarget.current = id ? document.getElementById(`example-${id}`) : null;
                jumpToExample(id);
              }}
            >
              <SelectTrigger aria-label="Jump to example" className="w-full">
                <SelectValue placeholder="Jump to example" />
              </SelectTrigger>
              <SelectContent finalFocus={() => jumpTarget.current ?? true}>
                {examples.map((example) => (
                  <SelectItem key={example.id} value={example.id}>
                    {example.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
        <div className="docs-examples">
          {examples.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
        {showcase.notes ? (
          <section className="docs-notes">
            <h2>Implementation notes</h2>
            <p>{showcase.notes}</p>
          </section>
        ) : null}
        <nav aria-label="Adjacent components" className="docs-pagination">
          {previous ? (
            <a href={`#/${previous.path}`}>
              <span>Previous</span>← {previous.title}
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={`#/${next.path}`} className="text-right">
              <span>Next</span>
              {next.title} →
            </a>
          ) : null}
        </nav>
      </div>
      <aside className="docs-outline" aria-label="On this page">
        <p>On this page</p>
        {examples.map((example) => (
          <button
            key={example.id}
            type="button"
            onClick={() => {
              jumpToExample(example.id);
            }}
          >
            {example.title}
          </button>
        ))}
        <a href="#/">← All components</a>
      </aside>
    </div>
  );
});

function ExampleCard({example}: {example: Example}) {
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const [state, setState] = useState<Record<string, ControlValue>>(() => defaultState(example.controls));
  const Render = example.render;
  const hasCode = Boolean(example.code?.trim());

  return (
    <section id={`example-${example.id}`} className="docs-example" tabIndex={-1} aria-labelledby={`heading-${example.id}`}>
      <div className="docs-example-heading">
        <h2 id={`heading-${example.id}`}>{example.title}</h2>
        {example.description ? <p>{example.description}</p> : null}
      </div>
      <div className="docs-example-frame">
        <div className="docs-example-toolbar">
          {hasCode ? (
            <Tabs
              value={mode}
              onValueChange={(value) => {
                if (value === "preview" || value === "code") setMode(value);
              }}
              size="sm"
            >
              <TabsList aria-label={`${example.title} view`}>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
          ) : (
            <span className="text-xs text-rixl-fg-muted">Preview</span>
          )}
          <div className="flex items-center gap-1">{mode === "code" && example.code ? <CopyButton text={example.code} /> : null}</div>
        </div>
        {mode === "preview" ? (
          <div className="docs-example-stage">
            <Render state={state} />
          </div>
        ) : (
          <CodePreview code={example.code ?? ""} />
        )}
        {example.controls && mode === "preview" ? (
          <div className="docs-example-controls">
            {example.controls.map((control) => (
              <ControlField key={control.name} control={control} state={state} onChange={setState} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ControlField({
  control,
  state,
  onChange,
}: {
  control: Control;
  state: Record<string, ControlValue>;
  onChange: (next: Record<string, ControlValue>) => void;
}) {
  const value = state[control.name];
  const controlId = useId();

  if (control.type === "select") {
    return (
      <div className="flex items-center gap-2">
        <Label htmlFor={controlId} className="text-xs text-rixl-fg-muted">
          {control.label}
        </Label>
        <Select value={typeof value === "string" ? value : ""} onValueChange={(next) => onChange({...state, [control.name]: next})}>
          <SelectTrigger id={controlId} size="sm" aria-label={control.label}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {control.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Switch id={controlId} checked={Boolean(value)} onCheckedChange={(checked) => onChange({...state, [control.name]: checked})} />
      <Label htmlFor={controlId} className="cursor-pointer text-xs text-rixl-fg-muted">
        {control.label}
      </Label>
    </div>
  );
}

function defaultState(controls?: Control[]): Record<string, ControlValue> {
  const state: Record<string, ControlValue> = {};
  if (!controls) return state;
  for (const control of controls) {
    if (control.type === "select") {
      state[control.name] = control.defaultValue ?? control.options[0]?.value ?? "";
    } else {
      state[control.name] = control.defaultValue ?? false;
    }
  }
  return state;
}

function jumpToExample(id: string | null) {
  if (!id) return;
  const section = document.getElementById(`example-${id}`);
  section?.scrollIntoView({block: "start"});
  section?.focus({preventScroll: true});
}
