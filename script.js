$ = document.querySelector;

document.querySelector('#main-form').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('form submitted');
    console.log()
    document.querySelector('#output').innerHTML = 'test';
});

// there are two checkboxes '#alert-type-pager' and 'alert-type-siren'. At leas one 
// of them should be checked. If one is clicked, remove the rqeuired attribute from them.
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

at_least_one_needs_to_be_checked(['#alert-type-pager', '#alert-type-siren']);
at_least_one_needs_to_be_checked(['#mtf', '#tlf', '#rf-s', '#klf', '#wlf', '#vf']);