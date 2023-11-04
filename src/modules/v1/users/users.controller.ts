import { FastifyReply, FastifyRequest } from "fastify";

import { SYSTEM_ROLES } from "@/config/data/permissions";

import { getRoleByName } from "../roles/roles.service";
import { createUserRequestBodyType } from "./users.schema";
import {
	assignRoleToUser,
	createUser,
	getUsersByApplicationId,
} from "./users.service";

export async function createUserHandler(
	req: FastifyRequest<{ Body: createUserRequestBodyType }>,
	res: FastifyReply,
) {
	const { initalUser, ...data } = req.body;

	const roleType = initalUser
		? SYSTEM_ROLES.SUPER_ADMIN
		: SYSTEM_ROLES.APPLICATION_USER;

	if (roleType === SYSTEM_ROLES.SUPER_ADMIN) {
		const appUsers = await getUsersByApplicationId(data.applicationId);

		if (appUsers.length > 0) {
			return res.code(400).send({
				message: "Application already has super admin user",
				extensions: {
					code: "APPLICATION_SUPER_ADMIN_EXISTS",
					application: data.applicationId,
				},
			});
		}
	}

	const role = await getRoleByName({
		name: roleType,
		applicationId: data.applicationId,
	});

	if (!role) {
		return res.code(404).send({ message: "Role not found" });
	}

	const user = await createUser(data);

	if (!user) {
		return res.code(400).send({ message: "User creation unsuccessful" });
	}

	await assignRoleToUser({
		applicationId: data.applicationId,
		roleId: role.id,
		userId: user.id,
	});

	return user;
}
