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

    // presets
    let alert_type_images = {
        'p': '<td> <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i0b7521ebe95b9430/version/1470063035/image.png" alt="" /> </td>',
        's': '<td> <img src="https://image.jimcdn.com/app/cms/image/transf/dimension=100x10000:format=png/path/s47c677f812c00ba1/image/i5946598134795bc9/version/1470069114/image.png" alt="" /> </td>'
    };

    let type_images = {
        'b': '<img src="https://image.jimcdn.com/app/cms/image/transf/dimension=120x10000:format=png/path/s47c677f812c00ba1/image/i41ccc95d7b5bfbe6/version/1531755152/image.png" width="30" height="30" alt="" />',
        't': '<img src="https://image.jimcdn.com/app/cms/image/transf/dimension=320x10000:format=png/path/s47c677f812c00ba1/image/i26273cd4d48cb25f/version/1531755148/image.png" width="30" height="30" alt="" />',
        's': '<img src="https://image.jimcdn.com/app/cms/image/transf/dimension=278x10000:format=gif/path/s47c677f812c00ba1/image/i398e35b7bba28a00/version/1531755156/image.gif" width="30" height="30" alt="" />'
    };

    let vehicle_images = {
        'tlf': '<td> <a href="http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/tlf-a/"><img src= "https://image.jimcdn.com/app/cms/image/transf/dimension=118x10000:format=png/path/s47c677f812c00ba1/image/i65e49bdd863c0ab8/version/1446024823/image.png" alt="" /></a> </td>',
        'rf-s': '<td> <a href="http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/rf-s/"><img src= "https://image.jimcdn.com/app/cms/image/transf/dimension=125x10000:format=png/path/s47c677f812c00ba1/image/i02b8c065ba22cf22/version/1446024826/image.png" alt="" /></a> </td>',
        'mtf': '<td> <a href="https://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/mtf/"><img src= "https://image.jimcdn.com/app/cms/image/transf/dimension=110x10000:format=jpg/path/s47c677f812c00ba1/image/i2a56691932c87b5c/version/1502553907/image.jpg" alt="" /></a> </td>',
        'vf': '<td> <a href="http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/vf/"><img src= "https://image.jimcdn.com/app/cms/image/transf/dimension=105x10000:format=png/path/s47c677f812c00ba1/image/i2ad687b46b32d5a8/version/1446024814/image.png" alt="" /></a> </td>',
        'klf': '<td> <a href="http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/klf/"><img src= "https://image.jimcdn.com/app/cms/image/transf/dimension=95x10000:format=png/path/s47c677f812c00ba1/image/ia8690be94128764c/version/1446024810/image.png" alt="" /></a> </td>',
        'wlf': '<td> <a href="http://www.ff-boeheimkirchen.at/%C3%BCber-uns/fuhrpark/wlf/"><img src= "https://image.jimcdn.com/app/cms/image/transf/dimension=118x10000:format=png/path/s47c677f812c00ba1/image/ic63cc508067c7c9b/version/1683354764/image.png" alt="" /></a> </td>'
    };

    //get date in this form: ddmmyyyy
    let date_short = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear()}`;
    let date_long = date.toLocaleDateString('de-at', { weekday: "long", year: "numeric", month: "numeric", day: "numeric" });

    let report_html = "";
    let submitter = e.submitter.value;
    if (submitter == "Artikel generieren") {
        // generate the full report
        report_html = `<h3 id="${date_short}">
        <font size="+1">${type.toUpperCase()}${level}: ${initial_report}</font>
    </h3>
    
    <div id="fb-root">
    </div>
    <script type="text/javascript">
        //<![CDATA[
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/de_DE/sdk.js#xfbml=1&version=v2.7";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    //]]>
    </script>
    <div class="fb-share-button" data-href="http://www.ff-boeheimkirchen.at/aktuelles/aktuelle-einsätze/#${date_short}" data-layout="button" data-size="small" data-mobile-iframe="true">
        <a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Teilen</a>
    </div>
    
    <div style="overflow-x:auto;">
        <table cellspacing="7">
            <tr border="0" cellpadding="0">
                <th valign="top" align="left">
                    Meldebild:
                </th>
                <td valign="top">
                    <strong>Alarmstufe:</strong>
                </td>
                <td valign="top">
                    <strong>Alarmierung&#160;durch:</strong>
                </td>
            </tr>
    
            <tr border="0" cellpadding="0">
                <td valign="top">
                    <font size="+1">${initial_report}</font>
                </td>
                <td valign="top">
                    <font size="+1">${type.toUpperCase()}${level}</font>
                </td>
                <td valign="top">
                    <font size="+1">Florian&#160;St.Pölten</font>
                </td>
            </tr>
    
            <tr border="0">
                <td valign="top">
                    <strong>Datum/&#160;Uhrzeit:</strong>
                </td>
                <td valign="top">
                    <strong>Einsatzort:</strong>
                </td>
                <td valign="top">
                    <strong>Alarmierung&#160;mit:</strong>
                </td>
            </tr>
    
            <tr border="0" cellpadding="0">
                <td valign="top">
                    <font size="+1">${date_long}, ${date.toLocaleTimeString().slice(0, 5)} Uhr</font>
                </td>
                <td valign="top">
                    <font size="+1">${location}</font>
                </td>
                <td valign="top">
                    <div>
                        <table cellspacing="7">
                            <tr>
                            ${alert_types.map((alert_type) => { return alert_type_images[alert_type]; }).join("")}
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    
    <div style="overflow-x:auto;">
        <table>
            <tr border="0">
                <th valign="top">
                    Eingesetzte&#160;Fahrzeuge:
                </th>
            </tr>
        </table>
    </div>
    
    <div style="overflow-x:auto;">
        <table>
            <tr border="0" valign="bottom">
                ${vehicles.map((vehicle) => { return vehicle_images[vehicle]; }).join("")}
            </tr>
    
            <tr>
                ${vehicles.map((vehicle) => { return `<td align="center"><font size="+1"><strong>${vehicle.toUpperCase()}</strong></font></td>`; }).join("")}
            </tr>
        </table>
    </div>
    
    <p align="justify">
        ${report.replaceAll('\n', '<br>')}
    </p>
    <br />
    <strong>Einsatzkräfte&#160;vor&#160;Ort:</strong>
    <div style="overflow-x:auto;">
        <table cellspacing="0">
            <tr border="0" cellpadding="0">
                <td valign="top">
                    <ul>
                        <li>
                            <font size="+1">FF Böheimkirchen - Markt (${vehicles.length} Fahrzeug${vehicles.length == 1 ? '' : 'e'} + ${total_crew} Mann ‑ inkl. Bereitschaft)</font>
                        </li>
                        ${other_crew.split('\n').map((other_crew_member) => { return `<li><font size="+1">${other_crew_member}</font></li>`; }).join("")}
                    </ul>
                </td>
                <td>
                </td>
            </tr>
        </table>
    </div>`;
    } else {
        // generate the homepage snippet
        report_html = `<tr border="0" cellpadding="0">
    <td valign="middle" align="left">
        ${type_images[type]}
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

    let output_element = document.querySelector('#output')
    output_element.innerText = report_html;
    output_element.scrollIntoView();
    navigator.clipboard.writeText(report_html);
});

// there are two checkboxes '#alert-type-pager' and 'alert-type-siren'. At leas one 
// of them should be checked. If one is clicked, remove the rqeuired attribute from them.
at_least_one_needs_to_be_checked(['#alert-type-pager', '#alert-type-siren']);
at_least_one_needs_to_be_checked(['#mtf', '#tlf', '#rf-s', '#klf', '#wlf', '#vf']);
function at_least_one_needs_to_be_checked(checkboxes) {
    checkboxes.forEach(checkbox => {
        document.querySelector(checkbox).addEventListener('click', function () {
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

// only show the level 4 when type is Brandeinsatz
document.querySelectorAll('input[name="type"]').forEach(input => {
    input.addEventListener('change', function (e) {
        if (e.target.value == "b") {
            document.querySelector('#level-4-span').style.display = "flex";
        } else {
            document.querySelector('#level-4-span').style.display = "none";
        }
    });
});