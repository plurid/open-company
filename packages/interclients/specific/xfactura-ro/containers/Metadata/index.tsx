import {
    Metadata,
} from '../../data';

import Input from '../../components/Input';
import Datepicker from '../../components/Datepicker';



export default function Metadata({
    metadata,
    updateMetadata,
    updateDate,
} : {
    metadata: Metadata,
    updateMetadata: (
        type: keyof Metadata,
        value: string | number,
    ) => void,
    updateDate: (
        kind: 'issueDate' | 'dueDate',
        timestamp: number,
    ) => void,
}) {
    return (
        <div
            className="grid place-content-center p-8"
        >
            <Input
                text="număr factură"
                value={metadata.number}
                setValue={(value) => updateMetadata('number', value)}
            />

            <Input
                text="monedă"
                value={metadata.currency}
                setValue={(value) => updateMetadata('currency', value)}
            />

            <Datepicker
                text="dată emitere"
                atSelect={(value) => updateDate('issueDate', value)}
            />

            <Datepicker
                text="dată scadență"
                atSelect={(value) => updateDate('dueDate', value)}
            />
        </div>
    );
}
