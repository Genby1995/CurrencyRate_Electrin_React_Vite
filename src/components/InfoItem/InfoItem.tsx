interface IProps {
  property?: string;
  value?: string | number;
}

export function InfoItem({ property, value }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span>{property ?? "(Показатель)"}</span>
      <span>{" : "}</span>
      <b>{value ?? " - "}</b>
    </div>
  );
}
