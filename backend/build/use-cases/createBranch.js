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

// src/use-cases/createBranch.ts
var createBranch_exports = {};
__export(createBranch_exports, {
  CreateBranchUseCase: () => CreateBranchUseCase
});
module.exports = __toCommonJS(createBranch_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateBranchUseCase
});
