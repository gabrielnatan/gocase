import { useMutation } from "@tanstack/react-query";
import { api, getCookieValue } from "@/service/axios";

interface UploadResponse {
  images: string[];
  message: string;
}

const uploadImages = async (files: File[]) => {
  const access_token = getCookieValue("access_token");

  const formData = new FormData();
  files.forEach((file) => {
    formData.append("images", file);
  });

  const { data } = await api.post<UploadResponse>(
    "/auth/message/upload",
    formData,
    {
      headers: {
        ...(access_token && {
          Authorization: `Bearer ${access_token}`,
        }),
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.images;
};

export const useUploadImages = () => {
  return useMutation({
    mutationFn: uploadImages,
  });
};
