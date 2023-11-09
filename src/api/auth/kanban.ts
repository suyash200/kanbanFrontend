import { BoardT } from "../../pages/dashboard/dashboard";
import { instance } from "../interceptor";

export default async function GetAllBoardsApi() {
  const req = instance.get("kanban/get", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return req;
}

export async function GetBoard(name: string | undefined) {
  const req = instance.get(`kanban/get?name=${name}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return req;
}

export async function EditBoard(
  name: string | undefined,
  body: BoardT["kanban"]
) {
  const req = instance.patch(
    `kanban/update?name=${name}`,
    { kanban: body },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return req;
}

export async function CreateBoard(body: { name: string; description: string }) {
  const req = instance.post(`kanban/`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return req;
}
