import { COLORS } from '../config.js';
import { SaveManager } from '../save/SaveManager.js';

export class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SettingsScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const centerX = width / 2;

        // Background
        this.add.rectangle(centerX, height / 2, width, height, COLORS.BACKGROUND);

        // Header
        const headerBg = this.add.rectangle(centerX, 80, width, 120, COLORS.UI_DARK, 0.9);
        headerBg.setStrokeStyle(2, COLORS.UI_LIGHT);

        this.add.text(centerX, 40, '⚙ SETTINGS', {
            fontSize: '36px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5);

        // Back button
        this.createBackButton(50, 40, () => {
            this.cameras.main.fade(400);
            this.time.delayedCall(400, () => this.scene.start('MainMenuScene'));
        });

        const settings = SaveManager.getSettings();
        const startY = 160;
        const spacing = 120;

        // Music Volume
        this.createVolumeSlider(centerX, startY, 'Music Volume 🎵', settings.musicVolume, (value) => {
            settings.musicVolume = value;
        });

        // Sound Effects Volume
        this.createVolumeSlider(centerX, startY + spacing, 'Sound Effects 🔊', settings.soundVolume, (value) => {
            settings.soundVolume = value;
        });

        // Dark Mode toggle
        this.createToggle(centerX, startY + spacing * 2, 'Dark Mode 🌙', settings.darkMode, (value) => {
            settings.darkMode = value;
        });

        // Notifications toggle
        this.createToggle(centerX, startY + spacing * 3, 'Notifications 🔔', settings.notifications, (value) => {
            settings.notifications = value;
        });

        // Graphics Quality
        this.createDropdown(centerX, startY + spacing * 4, 'Graphics Quality', settings.graphicsQuality, ['Low', 'Medium', 'High'], (value) => {
            settings.graphicsQuality = value;
        });

        // Language
        this.createDropdown(centerX, startY + spacing * 5, 'Language', settings.language, ['English', 'Spanish', 'French'], (value) => {
            settings.language = value;
        });

        // Reset Progress button
        this.createDangerButton(centerX, startY + spacing * 6.5, 'RESET PROGRESS', () => {
            if (confirm('Are you sure? This cannot be undone!')) {
                SaveManager.resetProgress();
                this.scene.start('MainMenuScene');
            }
        });

        // Save Settings
        SaveManager.updateSettings(settings);
    }

    createVolumeSlider(x, y, label, value, onChange) {
        this.add.text(x - 300, y - 20, label, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        // Slider background
        const sliderBg = this.add.rectangle(x + 100, y, 300, 20, 0x333333);
        sliderBg.setStrokeStyle(2, 0x16c784);

        // Slider fill
        const sliderFill = this.add.rectangle(x - 50 + value * 300, y, value * 300, 20, 0x16c784);
        sliderFill.setOrigin(0, 0.5);

        // Slider handle
        const handle = this.add.circle(x - 50 + value * 300, y, 15, 0x20d997);
        handle.setInteractive({ useHandCursor: true, draggable: true });

        this.input.setDraggable(handle);

        this.input.on('drag', (pointer, gameObject) => {
            if (gameObject !== handle) return;

            let newX = pointer.x;
            newX = Phaser.Math.Clamp(newX, x - 50, x + 250);

            const newValue = (newX - (x - 50)) / 300;
            handle.x = newX;
            sliderFill.width = newValue * 300;

            onChange(newValue);
        });

        this.add.text(x + 280, y - 20, Math.round(value * 100) + '%', {
            fontSize: '18px',
            fill: '#FFD700',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);
    }

    createToggle(x, y, label, value, onChange) {
        this.add.text(x - 300, y - 20, label, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        const toggleBg = this.add.rectangle(x + 100, y, 80, 40, value ? 0x16c784 : 0x555555);
        toggleBg.setStrokeStyle(2, 0xFFFFFF);
        toggleBg.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                value = !value;
                toggleBg.setFillStyle(value ? 0x16c784 : 0x555555);
                onChange(value);
            });

        this.add.text(x + 100, y, value ? 'ON' : 'OFF', {
            fontSize: '18px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }

    createDropdown(x, y, label, currentValue, options, onChange) {
        this.add.text(x - 300, y - 20, label, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold'
        }).setOrigin(0, 0.5);

        const dropdownBg = this.add.rectangle(x + 100, y, 150, 40, 0x333333);
        dropdownBg.setStrokeStyle(2, 0x16c784);

        const textDisplay = this.add.text(x + 100, y, currentValue, {
            fontSize: '18px',
            fill: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);

        let isOpen = false;

        dropdownBg.setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                isOpen = !isOpen;
                if (isOpen) {
                    options.forEach((option, index) => {
                        const optionBg = this.add.rectangle(x + 100, y + 50 + index * 40, 150, 35, 0x16c784, 0.8);
                        optionBg.setStrokeStyle(1, 0xFFFFFF);
                        optionBg.setInteractive({ useHandCursor: true })
                            .on('pointerdown', () => {
                                textDisplay.setText(option);
                                onChange(option.toLowerCase());
                                isOpen = false;
                                optionBg.destroy();
                            });

                        this.add.text(x + 100, y + 50 + index * 40, option, {
                            fontSize: '16px',
                            fill: '#FFFFFF',
                            align: 'center'
                        }).setOrigin(0.5).setDepth(1);
                    });
                }
            });
    }

    createDangerButton(x, y, text, callback) {
        const btn = this.add.rectangle(x, y, 400, 60, 0xFF4444, 0.8);
        btn.setStrokeStyle(2, 0xFFFFFF);
        btn.setInteractive({ useHandCursor: true })
            .on('pointerover', () => btn.setFillStyle(0xFF6666))
            .on('pointerout', () => btn.setFillStyle(0xFF4444))
            .on('pointerdown', callback);

        this.add.text(x, y, text, {
            fontSize: '20px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }

    createBackButton(x, y, callback) {
        const btn = this.add.rectangle(x, y, 80, 50, 0x16c784, 0.8);
        btn.setStrokeStyle(2, 0xFFFFFF);
        btn.setInteractive({ useHandCursor: true })
            .on('pointerover', () => btn.setFillStyle(0x20d997))
            .on('pointerout', () => btn.setFillStyle(0x16c784))
            .on('pointerdown', callback);

        this.add.text(x, y, '← BACK', {
            fontSize: '14px',
            fill: '#FFFFFF',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5).setDepth(1);
    }
}
