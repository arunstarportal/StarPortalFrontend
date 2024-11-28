const StatCard = ({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
        {change && (
          <p
            className={`text-sm mt-1 ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
          >
            {change} (24h)
          </p>
        )}
      </div>
      <div className="p-3 bg-gray-800/50 rounded-lg">{icon}</div>
    </div>
  </div>
);
