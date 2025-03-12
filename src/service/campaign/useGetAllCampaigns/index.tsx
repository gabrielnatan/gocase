import { api, getCookieValue } from "@/service/axios";
import { useQuery } from "@tanstack/react-query";

export interface CampaignProps {
  id: string;
  name: string;
  goal: string;
  products: string;
  content_type: string;
  hashtags: string[];
  influencers: string[];
  dates: {
    entrega: string;
    publicacao: string;
  };
  status: "active" | "completed" | "pending" | "canceled" | "archived";
  materials: string[];
  created_at: string;
}

const fetchAllCampaigns = async (): Promise<CampaignProps[]> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.get("/auth/campaign", {
    headers: {
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
    },
  });

  return data?.message || [];
};

export const useGetAllCampaigns = () => {
  return useQuery({
    queryKey: ["campaigns", "all"],
    queryFn: fetchAllCampaigns,
  });
};
