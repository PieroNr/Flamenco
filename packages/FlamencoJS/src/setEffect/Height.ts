class Height {

    set(dataArray: Uint8Array, classEffect: Array<{ name: string; class: string }>): void {

        const flamencoElements = document.querySelectorAll(classEffect[0].class);

        flamencoElements.forEach((element, i) => {
            // Exemple : Appliquez la largeur en fonction des données d'analyse
            const min = 2;
            const max = 200;
            const scaledHeight = dataArray[i * Math.round(128 / flamencoElements.length)] / 255 * (max - min) + min;
            element.style.height = `${scaledHeight}px`;

            // Exemple : Appliquez la couleur en fonction des données d'analyse
            const red = dataArray[i * Math.round(128 / flamencoElements.length)];
            const blue = 255 - red;

            element.style.backgroundColor = `rgb(${red}, 0, ${blue})`;


        });
    }

}

export default Height;