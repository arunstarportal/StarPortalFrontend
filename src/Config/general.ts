export const truncateAddress = (addr: string) => {
  return `${addr?.slice(0, 15)}...${addr?.slice(-4)}`;
};

export const copyAddress = (address, setShowCopied) => {
  if (address) {
    navigator.clipboard.writeText(address);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  }
};
