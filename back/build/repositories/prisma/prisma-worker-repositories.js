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

// src/repositories/prisma/prisma-worker-repositories.ts
var prisma_worker_repositories_exports = {};
__export(prisma_worker_repositories_exports, {
  PrismaWorkerRepository: () => PrismaWorkerRepository
});
module.exports = __toCommonJS(prisma_worker_repositories_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaWorkerRepository
});
