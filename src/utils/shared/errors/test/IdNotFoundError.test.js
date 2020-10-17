import IdNotFoundError from "../IdNotFound.error.js";
import { objectInArrayContainsId } from "../../../shared/functions/validateTypes.js";

describe("Validating IdNotFound. ", () => {
    test("it should throw that the \'object\' inside the array do not have ID field", () => {

        const myobj = [{ type: 'Sports car', }]
        return expect(Promise.reject(new IdNotFoundError())).rejects.toThrow(
            objectInArrayContainsId(myobj)
        );

    });
});