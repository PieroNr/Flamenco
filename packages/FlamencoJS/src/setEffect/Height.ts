class Height {

  set(dataArray: Uint8Array, classEffect: { class: string }[]): void {
    const flamencoElements = document.querySelectorAll(classEffect[0].class);

    flamencoElements.forEach((element, i) => {
      // Assurer que l'élément est de type HTMLElement pour accéder aux styles
      if (!(element instanceof HTMLElement)) return;

      // Exemple : Appliquez la hauteur en fonction des données d'analyse
      const min = 2; // Type inferred as number
      const max = 200; // Type inferred as number
      const scaledHeight = dataArray[i * Math.round(128 / flamencoElements.length)] / 255 * (max - min) + min;
      element.style.height = `${scaledHeight}px`;
    });
  }
}

export default Height;