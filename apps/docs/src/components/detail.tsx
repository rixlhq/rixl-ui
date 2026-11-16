import { memo, useMemo, useState } from "react";
import type { ComponentType, ReactNode } from "react";
import { Badge } from "@rixl/ui/badge";
import { Button } from "@rixl/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@rixl/ui/card";
import { Label } from "@rixl/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@rixl/ui/select";
import { Switch } from "@rixl/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@rixl/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@rixl/ui/tooltip";
import type { Control, ControlValue, Example, Showcase } from "../showcases/registry";

export const Detail = memo(function Detail({ showcase }: { showcase: Showcase }) {
  const examples = useMemo<Example[]>(() => {
    if (showcase.examples && showcase.examples.length > 0) return showcase.examples;
    const Legacy: ComponentType<{
      state: Record<string, ControlValue>;
      children?: ReactNode;
    }> = () => <showcase.Showcase />;
    return [{ id: "default", title: "Preview", render: Legacy }];
  }, [showcase]);

  return (
    <div className="space-y-8">
      <div className="space-y-2 border-b border-rixl-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{showcase.group}</Badge>
          <code className="text-xs text-rixl-fg-muted">@rixl/ui/{showcase.path}</code>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-rixl-fg">{showcase.title}</h1>
        {showcase.description ? (
          <p className="max-w-3xl text-sm leading-relaxed text-rixl-fg-muted">
            {showcase.description}
          </p>
        ) : null}
      </div>

      <div className="space-y-6">
        {examples.map((example) => (
          <ExampleCard key={example.id} example={example} />
        ))}
      </div>
    </div>
  );
});

function ExampleCard({ example }: { example: Example }) {
  const [mode, setMode] = useState<"preview" | "code">("preview");
  const hasCode = Boolean(example.code?.trim());
  const [state, setState] = useState<Record<string, ControlValue>>(() =>
    defaultState(example.controls),
  );
  const Render = example.render;

  return (
    <Card className="gap-0 overflow-hidden py-0">
      <CardHeader className="border-b border-rixl-border px-4 sm:px-5 py-3.5 [.border-b]:pb-3.5">
        <CardTitle className="text-sm">{example.title}</CardTitle>
        {example.description ? (
          <CardDescription className="text-xs">{example.description}</CardDescription>
        ) : null}
        {hasCode ? (
          <CardAction>
            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value as "preview" | "code")}
              variant="segmented"
              size="sm"
            >
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardAction>
        ) : null}
      </CardHeader>

      {example.controls && mode === "preview" ? (
        <div className="flex flex-wrap items-center gap-3 sm:gap-5 border-b border-rixl-border bg-rixl-surface-muted/50 px-4 sm:px-5 py-3">
          {example.controls.map((control) => (
            <ControlField key={control.name} control={control} state={state} onChange={setState} />
          ))}
        </div>
      ) : null}

      <CardContent className="p-4 sm:p-6">
        {mode === "preview" ? (
          <Render state={state} />
        ) : hasCode ? (
          <div className="relative">
            <pre className="overflow-x-auto rounded-rixl-md border border-rixl-border bg-rixl-bg p-4 font-mono text-xs leading-relaxed text-rixl-fg">
              {example.code}
            </pre>
            <CopyButton text={example.code!} />
          </div>
        ) : null}
      </CardContent>
    </Card>
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
  const controlId = `ctrl-${control.name}`;

  if (control.type === "select") {
    return (
      <div className="flex items-center gap-2">
        <Label htmlFor={controlId} className="text-xs text-rixl-fg-muted">
          {control.label}
        </Label>
        <Select
          value={value as string}
          onValueChange={(next) => onChange({ ...state, [control.name]: next })}
        >
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
      <Switch
        id={controlId}
        checked={Boolean(value)}
        onCheckedChange={(checked) => onChange({ ...state, [control.name]: checked })}
      />
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2.5 end-2.5"
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        }
      />
      <TooltipContent>{copied ? "Copied!" : "Copy code"}</TooltipContent>
    </Tooltip>
  );
}
