import { api, getCookieValue } from "@/service/axios";
import { QueryKeys } from "@/service/query-keys";
import { useQuery } from "@tanstack/react-query";

const logout = async () => {
  const access_token = getCookieValue("access_token");

  await api.get("/logout", {
    headers: {
      ...(access_token && {
        Authorization: `Bearer ${access_token}`,
      }),
    },
  });
};

export const useLogout = () => {
  return useQuery({
    queryKey: [QueryKeys.auth.logout],
    queryFn: logout,
  });
};
