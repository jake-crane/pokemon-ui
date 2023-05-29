import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import type { PokemonDetailsResponse } from '../schemas/pokemonDetailsResponseSchema';
import { pokemonDetailsResponseSchema } from '../schemas/pokemonDetailsResponseSchema';

export const usePokemonDetailsQuery = (url: string | null): UseQueryResult<PokemonDetailsResponse> => {
    return useQuery({
        queryKey: ['pokemon', url],
        queryFn: async (): Promise<PokemonDetailsResponse> => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const data = await ky.get(url!).json();
            return pokemonDetailsResponseSchema.parse(data);
        },
        keepPreviousData: true,
        enabled: Boolean(url)
    });
};