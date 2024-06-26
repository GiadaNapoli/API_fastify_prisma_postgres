import fp from "fastify-plugin";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";

export const zodPlugin = fp(async (fastify) => {
	// Add schema validator and serializer
	fastify.setValidatorCompiler(validatorCompiler);
	fastify.setSerializerCompiler(serializerCompiler);
});
