import { alert_by_images, type_images, vehicle_images, additional_crew } from "./constants.js";

//------------------ Generates the report ------------------//
document.querySelector("#main-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    let date = new Date(document.querySelector("#date").value);
    let date_short = `${date.getDate().toString().padStart(2, "0")}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getFullYear()}`;
    let date_long = date.toLocaleDateString("de-at", {
        weekday: "long",
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });

    let alert_by = Array.from(document.querySelectorAll('input[name="alert-type"]:checked')).map(checkbox => alert_by_images[checkbox.value]);
    let vehicles = Array.from(document.querySelectorAll('input[name="vehicles"]:checked')).map(checkbox => vehicle_images[checkbox.value]);

    let other_crew = []
    let other_crew_presets = [...document.querySelectorAll("div>select")];
    other_crew_presets.forEach(preset => {
        let value = preset.value;
        if (value == "") {
            return;
        }
        let index = preset.selectedIndex;
        let optgroup = preset.options[index].parentNode.label;

        let selected_crew = additional_crew[optgroup][value];
        let name = selected_crew.name;
        let link = selected_crew.link;

        if (link) {
            other_crew.push(`<font size="+1"><a href="${link}">${name}</a></font>`);
        } else {
            other_crew.push(`<font size="+1">${name}</font>`);
        }
    });

    // let custom_crew = addition.html.get().slice(0, -229).replaceAll("<p>", "");
    let custom_crew = addition.html.get().replaceAll("<p>", "").split("</p>");
    custom_crew.forEach((crew) => {
        if (crew == "<br>") {
            return;
        }
        if (crew.includes("Froala Editor")) {
            return;
        }
        other_crew.push(`<font size="+1">${crew}</font>`);
    });

    const data = {
        report: {
            short: document.querySelector("#initial-report").value,
            long: editor.html.get().slice(0, -229)
        },
        location: document.querySelector("#location").value,
        date: {
            long: date_long,
            short: date_short,
            time: date.toLocaleTimeString().slice(0, 5)
        },
        total_crew: document.querySelector("#total-crew").value,
        alert_from: document.querySelector('#alert-from').value,
        alert_by: alert_by,
        type: {
            letter: document.querySelector('input[name="type"]:checked').value.toUpperCase(),
            image: type_images[document.querySelector('input[name="type"]:checked').value],
            level: document.querySelector('input[name="level"]:checked').value,
        },
        vehicles: {
            vehicles: vehicles,
            length: vehicles.length,
            maybe_e: vehicles.length == 1 ? "" : "e",
        },
        other: other_crew
    };

    let report_html = "";
    let submitter = e.submitter.value;

    if (submitter == "Artikel generieren") {

        const response = await fetch('template_report.hbs');
        const templateSource = await response.text();

        const template = Handlebars.compile(templateSource);

        report_html = template(data);

    } else if (submitter == "Druck generieren") {
        console.log("Druck generieren");
        // Generate the Print version
        let print = window.open("", "", "left=0,top=0,width=595,height=842,toolbar=0,scrollbars=0,status=0");
        print.document.write('<link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css">');
        print.document.write('<link rel="stylesheet" href="style-print.css">');
        print.document.write(`<h1>${type.toUpperCase()}${level}: ${initial_report}</h1>`);
    } else {
        const response = await fetch('template_snippet.hbs');
        const templateSource = await response.text();

        const template = Handlebars.compile(templateSource);

        report_html = template(data);
    }

    let output_element = document.querySelector("#output");
    output_element.innerText = report_html;
    output_element.scrollIntoView();

    navigator.clipboard.writeText(report_html).then(console.log("copied to clipboard"));
});

//--------------- Manages the Form hints -----------------------//
// there are two checkboxes '#alert-type-pager' and 'alert-type-siren'. At leas one
// of them should be checked. If one is clicked, remove the rqeuired attribute from them.
at_least_one_needs_to_be_checked(["#alert-type-pager", "#alert-type-siren"]);
at_least_one_needs_to_be_checked(["#mtf", "#tlf", "#rf-s", "#klf", "#wlf", "#vf"]);
function at_least_one_needs_to_be_checked(checkboxes) {
    checkboxes.forEach((checkbox) => {
        document.querySelector(checkbox).addEventListener("click", function () {
            // go over all checkboxes and remove the required attribute if one is checked, else add it
            let checked = false;
            checkboxes.forEach((checkbox) => {
                if (document.querySelector(checkbox).checked) {
                    checked = true;
                }
            });

            if (checked) {
                checkboxes.forEach((checkbox) => {
                    document.querySelector(checkbox).removeAttribute("required");
                });
            } else {
                checkboxes.forEach((checkbox) => {
                    document.querySelector(checkbox).setAttribute("required", "");
                });
            }
        });
    });
}

//----------------- Manages Clickable Areas for Checkboxes/radios -----------------//
// makes the space around the checkboxes clickable
document.querySelectorAll(".multi-space>span").forEach((span) => {
    span.addEventListener("click", function (e) {
        if (e.target.tagName == "INPUT" || e.target.tagName == "LABEL") {
            return;
        }
        span.firstElementChild.click();
    });
});

//----------------- Level 4 is only with B possible -----------------//
// only show the level 4 when type is Brandeinsatz
document.querySelectorAll('input[name="type"]').forEach((input) => {
    input.addEventListener("change", (e) => {
        if (e.target.value == "b") {
            document.querySelector("#level-4-span").style.display = "flex";
        } else {
            document.querySelector("#level-4-span").style.display = "none";
        }

        if (e.target.value == "t") {
            document.querySelector("#level-0-span").style.display = "flex";
        }
        else {
            document.querySelector("#level-0-span").style.display = "none";
        }
    });
});

let main_selector = document.querySelector("#other-crew-list");

//----------------- Manages 'Andere Beteiligte' -----------------//
//construct the original select (input) element
let select_element = document.createElement("select");
select_element.name = "other-crew-selectable";
let empty_option = document.createElement("option");
empty_option.value = "";
empty_option.innerText = "";
select_element.appendChild(empty_option);
for (let group in additional_crew) {
    let optgroup = document.createElement("optgroup");
    optgroup.value = group;
    optgroup.label = group;
    for (let crew in additional_crew[group]) {
        let option = document.createElement("option");
        option.value = crew;
        option.innerText = additional_crew[group][crew].name;
        optgroup.appendChild(option);
    }
    select_element.appendChild(optgroup);
}
main_selector.appendChild(select_element);

//remove all empty ones and append a new one
document.querySelector("#other-crew-list").addEventListener("change", (e) => {
    document.querySelectorAll("#other-crew-list>select").forEach((e) => {
        if (e.value == "") {
            e.remove();
        }
    });
    main_selector.appendChild(select_element.cloneNode(true));
});
