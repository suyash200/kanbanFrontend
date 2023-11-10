import { instance } from "../interceptor";

export async function LoginApi(body: { email: string; password: string }) {
  try {
    const req = await instance.post("auth/login", body);
    console.log(req.status === 404);
    if (req.status === 404) {
      alert("worng credentials");
    }
    return req;
  } catch (error) {
    alert("worng credentials");
  }
}

export async function Register(body: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const req = await instance.post("user/create", body);
  return req;
}
