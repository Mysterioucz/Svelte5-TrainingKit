import { addFormSchema } from "$lib/formSchema";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms";

export const load = (async () => {
    return {
        form: await superValidate(zod(addFormSchema))
    };
})