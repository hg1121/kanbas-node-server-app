import Database from "../Database/index.js";

export function findModulesForCourse(courseId) {
  const { modules } = Database;
//   console.log("courseId", courseId);
//   console.log("modules", modules);
  return modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
//   const newModule = { ...module, _id: Date.now().toString() };
  Database.modules = [...Database.modules, module];
  return module;
}

export function deleteModule(moduleId) {
  const { modules } = Database;
  Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    // console.log('last module', modules[modules.length-1]);
    const module = modules.find((module) => module._id === moduleUpdates._id);
    // console.log("moduleUpdates", moduleUpdates, "module", module);
    Object.assign(module, moduleUpdates);
    return module;
  }
  