# FlamencoJS

FlamencoJS is a TypeScript library for creating dynamic web element animations that synchronize with music. It's designed to make your web projects come alive with rhythm, movement, and color in response to your selected music.

## Features

- Beat and rhythm sensing for precise synchronization.
- Customizable animations to suit your project's style.
- Color synchronization for a holistic sensory experience.
- Simple integration into your web projects.
- Compatibility with major web platforms and browsers.

## Installation

You can install FlamencoJS via npm:

```bash
npm i @flamencojs/flamencojs
```

## Overview

```js
//import FlamencoJS in your project
import Flamenco from "@flamencojs/flamencojs";

//Create a new instance of FlamencoJS
const flamenco = new Flamenco();

//Set your music file
flamenco.setMusic("your/sound.mp3");
//or 
//flamenco.setMusic("https://your/sound.mp3");

// function to start the music
flamenco.start();

//function to stop the music
flamenco.stop();

//activate effects
flamenco.setEffect("Color", ".className");
```

## Features

In this implementation, the classes "Color", "Width", "Height", and "Background" are designed to dynamically alter the state of HTML elements in response to certain triggers, such as the beats of music. Each class has a specific function:

- Color: This class is used to change the color of an element's text. The color change is responsive to certain triggers, such as the bass of the music. This creates a visual effect where the text color shifts in sync with the musical elements, providing an interactive and engaging user experience.

```ts
flamenco.setEffect("Color", ".className");
```

- Width: Similar in concept to the "Color" class, the "Width" class modifies the width of an element. This means that the element’s width will change in response to the specified triggers, such as the rhythm or intensity of the music. This can create a dynamic visual effect where the element expands or contracts in accordance with the audio stimuli.

```ts
flamenco.setEffect("Width", ".className");
```

- Height: This class functions similarly to the "Width" class but targets the height of the element instead. By altering the height in response to certain triggers, it adds another dimension of interactivity. For instance, an element might grow taller or shorter in alignment with specific aspects of the music, such as volume or pitch.

```ts
flamenco.setEffect("Height", ".className");
```

- Background: The "Background" class is used to change the background properties of an element. This could involve altering the background color, adding a background image, or even animating the background in response to the music. The idea is to enhance the visual appeal of the element by making its background dynamic and responsive to external inputs.

```ts
flamenco.setEffect("Background", ".className");
```

Each of these classes is designed to provide a unique and interactive way to visually represent changes in response to music or other triggers, enhancing the user experience by making the webpage more lively and responsive to auditory cues.

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/PieroNr/Flamenco/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Report Issues](https://github.com/PieroNr/Flamenco/issues)**: Submit bugs found or log feature requests for Flamenco.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/PieroNr/Flamenco.git
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## License

This project is protected under the Apache-2.0 License. For more details, refer to the [LICENSE](LICENSE) file.

---

## Acknowledgments

This project was developed as part of the IIM Digital School's 2023 class project.
Developers:
- [PieroNr](https://github.com/PieroNr)
- [Adrien24](https://github.com/Adrien24)

[**Return**](#-quick-links)

---
