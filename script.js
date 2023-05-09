document.querySelector('#main-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // get the values from the form
    let initial_report = document.querySelector('#initial-report').value;
    let location = document.querySelector('#location').value;
    let date = new Date(document.querySelector('#date').value);
    let total_crew = document.querySelector('#total-crew').value;

    let alert_types = [];
    document.querySelectorAll('input[name="alert-type"]:checked').forEach(checkbox => {
        alert_types.push(checkbox.value);
    });

    let type = document.querySelector('input[name="type"]:checked').value;
    let level = document.querySelector('input[name="level"]:checked').value;

    let vehicles = [];
    document.querySelectorAll('input[name="vehicles"]:checked').forEach(checkbox => {
        vehicles.push(checkbox.value);
    });

    let other_crew = document.querySelector('#other-crew').value;
    let report = document.querySelector('#report').value;

    // image links:
    let image_pager = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i0b7521ebe95b9430/version/1470063035/image.png";
    let image_sirene = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_mtf = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_tlf = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_rf_s = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_klf = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_wlf = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_vf = "https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png";
    let image_type_b = "https://image.jimcdn.com/app/cms/image/transf/dimension=120x10000:format=png/path/s47c677f812c00ba1/image/i41ccc95d7b5bfbe6/version/1531755152/image.png";
    let image_type_t = "https://image.jimcdn.com/app/cms/image/transf/dimension=320x10000:format=png/path/s47c677f812c00ba1/image/i26273cd4d48cb25f/version/1531755148/image.png";
    let image_type_s = "https://image.jimcdn.com/app/cms/image/transf/dimension=278x10000:format=gif/path/s47c677f812c00ba1/image/i398e35b7bba28a00/version/1531755156/image.gif";
    // create the report

    used_type = image_type_t
    if (type == "b") {
        used_type = image_type_b;
    } else if (type == "s") {
        used_type = image_type_s;
    }

    //get date in this form: ddmmyyyy
    let date_short = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
    let date_long = date.toLocaleDateString('de-at', { weekday: "long", year: "numeric", month: "numeric", day: "numeric" });
    let report_html = "";
    let submitter = e.submitter.value;
    if (submitter == "Artikel generieren") {
        report_html = `<tr border="0" cellpadding="0">
    <td valign="middle" align="left">
        <img src="${used_type}" width="30" height="30" alt="" />
    </td>
    <td valign="middle" align="right">
        ${date_long}
    </td>
    <td valign="middle">
        <a href="https://www.ff-boeheimkirchen.at/aktuelles/aktuelle-eins%C3%A4tze/#${date_short}">${type.toUpperCase()}${level}: ${initial_report}</a>
    </td>
    <td valign="middle">
        ${location}
    </td>
</tr>`;
    }

    report_html = `<tr border="0" cellpadding="0">
    <td valign="middle" align="left">
        <img src="${used_type}" width="30" height="30" alt="" />
    </td>
    <td valign="middle" align="right">
        ${date_long}
    </td>
    <td valign="middle">
        <a href="https://www.ff-boeheimkirchen.at/aktuelles/aktuelle-eins%C3%A4tze/#${date_short}">${type.toUpperCase()}${level}: ${initial_report}</a>
    </td>
    <td valign="middle">
        ${location}
    </td>
</tr>`;

    document.querySelector('#output').innerText = report_html;
    navigator.clipboard.writeText(report_html)
});

// there are two checkboxes '#alert-type-pager' and 'alert-type-siren'. At leas one 
// of them should be checked. If one is clicked, remove the rqeuired attribute from them.
function at_least_one_needs_to_be_checked(checkboxes) {
    checkboxes.forEach(checkbox => {
        document.querySelector(checkbox).addEventListener('click', function () {
            console.log("test");
            // go over all checkboxes and remove the required attribute if one is checked, else add it
            let checked = false;
            checkboxes.forEach(checkbox => {
                if (document.querySelector(checkbox).checked) {
                    checked = true;
                }
            }
            );

            if (checked) {
                checkboxes.forEach(checkbox => {
                    document.querySelector(checkbox).removeAttribute('required');
                });
            }
            else {
                checkboxes.forEach(checkbox => {
                    document.querySelector(checkbox).setAttribute('required', '');
                });
            }
        });
    });
}

at_least_one_needs_to_be_checked(['#alert-type-pager', '#alert-type-siren']);
at_least_one_needs_to_be_checked(['#mtf', '#tlf', '#rf-s', '#klf', '#wlf', '#vf']);

// makes the space around the checkboxes clickable
document.querySelectorAll('.multi-space>span').forEach(span => {
    span.addEventListener('click', function (e) {
        if (e.target.tagName == "INPUT" || e.target.tagName == "LABEL") {
            return;
        }
        // span.firstElementChild.checked = !span.firstElementChild.checked;
        span.firstElementChild.click();
    });
});

document.querySelectorAll('input[name="type"]').forEach(input => {
    input.addEventListener('change', function (e) {
        console.log(e.target.value);
        if (e.target.value == "b") {
            document.querySelector('#level-4-span').style.display = "flex";
        } else {
            document.querySelector('#level-4-span').style.display = "none";
        }
    });
});