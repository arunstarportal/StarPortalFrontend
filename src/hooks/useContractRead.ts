import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";

interface Props {
  address: `0x${string}`;
  abi: any[];
  functionName: string;
  args?: any[];
}

interface UseContractReadResponse {
  data: any;
  isLoading: boolean;
  error: any;
}

export const useContractRead = (props: Props): UseContractReadResponse => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data: contractData,
    error,
    isLoading: readLoading,
  } = useReadContract({
    address: props.address,
    abi: props.abi,
    functionName: props.functionName,
    args: props.args,
  });

  useEffect(() => {
    setIsLoading(readLoading);
    setData(contractData);
  }, [contractData, readLoading]);

  return { data, isLoading, error };
};
