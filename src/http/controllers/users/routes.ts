import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verifiy-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
	app.post("/users", register);

	app.post("/sessions", authenticate);
    
	app.patch('/token/refresh',refresh)
	// rotas apenas chamadas quando o usuário estiver autenticado
	app.get("/me", { onRequest: [verifyJWT] }, profile);
}
