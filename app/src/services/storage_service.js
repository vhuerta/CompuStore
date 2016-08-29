/**
 * Servicio para el almacenamiento
 * 
 * Guarda y recupera los valores indicados del storage configurado, 
 * puede ser localStorage o sessionStorage
 *
 * @author Victor Huerta <vhuertahnz@gmail.com>
 */

export class StorageService {

    storage = 'localStorage';

    constructor(config) {
        this.storage = this._getStorage(this.storage);
    }

    get(key) {
        return this.storage.getItem(key);
    }

    set(key, value) {
        return this.storage.setItem(key, value);
    }

    remove(key) {
        return this.storage.removeItem(key);
    }

    _getStorage(type) {
        if(type === 'localStorage') {
            if('localStorage' in window && window.localStorage !== null) return localStorage;
            throw new Error('Local Storage is disabled or unavailable.');
        } else if(type === 'sessionStorage') {
            if('sessionStorage' in window && window.sessionStorage !== null) return sessionStorage;
            throw new Error('Session Storage is disabled or unavailable.');
        }

        throw new Error('Invalid storage type specified: ' + type);
    }
}
