const codeTokens =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|<\/?[A-Za-z][\w.]*|\b(?:import|from|export|const|return|function|true|false|null)\b)/g;

export function CodePreview({code}: {code: string}) {
  const parts = code.split(codeTokens);
  return (
    <pre className="docs-code">
      <code>
        {parts.map((part, index) => {
          let className: string | undefined;
          if (part.startsWith("//") || part.startsWith("/*")) className = "docs-code-comment";
          else if (/^["'`]/.test(part)) className = "docs-code-string";
          else if (/^<\/?[A-Za-z]/.test(part)) className = "docs-code-tag";
          else if (/^(import|from|export|const|return|function|true|false|null)$/.test(part)) className = "docs-code-keyword";
          return (
            <span key={index} className={className}>
              {part}
            </span>
          );
        })}
      </code>
    </pre>
  );
}
