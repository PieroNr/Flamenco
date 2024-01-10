import { expect } from 'chai';
import Height from '../../src/setEffect/Height';

describe('Height', function() {
    let height: Height;

    beforeEach(function() {
        height = new Height();
    });

    it('should set height correctly', function() {
        // Créer des éléments factices pour les tests
        const container = document.createElement('div');
        const childElement1 = document.createElement('div');
        const childElement2 = document.createElement('div');

        container.classList.add('test-container');
        childElement1.classList.add('test-element');
        childElement2.classList.add('test-element');

        container.appendChild(childElement1);
        container.appendChild(childElement2);

        // Appliquer l'effet
        height.set(new Uint8Array([100, 150]), [{ class: '.test-element' }]);

        // Vérifier si les styles ont été appliqués correctement
        const style1 = window.getComputedStyle(childElement1);
        const style2 = window.getComputedStyle(childElement2);

        expect(style1.height).to.equal('60px');  // Assurez-vous d'ajuster cette valeur en fonction de votre implémentation spécifique
        expect(style2.height).to.equal('90px');  // Assurez-vous d'ajuster cette valeur en fonction de votre implémentation spécifique
    });
});