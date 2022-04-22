import axios from "axios";

export const createChannel = async (value: {
  name: string;
  description: string;
}): Promise<{ data: any; error: any }> => {
  const { name, description } = value;
  try {
    const { data } = await axios.post("/api/channel/create", {
      name,
      description,
    });
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data.message };
  }
};

export const listChannels = async (): Promise<{ data: any; error: any }> => {
  try {
    const { data } = await axios.get("/api/channel/all");
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.response.data.message };
  }
};