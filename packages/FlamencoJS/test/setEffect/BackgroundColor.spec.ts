import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import BackgroundColor from '../../src/effects/Background';

describe('BackgroundColor', function() {
  let backgroundColor: BackgroundColor;

  before(function() {
    // Configure jsdom avant d'initialiser votre classe de test
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    global.document = dom.window.document;
    global.window = dom.window;
  });

  beforeEach(function() {
    backgroundColor = new BackgroundColor();
  });

  after(function() {
    // Nettoyez jsdom après avoir exécuté tous les tests
    delete global.document;
    delete global.window;
  });

  it('should set background color correctly', function() {
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
    backgroundColor.set(new Uint8Array([100, 150]), [{ class: '.test-element' }]);

    // Vérifier si les styles ont été appliqués correctement
    const style1 = window.getComputedStyle(childElement1);
    const style2 = window.getComputedStyle(childElement2);

    expect(style1.backgroundColor).to.equal('rgb(100, 0, 155)');
    expect(style2.backgroundColor).to.equal('rgb(100, 0, 155)');
  });
});