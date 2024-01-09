import { API, BlockTool, BlockToolData, ToolConfig } from "@editorjs/editorjs";
import Katex from "katex";

interface PluginFormulaData extends BlockToolData {
  latex: string;
}

interface PluginFormulaOptions {
  api: API;
  config?: ToolConfig;
  data?: PluginFormulaData;
}

export default class PluginFormula implements BlockTool {
  container: HTMLDivElement;
  preview: HTMLParagraphElement;
  input: HTMLInputElement;

  constructor({ data }: PluginFormulaOptions) {
    // create elements
    this.container = document.createElement("div");
    this.container.classList.add("plugin-formula-container");

    this.preview = document.createElement("p");
    this.preview.classList.add("plugin-formula-preview");

    this.input = document.createElement("input");
    this.input.classList.add("cdx-input");
    this.input.placeholder = "Insert LaTex equation...";

    // input event
    this.input.addEventListener("keyup", () => {
      this._renderKatex();
    });

    if (data) {
      this.input.value = data.latex;
      this._renderKatex();
    }
  }

  static get toolbox() {
    return {
      title: "Block Formula",
    };
  }

  save(block: HTMLElement) {
    return {
      latex: this.input.value,
    };
  }

  render(): HTMLElement {
    console.log("render: block formula called");

    this.container.appendChild(this.preview);
    this.container.appendChild(this.input);

    return this.container;
  }

  _renderKatex(): void {
    const tex = this.input.value;

    Katex.render(tex, this.preview, {
      throwOnError: false,
      displayMode: true,
    });
  }
}
