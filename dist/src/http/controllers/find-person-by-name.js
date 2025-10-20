"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPersonByName = findPersonByName;
const zod_1 = require("zod");
const make_find_person_by_name_use_case_js_1 = require("../../services/factories/make-find-person-by-name-use-case.js");
async function findPersonByName(req, rep) {
    // validação dos query params
    const querySchema = zod_1.z.object({
        name: zod_1.z.string(),
        page: zod_1.z.coerce.number(), // converte automaticamente string → number
    });
    try {
        const { name, page } = querySchema.parse(req.query);
        const useCase = (0, make_find_person_by_name_use_case_js_1.makeFindPersonByNameUseCase)();
        const result = await useCase.execute({ name, page });
        return rep.status(200).send(result);
    }
    catch (err) {
        if (err instanceof Error) {
            return rep.status(409).send({ message: err.message });
        }
        throw err;
    }
    return rep.status(200).send();
}
//# sourceMappingURL=find-person-by-name.js.map