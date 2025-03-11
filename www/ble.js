import { Capacitor } from '@capacitor/core';

let BleClient;

if (Capacitor.isNativePlatform()) {
    import('@capacitor-community/bluetooth-le').then((module) => {
        BleClient = module.BleClient;
    }).catch((error) => {
        console.error('Failed to import BluetoothLE module:', error);
    });
} else {
    console.warn('Bluetooth LE is only supported on native platforms.');
}

export function changeText() {
    document.getElementById('greeting').innerText = 'Hello, JavaScript!';
}

export async function getLocation() {
    try {
        const coordinates = await Capacitor.Plugins.Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });

        document.getElementById('greeting').innerText =
            `Latitude: ${coordinates.coords.latitude}, Longitude: ${coordinates.coords.longitude}`;
    } catch (error) {
        console.error("Error getting location", error);
        document.getElementById('greeting').innerText = "Location access denied or timed out!";
    }
}

export async function initBle() {
    if (!BleClient) {
        console.error('BLE Client is not initialized or not supported in this environment.');
        return;
    }

    try {
        await BleClient.initialize();
        console.log('BLE Initialized');
    } catch (error) {
        console.error('Error initializing Bluetooth LE:', error);
    }
}

export async function scanBle() {
    if (!BleClient) {
        console.error('BLE Client is not initialized or not supported in this environment.');
        return;
    }

    try {
        await BleClient.requestLEScan({}, (result) => {
            console.log('Scan result: ', result);
        });
    } catch (error) {
        console.error('Error scanning Bluetooth LE:', error);
    }
}
