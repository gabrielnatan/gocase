import { api, getCookieValue } from "@/service/axios";
import { CampaignProps } from "../useCreateCampaign";
import { useQuery } from "@tanstack/react-query";

const fetchArchivedCampaigns = async (): Promise<CampaignProps[]> => {
    const access_token = getCookieValue("access_token");
  
    const { data } = await api.get("/auth/campaign/status/archived", {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
      },
    });
  
    return data?.message || [];
  };
  
  export const useGetArchivedCampaigns = () => {
    return useQuery({
      queryKey: ["campaigns", "archived"],
      queryFn: fetchArchivedCampaigns,
    });
  };
  