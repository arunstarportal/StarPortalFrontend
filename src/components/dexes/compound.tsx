import {
  MinusCircle,
  PlusCircle,
  Shield,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

// export const StatCard = ({
//   title,
//   value,
//   change,
//   icon,
// }: {
//   title: string;
//   value: string;
//   change?: string;
//   icon: React.ReactNode;
// }) => (
//   <div className="bg-gray-900/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300">
//     <div className="flex justify-between items-start">
//       <div>
//         <p className="text-gray-400 text-sm mb-1">{title}</p>
//         <h3 className="text-2xl font-bold text-white">{value}</h3>
//         {change && (
//           <p
//             className={`text-sm mt-1 ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
//           >
//             {change} (24h)
//           </p>
//         )}
//       </div>
//       <div className="p-3 bg-gray-800/50 rounded-lg">{icon}</div>
//     </div>
//   </div>
// );

// export const AssetRow = ({
//   img,
//   label,
//   token,
//   walletBalance,
//   change,
//   apy,
// }: any) => (
//   <div className="grid grid-cols-2 py-3 px-4 hover:bg-white/5 transition-colors rounded-lg cursor-pointer">
//     <div className="flex items-center gap-3">
//       <img src={img} alt="" className="w-8 h-8 object-contain" />
//       <div>
//         <h1 className="text-white font-medium text-lg">{label}</h1>
//         <div className="flex items-center gap-2">
//           <p className="text-white/70 text-sm">{token}</p>
//           <span
//             className={`text-xs ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
//           >
//             {change}
//           </span>
//         </div>
//       </div>
//     </div>
//     <div className="flex items-center justify-end gap-4">
//       <div className="text-right">
//         <div className="flex items-center justify-center gap-2">
//           <p className="text-lg text-white/90 font-medium mr-2">
//             {walletBalance}
//           </p>
//           <PlusCircle color="white" />
//           <MinusCircle color="white" />
//         </div>
//         <p className="text-xs text-white/50 font-medium mt-1">APY: {apy}</p>
//       </div>
//     </div>
//   </div>
// );

export const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-gray-900/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm mb-2 group-hover:text-gray-300 transition-colors">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {value}
        </h3>
        {change && (
          <div className="flex items-center gap-2 mt-2">
            {change.startsWith("+") ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <p
              className={`text-sm ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
            >
              {change} (24h)
            </p>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-800/50 rounded-lg group-hover:bg-purple-500/20 transition-all duration-300">
        {icon}
      </div>
    </div>
  </div>
);

export const AssetRow = ({
  img,
  label,
  token,
  walletBalance,
  change,
  apy,
}: any) => (
  <div className="grid grid-cols-2 py-4 px-6 hover:bg-white/5 transition-all duration-300 rounded-lg cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="relative">
        <img
          src={img}
          alt=""
          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
        />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900" />
      </div>
      <div>
        <h1 className="text-white font-medium text-lg group-hover:text-purple-400 transition-colors">
          {label}
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-white/70 text-sm">{token}</p>
          <span
            className={`text-xs ${change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
          >
            {change}
          </span>
        </div>
      </div>
    </div>
    <div className="flex items-center justify-end gap-4">
      <div className="text-right">
        <div className="flex items-center justify-end gap-3">
          <p className="text-lg text-white/90 font-medium">{walletBalance}</p>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors">
              <PlusCircle className="w-4 h-4 text-purple-400" />
            </button>
            <button className="p-2 bg-purple-500/20 rounded-lg hover:bg-purple-500/30 transition-colors">
              <MinusCircle className="w-4 h-4 text-purple-400" />
            </button>
          </div>
        </div>
        <p className="text-sm text-white/50 font-medium mt-1">
          APY: <span className="text-green-400">{apy}</span>
        </p>
      </div>
    </div>
  </div>
);
