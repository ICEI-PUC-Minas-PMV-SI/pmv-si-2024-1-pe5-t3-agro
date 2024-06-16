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

// src/use-cases/registerAnimal.ts
var registerAnimal_exports = {};
__export(registerAnimal_exports, {
  RegisterAnimalUseCase: () => RegisterAnimalUseCase
});
module.exports = __toCommonJS(registerAnimal_exports);
var RegisterAnimalUseCase = class {
  constructor(animalRepository, branchRepository) {
    this.animalRepository = animalRepository;
    this.branchRepository = branchRepository;
  }
  async execute({
    name,
    branchId,
    type
  }) {
    const branch = await this.branchRepository.findById(branchId);
    if (!branch) {
      throw new Error("Branch not found");
    }
    const animal = await this.animalRepository.create({
      name,
      type,
      price: 0,
      // Add the price property with a default value
      Branch: { connect: { id: branchId } }
    });
    return { animal };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RegisterAnimalUseCase
});
