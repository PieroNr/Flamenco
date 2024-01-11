class Width {
  set(dataArray: Uint8Array, classEffect: { class: string }[]): void {
    const flamencoElements = document.querySelectorAll(classEffect[0].class);


    flamencoElements.forEach((element, i) => {
      // Vérifiez si l'élément est un HTMLElement
      if (element instanceof HTMLElement) {

        // Appliquez la largeur en fonction des données d'analyse pour les éléments HTML
        const min = 2;
        const max = 200;
        const scaledWidth =
          (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
            (max - min) +
          min;

        element.style.width = `${scaledWidth}px`;
      } else if (element instanceof SVGElement) {
        // Appliquez la largeur en fonction des données d'analyse pour les éléments HTML
        const min = 2;
        const max = 200;
        const scaledWidth =
          (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
            (max - min) +
          min;

        element.style.width = `${scaledWidth}px`;
      }else{
        return;
      }
    });
  }
}

export default Width;
