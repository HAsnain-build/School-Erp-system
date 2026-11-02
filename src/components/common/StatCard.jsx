
export default function StatCard({ title, value, subtext, icon: Icon, color = 'blue', trend }) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <div className="stat-info-label">{title}</div>
        <div className="stat-info-value">{value}</div>
        {subtext && (
          <div className="stat-info-sub">
            {trend && <span style={{ color: trend > 0 ? '#10b981' : '#ef4444', fontWeight: 700 }}>{trend > 0 ? `+${trend}%` : `${trend}%`}</span>}
            <span>{subtext}</span>
          </div>
        )}
      </div>
      <div className={`stat-icon-wrapper stat-icon-${color}`}>
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
}
