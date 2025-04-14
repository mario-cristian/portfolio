class Hackathon {
  constructor(
    name,
    category,
    title,
    location,
    date,
    technologies,
    shortDescription,
    description,
    github
  ) {
    this.name = name;
    this.category = category;
    this.title = title;
    this.location = location;
    this.date = date;
    this.technologies = technologies;
    this.shortDescription = shortDescription;
    this.description = description;
    this.github = github;
  }
}

var hackathonsArea, hackathonCard;

function displayHackathons() {
  for (let i = 0; i < hackathons.length; i++) {
    let aux = hackathonCard.clone();

    aux.attr("id", "hackathon" + hackathons[i].name);
    aux.children().eq(1).children().eq(0).text(hackathons[i].category.name);
    aux
      .children()
      .eq(1)
      .children()
      .eq(0)
      .css("background-color", hackathons[i].category.color);
    aux
      .children()
      .eq(0)
      .attr("src", "hackathons/" + hackathons[i].name.toLowerCase() + ".png");
    aux.children().eq(1).children().eq(1).text(hackathons[i].title);
    for (let j = 0; j < hackathons[i].technologies.length; j++) {
      let technologyAux = aux
        .children()
        .eq(1)
        .children()
        .eq(3)
        .children()
        .eq(0)
        .clone();
      technologyAux.text(hackathons[i].technologies[j].name);
      technologyAux.css(
        "background-color",
        hackathons[i].technologies[j].color
      );
      technologyAux.attr("hidden", false);

      aux.children().eq(1).children().eq(3).append(technologyAux);
    }
    aux.children().eq(1).children().eq(5).text(hackathons[i].description);
    aux
      .children()
      .eq(1)
      .children()
      .eq(6)
      .children()
      .eq(0)
      .text(hackathons[i].location + ", " + hackathons[i].date);
    for (let j = 0; j < hackathons[i].github.length; j++) {
      let btn;
      if (j == 0) {
        btn =
          "<a href='" + hackathons[i].github[j][1] + "' target='_blank'><button class='btn' style='color: #ffffff; background-color: #474747'>" +
          hackathons[i].github[j][0] +
          "</button></a>";
      } else {
        btn =
          "<a href='" + hackathons[i].github[j][1] + "' target='_blank'><button class='btn ms-3' style='color: #ffffff; background-color: #474747'>" +
          hackathons[i].github[j][0] +
          "</button></a>";
      }

      $(btn).insertBefore(
        aux
          .children()
          .eq(1)
          .children()
          .eq(6 + j)
      );
    }
    aux.attr("hidden", false);

    hackathonsArea.append(aux);
  }
}

$(document).ready(function () {
  hackathonsArea = $("#hackathonsArea");
  hackathonCard = $("#hackathonCard");

  displayHackathons();
});

const hackathons = [
  new Hackathon(
    "Unihack",
    getCategory("Web Development"),
    "Revolearn",
    "Timisoara",
    "October 2024",
    [
      getCategory("Python"),
      getCategory("Streamlit"),
      getCategory("Flask"),
      getCategory("MongoDB"),
    ],
    "Innovation in education",
    "Our goal is to demonstrate that math can solve real-world problems, not just theoretical ones, and to show how math is used in machine learning through AI. While our solution focuses on math and machine learning, it can be extended to other subjects.",
    [["Github", "https://github.com/corsimar/unihack2024"]]
  ),
  new Hackathon(
    "iTEC",
    getCategory("Web Development"),
    "Endpoint Monitor",
    "Timisoara",
    "April 2024",
    [
      getCategory("jQuery"),
      getCategory("AJAX"),
      getCategory("Chart JS"),
      getCategory("ASP.NET"),
      getCategory("Dapper"),
      getCategory("SQL Server"),
    ],
    "Monitor application's endpoints",
    "Monitor your application's endpoints effortlessly with our powerful tool. Track uptime, performance, and response times in real-time. Get instant alerts for failures or slowdowns, ensuring quick issue resolution. Stay informed with detailed analytics and reports, helping you maintain reliability and deliver a seamless user experience.",
    [
      [
        "Frontend",
        "https://github.com/AlexandruTud/EndpointMonitor.WebApplication",
      ],
      ["Backend", "https://github.com/AlexandruTud/EndpointMonitor.API"],
    ]
  ),
  new Hackathon(
    "ITFest",
    getCategory("Web Development"),
    "HealthIQ",
    "Timisoara",
    "March 2024",
    [
      getCategory("Angular"),
      getCategory("ASP.NET"),
      getCategory("Dapper"),
      getCategory("SQL Server"),
    ],
    "Fitness application",
    "Customize your workouts with an easy-to-use builder, tailored to your fitness level and preferences. Plan your meals with personalized suggestions, track your calories, and ensure balanced nutrition. Whether you're aiming to lose weight, build muscle, or maintain a healthy lifestyle, this app provides the tools and flexibility to create a routine that works for you.",
    [
      ["Frontend", "https://github.com/corsimar/FrontEnd"],
      ["Backend", "https://github.com/TufanIonut/HealthIQ-API"],
    ]
  ),
  new Hackathon(
    "Best",
    getCategory("Web Development"),
    "Learn Pulse",
    "Brasov",
    "December 2023",
    [
      getCategory("Angular"),
      getCategory("ASP.NET"),
      getCategory("Dapper"),
      getCategory("SQL Server"),
    ],
    "Learning platform",
    "We encourage both students and individuals aged 18 and above to enroll in courses to enhance their skills for FREE. Complete courses to accure points, while teachers can seamlessly upload their courses onto the platform!",
    [
      [
        "Frontend",
        "https://github.com/AlexandruTud/LearnPulse-BestBrasovHackathon.WebApplication",
      ],
      [
        "Backend",
        "https://github.com/AlexandruTud/LearnPulse-BestBrasovHackathon.API",
      ],
    ]
  ),
  new Hackathon(
    "Axes",
    getCategory("Web Development"),
    "Green House",
    "Bucharest",
    "October 2023",
    [
      getCategory("Angular"),
      getCategory("ASP.NET"),
      getCategory("Dapper"),
      getCategory("SQL Server"),
    ],
    "Pollution monitor",
    "The Green House Pollution Monitoring and Alert System Web App is a collaborative project developed by our team of four during the Axes Hackathon (24 hours). This innovative web application monitors household pollution based on the electronic devices in use, their energy consumption, and CO2 emissions.",
    [
      [
        "Frontend",
        "https://github.com/AlexandruTud/GreenHouse-AxesHackathon.WebApplication",
      ],
      [
        "Backend",
        "https://github.com/AlexandruTud/GreenHouse-AxesHackathon.API",
      ],
    ]
  ),
];
