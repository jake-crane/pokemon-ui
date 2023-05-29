import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import type { PokemonResponse } from '../schemas/pokemonResponseSchema';
import { pokemonResponseSchema } from '../schemas/pokemonResponseSchema';

export const usePokemonQuery = (limit: number, offset: number): UseQueryResult<PokemonResponse> => {
    return useQuery({
        queryKey: ['pokemon', limit, offset],
        queryFn: async (): Promise<PokemonResponse> => {
            const data = await ky.get('https://pokeapi.co/api/v2/pokemon/', {
                searchParams: {
                    limit,
                    offset
                }
            }).json();
            return pokemonResponseSchema.parse(data);
        },
        keepPreviousData: true
    });
};