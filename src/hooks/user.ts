import { useMutation, useQuery,useQueryClient } from '@tanstack/react-query'

import  { AuthService, type UpdateUserDto, UsersService } from '@/api-sdk'

export const useMyStore = () => {
  return useQuery({
    queryKey: ['my-store'],
    queryFn: () => UsersService.usersControllerGetMyStore(),
  })
}

export const useProfile = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => AuthService.authControllerGetProfile(), 
  })
}

export const useFullProfile = () => {
  return useQuery({
    queryKey: ['user-full-profile'],
    queryFn: () => UsersService.usersControllerGetMe(), 
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserDto) =>
      UsersService.usersControllerUpdateProfile({ requestBody: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['my-store'] })
      queryClient.invalidateQueries({ queryKey: ['user-full-profile'] })
    },
  })
}


