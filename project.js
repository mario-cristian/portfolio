var mainArea, projectArea;
var categoriesArea, categoryTag, categoryProjectsArea;
var projectCard;

var projectTitle, projectTechnologies, projectDescription;
var projectImagesArea,
  projectImages,
  projectImplementationArea,
  projectGithub,
  projectCode,
  projectExternal,
  modalProjectCode,
  codeFontSizeLabel,
  codeFontSizeRange;

class Project {
  constructor(
    title,
    category,
    technologies,
    description,
    github,
    link,
    code,
    images
  ) {
    this.title = title;
    this.category = category;
    this.technologies = technologies;
    this.description = description;
    this.github = github;
    this.link = link;
    this.code = code;
    this.images = images;
  }
}

$(document).ready(function () {
  mainArea = $("#mainArea");
  projectArea = $("#projectArea");
  categoriesArea = $("#categoriesArea");
  categoryTag = $("#categoryTag");
  categoryProjectsArea = $("#categoryProjectsArea");
  projectCard = $("#projectCard");

  projectTitle = $("#projectTitle");
  projectTechnologies = $("#projectTechnologies");
  projectDescription = $("#projectDescription");
  projectImagesArea = $("#projectImagesArea");
  projectImages = $("#projectImages");
  projectImplementationArea = $("#projectImplementationArea");
  projectGithub = $("#projectGithub");
  projectCode = $("#projectCode");
  projectExternal = $("#projectExternal");
  modalProjectCode = $("#modalProjectCode");
  codeFontSizeLabel = $("#codeFontSizeLabel");
  codeFontSizeRange = $("#codeFontSizeRange");
});

function displayTechnologies(projectId, technologiesArea) {
  let technologyBadge = $(technologiesArea).children().eq(0);

  for (let i = 0; i < projects[projectId].technologies.length; i++) {
    let aux = technologyBadge.clone();
    aux.text(projects[projectId].technologies[i].name);
    aux.css("background-color", projects[projectId].technologies[i].color);
    if (i < projects[projectId].technologies.length - 1) aux.addClass("me-1");
    aux.attr("hidden", false);

    if (i == 0) technologiesArea.empty();

    technologiesArea.append(aux);
  }
}

function displayCategoryProjects(projectCategory) {
  let projectsArea = $("#" + projectCategory.replaceAll(" ", "") + "Area");
  for (let i = 0; i < projects.length; i++) {
    if (projects[i].category === projectCategory) {
      let aux = projectCard.clone();
      aux.attr(
        "id",
        projects[i].title
          .replaceAll(" ", "")
          .replaceAll("(", "")
          .replaceAll(")", "")
      );
      aux.children().eq(0).children().eq(0).text(projects[i].title);
      aux.on("click", function (event) {
        let target = $(event.currentTarget);
        let aux = target.clone();
        aux.css({
          position: "absolute",
          top: target.offset().top,
          left: target.offset().left,
        });
        mainArea.append(aux);
        aux.animate(
          {
            top: "-=" + target.offset().top,
            left: "0",
            width: "+=" + ($(document).width() - target.width() - 5),
          },
          300,
          function () {
            mainArea.attr("hidden", true);

            projectTitle.text(projects[i].title);
            projectDescription.html(projects[i].description);
            if (projects[i].images != null) {
              let imageAux = projectImages.children().eq(0).clone();
              projectImages.empty();
              projectImagesArea.attr("hidden", false);
              for (let j = 0; j < projects[i].images.length; j++) {
                imageAux.attr("hidden", false);
                imageAux.attr("src", projects[i].images[j]);
                projectImages.append(imageAux);
                imageAux = projectImages.children().eq(0).clone();
              }
            } else projectImagesArea.attr("hidden", true);

            projectImplementationArea.removeClass("d-flex");
            projectImplementationArea.addClass("d-none");
            if (projects[i].github != null) {
              projectGithub.attr("href", projects[i].github);
              projectGithub.attr("hidden", false);
              projectImplementationArea.removeClass("d-none");
              projectImplementationArea.addClass("d-flex");
            } else projectGithub.attr("hidden", true);
            if (projects[i].code != null) {
              if (typeof projects[i].code !== "object") {
                projectCode.attr("data-code", "#" + projects[i].code);
                projectCode.removeClass("d-none");
                projectCode.addClass("d-flex");
                projectImplementationArea.removeClass("d-none");
                projectImplementationArea.addClass("d-flex");
              } else {
                let codesArea = projectCode.parent();
                projectCode.removeClass("d-flex");
                projectCode.addClass("d-none");
                for (let j = 0; j < projects[i].code.length; j++) {
                  codesArea.append("<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modalCode'>" + projects[i].code[j][0] + "</button>");
                }
              }
              projectImplementationArea.removeClass("d-none");
              projectImplementationArea.addClass("d-flex");
            } else {
              projectCode.removeClass("d-flex");
              projectCode.addClass("d-none");
            }
            if (projects[i].link != null) {
              projectExternal.attr("href", projects[i].link);
              projectExternal.attr("hidden", false);
              projectImplementationArea.removeClass("d-none");
              projectImplementationArea.addClass("d-flex");
            } else projectExternal.attr("hidden", true);

            displayTechnologies(i, projectTechnologies);
            aux.remove();

            projectArea.attr("hidden", false);
          }
        );
      });
      aux.attr("hidden", false);
      projectsArea.append(aux);

      let technologiesArea = $(
        "#" +
          projects[i].title
            .replaceAll(" ", "")
            .replaceAll("(", "")
            .replaceAll(")", "")
      )
        .children()
        .eq(1)
        .children()
        .eq(0);

      displayTechnologies(i, technologiesArea);
    }
  }
}

