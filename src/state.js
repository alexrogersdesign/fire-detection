const state = {
    initial: "initial",
    states: {
      initial: { on: { next: "loadingModel" } },
      loadingModel: { on: { next: "modelReady" } },
      modelReady: { on: { next: "imageReady" } },
      imageReady: { on: { next: "identifying" }, showImage: true },
      identifying: { on: { next: "complete" } },
      complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
    }
  };
export default state; 