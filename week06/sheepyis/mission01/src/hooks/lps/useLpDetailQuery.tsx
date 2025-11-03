import { useQuery } from "@tanstack/react-query";
import { LPDetailAPI } from "../../apis/lpDetailAxios";

export const useLpDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["lpDetail", id],
    queryFn: () => LPDetailAPI(id),
    enabled: !!id,
  });
};
