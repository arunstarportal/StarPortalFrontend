export const Header = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: any;
  setSearchTerm: any;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          className="w-full pl-14 py-3 bg-[#171717] rounded-full border border-gray-800 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 outline-none transition-all"
          placeholder="Search Protocols"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <button className="px-6 py-3 bg-gradient-to-r from-[#4a4a4a] to-[#2c2c2c] text-white rounded-full hover:from-[#5a5a5a] hover:to-[#3c3c3c] transition-all duration-300 shadow-lg">
        Connect Wallet
      </button>
    </div>
  );
};
