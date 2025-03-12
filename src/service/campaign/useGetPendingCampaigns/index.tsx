import { api, getCookieValue } from "@/service/axios";
import { CampaignProps } from "../useCreateCampaign";
import { useQuery } from "@tanstack/react-query";

const fetchPendingCampaigns = async (): Promise<CampaignProps[]> => {
    const access_token = getCookieValue("access_token");
  
    const { data } = await api.get("/auth/campaign/status/pending", {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
      },
    });
  
    return data?.message || [];
  };
  
  export const useGetPendingCampaigns = () => {
    return useQuery({
      queryKey: ["campaigns", "pending"],
      queryFn: fetchPendingCampaigns,
    });
  };
  