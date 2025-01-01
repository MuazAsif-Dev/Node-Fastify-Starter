// import * as argon2 from "argon2";
// import type { FastifyReply, FastifyRequest } from "fastify";

// import { SYSTEM_ROLES } from "@/config/data/permissions.js";

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

// export async function createUserHandler(
// 	req: FastifyRequest<{ Body: createUserRequestBodyType }>,
// 	res: FastifyReply,
// ) {
// 	const { initalUser, ...data } = req.body;

// 	const roleType = initalUser
// 		? SYSTEM_ROLES.SUPER_ADMIN
// 		: SYSTEM_ROLES.APPLICATION_USER;

// 	if (roleType === SYSTEM_ROLES.SUPER_ADMIN) {
// 		const appUsers = await getUsersByApplicationId(data.applicationId);

// 		if (appUsers.length > 0) {
// 			return res.code(400).send({
// 				message: "Application already has super admin user",
// 				extensions: {
// 					code: "APPLICATION_SUPER_ADMIN_EXISTS",
// 					application: data.applicationId,
// 				},
// 			});
// 		}
// 	}

// 	const role = await getRoleByName({
// 		name: roleType,
// 		applicationId: data.applicationId,
// 	});

// 	if (!role) {
// 		res.code(404);
// 		return { message: "Role not found" };
// 	}

// 	const user = await createUser(data);

// 	if (!user) {
// 		res.code(404);
// 		return { message: "User creation unsuccessful" };
// 	}

// 	await assignRoleToUser({
// 		applicationId: data.applicationId,
// 		roleId: role.id,
// 		userId: user.id,
// 	});

// 	return user;
// }

// export async function loginHandler(
// 	req: FastifyRequest<{
// 		Body: loginUserRequestBodyType;
// 	}>,
// 	res: FastifyReply,
// ) {
// 	const { applicationId, email, password } = req.body;

// 	const user = await getUserByEmail({
// 		applicationId,
// 		email,
// 	});

// 	if (!user || !(await argon2.verify(user.password, password))) {
// 		res.code(400);
// 		return {
// 			message: "Invalid email or password",
// 		};
// 	}

// 	const token = await res.jwtSign(
// 		{
// 			id: user.id,
// 			email,
// 			applicationId,
// 			scopes: user.permissions,
// 		},
// 		{
// 			sign: {
// 				expiresIn: "5m",
// 			},
// 		},
// 	);

// 	return { token };
// }

// export async function assignRoleTouserHandler(
// 	req: FastifyRequest<{
// 		Body: createUserToRolesRequestBodyType;
// 	}>,
// 	res: FastifyReply,
// ) {
// 	const { userId, roleId, applicationId } = req.body;

// 	const result = await assignRoleToUser({
// 		userId,
// 		applicationId,
// 		roleId,
// 	});

// 	if (!result) {
// 		res.code(400);

// 		return {
// 			message: "Error: Could not assign role to user",
// 		};
// 	}

// 	return result;
// }
