export function InfoPanel({ title, items }) {
  return (
    <div className="info-panel">
      <h2 className="title">{title}</h2>

      <div className="items">
        {items.map((item) => {
          if (!item.hidden) {
            return (
              <div key={item.label} className="item">
                <div className="label">{item.label}</div>
                <div className="value">{item.value}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
