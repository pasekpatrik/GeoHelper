import './Settings.css';
import Page from '../Page';
import { SettingsService } from '../../service/SettingsService';
import type { SettingsInterface } from '../../types/SettingsInterface';

export class Settings extends Page {
    private settinsService = new SettingsService();
    private settings: SettingsInterface | undefined;

    constructor(key: string, title: string, element: HTMLElement) {
        super(key, title, element)
    }

    private initSettings = () => {
        this.settings = this.settinsService.getSettings();
    }

    protected override handleGlobalChange(event: Event): void {
        const target = event.target as HTMLElement;

        if (target.closest('#custom-checkbox-input')) {
            const update: SettingsInterface = {
                id: '1',
                isAudioOn: !this.settings?.isAudioOn
            }

            this.settinsService.updateSettings('1', update);
        }

        this.initSettings();
    }

    override render = () => {
        this.initSettings();

        return `
            <section class="ps-4 py-4">

                <div class="flex items-center gap-2">
                    Audio: 
                    <input
                        id="custom-checkbox-input" 
                        type="checkbox"
                        ${this.settings?.isAudioOn ? 'checked' : ''}
                    >
	                <label id="custom-checkbox" for="custom-checkbox-input"></label>
                </div>
                
            </section>
        `;
    }
}