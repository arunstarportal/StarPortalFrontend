import { useState } from "react";
import { useWriteContract } from "wagmi";

interface Props {
  address?: `0x${string}`;
  abi?: any;
  functionName?: string;
  args?: any[];
  value?: bigint | string;
}

interface UseWriteContractProps {
  executeWrite: (customProps?: Props) => Promise<any>;
  isSuccess: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useContractWrite = (): UseWriteContractProps => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, error } = useWriteContract();

  const executeWrite = async (customProps?: Props): Promise<any> => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      if (
        !customProps?.address ||
        !customProps.abi ||
        !customProps.functionName
      ) {
        throw new Error("Invalid contract write parameters");
      }

      // @ts-ignore
      const result = await writeContract({
        address: customProps.address,
        abi: customProps.abi,
        functionName: customProps.functionName,
        args: customProps.args,
        value: customProps.value,
      });

      setIsSuccess(true);
      return result;
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { executeWrite, isSuccess, isLoading, error };
};
