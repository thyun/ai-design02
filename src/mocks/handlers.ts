import { http, HttpResponse, delay } from 'msw';
import { addUser, editUser, getUsers, removeUser } from './data';

const apiUrl = '/api/users';

export const handlers = [
  http.get(apiUrl, async () => {
    await delay(180);
    return HttpResponse.json(getUsers());
  }),

  http.post(apiUrl, async ({ request }) => {
    const body = (await request.json()) as Parameters<typeof addUser>[0];
    await delay(180);
    const user = addUser(body);
    return HttpResponse.json(user, { status: 201 });
  }),

  http.put(`${apiUrl}/:id`, async ({ params, request }) => {
    const body = (await request.json()) as Parameters<typeof addUser>[0];
    await delay(180);
    const user = editUser(Number(params.id), body);
    return HttpResponse.json(user);
  }),

  http.delete(`${apiUrl}/:id`, async ({ params }) => {
    await delay(180);
    removeUser(Number(params.id));
    return new HttpResponse(null, { status: 204 });
  }),
];
