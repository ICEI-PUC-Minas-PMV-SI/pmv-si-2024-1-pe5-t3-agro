"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/routes.ts
var routes_exports = {};
__export(routes_exports, {
  appRoutes: () => appRoutes
});
module.exports = __toCommonJS(routes_exports);

// src/http/controller/register.ts
var import_zod2 = require("zod");

// src/use-cases/errors/user-already-exits-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
};

// src/use-cases/register.ts
var import_bcryptjs = require("bcryptjs");
var RegisterUseCase = class {
  constructor(workerRepository, branchRepository) {
    this.workerRepository = workerRepository;
    this.branchRepository = branchRepository;
  }
  async execute({
    email,
    name,
    password,
    branchId
  }) {
    const branch = await this.branchRepository.findById(branchId);
    if (!branch)
      throw new Error("Branch not found");
    const password_hash = await (0, import_bcryptjs.hash)(password, 6);
    const userWithSameEmail = await this.workerRepository.findByEmail(email);
    if (userWithSameEmail)
      throw new UserAlreadyExistsError();
    const worker = await this.workerRepository.create({
      name,
      email,
      password_hash,
      Branch: { connect: { id: branchId } }
    });
    return { worker };
  }
};

// src/lib/prisma.ts
var import_client = require("@prisma/client");

// src/env/index,.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "production", "test"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error(_env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/lib/prisma.ts
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query", "info", "warn", "error"] : ["warn", "error"]
});

// src/repositories/prisma/prisma-worker-repositories.ts
var PrismaWorkerRepository = class {
  async create(data) {
    const worker = await prisma.worker.create({
      data
    });
    return worker;
  }
  async findByEmail(email) {
    return prisma.worker.findUnique({
      where: {
        email
      }
    });
  }
  async findById(id) {
    return prisma.worker.findUnique({
      where: {
        id
      }
    });
  }
};

// src/use-cases/factories/make-register-use-case.ts
function makeRegisterUseCase() {
  const workerRepository = new PrismaWorkerRepository();
  const registerUseCase = new RegisterUseCase(workerRepository);
  return registerUseCase;
}

// src/http/controller/register.ts
async function register(request, reply) {
  const registerBodySchema = import_zod2.z.object({
    name: import_zod2.z.string(),
    email: import_zod2.z.string().email(),
    password: import_zod2.z.string().min(8),
    branchId: import_zod2.z.string()
  });
  const { name, email, password, branchId } = registerBodySchema.parse(
    request.body
  );
  const registerUseCase = makeRegisterUseCase();
  try {
    await registerUseCase.execute({ name, email, password, branchId });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(201).send();
}

// src/http/controller/authenticate.ts
var import_zod3 = require("zod");

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials");
  }
};

// src/use-cases/authenticate.ts
var import_bcryptjs2 = require("bcryptjs");
var AuthenticateUseCase = class {
  constructor(workerRepository) {
    this.workerRepository = workerRepository;
  }
  async execute({
    email,
    password
  }) {
    const worker = await this.workerRepository.findByEmail(email);
    if (!worker)
      throw new InvalidCredentialsError();
    const doesPasswordMatch = await (0, import_bcryptjs2.compare)(password, worker.password_hash);
    if (!doesPasswordMatch)
      throw new InvalidCredentialsError();
    return { worker };
  }
};

// src/use-cases/factories/make-authenticate-use-case.ts
function makeAuthenticateUseCase() {
  const workerRepository = new PrismaWorkerRepository();
  const authenticateUseCase = new AuthenticateUseCase(workerRepository);
  return authenticateUseCase;
}

// src/http/controller/authenticate.ts
async function authenticate(request, reply) {
  const authenticateBodySchema = import_zod3.z.object({
    email: import_zod3.z.string().email(),
    password: import_zod3.z.string().min(8)
  });
  const { email, password } = authenticateBodySchema.parse(request.body);
  const authenticateUseCase = makeAuthenticateUseCase();
  try {
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
  return reply.status(200).send();
}

// src/http/routes.ts
async function appRoutes(app) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appRoutes
});
