import TaskItem from "./TaskItem";

const RecentTasks = () => {
  return (
    <div style={{ background: '#fff', padding: 25, borderRadius: 10 }}>
      <h2>Recent Tasks</h2>
      <TaskItem title="Design landing page" desc="Create wireframes" priority="high" date="Feb 20" assignee="A" />
      <TaskItem title="CI/CD pipeline" desc="GitHub Actions" priority="high" date="Feb 18" assignee="S" />
      <TaskItem title="Auth flow" desc="Login & signup" priority="medium" date="Feb 22" assignee="J" />
    </div>
  );
};

export default RecentTasks;
