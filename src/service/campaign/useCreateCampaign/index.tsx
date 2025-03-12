import { api, getCookieValue } from "@/service/axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/service";

export interface CampaignProps {
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
}

const createCampaign = async (
  campaignData: CampaignProps
): Promise<CampaignProps | undefined> => {
  const access_token = getCookieValue("access_token");

  const { data } = await api.post("/auth/campaign", campaignData, {
    headers: {
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
    },
  });

  if (!data?.message) return;

  return data.message;
};

export const useCreateCampaign = () => {
  return useMutation({
    mutationFn: (campaignData: CampaignProps) => createCampaign(campaignData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });
};
