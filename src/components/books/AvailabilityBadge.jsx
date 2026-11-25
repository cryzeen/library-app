export default function AvailabilityBadge({ available }) {
  const label = available ? 'В наявності' : 'Видана читачу';
  const className = available ? 'status status-available' : 'status status-unavailable';

  return <span className={className}>{label}</span>;
}