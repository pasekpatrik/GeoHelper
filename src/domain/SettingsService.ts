import { Repository } from '../storage/Repository';
import type { SettingsInterface } from '../types/SettingsInterface';

export class SettingsService {
    private repository;

    constructor() {
        this.repository = new Repository('settings');
    }

    public createSettings = (id: string, audio: boolean) => {
        const settings: SettingsInterface  = {
            id: id,
            isAudioOn: audio
        };

        this.repository.create(settings);
    }

    public getSettings = () => {
        return this.repository.findAll()[0] ?? [];
    }

    public updateSettings = (id: string, settings: SettingsInterface) => {
        this.repository.update(id, settings);
    }

    public deleteSettings = (id: string) => {
        this.repository.delete(id);
    }
}