import { instance } from "../interceptor";

export async function LoginApi(body: { email: string; password: string }) {
  const req= await instance.post("auth/login", body);
 
  return req
}
