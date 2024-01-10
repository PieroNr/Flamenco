class Width {
  set(dataArray: Uint8Array, classEffect: { class: string }[]): void {
    const flamencoElements = document.querySelectorAll(classEffect[0].class);

    console.log(flamencoElements);

    flamencoElements.forEach((element, i) => {
      // Assurer que l'élément est de type HTMLElement pour accéder aux styles
      if (!(element instanceof HTMLElement)) return;

      // Exemple : Appliquez la largeur en fonction des données d'analyse
      const min = 2;
      const max = 200;
      const scaledWidth =
        (dataArray[i * Math.round(128 / flamencoElements.length)] / 255) *
          (max - min) +
        min;
      element.style.width = `${scaledWidth}px`;
      element.style.height = `calc(100% - 20px)`;
    });
  }
}

export default Width;
