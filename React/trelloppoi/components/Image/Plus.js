export default function Plus({ size, fillColor }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="4.5" width={size} height="3" fill={fillColor} />
      <rect
        x="7.5"
        width={size}
        height="3"
        transform="rotate(90 7.5 0)"
        fill={fillColor}
      />
    </svg>
  );
}
