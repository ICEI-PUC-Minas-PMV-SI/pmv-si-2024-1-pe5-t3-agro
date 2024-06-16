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

// src/use-cases/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateUseCase: () => AuthenticateUseCase
});
module.exports = __toCommonJS(authenticate_exports);
var import_bcryptjs = require("bcryptjs");

// src/use-cases/errors/invalid-credentials-error.ts
var InvalidCredentialsError = class extends Error {
  constructor() {
    super("Invalid credentials");
  }
};

// src/use-cases/authenticate.ts
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
    const doesPasswordMatch = await (0, import_bcryptjs.compare)(password, worker.password_hash);
    if (!doesPasswordMatch)
      throw new InvalidCredentialsError();
    return { worker };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUseCase
});
