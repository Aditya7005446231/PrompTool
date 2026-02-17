import StatCard from "./StatCard";

const StatsSection = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <StatCard label="Total Tasks" value="8" type="blue" icon="📋" />
      <StatCard label="In Progress" value="3" type="orange" icon="⏱️" />
      <StatCard label="Completed" value="2" type="green" icon="✅" />
      <StatCard label="High Priority" value="2" type="red" icon="⚠️" />
    </div>
  );
};

export default StatsSection;
