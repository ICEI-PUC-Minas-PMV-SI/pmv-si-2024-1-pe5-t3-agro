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

// src/use-cases/factories/make-register-use-case.ts
var make_register_use_case_exports = {};
__export(make_register_use_case_exports, {
  makeRegisterUseCase: () => makeRegisterUseCase
});
module.exports = __toCommonJS(make_register_use_case_exports);

// src/use-cases/register.ts
var import_bcryptjs = require("bcryptjs");

// src/use-cases/errors/user-already-exits-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
};

// src/use-cases/register.ts
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeRegisterUseCase
});
