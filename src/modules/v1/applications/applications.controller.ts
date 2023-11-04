import { FastifyReply, FastifyRequest } from "fastify";

import {
	ALL_PERMISSIONS,
	SYSTEM_ROLES,
	USER_ROLE_PERMISSIONS,
} from "@/config/data/permissions";
import { createRole } from "@/modules/v1/roles/roles.service";

import { createApplicationRequestBodyType } from "./applications.schema";
import { createApplication, getApplications } from "./applications.service";

export async function createApplicationHandler(
	req: FastifyRequest<{ Body: createApplicationRequestBodyType }>,
	res: FastifyReply,
) {
	const { name } = req.body;

	const application = await createApplication({ name });

	if (!application) {
		throw new Error("Error creating application");
	}

	const superAdminRolePromise = createRole({
		applicationId: application.id,
		name: SYSTEM_ROLES.SUPER_ADMIN,
		permissions: ALL_PERMISSIONS as unknown as Array<string>,
	});

	const applicationUserRolePromise = createRole({
		applicationId: application.id,
		name: SYSTEM_ROLES.APPLICATION_USER,
		permissions: USER_ROLE_PERMISSIONS,
	});

	const [superAdminRole, applicationUserRole] = await Promise.allSettled([
		superAdminRolePromise,
		applicationUserRolePromise,
	]);

	if (superAdminRole.status === "rejected") {
		throw new Error("Error creating super admin role");
	}
	if (applicationUserRole.status === "rejected") {
		throw new Error("Error creating application user role");
	}

	return res.status(201).send({
		application,
		superAdminRole: superAdminRole.value,
		applicationUserRole: applicationUserRole.value,
	});
}

export async function getApplicationsHandler() {
	return getApplications();
}
