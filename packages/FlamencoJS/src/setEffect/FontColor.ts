class FontColor {
  set(dataArray: Uint8Array, classEffect: { class: string }[]): void {
    const flamencoElements = document.querySelectorAll(classEffect[0].class);

    flamencoElements.forEach((element, i) => {
      // Assurer que l'élément est de type HTMLElement pour accéder aux styles
      if (element instanceof HTMLElement) {
        // Exemple : Appliquez la couleur en fonction des données d'analyse
        const red = dataArray[i * Math.round(128 / flamencoElements.length)]; // Type inferred as number
        const blue = 255 - red; // Type inferred as number

        element.style.color = `rgb(${red}, 0, ${blue})`;
      } else if (element instanceof SVGElement) {
        // Exemple : Appliquez la couleur en fonction des données d'analyse
        const red = dataArray[i * Math.round(128 / flamencoElements.length)]; // Type inferred as number
        const blue = 255 - red; // Type inferred as number

        element.style.fill = `rgb(${red}, 0, ${blue})`;
      }else{
        return;
      }
    });
  }
}

export default FontColor;
