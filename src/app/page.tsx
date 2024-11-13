import { Header } from "@/components/Header";

const protocolData = [
  {
    name: "Uniswap",
    category: "Dexes",
    tvl: "$3.972b",
    fees: "$937,807",
    revenue: "$0",
    icon: "uniswap",
  },
  {
    name: "Compound Finance",
    category: "Lending",
    tvl: "$1.914b",
    fees: "$29,944",
    revenue: "$4,828",
    icon: "compound",
  },
  {
    name: "AAVE",
    category: "Lending",
    tvl: "$11.933b",
    fees: "$922,124",
    revenue: "$340,549",
    icon: "aave",
  },
  {
    name: "Lido",
    category: "Liquid Staking",
    tvl: "$26.027b",
    fees: "$2.09m",
    revenue: "$208,733",
    icon: "lido",
  },
  {
    name: "Rocket Pool",
    category: "Liquid Staking",
    tvl: "$3.436b",
    fees: "-",
    revenue: "-",
    icon: "rocketPool",
  },
  {
    name: "Ondo Finance",
    category: "RWA",
    tvl: "$446.21m",
    fees: "$446.21m",
    revenue: "$446.21m",
    icon: "ondo",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#000] via-[#28282878] to-[#000] text-gray-200 p-6">
      <Header />

      <h1 className="text-2xl font-medium text-white my-8">
        Trending Protocols
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="overflow-hidden">
            <tr className="bg-[#171717c8]">
              <th className="p-4 text-gray-400/80 text-xl font-light rounded-tl-lg rounded-bl-lg">
                Name
              </th>
              <th className="p-4 text-gray-400/80 text-xl font-light">
                Category
              </th>
              <th className="p-4 text-gray-400/80 text-xl font-light">TVL</th>
              <th className="p-4 text-gray-400/80 text-xl font-light">
                Fees 24h
              </th>
              <th className="p-4 text-gray-400/80 text-xl font-light rounded-tr-lg rounded-br-lg">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody>
            {protocolData.map((protocol, index) => (
              <tr
                key={index}
                className="border-b border-[#2c2c2c] hover:bg-[#222222] transition-all duration-300 ease-in-out"
              >
                <td className="p-4 flex items-center space-x-4">
                  <div className="bg-white/10 text-white/50 flex items-center justify-center text-sm font-medium w-8 h-8 rounded-full">
                    {index + 1}
                  </div>
                  <img
                    src={`/svgs/${protocol.icon}.svg`}
                    alt={protocol.name}
                    className="w-10 h-10 rounded-full ring-2 ring-[#2c2c2c]"
                  />
                  <div>
                    <p className="text-white font-semibold">{protocol.name}</p>
                    <p className="text-xs text-gray-500">{protocol.category}</p>
                  </div>
                </td>
                <td className="p-4 text-gray-300">{protocol.category}</td>
                <td className="p-4 font-medium text-green-400">
                  {protocol.tvl}
                </td>
                <td className="p-4 text-blue-300">{protocol.fees}</td>
                <td className="p-4 font-bold text-purple-400">
                  {protocol.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
