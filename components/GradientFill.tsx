export function GradientFill({
  gradient,
  className = "",
  style,
}: {
  gradient: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ background: gradient, ...style }}
      aria-hidden="true"
    />
  );
}
