import { expect } from 'chai';
import Width from '../../src/effects/Width';

describe('Width', function() {
  let width: Width;

  beforeEach(function() {
    width = new Width();
  });

  it('should set width correctly', function() {
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
    width.set(new Uint8Array([100, 150]), [{ class: '.test-element' }]);

    // Vérifier si les styles ont été appliqués correctement
    const style1 = window.getComputedStyle(childElement1);
    const style2 = window.getComputedStyle(childElement2);

    expect(style1.width).to.equal('60px');  // Assurez-vous d'ajuster cette valeur en fonction de votre implémentation spécifique
    expect(style2.width).to.equal('90px');  // Assurez-vous d'ajuster cette valeur en fonction de votre implémentation spécifique
  });
});