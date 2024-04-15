import fastify from "fastify";
import { createDebtor } from "./routers/create-debtor";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { editDebtor } from "./routers/edit-debtor";
import { findAllDebtor } from "./routers/find-all-debtor";
import { editServices } from "./routers/edit-service";


const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createDebtor);
app.register(editDebtor);
app.register(findAllDebtor);
app.register(editServices)

app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP Server running");
});
