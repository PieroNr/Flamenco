class Width {

    set(dataArray: number[], classEffect: { class: string }[]): void {
        const flamencoElements = document.querySelectorAll(classEffect[0].class);

        flamencoElements.forEach((element, i) => {
            // Assurer que l'élément est de type HTMLElement pour accéder aux styles
            if (!(element instanceof HTMLElement)) return;

            // Exemple : Appliquez la largeur en fonction des données d'analyse
            const min = 2;
            const max = 200;
            const scaledWidth = dataArray[i * Math.round(128 / flamencoElements.length)] / 255 * (max - min) + min;
            element.style.width = `${scaledWidth}px`;
            element.style.height = `100px`;

            // Exemple : Appliquez la couleur en fonction des données d'analyse
            const red = dataArray[i * Math.round(128 / flamencoElements.length)];
            const blue = 255 - red;
            element.style.backgroundColor = `rgb(${red}, 0, ${blue})`;
        });
    }


}

export default Width;