function displayCategories() {
  for (let i = 0; i < projectCategories.length; i++) {
    let aux = categoryTag.clone();
    aux.text(projectCategories[i]);
    aux.attr("id", projectCategories[i].replaceAll(" ", ""));
    aux.attr("hidden", false);
    categoriesArea.append(aux);

    aux = categoryProjectsArea.clone();
    aux.attr("id", projectCategories[i].replaceAll(" ", "") + "Area");
    aux.removeClass("d-none");
    aux.addClass("d-flex");
    categoriesArea.append(aux);

    displayCategoryProjects(projectCategories[i]);
  }
}

function updateProjectCode(event) {
  let target = $(event.target);

  if (target[0].localName === "path") target = target.parent();
  if (target[0].localName === "svg") target = target.parent();
  if (target[0].localName === "span" && !target.hasClass("badge"))
    target = target.parent();

  modalProjectCode.html($(target.attr("data-code")).html());
}

function changeCodeFontSize(event) {
  codeFontSizeLabel.text("Font size: " + event.target.valueAsNumber + "px");
  modalProjectCode.css("font-size", event.target.valueAsNumber);
}

function backToPortfolio() {
  projectArea.attr("hidden", true);
  mainArea.attr("hidden", false);

  let codesArea = projectCode.parent();
  if (codesArea.children().length > 4) {
    while (codesArea.children().length > 4) {
      codesArea.children().eq(4).remove();
    }
  }
}

function updateCodeFontSize() {
  let fontSize = window.getComputedStyle(projectCode[0]).fontSize;
  codeFontSizeLabel.text("Font size: " + fontSize);
  codeFontSizeRange.val(parseInt(fontSize));
  modalProjectCode.css("font-size", fontSize);
}

function displayProjects() {
  displayCategories();
  updateCodeFontSize();
}

$(window).on("resize", function () {
  updateCodeFontSize();
});

const projectCategories = [
  "Machine Learning",
  "Bachelor Graduation Project",
  "Interactive",
  "Artificial Intelligence Algorithms",
  "Geometry",
  "Desktop Applications",
];

