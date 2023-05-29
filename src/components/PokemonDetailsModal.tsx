import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { usePokemonDetailsQuery } from '../hooks/usePokemonDetailsQuery';

interface ComponentProps {
    url: string | null;
    onClose: () => void;
}

const PokemonDetailsModal = ({ url, onClose }: ComponentProps) => {
    const { data } = usePokemonDetailsQuery(url);
    console.log(data);
    return (
        <Dialog open={Boolean(url)} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Pokemon Details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {data && (
                        <Stack>
                            <span>Id: {data.id}</span>
                            <span>Name: {data.name}</span>
                            <span>Height: {data.height}</span>
                            <span>Weight: {data.weight}</span>
                            <div>Types</div>
                            <ul>
                                {data.types.map(type => (<li key={type.type.name}>{type.type.name}</li>))}
                            </ul>
                            <div>Abilities</div>
                            <ul>
                                {data.abilities.map(ability => (<li key={ability.ability.name}>{ability.ability.name}</li>))}
                            </ul>
                        </Stack>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PokemonDetailsModal;
