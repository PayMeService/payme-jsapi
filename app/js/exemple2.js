/**
 * Created by thoryachev on 22.11.2018.
 */
// HELPERS ---------------------------------------------------------------------------------
(function () {
    const mpl = 'MPL15282-97137EVV-KOAOAOIT-VWCZPB8V';

    const consolePre = document.getElementById('console-pre2');
    const form = document.getElementById('checkout-form2');

    const errorsMessages = document.getElementById('errors2');

    const numberGroup = document.getElementById('card-number-group2');

    const expirationGroup = document.getElementById('card-expiration-group2');

    const cvcGroup = document.getElementById('card-cvv-group2');

    const firstNameGroup = document.getElementById('first-name-group2');

    const lastNameGroup = document.getElementById('last-name-group2');

    const emailGroup = document.getElementById('email-group2');

    const phoneGroup = document.getElementById('phone-group2');

    const socialIdGroup = document.getElementById('social-id-group2');

// -----------------------------------------------------------------------------------------------------------------

    const submitButton = document.getElementById('submit-button2');
    submitButton.disabled = true;

    function tokenizationStarted() {
        submitButton.disabled = true;
        console.log('Tokenization started!');
    }

    function tokenizationFinished() {
        submitButton.disabled = false;
        console.log('Tokenization finished!');
    }

    const errorsFromField = {};

    function showErrors(errorsFromField, el, ev) {
        let lastElement = errorsFromField[Object.keys(errorsFromField).pop()];
        el.classList.remove('fadeOutDown');
        if (!ev.message) {
            el.innerText = lastElement;
        } else {
            el.innerText = ev.message;
        }
    }

    function toggleValidationMessages(wrapper, ev) {
        if (ev.isValid) {
            wrapper.classList.remove('has-error');
            wrapper.classList.add('color-for-field');
            this.classList.remove('fadeInUp');
            this.classList.add('fadeOutDown');
            delete errorsFromField[ev.field]; // delete error from the object that passed validation
            if (Object.keys(errorsFromField).length > 0) { // if the object still has errors - output them
                showErrors(errorsFromField, this, ev);
                this.classList.remove('fadeOutDown');
                this.classList.add('fadeInUp');
            }
        } else {
            errorsFromField[ev.field] = ev.message; // write errors to the object
            wrapper.classList.add('has-error');
            wrapper.classList.remove('color-for-field');
            console.log(wrapper);
            this.classList.remove('fadeOutDown');
            this.classList.add('fadeInUp');
            if (Object.keys(errorsFromField).length > 0) { // check if there is an error in the object
                showErrors(errorsFromField, this, ev); // and show its
            }
        }
    }

    function addClass(fieldId, className) {
        document.getElementById(fieldId).classList.add(className);
    }
    function removeClass(fieldId, className) {
        document.getElementById(fieldId).classList.remove(className);
    }

// -----------------------------------------------------------------------------------------------------------------

    const allFieldsReady = [];

    const DEFAULT_SETTINGS = {
        styles: {
            base: {
                'color': '#565B7D',
                'font-size': '16px',
                '::placeholder': {'color': '#8FA7C8'}
            },
            invalid: {
                'color': '#fff'
            },
            valid: {
                'color': '#565B7D',
            },
        }
    };

    PayMe.create(mpl, {
        testMode: true
    }).then((instance) => {

        const fields = instance.hostedFields();

        const cardNumberSettings = {
            ...DEFAULT_SETTINGS,
            placeholder: '1234 1234 1234 1234',
            messages: {
                invalid: 'Bad credit card number',
                required: 'Field "Card Number" is mandatory'
            },
        };
        const firstNameField = {
            ...DEFAULT_SETTINGS,
            placeholder: 'First name',
            messages: {
                invalid: 'Letters only for field "First name"',
                required: 'Field "First name" is mandatory'
            },
        };

        const lastNameField = {
            ...DEFAULT_SETTINGS,
            placeholder: 'Last name',
            messages: {
                invalid: 'Letters only for field "Last name"',
                required: 'Field "Last name" is mandatory'
            },
        };

        const emailField = {
            ...DEFAULT_SETTINGS,
            messages: {
                invalid: 'Invalid Email',
                required: 'Field "Email" is mandatory'
            },
        };

        const phoneField = {
            ...DEFAULT_SETTINGS,
            placeholder: 'Phone',
            messages: {
                invalid: 'Invalid Phone',
                required: 'Field "Phone" is mandatory'
            },
        };

        const socialIdField = {
            ...DEFAULT_SETTINGS,
            placeholder: 'Social ID',
            messages: {
                invalid: 'Invalid Phone',
                required: 'Field "Social Id" is mandatory'
            },
        };
        const cvcField = {
            ...DEFAULT_SETTINGS,
            placeholder: 'CVC',
            messages: {
                invalid: 'Invalid CVC',
                required: 'Field "CVC" is mandatory'
            },
        };
        const expirationField = {
            ...DEFAULT_SETTINGS,
            messages: {
                invalid: 'Invalid Expiration',
                required: 'Field "Expiration" is mandatory'
            },
        };

        const cardNumber = fields.create(PayMe.fields.NUMBER, cardNumberSettings);
        allFieldsReady.push(
            cardNumber.mount('#card-number-container2')
        );
        cardNumber.on('keyup', toggleValidationMessages.bind(errorsMessages, numberGroup));
        cardNumber.on('blur', () => removeClass('card-number-container2', 'focus-on-field'));
        cardNumber.on('focus', () => addClass('card-number-container2', 'focus-on-field'));

        const expiration = fields.create(PayMe.fields.EXPIRATION, expirationField);
        allFieldsReady.push(
            expiration.mount('#card-expiration-container2')
        );
        expiration.on('keyup', toggleValidationMessages.bind(errorsMessages, expirationGroup));
        expiration.on('validity-changed', toggleValidationMessages.bind(errorsMessages, expirationGroup));
        expiration.on('blur', () => removeClass('card-expiration-container2', 'focus-on-field'));
        expiration.on('focus', () => addClass('card-expiration-container2', 'focus-on-field'));

        const cvc = fields.create(PayMe.fields.CVC, cvcField);
        allFieldsReady.push(
            cvc.mount('#card-cvv-container2')
        );
        cvc.on('keyup', toggleValidationMessages.bind(errorsMessages, cvcGroup));
        cvc.on('validity-changed', toggleValidationMessages.bind(errorsMessages, cvcGroup));
        cvc.on('blur', () => removeClass('card-cvv-container2', 'focus-on-field'));
        cvc.on('focus', () => addClass('card-cvv-container2', 'focus-on-field'));

        const phone = fields.create(PayMe.fields.PHONE, phoneField);
        allFieldsReady.push(
            phone.mount('#phone-container2')
        );
        phone.on('keyup', toggleValidationMessages.bind(errorsMessages, phoneGroup));
        phone.on('validity-changed', toggleValidationMessages.bind(errorsMessages, phoneGroup));
        phone.on('blur', () => removeClass('phone-container2', 'focus-on-field'));
        phone.on('focus', () => addClass('phone-container2', 'focus-on-field'));

        const email = fields.create(PayMe.fields.EMAIL, emailField);
        allFieldsReady.push(
            email.mount('#email-container2')
        );
        email.on('keyup', toggleValidationMessages.bind(errorsMessages, emailGroup));
        email.on('validity-changed', toggleValidationMessages.bind(errorsMessages, emailGroup));
        email.on('blur', () => removeClass('email-container2', 'focus-on-field'));
        email.on('focus', () => addClass('email-container2', 'focus-on-field'));

        const firstName = fields.create(PayMe.fields.NAME_FIRST, firstNameField);
        allFieldsReady.push(
            firstName.mount('#first-name-container2')
        );
        firstName.on('keyup', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
        firstName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, firstNameGroup));
        firstName.on('blur', () => removeClass('first-name-container2', 'focus-on-field'));
        firstName.on('focus', () => addClass('first-name-container2', 'focus-on-field'));

        const lastName = fields.create(PayMe.fields.NAME_LAST, lastNameField);
        allFieldsReady.push(
            lastName.mount('#last-name-container2')
        );
        lastName.on('keyup', toggleValidationMessages.bind(errorsMessages, lastNameGroup));
        lastName.on('validity-changed', toggleValidationMessages.bind(errorsMessages, lastNameGroup));
        lastName.on('blur', () => removeClass('last-name-container2', 'focus-on-field'));
        lastName.on('focus', () => addClass('last-name-container2', 'focus-on-field'));

        const socialId = fields.create(PayMe.fields.SOCIAL_ID, socialIdField);
        allFieldsReady.push(
            socialId.mount('#social-id-container2')
        );
        socialId.on('keyup', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
        socialId.on('validity-changed', toggleValidationMessages.bind(errorsMessages, socialIdGroup));
        socialId.on('blur', () => removeClass('social-id-container2', 'focus-on-field'));
        socialId.on('focus', () => addClass('social-id-container2', 'focus-on-field'));

        Promise.all(allFieldsReady).then(() => submitButton.disabled = false);

        form.addEventListener('submit', ev => {
            ev.preventDefault();

            const sale = {

                // payerFirstName: 'Vladimir',
                // payerLastName: 'kondratiev',
                // payerEmail: 'trahomoto@mailforspam.com',
                // payerPhone: '1231231',

                payerSocialId: '65656',

                total: {
                    label: '🚀 Rubber duck',
                    amount: {
                        currency: 'ILS',
                        value: '55.00',
                    }
                }
            };


            tokenizationStarted();

            instance.tokenize(sale)
                .then(data => {
                    console.log('Tokenization result::: ', data);
                    consolePre.innerText = 'Tokenization result::: \r\n';
                    consolePre.innerText = consolePre.innerText + JSON.stringify(data, null, 2);

                    tokenizationFinished();
                })
                .catch(err => {
                    console.error(err);

                    tokenizationFinished();
                });
        });

//document.getElementById('tear-down').addEventListener('click', () => instance.teardown());

    });


})();


