import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verifiy-jwt";

export async function appRoutes(app: FastifyInstance) {
	app.post("/users", register);

	app.post("/sessions", authenticate);

	// rotas apenas chamadas quando o usuário estiver autenticado
	app.get("/me", { onRequest: [verifyJWT] }, profile);
}
