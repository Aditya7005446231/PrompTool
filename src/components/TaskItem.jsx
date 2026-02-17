function TaskItem({ title, desc, priority, date, assignee }) {
  const priorityColors = {
    high: '#ff6b6b',
    medium: '#ffa500',
    low: '#51cf66',
  };

  return (
    <div style={{ padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 12, color: '#888' }}>{desc}</div>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ backgroundColor: priorityColors[priority], color: '#fff', padding: '3px 10px', borderRadius: '20px', fontSize: 11 }}>
          {priority}
        </span>
        <span style={{ fontSize: 12 }}>{date}</span>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {assignee}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
