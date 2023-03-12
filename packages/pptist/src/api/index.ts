import axios, { AxiosRequestConfig } from 'axios'
import { Slide } from '../types/slides'

const instance = axios.create({
  baseURL: '/api'
})

function request<T>(options: AxiosRequestConfig): Promise<T> {
  if (options.method === 'POST' || options.method === 'PUT') {
    if (options.params && !options.data) {
      options.data = options.params
      delete options.params
    }
  }
  return instance
    .request(options)
    .then((res) => res.data)
}


interface GenerateSlidesResponse {
  pid: string
  slides: Slide[]
  errCode: number,
  errMessage: string
}

export const generateSlides = (topic: string) => {
  return request<GenerateSlidesResponse>({
    url: '/generate',
    method: 'POST',
    data: { topic }
  })
}

