import { z } from 'zod';

export const pokemonDetailsResponseSchema = z.object({
    id: z.number(),
    abilities: z.array(z.object({
        ability: z.object({
            name: z.string()
        })
    })),
    types: z.array(z.object({
        type: z.object({
            name: z.string()
        })
    })),
    height: z.number(),
    weight: z.number(),
    name: z.string()
});

export type PokemonDetailsResponse = z.infer<typeof pokemonDetailsResponseSchema>; 