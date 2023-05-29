import { z } from 'zod';

export const pokemonResponseSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(
        z.object({
            name: z.string(),
            url: z.string()
        })
    )
});

export type PokemonResponse = z.infer<typeof pokemonResponseSchema>; 