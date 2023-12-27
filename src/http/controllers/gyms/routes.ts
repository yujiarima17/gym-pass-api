import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/http/middlewares/verifiy-jwt";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";
import { verifyUserRole } from "@/http/middlewares/verfify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);

	app.get("/gyms/search", search);
	app.get("/gyms/nearby", nearby);

	app.post("/gyms", { onRequest: [verifyUserRole("ADMIN")] }, create);
}
