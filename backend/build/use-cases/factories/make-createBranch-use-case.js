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

// src/use-cases/factories/make-createBranch-use-case.ts
var make_createBranch_use_case_exports = {};
__export(make_createBranch_use_case_exports, {
  makeCreateBranchUseCase: () => makeCreateBranchUseCase
});
module.exports = __toCommonJS(make_createBranch_use_case_exports);

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

// src/repositories/prisma/primas-branch-repositories.ts
var PrismaBranchRepository = class {
  async create(data) {
    const worker = await prisma.branch.create({
      data
    });
    return worker;
  }
  async findByName(name) {
    return prisma.branch.findMany({
      where: {
        name: { contains: name }
      }
    });
  }
  async findById(id) {
    return prisma.branch.findUnique({
      where: {
        id
      }
    });
  }
};

// src/use-cases/errors/user-already-exits-error.ts
var UserAlreadyExistsError = class extends Error {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExistsError";
  }
};

// src/use-cases/createBranch.ts
var CreateBranchUseCase = class {
  constructor(branchRepository) {
    this.branchRepository = branchRepository;
  }
  async execute({
    name,
    address
  }) {
    const branchWIthSameName = await this.branchRepository.findByName(name);
    if (branchWIthSameName && branchWIthSameName.length > 0)
      throw new UserAlreadyExistsError();
    const branch = await this.branchRepository.create({
      name,
      address
    });
    return { branch };
  }
};

// src/use-cases/factories/make-createBranch-use-case.ts
function makeCreateBranchUseCase() {
  const branchRepository = new PrismaBranchRepository();
  const createBrancUseCase = new CreateBranchUseCase(branchRepository);
  return createBrancUseCase;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  makeCreateBranchUseCase
});
