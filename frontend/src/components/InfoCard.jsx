export const InfoCard = ({ icon, title, value }) => {
  return (
    <div className="flex items-center p:30|70 bg:#00596312 r:10">
      <div className="flex align-items:center justify-content:center margin-right:40">
        {icon}
      </div>
      <div className="flex flex:col">
        <div className="font:medium margin-bottom:5">{title}</div>
        <div className="font:bold text-align:end f:27">{value}</div>
      </div>
    </div>
  );
};
