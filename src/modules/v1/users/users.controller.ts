import type { FastifyReply, FastifyRequest } from "fastify";

// import type {
// 	createUserRequestBodyType,
// 	createUserToRolesRequestBodyType,
// 	loginUserRequestBodyType,
// } from "./users.schema.js";
// import {
// 	assignRoleToUser,
// 	createUser,
// 	getUserByEmail,
// 	getUsersByApplicationId,
// } from "./users.service.js";

export async function getUserByIdHandler(
	req: FastifyRequest,
	// req: FastifyRequest<{ Body: createUserRequestBodyType }>,
	res: FastifyReply,
) {
	// const { initalUser, ...data } = req.body;
	// const user = await createUser(data);
	// if (!user) {
	// 	res.code(404);
	// 	return { message: "User creation unsuccessful" };
	// }
	// return user;
}