const projects = [
  new Project(
    "LLM from scratch with character tokenization",
    "Machine Learning",
    [getCategory("PyTorch")],
    "Key features <ul><li>Character tokenization</li><li>Batch sampling without replacement</li><li>Positional encoding</li><li>Causal self-attention</li><li>Multi-head attention</li><li>Residual / skip connections</li><li>Layer normalization</li><li>Flash attention</li><li>Clip the global norm of the gradients</li><li>Learning scheduler: cosine decay with warm-up</li><li>Weight decay</li><li>Gradient accumulation</li></ul>",
    null,
    "LLM-character-tokenization/index.html",
    null,
    null
  ),
  new Project(
    "Physics simulations controlled by hand gestures using web camera",
    "Bachelor Graduation Project",
    [
      getCategory("MediaPipe"),
      getCategory("OpenCV"),
      getCategory("Django"),
      getCategory("Web Sockets"),
      getCategory("Bootstrap"),
      getCategory("jQuery"),
      getCategory("AJAX"),
    ],
    "I implemented a web application with physics simulations (density, laws of motion) to help students understand physics better. There are specific actions in each simulation that can be done by interacting with the mouse. These same actions can be done by using the web camera as I built a model that recognizes gestures that user is doing and convert it into an action in the simulation. The videostream from the camera that is recording on the web is sent to the backend via web sockets. In the Python backend the model classify the gesture and sends back the result. Each user is able to fine tune the model they use to recognize gestures.",
    null,
    null,
    null,
    null
  ),
  new Project(
    "Neural Network from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I have built a neural network model from scratch using as optimizers: <b>gradient descent</b> and <b>gradient descent with momentum</b>. I implemented 3 activation functions and their derivatives for the hidden layers: <b>ReLU</b>, <b>Leaky ReLU</b> and <b>tanh</b> and for the last layer <b>softmax</b>. The loss function that I used is <b>mean squared error (MSE)</b>. I also implemented the <b>batch standardization (to make the mean equal with 0 and standard deviation with 1)</b> feature. I can also save the weight and biases to a .txt file and later on to load the same model.",
    null,
    null,
    "neuralNetworkCode",
    null
  ),
  new Project(
    "Gaussian Mixture Model (GMM) with Expectation-Maximization (EM) from scratch",
    "Machine Learning",
    [
      getCategory("Python"),
      getCategory("NumPy"),
      getCategory("SciPy"),
      getCategory("Clustering"),
    ],
    "I have implemented this clustering model from scratch where the <b>expectation step</b> estimates probabilities of data belonging to each Gaussian and the <b>maximization step</b> updates the parameters <b>(means, variances and weights)</b> in order to maximize the likelihood until either <b>max iterations</b> or <b>tolerance</b> stopping criteria is fulfilled.",
    null,
    null,
    "GMMCode",
    null
  ),
  new Project(
    "Boids Algorithm",
    "Interactive",
    [
      getCategory("jQuery"),
      getCategory("Bootstrap"),
      getCategory("Linear Algebra"),
    ],
    "A boid algorithm simulation that models the flocking behavior of birds using simple rules: <b>separation</b>, <b>alignment</b>, and <b>cohesion</b>. Each boid moves autonomously, adjusting its velocity based on nearby boids.",
    null,
    "boids-algorithm/index.html",
    null,
    ["projects/boids-algorithm.png"]
  ),
  new Project(
    "Linear Regression from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I made a linear regression model from scratch. As optimizers I implemented: <b>normal equation</b> and <b>gradient descent</b>. For gradient descent I also implemented the <b>L1</b> and <b>L2</b> regularizations and these stopping criterias: <b>tolerance</b> and <b>maximum number of iterations</b>.",
    null,
    null,
    "linearRegressionCode",
    null
  ),
  new Project(
    "Logistic Regression from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I built this classification model from scratch implementing these optimizers: <b>gradient ascent</b> and <b>Newton's method</b>. I implemented the <b>sigmoid</b> function to convert numbers to (0, 1) interval. As loss function I used <b>log loss</b>. For the gradient ascent optimizer I implemented these stopping criterias: <b>maximum iterations</b> and <b>tolerance</b>.",
    null,
    null,
    "logisticRegressionCode",
    null
  ),
  new Project(
    "Gaussian Naive Bayes from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I built this Gaussian Naive Bayes model from scratch calculating the probability of each class using <b>Bayes' theorem</b>. For each class I model feature <b>likelihoods</b> with <b>Gaussian distributions</b>. The class with the highest posterior probability is returned by the model.",
    null,
    null,
    "gaussianNaiveBayesCode",
    null
  ),
  new Project(
    "Decision Tree from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I have built this decision tree model from scratch. In a decision tree data is splitted into branches based on features. <b>Entropy</b> is used to measure the impurity in data and <b>information gain</b> is what it is used to evaluate how well a split reduces entropy. The <b>best split</b> maximizes information gain.",
    null,
    null,
    "decisionTreeCode",
    null
  ),
  new Project(
    "Random Forest from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I have built this random forest model from scratch by ensembling multiple decision tree models.",
    null,
    null,
    "randomForestCode",
    null
  ),
  new Project(
    "K-Nearest Neighbor with PCA - face recognition from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("OpenCV"), getCategory("NumPy")],
    "PCA is a <b>dimensionality reduction</b> technique that extracts the key features from the photos. Then, using the K-Nearest Neighbor model that I implemented from scratch I classify them by comparing them to the closest labeled examples.",
    null,
    null,
    "kNearestNeighboursCode",
    null
  ),
  new Project(
    "K-Means from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy"), getCategory("Clustering")],
    "I have implemented this clustering model in 2 alternatives. The first alternative consists in running the steps in this order: <b>calculate the centroids</b> and then <b>regroup the points</b> and the second alternative consists in the same steps but in reverse order.",
    null,
    null,
    "KMeansCode",
    null
  ),
  new Project(
    "Search Engine from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "I implemented this search engine from scratch using these algorithms that rank the documents by relevance: <b>Term Frequency (TF)</b>, <b>Term Frequency - Inverse Document Frequency (TF-IDF)</b> and <b>Okapi BM (Best Matching)</b>. I also used <b>cosine similarity</b> to assess similarity between documents.",
    null,
    null,
    "searchEngineCode",
    null
  ),
  new Project(
    "Householder and Givens Transformations from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "Householder and Givens transformations are orthogonal matrix techniques for QR decomposition. Both simplify linear algebra computations like solving systems and eigenvalue problems.",
    null,
    null,
    "householderGivensCode",
    null
  ),
  new Project(
    "Kaczmarz Method from scratch",
    "Machine Learning",
    [getCategory("Python"), getCategory("NumPy")],
    "Kaczmars's method is an iterative algorithm for solving linear systems. It projects the solution estimate onto the hyperplane defined by each equation, updating row-by-row and this is gradually converging to the solution.",
    null,
    null,
    "kaczmarzCode",
    null
  ),
  new Project(
    "Hill Climbing",
    "Artificial Intelligence Algorithms",
    [getCategory("JavaScript")],
    "Hill climbing is an <b>optimization algorithm</b> that moves towards better solutions by <b>evaluating neighbors</b>. At each iteration, the neighbor with the highest improvement is selected. The algorithm stops when no better neigbor is found, potentially getting stuck in local optima as it doesn't consider global exploration.",
    null,
    null,
    "hillClimbingCode",
    null
  ),
  new Project(
    "Simulated Annealing",
    "Artificial Intelligence Algorithms",
    [getCategory("JavaScript")],
    "Simulated annealing is an <b>optimization algorithm</b> that is exploring solutions by accepting both better and, sometimes, worse solutions based on a probability that decreases over time (the <b>temperature</b> parameter). Choosing a worse solution helps escape local optima as it gradually focuses on the global optimum.",
    null,
    null,
    "simulatedAnnealingCode",
    null
  ),
  new Project(
    "Genetic Algorithm",
    "Artificial Intelligence Algorithms",
    [getCategory("JavaScript")],
    "This genetic algorithm is an <b>optimization algorithm</b> that evolves solutions through <b>selection</b> (choosing the <b>fittest</b>), crossover (<b>combining parents</b>) and <b>mutation</b> (randomly introducing random changes). Over generations, the population improves toward optimal or near-optimal solutions based on a defined <b>fitness function</b>.",
    null,
    null,
    "geneticAlgorithmCode",
    null
  ),
  new Project(
    "eEvent",
    "Desktop Applications",
    [getCategory("Java")],
    "This is an application that I built in order to keep track of events.",
    "https://github.com/corsimar/eEvent",
    null,
    null,
    ["projects/eevent.png"]
  ),
  new Project(
    "Point inside or outside a simple polygon",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs if a point that I draw is inside a simple polygon.",
    "https://github.com/corsimar/Punct-interior-exterior-poligon-simplu",
    null,
    null,
    ["projects/point-inside-or-outside-a-simple-polygon.png"]
  ),
  new Project(
    "Point inside or outside a convex polygon",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs if a point that I draw is inside a convex polygon and between which sides of the polygon it is situated.",
    "https://github.com/corsimar/PunctPoligonConvex",
    null,
    null,
    ["projects/point-inside-or-outside-a-convex-polygon.png"]
  ),
  new Project(
    "Point inside or outside PSLG",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs if a point that I draw is inside a PSLG and between which sides and in which area of the PSLG it is situated.",
    "https://github.com/corsimar/PunctPSLG",
    null,
    null,
    ["projects/point-inside-or-outside-pslg.png"]
  ),
  new Project(
    "Points inside a rectangle",
    "Geometry",
    [getCategory("Java"), getCategory("Geometry")],
    "An algorithm that outputs the number of points that are inside a rectangle that I draw.",
    "https://github.com/corsimar/PuncteDreptunghi",
    null,
    null,
    ["projects/points-inside-a-rectangle.png"]
  ),
];
