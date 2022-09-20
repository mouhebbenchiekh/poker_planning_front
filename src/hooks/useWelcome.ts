import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../axios.config';
import { IRoom } from '../types/room';

export const useWelcome = () => {
  const { data: rooms, isLoading } = useQuery<IRoom[]>(['rooms'], async () => {
    const resukt = await axiosInstance.get(`/room/`);
    return resukt.data;
  });

  return { rooms, isLoading };
};
