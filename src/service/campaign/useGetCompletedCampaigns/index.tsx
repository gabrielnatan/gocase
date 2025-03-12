import { api, getCookieValue } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";
import { CampaignProps } from "../useCreateCampaign";

const fetchCompletedCampaigns = async (): Promise<CampaignProps[]> => {
    const access_token = getCookieValue("access_token");
  
    const { data } = await api.get("/auth/campaign/status/completed", {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
      },
    });
  
    return data?.message || [];
  };
  
  export const useGetCompletedCampaigns = () => {
    return useQuery({
      queryKey: ["campaigns", "completed"],
      queryFn: fetchCompletedCampaigns,
    });
  };
  