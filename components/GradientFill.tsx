export function GradientFill({
  gradient,
  className = "",
  style,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: {
  gradient: string;
  className?: string;
  style?: React.CSSProperties;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <div
      className={className}
      style={{ background: gradient, ...style }}
      aria-hidden={ariaLabel ? undefined : ariaHidden ?? true}
      aria-label={ariaLabel}
      role={ariaLabel ? "img" : undefined}
    />
  );
}
