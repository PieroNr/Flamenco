## Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **TypeScript**: `version x.y.z`

### Installation

1. Clone the Flamenco repository:

```sh
git clone https://github.com/PieroNr/Flamenco.git
```

2. Change to the project directory:

```sh
cd Flamenco
```

3. Install the dependencies:

```sh
npm install
```

### Running Flamenco

Use the following command to run Flamenco:

```sh
npm run build && node dist/main.js
```

## Overview

```js
//import FlamencoJS in your project
import Flamenco from "@flamencojs/flamencojs";

//Create a new instance of FlamencoJS
const flamenco = new Flamenco();

//Set your music file
flamenco.setMusic("sound/freeze.mp3");

// function to start the music
flamenco.start();

//function to stop the music
flamenco.stop();
```

## Features

In this implementation, the classes "Color", "Width", "Height", and "Background" are designed to dynamically alter the state of HTML elements in response to certain triggers, such as the beats of music. Each class has a specific function:

- Color: This class is used to change the color of an element's text. The color change is responsive to certain triggers, such as the bass of the music. This creates a visual effect where the text color shifts in sync with the musical elements, providing an interactive and engaging user experience.

```html
<h1 class="Color"></h1>
```

- Width: Similar in concept to the "Color" class, the "Width" class modifies the width of an element. This means that the element’s width will change in response to the specified triggers, such as the rhythm or intensity of the music. This can create a dynamic visual effect where the element expands or contracts in accordance with the audio stimuli.

```html
<div class="Width"></div>
```

- Height: This class functions similarly to the "Width" class but targets the height of the element instead. By altering the height in response to certain triggers, it adds another dimension of interactivity. For instance, an element might grow taller or shorter in alignment with specific aspects of the music, such as volume or pitch.

```html
<div class="Height"></div>
```

- Background: The "Background" class is used to change the background properties of an element. This could involve altering the background color, adding a background image, or even animating the background in response to the music. The idea is to enhance the visual appeal of the element by making its background dynamic and responsive to external inputs.

```html
<div class="Background"></div>
```

Each of these classes is designed to provide a unique and interactive way to visually represent changes in response to music or other triggers, enhancing the user experience by making the webpage more lively and responsive to auditory cues.

## Repository Structure

```sh
└── Flamenco/
    ├── .github
    │   └── workflows
    │       └── main.yml
    ├── package-lock.json
    ├── package.json
    ├── packages
    │   ├── demo
    │   │   ├── index.html
    │   │   ├── package.json
    │   │   ├── public
    │   │   ├── src
    │   │   ├── tsconfig.json
    │   │   ├── tsconfig.node.json
    │   │   └── vite.config.ts
    │   └── FlamencoJS
    │       ├── .eslintrc.json
    │       ├── package-lock.json
    │       ├── package.json
    │       ├── src
    │       ├── test
    │       └── tsconfig.json
    ├── pnpm-lock.yaml
    └── pnpm-workspace.yaml
```

## Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github/PieroNr/Flamenco.git/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github/PieroNr/Flamenco.git/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github/PieroNr/Flamenco.git/issues)**: Submit bugs found or log feature requests for Flamenco.

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

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
